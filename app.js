/* =========================================================
   แอปหลัก — ควบคุมการเปลี่ยนหน้า, ตัวละคร 67, ระบบผู้ใช้,
   และ Flow เต็มของบทเรียน (Pre-test → วิดีโอ → ใบงาน → ตรวจทาน →
   Post-test → บันทึกผล → ปลดล็อกบทถัดไป)
   ========================================================= */

const App = (() => {

  /* ---------------- ตัวละคร 67 (SVG) — ไม่เปลี่ยนจากเดิม ---------------- */
  function mascotSVG(expression = "idle") {
    const animClass = {
      idle: "anim-idle",
      wave: "anim-idle anim-wave",
      jump: "anim-jump",
      happy: "anim-happy",
      thinking: "anim-thinking",
      confused: "anim-confused",
      encourage: "anim-encourage",
      celebrate: "anim-happy"
    }[expression] || "anim-idle";

    const mouth = (expression === "confused")
      ? `<path d="M82 122 Q100 112 118 122" stroke="#3a2b55" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<path d="M80 118 Q100 138 120 118" stroke="#3a2b55" stroke-width="5" fill="none" stroke-linecap="round"/>`;

    const eyebrow = (expression === "thinking")
      ? `<path d="M70 78 Q78 70 88 76" stroke="#3a2b55" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : "";

    return `
    <svg class="mascot ${animClass}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ตัวละคร 67">
      <ellipse cx="100" cy="182" rx="46" ry="9" fill="rgba(43,33,69,0.10)"/>
      <g>
        <rect x="30" y="100" width="20" height="46" rx="10" fill="#f2b93f" class="mascot-arm-left"/>
        <rect x="150" y="100" width="20" height="46" rx="10" fill="#f2b93f" class="mascot-arm-right"/>
        <circle cx="100" cy="105" r="72" fill="#ffd35c" stroke="#f2b93f" stroke-width="4"/>
        <ellipse cx="62" cy="118" rx="10" ry="7" fill="#ff9f8f" opacity="0.7"/>
        <ellipse cx="138" cy="118" rx="10" ry="7" fill="#ff9f8f" opacity="0.7"/>
        <g>
          <ellipse class="mascot-eye" cx="78" cy="98" rx="8" ry="10" fill="#3a2b55"/>
          <ellipse class="mascot-eye" cx="122" cy="98" rx="8" ry="10" fill="#3a2b55"/>
        </g>
        ${eyebrow}
        ${mouth}
        <text x="100" y="150" text-anchor="middle" font-family="Kanit, sans-serif" font-weight="700" font-size="28" fill="#ff6f59">67</text>
        <ellipse cx="80" cy="176" rx="12" ry="7" fill="#f2b93f"/>
        <ellipse cx="120" cy="176" rx="12" ry="7" fill="#f2b93f"/>
      </g>
    </svg>`;
  }

  function setMascot(container, expression) {
    if (!container) return;
    container.innerHTML = mascotSVG(expression);
  }

  function pulseMascot(container, expression) {
    if (!container) return;
    const svg = container.querySelector("svg.mascot");
    if (!svg) return setMascot(container, expression);
    svg.classList.remove("anim-jump", "anim-happy", "anim-thinking", "anim-confused", "anim-encourage", "anim-wave");
    void svg.offsetWidth;
    setMascot(container, expression);
  }

  /* ---------------- ภาพประกอบสไลด์ (ระบบเดิม สำรองไว้เผื่อใช้ในอนาคต) ---------------- */
  const slideVisuals = {
    "67-wave": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("wave")}</div>`,
    "67-think": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("thinking")}</div>`,
    "67-happy": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("happy")}</div>`,
    "67-confused": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("confused")}</div>`,
    "67-encourage": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("encourage")}</div>`,
    "67-celebrate": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("celebrate")}</div>`
  };

  function lessonArt(icon) {
    return `<div class="lesson-card__art" style="display:flex;align-items:center;justify-content:center;font-size:56px;">${icon}</div>`;
  }

  /* ---------------- state ของแอป ---------------- */
  let currentLessonIndex = 0;
  let slideIndex = 0;
  let currentUser = null; // { code, profile } — profile มาจาก DataService (ไม่มีชื่อจริง-นามสกุล)
  let courseCtx = null;   // { lesson } — บทที่กำลังเรียนอยู่ใน Course Flow ปัจจุบัน

  /* ---------------- element refs ---------------- */
  const screens = {
    start: document.getElementById("screen-start"),
    onboarding: document.getElementById("screen-onboarding"),
    lessons: document.getElementById("screen-lessons"),
    lesson: document.getElementById("screen-lesson"),
    game: document.getElementById("screen-game"),
    pretestResult: document.getElementById("screen-pretest-result"),
    reviewCheck: document.getElementById("screen-review-check"),
    result: document.getElementById("screen-result")
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------------- หน้าเปิด ---------------- */
  function initStart() {
    setMascot(document.getElementById("mascot-start"), "idle");
    document.getElementById("btn-start").addEventListener("click", () => {
      pulseMascot(document.getElementById("mascot-start"), "jump");
      setTimeout(() => {
        showScreen("onboarding");
        setMascot(document.getElementById("mascot-start"), "idle");
        setMascot(document.getElementById("mascot-onboarding"), "idle");
      }, 350);
    });
  }

  /* ---------------- หน้าเข้าสู่ระบบ (ชื่อเล่น + รหัส) ---------------- */
  function initOnboarding() {
    const nickInput = document.getElementById("input-nickname");
    const codeInput = document.getElementById("input-code");
    const tabNew = document.getElementById("tab-new-code");
    const tabOld = document.getElementById("tab-old-code");
    const panelOld = document.getElementById("panel-old-code");
    const startBtn = document.getElementById("btn-onboard-start");
    const hint = document.getElementById("onboard-hint");
    const modeNote = document.getElementById("onboard-mode-note");

    let mode = "new";

    modeNote.textContent = DataService.getMode() === "cloud"
      ? "☁️ เชื่อมต่อ Firebase แล้ว — บันทึกความคืบหน้าไว้ใช้ข้ามอุปกรณ์ได้"
      : "💾 ยังไม่ได้ตั้งค่า Firebase — บันทึกความคืบหน้าไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น";

    function switchTab(next) {
      mode = next;
      tabNew.classList.toggle("is-active", mode === "new");
      tabOld.classList.toggle("is-active", mode === "old");
      tabNew.setAttribute("aria-selected", String(mode === "new"));
      tabOld.setAttribute("aria-selected", String(mode === "old"));
      panelOld.classList.toggle("is-hidden", mode !== "old");
      validate();
    }
    tabNew.addEventListener("click", () => switchTab("new"));
    tabOld.addEventListener("click", () => switchTab("old"));

    function validate() {
      const nickOk = nickInput.value.trim().length > 0;
      const codeOk = mode === "new" || codeInput.value.trim().length >= 4;
      const ok = nickOk && codeOk;
      startBtn.disabled = !ok;
      startBtn.setAttribute("aria-disabled", String(!ok));
      hint.textContent = "🔒 กรอกข้อมูลให้ครบก่อนนะ 67 รออยู่!";
      hint.classList.toggle("is-hidden", ok);
      return ok;
    }
    nickInput.addEventListener("input", validate);
    codeInput.addEventListener("input", validate);
    validate();

    startBtn.addEventListener("click", async () => {
      if (!validate()) return;
      startBtn.disabled = true;
      const nickname = nickInput.value.trim();
      try {
        if (mode === "new") {
          const { code, profile } = await DataService.createUser(nickname);
          currentUser = { code, profile };
          window.alert(`จำรหัสของเราไว้นะ: ${code}\n(ใช้รหัสนี้เพื่อกลับมาเล่นต่อในครั้งถัดไปได้)`);
        } else {
          const code = codeInput.value.trim().toUpperCase();
          const profile = await DataService.loadUser(code);
          if (!profile) {
            hint.textContent = "❌ ไม่พบรหัสนี้นะ ลองตรวจสอบอีกครั้ง";
            hint.classList.remove("is-hidden");
            startBtn.disabled = false;
            return;
          }
          currentUser = { code, profile };
        }
        showScreen("lessons");
        renderLessonGrid();
      } catch (e) {
        hint.textContent = "⚠️ เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะ";
        hint.classList.remove("is-hidden");
        startBtn.disabled = false;
      }
    });
  }

  document.getElementById("btn-logout").addEventListener("click", () => {
    currentUser = null;
    document.getElementById("input-nickname").value = "";
    document.getElementById("input-code").value = "";
    showScreen("onboarding");
  });

  /* ---------------- หน้ารวมบทเรียน ---------------- */
  function renderLessonGrid() {
    setMascot(document.getElementById("mascot-lessons-mini"), "idle");
    document.getElementById("account-bar-text").textContent = currentUser
      ? `👋 ${currentUser.profile.nickname} · รหัส: ${currentUser.code}`
      : "";

    const grid = document.getElementById("lesson-grid");
    grid.innerHTML = "";
    const profile = currentUser ? currentUser.profile : { unlockedUpTo: 1, lessons: {} };
    const lessonsMap = profile.lessons || {};

    LESSONS.forEach((lesson, idx) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.setAttribute("role", "listitem");

      // บทที่ยังไม่มีวิดีโอ/คำถามจริง — แสดง "เร็วๆ นี้" เสมอ ไม่ว่าจะปลดล็อกลำดับถึงหรือยัง
      if (!lesson.hasContent) {
        card.classList.add("is-locked");
        card.setAttribute("aria-disabled", "true");
        card.setAttribute("aria-label", `${lesson.chapterTitle} — เร็วๆ นี้ ยังเปิดใช้งานไม่ได้`);
        card.innerHTML = `
          <span class="lesson-card__badge lesson-card__badge--soon">🔒 เร็วๆ นี้</span>
          ${lessonArt(lesson.icon || "📘")}
          <h3 class="lesson-card__title">${lesson.chapterTitle}</h3>
          <p class="lesson-card__desc">${lesson.topic}</p>
        `;
        grid.appendChild(card);
        return;
      }

      const lessonProgress = lessonsMap[lesson.id];
      const passed = !!(lessonProgress && lessonProgress.passed);
      const unlocked = lesson.id <= (profile.unlockedUpTo || 1);
      const statusBadge = passed ? "✅ ผ่านแล้ว" : (unlocked ? "🔓 เริ่มได้" : "🔒 ยังไม่ปลดล็อก");

      card.innerHTML = `
        <span class="lesson-card__badge">${lesson.difficultyIcon} ${lesson.difficultyLabel}</span>
        ${lessonArt(lesson.icon || "📘")}
        <h3 class="lesson-card__title">${lesson.chapterTitle}</h3>
        <p class="lesson-card__desc">${lesson.topic}</p>
        <span class="lesson-card__status">${statusBadge}</span>
      `;

      if (!unlocked) {
        card.classList.add("is-locked");
        card.setAttribute("aria-disabled", "true");
        card.setAttribute("aria-label", `${lesson.chapterTitle} — ยังไม่ปลดล็อก ต้องผ่านบทก่อนหน้าก่อน`);
      } else if (passed) {
        // ผ่านแล้ว: ให้เลือก "เริ่มเรียนใหม่" หรือ "ทำแบบทดสอบเลย" (ไม่บังคับดูวิดีโอซ้ำ)
        const actions = document.createElement("div");
        actions.className = "lesson-card__actions";

        const btnRestart = document.createElement("button");
        btnRestart.type = "button";
        btnRestart.className = "btn btn--secondary lesson-card__mini-btn";
        btnRestart.textContent = "เริ่มเรียนใหม่";
        btnRestart.addEventListener("click", () => startCourse(idx, { resumeFromTest: false }));

        const btnTestOnly = document.createElement("button");
        btnTestOnly.type = "button";
        btnTestOnly.className = "btn btn--primary lesson-card__mini-btn";
        btnTestOnly.textContent = "ทำแบบทดสอบเลย";
        btnTestOnly.addEventListener("click", () => startCourse(idx, { resumeFromTest: true }));

        actions.appendChild(btnRestart);
        actions.appendChild(btnTestOnly);
        card.appendChild(actions);
      } else {
        card.classList.add("is-clickable");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `${lesson.chapterTitle} — ${lesson.topic} — เริ่มได้`);
        card.addEventListener("click", () => startCourse(idx, { resumeFromTest: false }));
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startCourse(idx, { resumeFromTest: false }); }
        });
      }

      grid.appendChild(card);
    });
  }

  document.getElementById("btn-home").addEventListener("click", () => showScreen("start"));

  /* =========================================================
     Course Flow: Pre-test → สรุปคะแนนก่อนเรียน → วิดีโอ → ใบงาน 3 ข้อ
     → ตรวจทานคำตอบ → Post-test → บันทึกผล → ปลดล็อกบทถัดไป
     ========================================================= */

  function startCourse(idx, opts = {}) {
    currentLessonIndex = idx;
    courseCtx = { lesson: LESSONS[idx] };
    if (opts.resumeFromTest) {
      startPostTestPhase(); // "ทำแบบทดสอบเลย" — ข้ามวิดีโอ ไปหลังเรียนตรงๆ
    } else {
      startPretestPhase();
    }
  }

  /** เอนจินมินิเกม/แบบทดสอบกลาง — ใช้ซ้ำสำหรับ Pre-test, ใบงาน, Post-test ทั้งหมด */
  function runQuiz(questions, headingText, onComplete) {
    document.getElementById("game-title").textContent = headingText;
    showScreen("game");
    const els = {
      stage: document.getElementById("game-stage"),
      hudQuestion: document.getElementById("hud-question"),
      hudScore: document.getElementById("hud-score"),
      toast: document.getElementById("feedback-toast")
    };
    const pseudoLesson = { game: { type: "quiz", instruction: "", questions } };
    Games.start(pseudoLesson, els, {
      onMascot: () => {},
      onComplete: (session) => onComplete(session)
    });
  }

  document.getElementById("btn-back-to-lessons-2").addEventListener("click", () => {
    YouTubeLesson.destroy();
    showScreen("lessons");
    renderLessonGrid();
  });

  /* ---------- ขั้นที่ 1-2: Pre-test + สรุปคะแนนก่อนเรียน ---------- */
  function startPretestPhase() {
    runQuiz(courseCtx.lesson.preTest, `แบบทดสอบก่อนเรียน: ${courseCtx.lesson.chapterTitle}`, onPretestComplete);
  }

  function onPretestComplete(session) {
    document.getElementById("pretest-result-score").textContent = `ได้ ${session.correct} จาก ${session.total} ข้อ ⭐`;
    setMascot(document.getElementById("mascot-pretest-result"), "celebrate");
    showScreen("pretestResult");
  }

  document.getElementById("btn-pretest-continue").addEventListener("click", () => {
    openLesson(currentLessonIndex); // แสดงขั้นที่ 3: วิดีโอ (Reuse ระบบวิดีโอเดิม)
  });

  /* ---------- ขั้นที่ 3: เนื้อหาการสอน / วิดีโอ (Reuse ระบบเดิมทั้งหมด) ---------- */
  function openLesson(idx) {
    currentLessonIndex = idx;
    const lesson = LESSONS[idx];
    const slidesMode = document.getElementById("slides-mode");
    const videoMode = document.getElementById("video-mode");
    const slideDotsWrap = document.getElementById("slide-dots");

    const goPlayBtn = document.getElementById("btn-go-play");
    const nextBtn = document.getElementById("btn-slide-next");
    goPlayBtn.classList.add("is-hidden");
    goPlayBtn.disabled = true;
    goPlayBtn.setAttribute("aria-disabled", "true");
    goPlayBtn.classList.remove("is-unlocked");
    goPlayBtn.textContent = "";
    goPlayBtn.innerHTML = 'ไปทำใบงานกันเลย! <span class="btn__icon">📝</span>';

    document.getElementById("lesson-title").textContent = lesson.chapterTitle;
    slidesMode.classList.add("is-hidden");
    videoMode.classList.remove("is-hidden");
    slideDotsWrap.innerHTML = "";
    nextBtn.classList.add("is-hidden");
    renderVideoLesson(lesson);
    showScreen("lesson");
  }

  function renderVideoLesson(lesson) {
    YouTubeLesson.destroy();

    document.getElementById("video-mission-title").textContent = lesson.topic;
    document.getElementById("video-difficulty-tag").textContent = `${lesson.difficultyIcon} ${lesson.difficultyLabel}`;
    document.getElementById("video-description-text").textContent = "ดูวิดีโอให้จบก่อนนะ แล้วไปทำใบงานทบทวนกัน!";
    document.getElementById("video-credit-text").textContent = lesson.imageCredit || "";

    const titleEl = document.getElementById("video-title-text");
    titleEl.textContent = lesson.videoTitle || "";

    YouTubeLesson.fetchTitle(lesson.videoUrl).then(realTitle => {
      if (realTitle) {
        lesson.videoTitle = realTitle;
        titleEl.textContent = realTitle;
      }
    });

    const thumbs = YouTubeLesson.thumbnailUrls(lesson.videoId);
    const coverImg = document.getElementById("video-cover-img");
    coverImg.src = thumbs.max;
    coverImg.onerror = () => {
      coverImg.onerror = () => { coverImg.onerror = null; coverImg.src = thumbs.standard; };
      coverImg.src = thumbs.high;
    };

    const cover = document.getElementById("video-cover");
    const playerSlot = document.getElementById("video-player-slot");
    const controls = document.getElementById("video-controls");
    const coverPlayBtn = document.getElementById("video-cover-play");
    const playPauseBtn = document.getElementById("btn-video-playpause");
    const lockedEl = document.getElementById("video-status-locked");
    const doneEl = document.getElementById("video-status-done");

    cover.classList.remove("is-hidden");
    playerSlot.classList.add("is-hidden");
    controls.classList.add("is-hidden");
    lockedEl.classList.remove("is-hidden");
    doneEl.classList.add("is-hidden");

    const startPlayback = () => {
      cover.classList.add("is-hidden");
      playerSlot.classList.remove("is-hidden");
      controls.classList.remove("is-hidden");

      YouTubeLesson.mount("yt-player", lesson.videoId, {
        onReady: () => YouTubeLesson.play(),
        onStateChange: (state) => {
          playPauseBtn.textContent = state === 1 ? "⏸" : "▶";
        },
        onComplete: () => {
          lockedEl.classList.add("is-hidden");
          doneEl.classList.remove("is-hidden");
          goPlayReady();
        }
      });
    };

    coverPlayBtn.onclick = () => {
      coverPlayBtn.onclick = null;
      startPlayback();
    };

    playPauseBtn.onclick = () => {
      if (playPauseBtn.textContent === "▶") {
        YouTubeLesson.play();
      } else {
        YouTubeLesson.pause();
      }
    };
  }

  function goPlayReady() {
    const goPlayBtn = document.getElementById("btn-go-play");
    goPlayBtn.disabled = false;
    goPlayBtn.setAttribute("aria-disabled", "false");
    goPlayBtn.classList.remove("is-hidden");
    goPlayBtn.classList.add("is-unlocked");
  }

  document.getElementById("btn-back-to-lessons").addEventListener("click", () => {
    YouTubeLesson.destroy();
    showScreen("lessons");
    renderLessonGrid();
  });

  document.getElementById("btn-go-play").addEventListener("click", () => {
    if (document.getElementById("btn-go-play").disabled) return;
    YouTubeLesson.destroy();
    startReviewPhase(); // ขั้นที่ 4: ใบงานทบทวนความเข้าใจ
  });

  /* ---------- (ระบบสไลด์เดิม — สำรองไว้เผื่อใช้ในอนาคต ไม่ได้ใช้งานแล้วตอนนี้) ---------- */
  function renderDots(count) {
    const dots = document.getElementById("slide-dots");
    dots.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const d = document.createElement("span");
      d.className = "dot";
      dots.appendChild(d);
    }
  }
  function renderSlide() { /* ไม่ได้ใช้งานแล้ว — ทุกบทเป็น course type */ }

  /* ---------- ขั้นที่ 4-5: ใบงานทบทวน (3 ข้อ) + ตรวจทานคำตอบ ---------- */
  function startReviewPhase() {
    runQuiz(courseCtx.lesson.review, "ใบงานทบทวนความเข้าใจ", onReviewComplete);
  }

  function onReviewComplete(session) {
    showReviewCheck(session);
  }

  function showReviewCheck(session) {
    const list = document.getElementById("review-check-list");
    list.innerHTML = "";
    const reviewQs = courseCtx.lesson.review;
    (session.responses || []).forEach((r, i) => {
      const q = reviewQs[i];
      const item = document.createElement("div");
      item.className = "review-check-item " + (r.isCorrect ? "is-correct" : "is-incorrect");
      item.innerHTML = `
        <p class="review-check-item__q">${q.title}: ${q.prompt}</p>
        <p class="review-check-item__chosen">คำตอบที่เลือก: <strong>${r.chosen}</strong> ${r.isCorrect ? "✅" : ""}</p>
        ${!r.isCorrect ? `<p class="review-check-item__correct">คำตอบที่ถูกต้อง: <strong>${r.correctLabel}</strong></p>` : ""}
        ${q.explanation ? `<p class="review-check-item__explain">💡 ${q.explanation}</p>` : ""}
      `;
      list.appendChild(item);
    });
    showScreen("reviewCheck");
  }

  document.getElementById("btn-review-continue").addEventListener("click", () => {
    startPostTestPhase(); // ขั้นที่ 6: Post-test
  });

  /* ---------- ขั้นที่ 6-9: Post-test → บันทึกผล → ปลดล็อกบทถัดไป ---------- */
  function startPostTestPhase() {
    runQuiz(courseCtx.lesson.postTest, `แบบทดสอบหลังเรียน: ${courseCtx.lesson.chapterTitle}`, onPostTestComplete);
  }

  async function onPostTestComplete(session) {
    const lesson = courseCtx.lesson;
    const passed = session.correct >= PASS_SCORE;
    let attempts = 1;

    if (currentUser) {
      const prevResult = (currentUser.profile.lessons || {})[lesson.id];
      attempts = prevResult ? (prevResult.attempts || 0) + 1 : 1;
      const result = { attempts, latestFinalScore: `${session.correct}/${session.total}`, passed };
      try {
        const updatedProfile = await DataService.saveLessonResult(currentUser.code, lesson.id, result);
        if (updatedProfile) currentUser.profile = updatedProfile;
      } catch (e) {
        // บันทึกไม่สำเร็จ (เช่น ออฟไลน์) — ยังคงแสดงผลคะแนนให้เด็กเห็นตามปกติ
      }
    }
    showFinalResult(session, passed, attempts);
  }

  function showFinalResult(session, passed, attempts) {
    const stars = Scoring.starsFor(session);
    document.getElementById("result-score").textContent = session.score;
    document.getElementById("result-correct").textContent = session.correct;
    document.getElementById("result-total").textContent = session.total;

    document.getElementById("result-status-row").classList.remove("is-hidden");
    document.getElementById("result-status").textContent = passed ? "✅ ผ่านแล้ว" : "🔓 ลองใหม่ได้เสมอ";
    document.getElementById("result-attempts-row").classList.remove("is-hidden");
    document.getElementById("result-attempts").textContent = `${attempts} ครั้ง`;

    const starsEl = document.getElementById("result-stars");
    starsEl.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const s = document.createElement("span");
      s.className = "star";
      s.style.animationDelay = `${i * 0.12}s`;
      s.textContent = i < stars ? "⭐" : "☆";
      starsEl.appendChild(s);
    }

    setMascot(document.getElementById("mascot-result"), "celebrate");
    showScreen("result");
    launchConfetti();
  }

  function launchConfetti() {
    const layer = document.getElementById("confetti-layer");
    layer.innerHTML = "";
    const colors = ["#ff6f59", "#ffd35c", "#3fbfa5", "#9b7ede"];
    const count = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 26;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      layer.appendChild(piece);
    }
  }

  document.getElementById("btn-replay").addEventListener("click", () => startPostTestPhase()); // ทำ Post-test ซ้ำ (attempts +1)
  document.getElementById("btn-back-lessons").addEventListener("click", () => {
    showScreen("lessons");
    renderLessonGrid();
  });

  /* ---------------- เริ่มต้นแอป ---------------- */
  function init() {
    initStart();
    initOnboarding();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
