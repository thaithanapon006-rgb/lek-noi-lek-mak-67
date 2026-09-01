/* =========================================================
   DataService — เก็บ Progress ของผู้เรียน
   -------------------------------------------------------
   เก็บเฉพาะ: ชื่อเล่น (ไม่ใช่ชื่อจริง-นามสกุล), รหัสที่ระบบสร้างให้อัตโนมัติ,
   ความคืบหน้าการปลดล็อกบท, จำนวนครั้งที่ทำ Post-test และคะแนนล่าสุด
   ของแต่ละบทเท่านั้น (ไม่เก็บประวัติคะแนนเก่าทุกครั้ง)

   ทำงาน 2 โหมดโดยอัตโนมัติ:
   - Cloud Mode  : เมื่อกรอก js/firebase-config.js ครบแล้ว ใช้ Firebase
                   Realtime Database (ผ่าน Anonymous Auth)
   - Local Mode  : ค่าเริ่มต้น (ยังไม่ได้กรอก Firebase config) ใช้
                   localStorage ของเบราว์เซอร์เครื่องนี้แทน — ใช้งานได้
                   ครบทุกฟีเจอร์ทันที เหมาะสำหรับทดสอบระบบ

   หมายเหตุด้านความปลอดภัย: ระบบรหัสแบบนี้ (ไม่มี Login ด้วยรหัสผ่านจริง)
   ไม่สามารถยืนยันตัวตนผู้ใช้ได้ 100% — ใครก็ตามที่รู้/เดารหัสได้ ก็จะเข้าถึง
   ข้อมูล Progress ของรหัสนั้นได้ (คล้ายรหัส PIN ห้องเกม) เหมาะกับข้อมูล
   ระดับความเสี่ยงต่ำแบบนี้ (ไม่มีชื่อจริง ไม่มีข้อมูลอ่อนไหว) แต่ไม่ควรใช้
   เก็บข้อมูลสำคัญกว่านี้โดยไม่ทำระบบยืนยันตัวตนที่รัดกุมกว่านี้
   ========================================================= */

const DataService = (() => {
  const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // ตัด 0/O/1/I/L ที่สับสนง่ายออก
  const LOCAL_KEY = "mathsite67_users_v1";

  const isCloudConfigured = () =>
    typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY";

  let mode = isCloudConfigured() ? "cloud" : "local";
  let cloudDb = null;
  let cloudReady = null;

  function generateCode(length = 6) {
    let code = "";
    for (let i = 0; i < length; i++) {
      code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    }
    return code;
  }

  function emptyProfile(nickname) {
    return {
      nickname,
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

  /* ---------------- API สาธารณะ (เหมือนกันทั้ง 2 โหมด) ---------------- */

  async function createUser(nickname) {
    const profile = emptyProfile(nickname);
    let code = generateCode();

    if (mode === "cloud") {
      const { db, ref, get, set } = await ensureCloud();
      // กันรหัสชนกัน (โอกาสน้อยมาก แต่เช็คไว้ให้ชัวร์)
      let attempts = 0;
      while (attempts < 5) {
        const snap = await get(ref(db, `users/${code}`));
        if (!snap.exists()) break;
        code = generateCode();
        attempts++;
      }
      await set(ref(db, `users/${code}`), profile);
    } else {
      const all = localReadAll();
      while (all[code]) code = generateCode(); // กันรหัสชนกันในเครื่องเดียวกัน
      all[code] = profile;
      localWriteAll(all);
    }
    return { code, profile };
  }

  async function loadUser(code) {
    if (!code) return null;
    code = code.trim().toUpperCase();

    if (mode === "cloud") {
      const { db, ref, get } = await ensureCloud();
      const snap = await get(ref(db, `users/${code}`));
      return snap.exists() ? snap.val() : null;
    }
    const all = localReadAll();
    return all[code] || null;
  }

  async function saveLessonResult(code, lessonId, result) {
    code = code.trim().toUpperCase();

    if (mode === "cloud") {
      const { db, ref, get, set } = await ensureCloud();
      const userRef = ref(db, `users/${code}`);
      const snap = await get(userRef);
      if (!snap.exists()) return null;
      const profile = snap.val();
      profile.lessons = profile.lessons || {};
      profile.lessons[lessonId] = result;
      if (result.passed && profile.unlockedUpTo === lessonId) {
        profile.unlockedUpTo = lessonId + 1;
      }
      await set(userRef, profile);
      return profile;
    }

    const all = localReadAll();
    const profile = all[code];
    if (!profile) return null;
    profile.lessons = profile.lessons || {};
    profile.lessons[lessonId] = result;
    if (result.passed && profile.unlockedUpTo === lessonId) {
      profile.unlockedUpTo = lessonId + 1;
    }
    all[code] = profile;
    localWriteAll(all);
    return profile;
  }

  function getMode() {
    return mode;
  }

  return { createUser, loadUser, saveLessonResult, getMode, generateCode };
})();
