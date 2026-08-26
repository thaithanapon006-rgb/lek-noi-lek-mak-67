/* =========================================================
   แอปหลัก — ควบคุมการเปลี่ยนหน้า, ตัวละคร 67, สไลด์, และผลลัพธ์
   ========================================================= */

const App = (() => {

  /* ---------------- ตัวละคร 67 (SVG) ---------------- */
  function mascotSVG(expression = "idle") {
    // expression: idle | wave | jump | happy | thinking | confused | encourage | celebrate
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
        <!-- แขนซ้าย -->
        <rect x="30" y="100" width="20" height="46" rx="10" fill="#f2b93f" class="mascot-arm-left"/>
        <!-- แขนขวา (โบกได้) -->
        <rect x="150" y="100" width="20" height="46" rx="10" fill="#f2b93f" class="mascot-arm-right"/>
        <!-- ลำตัว -->
        <circle cx="100" cy="105" r="72" fill="#ffd35c" stroke="#f2b93f" stroke-width="4"/>
        <!-- แก้มแดง -->
        <ellipse cx="62" cy="118" rx="10" ry="7" fill="#ff9f8f" opacity="0.7"/>
        <ellipse cx="138" cy="118" rx="10" ry="7" fill="#ff9f8f" opacity="0.7"/>
        <!-- ตา -->
        <g>
          <ellipse class="mascot-eye" cx="78" cy="98" rx="8" ry="10" fill="#3a2b55"/>
          <ellipse class="mascot-eye" cx="122" cy="98" rx="8" ry="10" fill="#3a2b55"/>
        </g>
        ${eyebrow}
        <!-- ปาก -->
        ${mouth}
        <!-- ท้องเลข 67 -->
        <text x="100" y="150" text-anchor="middle" font-family="Kanit, sans-serif" font-weight="700" font-size="28" fill="#ff6f59">67</text>
        <!-- ขา -->
        <ellipse cx="80" cy="176" rx="12" ry="7" fill="#f2b93f"/>
        <ellipse cx="120" cy="176" rx="12" ry="7" fill="#f2b93f"/>
      </g>
    </svg>`;
  }

  /* ---------------- ตัวละคร 67 เวอร์ชันหน้าเปิด ----------------
     สไตล์ "อีโมจิลอยตัว" แบบมีมยุค 2010s: หัวกลมไล่เฉดสีเหลือง
     ตาหรี่ง่วงๆ มือถุงมือลอยทำท่ายักไหล่ รองเท้าผ้าใบลอยไม่มีขา
     เลข 6 อยู่ฝั่งซ้าย เลข 7 อยู่ฝั่งขวา ตามที่ออกแบบไว้ */
  function mascotSVGStart(expression = "idle") {
    const animClass = {
      idle: "anim-idle",
      jump: "anim-jump",
      happy: "anim-happy",
      encourage: "anim-encourage"
    }[expression] || "anim-idle";

    // ปากยิ้มมุมเล็กน้อยแบบไม่ค่อยเต็มใจ ยกเว้นตอนดีใจ/กระโดด ให้ยิ้มกว้างขึ้นนิดหน่อย
    const mouth = (expression === "happy" || expression === "jump")
      ? `<path d="M92 152 Q120 168 148 152" stroke="#2b2145" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<path d="M96 153 Q120 158 144 152" stroke="#2b2145" stroke-width="5" fill="none" stroke-linecap="round"/>`;

    return `
    <svg class="mascot ${animClass}" viewBox="0 0 240 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ตัวละคร 67 หน้าตากวนๆ ยักไหล่ ถือเลข 6 และ 7">
      <defs>
        <linearGradient id="mascotHeadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff6c9"/>
          <stop offset="55%" stop-color="#ffd35c"/>
          <stop offset="100%" stop-color="#f2a93f"/>
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="262" rx="72" ry="8" fill="rgba(43,33,69,0.10)"/>

      <!-- เลข 6 (ซ้าย) / เลข 7 (ขวา) ลอยเหนือมือ -->
      <text x="42" y="82" text-anchor="middle" font-family="Kanit, sans-serif" font-weight="800" font-size="36" fill="#241c33">6</text>
      <text x="198" y="82" text-anchor="middle" font-family="Kanit, sans-serif" font-weight="800" font-size="36" fill="#241c33">7</text>

      <!-- มือถุงมือลอยซ้าย (ยักไหล่ แบมือหงายขึ้น) -->
      <g class="mascot-hand-left" style="transform-origin:42px 150px;">
        <ellipse cx="25" cy="128" rx="9" ry="13" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="42" cy="120" rx="9" ry="14" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="59" cy="128" rx="9" ry="13" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="42" cy="150" rx="26" ry="24" fill="#fff" stroke="#ddd" stroke-width="2"/>
        <ellipse cx="65" cy="156" rx="10" ry="15" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
      </g>

      <!-- มือถุงมือลอยขวา (กระจกสะท้อนของซ้าย) -->
      <g class="mascot-hand-right" style="transform-origin:198px 150px;">
        <ellipse cx="215" cy="128" rx="9" ry="13" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="198" cy="120" rx="9" ry="14" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="181" cy="128" rx="9" ry="13" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <ellipse cx="198" cy="150" rx="26" ry="24" fill="#fff" stroke="#ddd" stroke-width="2"/>
        <ellipse cx="175" cy="156" rx="10" ry="15" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
      </g>

      <!-- รองเท้าผ้าใบลอยซ้าย/ขวา (ไม่มีขา) -->
      <g class="mascot-foot-left" transform="translate(95,210)">
        <rect x="-24" y="-8" width="48" height="14" rx="7" fill="#c2c2c2"/>
        <rect x="-24" y="0" width="48" height="26" rx="10" fill="#d8d8d8" stroke="#bcbcbc" stroke-width="2"/>
        <rect x="-26" y="22" width="52" height="10" rx="5" fill="#ffffff" stroke="#cfcfcf" stroke-width="2"/>
        <circle cx="8" cy="14" r="4.5" fill="#e0453f"/>
        <circle cx="8" cy="14" r="2" fill="#ffffff"/>
      </g>
      <g class="mascot-foot-right" transform="translate(145,210)">
        <rect x="-24" y="-8" width="48" height="14" rx="7" fill="#c2c2c2"/>
        <rect x="-24" y="0" width="48" height="26" rx="10" fill="#d8d8d8" stroke="#bcbcbc" stroke-width="2"/>
        <rect x="-26" y="22" width="52" height="10" rx="5" fill="#ffffff" stroke="#cfcfcf" stroke-width="2"/>
        <circle cx="-8" cy="14" r="4.5" fill="#e0453f"/>
        <circle cx="-8" cy="14" r="2" fill="#ffffff"/>
      </g>

      <!-- หัวทรงกลมไล่เฉดสีเหลือง (ลำตัวหลักของ 67) -->
      <circle cx="120" cy="115" r="88" fill="url(#mascotHeadGrad)" stroke="#e2952e" stroke-width="2.5"/>

      <!-- ตาหรี่ง่วงๆ ทั้งสองข้าง -->
      <g class="mascot-eye" style="transform-origin:88px 108px;">
        <ellipse cx="88" cy="108" rx="15" ry="17" fill="#fff"/>
        <circle cx="88" cy="113" r="7" fill="#241c33"/>
      </g>
      <path d="M73 108 A15 17 0 0 1 103 108 Z" fill="#ffd35c"/>

      <g class="mascot-eye" style="transform-origin:152px 108px;">
        <ellipse cx="152" cy="108" rx="15" ry="17" fill="#fff"/>
        <circle cx="152" cy="113" r="7" fill="#241c33"/>
      </g>
      <path d="M137 108 A15 17 0 0 1 167 108 Z" fill="#ffd35c"/>

      <!-- ปากเรียบเฉยแบบกวนๆ -->
      ${mouth}
    </svg>`;
  }

  function setMascotStart(container, expression) {
    if (!container) return;
    container.innerHTML = mascotSVGStart(expression);
  }

  function pulseMascotStart(container, expression) {
    if (!container) return;
    const svg = container.querySelector("svg.mascot");
    if (!svg) return setMascotStart(container, expression);
    svg.classList.remove("anim-jump", "anim-happy", "anim-encourage");
    void svg.offsetWidth;
    setMascotStart(container, expression);
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
    void svg.offsetWidth; // reflow เพื่อ restart animation
    setMascot(container, expression);
  }

  /* ---------------- ภาพประกอบสไลด์ ---------------- */
  const slideVisuals = {
    "67-wave": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("wave")}</div>`,
    "67-think": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("thinking")}</div>`,
    "67-happy": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("happy")}</div>`,
    "67-confused": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("confused")}</div>`,
    "67-encourage": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("encourage")}</div>`,
    "67-celebrate": () => `<div class="slide-card__visual" style="width:130px;margin:0 auto 14px;">${mascotSVG("celebrate")}</div>`,
    "compare-56": () => emojiRow(["5", "6"], true),
    "compare-56-answer": () => emojiRow(["5", "6 ✓"], true),
    "compare-signs": () => emojiRow(["3 > 1", "1 < 3"], true),
    "count-apples-4": () => emojiRow(["🍎🍎🍎🍎"]),
    "count-apples-4-answer": () => emojiRow(["🍎🍎🍎🍎 = 4"]),
    "add-2-3": () => emojiRow(["🔵🔵 + 🔵🔵🔵"]),
    "add-2-3-answer": () => emojiRow(["🔵🔵🔵🔵🔵 = 5"]),
    "sub-5-2": () => emojiRow(["🎈🎈🎈🎈🎈 − 🎈🎈"]),
    "sub-5-2-answer": () => emojiRow(["🎈🎈🎈 = 3"]),
    "order-demo": () => emojiRow(["5", "1", "3"], true),
    "order-demo-answer": () => emojiRow(["1 → 3 → 5"], true),
    "word-demo": () => emojiRow(["⭐⭐⭐⭐ + ⭐⭐⭐"]),
    "word-demo-answer": () => emojiRow(["⭐×7 = 7"])
  };

  function emojiRow(items, big) {
    const spans = items.map(i => `<span style="font-size:${big ? "28px" : "34px"};font-family:'Kanit',sans-serif;font-weight:700;margin:0 8px;">${i}</span>`).join("");
    return `<div class="slide-card__visual">${spans}</div>`;
  }

  /* ---------------- ไอคอนการ์ดบทเรียน ---------------- */
  function lessonArt(icon) {
    return `<div class="lesson-card__art" style="display:flex;align-items:center;justify-content:center;font-size:56px;">${icon}</div>`;
  }

  /* ---------------- state ของแอป ---------------- */
  let currentLessonIndex = 0;
  let slideIndex = 0;

  /* ---------------- element refs ---------------- */
  const screens = {
    start: document.getElementById("screen-start"),
    lessons: document.getElementById("screen-lessons"),
    lesson: document.getElementById("screen-lesson"),
    game: document.getElementById("screen-game"),
    result: document.getElementById("screen-result")
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------------- หน้าเปิด ---------------- */
  function initStart() {
    setMascotStart(document.getElementById("mascot-start"), "idle");
    document.getElementById("btn-start").addEventListener("click", () => {
      pulseMascotStart(document.getElementById("mascot-start"), "jump");
      setTimeout(() => {
        showScreen("lessons");
        setMascotStart(document.getElementById("mascot-start"), "idle");
      }, 350);
    });
  }

  /* ---------------- หน้ารวมบทเรียน ---------------- */
  function renderLessonGrid() {
    setMascot(document.getElementById("mascot-lessons-mini"), "idle");
    const grid = document.getElementById("lesson-grid");
    grid.innerHTML = "";
    LESSONS.forEach((lesson, idx) => {
      if (lesson.locked) {
        // บทที่ยังไม่เปิดใช้งาน (บทที่ 2-6 ในเวอร์ชันทดสอบนี้) — แสดงเป็นการ์ด "เร็วๆ นี้" กดไม่ได้
        const card = document.createElement("div");
        card.className = "lesson-card is-locked";
        card.setAttribute("role", "listitem");
        card.setAttribute("aria-disabled", "true");
        card.setAttribute("aria-label", `${lesson.title} — เร็วๆ นี้ ยังเปิดใช้งานไม่ได้`);
        card.innerHTML = `
          <span class="lesson-card__badge lesson-card__badge--soon">🔒 เร็วๆ นี้</span>
          ${lessonArt(lesson.icon)}
          <h3 class="lesson-card__title">${lesson.title}</h3>
          <p class="lesson-card__desc">${lesson.description}</p>
        `;
        grid.appendChild(card);
        return;
      }

      const card = document.createElement("button");
      card.className = "lesson-card";
      card.type = "button";
      card.setAttribute("role", "listitem");

      if (lesson.type === "video") {
        card.setAttribute("aria-label", `${lesson.chapterTitle} — ${lesson.difficultyLabel} — ${lesson.missionTitle}`);
        card.innerHTML = `
          <span class="lesson-card__badge">${lesson.chapterTitle} · ${lesson.difficultyIcon} ${lesson.difficultyLabel}</span>
          ${lessonArt(lesson.icon || "🎬")}
          <h3 class="lesson-card__title">${lesson.missionTitle}</h3>
          <p class="lesson-card__desc">${lesson.description}</p>
        `;
      } else {
        card.setAttribute("aria-label", `${lesson.title} — ${lesson.description}`);
        card.innerHTML = `
          <span class="lesson-card__badge">${lesson.badge}</span>
          ${lessonArt(lesson.icon)}
          <h3 class="lesson-card__title">${lesson.title}</h3>
          <p class="lesson-card__desc">${lesson.description}</p>
        `;
      }
      card.addEventListener("click", () => openLesson(idx));
      grid.appendChild(card);
    });
  }

  document.getElementById("btn-home").addEventListener("click", () => showScreen("start"));

  /* ---------------- หน้าบทเรียน / สไลด์ ---------------- */
  function openLesson(idx) {
    currentLessonIndex = idx;
    slideIndex = 0;
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

    if (lesson.type === "video") {
      document.getElementById("lesson-title").textContent = lesson.chapterTitle;
      slidesMode.classList.add("is-hidden");
      videoMode.classList.remove("is-hidden");
      slideDotsWrap.innerHTML = "";
      nextBtn.classList.add("is-hidden");
      renderVideoLesson(lesson);
    } else {
      document.getElementById("lesson-title").textContent = lesson.title;
      videoMode.classList.add("is-hidden");
      slidesMode.classList.remove("is-hidden");
      setMascot(document.getElementById("mascot-lesson"), "idle");
      renderDots(lesson.slides.length);
      renderSlide();
    }
    showScreen("lesson");
  }

  /* ---------------- โหมดวิดีโอ (บทที่ 1) ---------------- */
  function renderVideoLesson(lesson) {
    YouTubeLesson.destroy();

    document.getElementById("video-mission-title").textContent = lesson.missionTitle;
    document.getElementById("video-difficulty-tag").textContent = `${lesson.difficultyIcon} ${lesson.difficultyLabel}`;
    document.getElementById("video-description-text").textContent = lesson.description;
    document.getElementById("video-credit-text").textContent = lesson.imageCredit;

    const titleEl = document.getElementById("video-title-text");
    titleEl.textContent = lesson.videoTitle;

    // ดึงชื่อวิดีโอจริงจาก YouTube มาแสดงแทน (ไม่ใช้ชื่อสมมติ)
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
          // 1 = PLAYING, 2 = PAUSED (ตามค่าคงที่ของ YouTube IFrame API)
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

  function renderDots(count) {
    const dots = document.getElementById("slide-dots");
    dots.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const d = document.createElement("span");
      d.className = "dot";
      d.setAttribute("role", "listitem");
      dots.appendChild(d);
    }
    updateDots();
  }

  function updateDots() {
    const dots = document.getElementById("slide-dots").children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("is-done", i < slideIndex);
      dots[i].classList.toggle("is-current", i === slideIndex);
    }
  }

  function renderSlide() {
    const lesson = LESSONS[currentLessonIndex];
    const slide = lesson.slides[slideIndex];
    const visualFn = slideVisuals[slide.visual];
    const visualHTML = visualFn ? visualFn() : "";
    document.getElementById("slide-content").innerHTML = `${visualHTML}<p>${slide.text}</p>`;
    updateDots();

    const nextBtn = document.getElementById("btn-slide-next");
    const goPlayBtn = document.getElementById("btn-go-play");
    const isLast = slideIndex === lesson.slides.length - 1;

    if (isLast) {
      nextBtn.classList.add("is-hidden");
      goPlayBtn.classList.remove("is-hidden");
      goPlayBtn.disabled = false;
      goPlayBtn.setAttribute("aria-disabled", "false");
      goPlayBtn.classList.add("is-unlocked");
      pulseMascot(document.getElementById("mascot-lesson"), "celebrate");
    } else {
      nextBtn.classList.remove("is-hidden");
      goPlayBtn.classList.add("is-hidden");
    }
  }

  document.getElementById("btn-slide-next").addEventListener("click", () => {
    const lesson = LESSONS[currentLessonIndex];
    if (slideIndex < lesson.slides.length - 1) {
      slideIndex += 1;
      renderSlide();
    }
  });

  document.getElementById("btn-back-to-lessons").addEventListener("click", () => {
    YouTubeLesson.destroy();
    showScreen("lessons");
    renderLessonGrid();
  });
  document.getElementById("btn-back-to-lessons-2").addEventListener("click", () => {
    YouTubeLesson.destroy();
    showScreen("lessons");
    renderLessonGrid();
  });

  document.getElementById("btn-go-play").addEventListener("click", () => {
    if (document.getElementById("btn-go-play").disabled) return;
    YouTubeLesson.destroy();
    openGame(currentLessonIndex);
  });

  /* ---------------- หน้ามินิเกม ---------------- */
  function openGame(idx) {
    const lesson = LESSONS[idx];
    document.getElementById("game-title").textContent = lesson.title;
    showScreen("game");

    const els = {
      stage: document.getElementById("game-stage"),
      hudQuestion: document.getElementById("hud-question"),
      hudScore: document.getElementById("hud-score"),
      toast: document.getElementById("feedback-toast")
    };

    Games.start(lesson, els, {
      onMascot: () => {}, // ตัวละครไม่ได้อยู่ในหน้าเกม เพื่อให้โฟกัสที่คำถาม
      onComplete: (session) => showResult(session)
    });
  }

  /* ---------------- หน้าสรุปผล ---------------- */
  function showResult(session) {
    const stars = Scoring.starsFor(session);
    document.getElementById("result-score").textContent = session.score;
    document.getElementById("result-correct").textContent = session.correct;
    document.getElementById("result-total").textContent = session.total;

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

  document.getElementById("btn-replay").addEventListener("click", () => openGame(currentLessonIndex));
  document.getElementById("btn-back-lessons").addEventListener("click", () => {
    showScreen("lessons");
    renderLessonGrid();
  });

  /* ---------------- เริ่มต้นแอป ---------------- */
  function init() {
    initStart();
    renderLessonGrid();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
