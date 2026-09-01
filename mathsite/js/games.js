/* =========================================================
   ระบบมินิเกม — แปลงข้อมูลคำถามจาก lessons.js ให้กลายเป็นเกม
   รองรับ 6 รูปแบบ: compare, count, addition, subtraction,
   order, wordproblem
   ========================================================= */

const Games = (() => {

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function makeChoices(correctValue, spread) {
    const set = new Set([correctValue]);
    while (set.size < 4) {
      const delta = Math.floor(Math.random() * spread * 2) - spread;
      const candidate = Math.max(0, correctValue + delta);
      if (candidate !== correctValue) set.add(candidate);
    }
    return shuffle(Array.from(set));
  }

  /* -------- แต่ละชนิดเกม คืนค่า { promptHTML, visualHTML, options } -------- */
  /* options: [{ label, correct }]  ยกเว้น type 'order' ที่ใช้โครงสร้างพิเศษ */

  const builders = {
    compare(q) {
      const correct = Math.max(q.a, q.b);
      const pair = shuffle([q.a, q.b]);
      return {
        visualHTML: `<div class="game-visual">
            <div class="option-btn" style="pointer-events:none;min-width:90px;">${pair[0]}</div>
            <div class="option-btn" style="pointer-events:none;min-width:90px;">${pair[1]}</div>
          </div>`,
        options: pair.map(v => ({ label: String(v), correct: v === correct }))
      };
    },

    count(q) {
      const objects = Array(q.count).fill(`<span class="obj">${q.emoji}</span>`).join("");
      const choices = makeChoices(q.count, 2);
      return {
        visualHTML: `<div class="count-objects">${objects}</div>`,
        options: choices.map(v => ({ label: String(v), correct: v === q.count }))
      };
    },

    addition(q) {
      const sum = q.a + q.b;
      const choices = makeChoices(sum, 3);
      return {
        visualHTML: `<div class="game-visual"><span class="option-btn" style="pointer-events:none;">${q.a} + ${q.b} = ?</span></div>`,
        options: choices.map(v => ({ label: String(v), correct: v === sum }))
      };
    },

    subtraction(q) {
      const diff = q.a - q.b;
      const choices = makeChoices(diff, 3);
      return {
        visualHTML: `<div class="game-visual"><span class="option-btn" style="pointer-events:none;">${q.a} − ${q.b} = ?</span></div>`,
        options: choices.map(v => ({ label: String(v), correct: v === diff }))
      };
    },

    wordproblem(q) {
      const answer = q.op === "+" ? q.a + q.b : q.a - q.b;
      const choices = makeChoices(answer, 3);
      return {
        promptHTML: q.text,
        options: choices.map(v => ({ label: String(v), correct: v === answer }))
      };
    },

    /* คำถามสำเร็จรูปแบบเลือกตอบ (ใช้กับบทที่ 1 — คำถามและคำตอบมาจากผู้ใช้โดยตรง
       ไม่มีการสุ่มหรือสร้างตัวเลือกเพิ่มเติมเอง เก็บลำดับตัวเลือกตามที่กำหนดไว้เป๊ะๆ) */
    quiz(q) {
      return {
        promptHTML: `<span class="quiz-icon">${q.icon || ""}</span><strong class="quiz-title">${q.title || ""}</strong><br>${q.prompt}`,
        options: q.options.map(o => ({ label: o.label, correct: !!o.correct }))
      };
    }
  };

  /* -------- ตัวควบคุมเกมหลัก -------- */
  let state = null;

  function start(lesson, els, callbacks) {
    state = {
      lesson,
      index: 0,
      session: Scoring.createSession(),
      responses: [], // เก็บคำตอบที่เลือกแต่ละข้อ (ใช้กับหน้าตรวจทานคำตอบของ CourseFlow)
      els,
      callbacks
    };
    renderCurrent();
  }

  function updateHud() {
    const { index, lesson, session } = state;
    state.els.hudQuestion.textContent = `ข้อ ${index + 1}/${lesson.game.questions.length}`;
    state.els.hudScore.textContent = `⭐ ${session.score}`;
  }

  function renderCurrent() {
    const { lesson, index } = state;
    const q = lesson.game.questions[index];
    const type = lesson.game.type;
    updateHud();
    state.els.stage.innerHTML = "";

    if (lesson.game.instruction) {
      const instructionEl = document.createElement("div");
      instructionEl.className = "game-prompt";
      instructionEl.innerHTML = lesson.game.instruction;
      state.els.stage.appendChild(instructionEl);
    }

    if (type === "order") {
      renderOrder(q);
      return;
    }

    const built = builders[type](q);
    state.currentOptions = built.options;
    state.currentPrompt = (q.title ? q.title + " — " : "") + (q.prompt || built.promptHTML || "");

    if (built.promptHTML) {
      const p = document.createElement("div");
      p.className = "game-prompt";
      p.innerHTML = built.promptHTML;
      state.els.stage.appendChild(p);
    }
    if (built.visualHTML) {
      const v = document.createElement("div");
      v.innerHTML = built.visualHTML;
      state.els.stage.appendChild(v.firstElementChild);
    }

    const optWrap = document.createElement("div");
    optWrap.className = "game-options";
    built.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.innerHTML = opt.label;
      btn.setAttribute("aria-label", `คำตอบ ${opt.label}`);
      btn.addEventListener("click", () => handleChoiceAnswer(btn, opt.correct, optWrap));
      optWrap.appendChild(btn);
    });
    state.els.stage.appendChild(optWrap);
  }

  function handleChoiceAnswer(btn, isCorrect, optWrap) {
    if (optWrap.dataset.locked === "1") return;
    optWrap.dataset.locked = "1";
    [...optWrap.children].forEach(b => (b.disabled = true));

    const correctOpt = (state.currentOptions || []).find(o => o.correct);
    state.responses.push({
      prompt: state.currentPrompt || "",
      chosen: btn.innerHTML,
      correctLabel: correctOpt ? correctOpt.label : null,
      isCorrect
    });

    if (isCorrect) {
      btn.classList.add("is-correct");
      finishQuestion(true);
    } else {
      btn.classList.add("is-wrong");
      finishQuestion(false);
    }
  }

  function renderOrder(q) {
    const numbers = shuffle(q.numbers);
    const sorted = q.numbers.slice().sort((a, b) => a - b);
    const picked = [];

    const track = document.createElement("div");
    track.className = "order-track";
    sorted.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "slot";
      track.appendChild(slot);
    });
    state.els.stage.appendChild(track);

    const optWrap = document.createElement("div");
    optWrap.className = "game-options";
    numbers.forEach(n => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = n;
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        picked.push(n);
        const slotIndex = picked.length - 1;
        const slot = track.children[slotIndex];
        const expected = sorted[slotIndex];

        if (n === expected) {
          slot.textContent = n;
          slot.classList.add("is-filled");
          btn.disabled = true;
          btn.style.visibility = "hidden";
          if (picked.length === sorted.length) {
            finishQuestion(true);
          }
        } else {
          picked.pop();
          btn.classList.add("is-wrong");
          setTimeout(() => btn.classList.remove("is-wrong"), 350);
          finishQuestion(false, true); // ผิดแต่ให้ลองใหม่ ไม่เปลี่ยนข้อ
        }
      });
      optWrap.appendChild(btn);
    });
    state.els.stage.appendChild(optWrap);
  }

  function showToast(text, good) {
    const toast = state.els.toast;
    toast.textContent = text;
    toast.className = "feedback-toast is-show " + (good ? "is-good" : "is-retry");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      toast.classList.remove("is-show");
    }, 1100);
  }

  function finishQuestion(isCorrect, retryOnly) {
    if (!retryOnly) {
      Scoring.recordAnswer(state.session, isCorrect);
    }
    showToast(
      isCorrect ? pick(["เก่งมาก!", "ถูกต้องนะ!", "ใช่เลย!", "สุดยอด!"]) : pick(["เกือบแล้ว! ลองใหม่นะ", "ลองอีกครั้งนะ"]),
      isCorrect
    );
    state.callbacks.onMascot(isCorrect ? "happy" : "confused");

    if (retryOnly) return; // เกมประเภท order ที่ตอบผิดให้เล่นข้อเดิมต่อ

    updateHud();

    setTimeout(() => {
      state.index += 1;
      if (state.index >= state.lesson.game.questions.length) {
        state.session.responses = state.responses;
        state.callbacks.onComplete(state.session);
      } else {
        renderCurrent();
      }
    }, isCorrect ? 750 : 950);
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  return { start };
})();
