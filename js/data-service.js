/* =========================================================
   DataService — เก็บ Progress ของผู้เรียน
   -------------------------------------------------------
   เก็บเฉพาะ: ชื่อเล่น (ไม่ใช่ชื่อจริง-นามสกุล) + รหัสผ่าน 4 ตัวที่ผู้เล่น
   ตั้งเอง (ไม่ใช่ระบบสุ่มให้ — ง่ายต่อการจำสำหรับเด็ก), ความคืบหน้าการ
   ปลดล็อกบท, จำนวนครั้งที่ทำ Post-test และคะแนนล่าสุดของแต่ละบทเท่านั้น
   (ไม่เก็บประวัติคะแนนเก่าทุกครั้ง)

   การยืนยันตัวตน: ต้องกรอก "ชื่อเล่น" และ "รหัสผ่าน 4 ตัว" ตรงกันทุกตัว
   กับตอนสร้างบัญชี — ระบบเก็บข้อมูลโดยใช้ชื่อ+รหัสรวมกันเป็น Key เดียว
   (ผู้เล่นสองคนตั้งรหัสเดียวกันได้ ถ้าชื่อเล่นไม่ซ้ำกัน)

   ทำงาน 2 โหมดโดยอัตโนมัติ:
   - Cloud Mode  : เมื่อกรอก js/firebase-config.js ครบแล้ว ใช้ Firebase
                   Realtime Database (ผ่าน Anonymous Auth)
   - Local Mode  : ค่าเริ่มต้น (ยังไม่ได้กรอก Firebase config) ใช้
                   localStorage ของเบราว์เซอร์เครื่องนี้แทน

   หมายเหตุด้านความปลอดภัย: ระบบรหัสแบบนี้ (ไม่มี Login ด้วยรหัสผ่านจริง
   ที่เข้ารหัส) ไม่สามารถยืนยันตัวตนผู้ใช้ได้ 100% — ใครก็ตามที่รู้/เดา
   ชื่อ+รหัสได้ ก็จะเข้าถึงข้อมูล Progress ของบัญชีนั้นได้ (คล้ายรหัส PIN
   ห้องเกม) เหมาะกับข้อมูลระดับความเสี่ยงต่ำแบบนี้เท่านั้น
   ========================================================= */

const DataService = (() => {
  const LOCAL_KEY = "mathsite67_users_v2";

  const isCloudConfigured = () =>
    typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY";

  let mode = isCloudConfigured() ? "cloud" : "local";
  let cloudDb = null;
  let cloudReady = null;

  /** แปลงชื่อเล่น+รหัส ให้เป็น Key เดียวที่ปลอดภัยสำหรับใช้เป็น path ใน Firebase
   *  (ตัดอักขระที่ Firebase ห้ามใช้ใน key: . # $ [ ] /) */
  function sanitizeNickname(nickname) {
    return nickname.trim().replace(/[.#$\[\]/]/g, "").slice(0, 30);
  }
  function buildKey(nickname, pin) {
    return `${sanitizeNickname(nickname)}__${pin.trim()}`;
  }

  function emptyProfile(nickname) {
    return {
      nickname: nickname.trim(),
      createdAt: Date.now(),
      unlockedUpTo: 1,
      lessons: {} // { [lessonId]: { attempts, latestFinalScore, passed } }
    };
  }

  /* ---------------- Local Mode (localStorage) ---------------- */
  function localReadAll() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function localWriteAll(all) {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------------- Cloud Mode (Firebase) ---------------- */
  async function ensureCloud() {
    if (cloudReady) return cloudReady;
    cloudReady = (async () => {
      const [{ initializeApp }, { getAuth, signInAnonymously }, { getDatabase, ref, get, set }] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"),
        import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js")
      ]);
      const app = initializeApp(FIREBASE_CONFIG);
      const auth = getAuth(app);
      await signInAnonymously(auth); // จำเป็นสำหรับ Security Rules ที่กำหนดให้ auth != null
      cloudDb = { db: getDatabase(app), ref, get, set };
      return cloudDb;
    })();
    return cloudReady;
  }

  /* ---------------- อ่าน/เขียนแบบ raw ตาม key (ใช้ภายในเท่านั้น) ---------------- */
  async function rawGet(key) {
    if (mode === "cloud") {
      const { db, ref, get } = await ensureCloud();
      const snap = await get(ref(db, `users/${key}`));
      return snap.exists() ? snap.val() : null;
    }
    const all = localReadAll();
    return all[key] || null;
  }

  async function rawSet(key, profile) {
    if (mode === "cloud") {
      const { db, ref, set } = await ensureCloud();
      await set(ref(db, `users/${key}`), profile);
      return true;
    }
    const all = localReadAll();
    all[key] = profile;
    return localWriteAll(all);
  }

  /* ---------------- API สาธารณะ ---------------- */

  /** สร้างผู้เล่นใหม่ ด้วยชื่อเล่น + รหัสผ่าน 4 ตัวที่ผู้เล่นตั้งเอง
   *  คืนค่า { key, profile } เมื่อสำเร็จ หรือ { error: "exists" } ถ้าชื่อ+รหัสนี้ถูกใช้แล้ว */
  async function createUser(nickname, pin) {
    const key = buildKey(nickname, pin);
    const existing = await rawGet(key);
    if (existing) return { error: "exists" };
    const profile = emptyProfile(nickname);
    await rawSet(key, profile);
    return { key, profile };
  }

  /** โหลดผู้เล่นเดิม ต้องกรอกชื่อเล่น+รหัสผ่านตรงกับตอนสร้างทุกตัว
   *  คืนค่า { key, profile } หรือ null ถ้าไม่พบ (ไม่บอกว่าผิดที่ชื่อหรือรหัส เพื่อความปลอดภัย) */
  async function loadUser(nickname, pin) {
    if (!nickname || !pin) return null;
    const key = buildKey(nickname, pin);
    const profile = await rawGet(key);
    return profile ? { key, profile } : null;
  }

  async function saveLessonResult(key, lessonId, result) {
    const profile = await rawGet(key);
    if (!profile) return null;
    profile.lessons = profile.lessons || {};
    profile.lessons[lessonId] = result;
    if (result.passed && profile.unlockedUpTo === lessonId) {
      profile.unlockedUpTo = lessonId + 1;
    }
    await rawSet(key, profile);
    return profile;
  }

  function getMode() {
    return mode;
  }

  return { createUser, loadUser, saveLessonResult, getMode };
})();
