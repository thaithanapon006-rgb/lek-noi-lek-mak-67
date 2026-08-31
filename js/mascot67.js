/* =========================================================
   Mascot67 — ตัวละครหลักของเว็บไซต์ "67"
   Component แยกต่างหาก ไม่ผูกกับระบบหลัก (เรียกใช้จาก app.js เท่านั้น)
   สร้างด้วย SVG ล้วน (ไม่ใช้ไฟล์ภาพ) เพื่อให้ Animation ได้ลื่นไหลและ Responsive

   โครงสร้าง (ตามที่ออกแบบไว้):
   Mascot67
   ├── Head        (หัวกลมใหญ่)
   ├── Cap         (หมวกแก๊ป น้ำเงิน/แดง)
   ├── Face        (Eyes, Eyebrows, Nose, Mouth, Cheeks)
   ├── Body        (ลำตัวกลมป้อม)
   ├── BellyNumber67 (ตัวเลข 67 หน้าท้อง)
   ├── Arms        (แขนสั้น ขยับได้)
   ├── Legs        (ขาสั้น + เท้าเล็ก)
   └── Animation   (ควบคุมผ่านคลาส CSS ใน css/mascot67.css)

   Expression ที่รองรับ: 'idle' | 'greet' | 'cheer-high' | 'cheer-mid' | 'cheer-low'
   ทุก Expression เป็นบวกเสมอ — ไม่มีสีหน้าเสียใจ/โกรธ/ผิดหวัง
   ========================================================= */

const Mascot67 = (() => {

  /** สร้างปาก ตามอารมณ์ (ยิ้มเสมอ ต่างกันแค่ระดับความกว้าง/ความตื่นเต้น) */
  function mouthPath(expression) {
    switch (expression) {
      case "cheer-high":
        // ยิ้มกว้างแบบเปิดปาก (ตื่นเต้นดีใจมาก)
        return `<path d="M96 108 Q120 128 144 108 Q120 122 96 108 Z" fill="#241c33"/>
                <path d="M104 112 Q120 118 136 112" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85"/>`;
      case "cheer-mid":
        return `<path d="M92 106 Q120 124 148 106" stroke="#241c33" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      case "greet":
        return `<path d="M94 106 Q120 121 146 106" stroke="#241c33" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      case "cheer-low":
        // ยังคงยิ้มอยู่เสมอ แค่เนิบนวลกว่า ให้ความรู้สึกอบอุ่นให้กำลังใจ
        return `<path d="M96 108 Q120 118 144 108" stroke="#241c33" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      default: // idle — ยิ้มกวนๆ นิดหน่อย
        return `<path d="M96 108 Q120 116 144 108 Q122 120 96 108 Z" fill="none" stroke="#241c33" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }

  /** ตา — ตาเป็นประกายพิเศษตอนดีใจมาก (cheer-high) */
  function eyeGroup(cx, cy, expression) {
    const sparkle = expression === "cheer-high"
      ? `<circle cx="${cx - 5}" cy="${cy - 5}" r="3" fill="#fff"/><circle cx="${cx + 4}" cy="${cy + 2}" r="1.6" fill="#fff"/>`
      : `<circle cx="${cx - 4}" cy="${cy - 4}" r="2.4" fill="#fff"/>`;
    return `
      <g class="m67-eye" style="transform-origin:${cx}px ${cy}px;">
        <circle cx="${cx}" cy="${cy}" r="13" fill="#fff" stroke="#e2952e" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy + 2}" r="7.5" fill="#241c33"/>
        ${sparkle}
      </g>`;
  }

  /** อารมณ์คิ้ว: กวนๆ นิดหน่อยตอน idle, โก่งขึ้นตื่นเต้นตอน cheer-high */
  function eyebrowPaths(expression) {
    if (expression === "cheer-high") {
      return `<path d="M83 68 Q98 58 112 66" stroke="#241c33" stroke-width="4" fill="none" stroke-linecap="round"/>
              <path d="M128 66 Q142 58 157 68" stroke="#241c33" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    }
    return `<path d="M85 70 Q98 64 111 70" stroke="#241c33" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M129 70 Q142 64 155 70" stroke="#241c33" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }

  /** สร้าง SVG ทั้งตัวของ 67 ตาม Expression ที่กำหนด */
  function svg(expression = "idle") {
    const bodyAnim = {
      idle: "m67-sway",
      greet: "m67-sway",
      "cheer-high": "m67-sway m67-jump",
      "cheer-mid": "m67-sway m67-nod",
      "cheer-low": "m67-sway"
    }[expression] || "m67-sway";

    const leftArmAnim = (expression === "cheer-high") ? "m67-arm-up-both-left" : "m67-arm-rest";
    const rightArmAnim = {
      "cheer-high": "m67-arm-up-both-right",
      "cheer-mid": "m67-arm-up-one",
      "greet": "m67-arm-wave",
      "cheer-low": "m67-arm-wave-slow"
    }[expression] || "m67-arm-rest";

    const sparkles = (expression === "cheer-high") ? `
      <text class="m67-sparkle m67-sparkle--1" x="34" y="70" font-size="22">✦</text>
      <text class="m67-sparkle m67-sparkle--2" x="200" y="90" font-size="16">✦</text>
      <text class="m67-sparkle m67-sparkle--3" x="60" y="230" font-size="14">✦</text>
      <text class="m67-sparkle m67-sparkle--4" x="180" y="220" font-size="18">✦</text>
    ` : "";

    return `
    <svg class="m67-root" viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ตัวละคร 67 มาสคอตประจำเว็บไซต์">
      <defs>
        <linearGradient id="m67HeadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff6c9"/>
          <stop offset="55%" stop-color="#ffd35c"/>
          <stop offset="100%" stop-color="#f2a93f"/>
        </linearGradient>
        <linearGradient id="m67BodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe08a"/>
          <stop offset="100%" stop-color="#f2b93f"/>
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="284" rx="66" ry="9" fill="rgba(43,33,69,0.10)"/>
      ${sparkles}

      <g class="${bodyAnim}" style="transform-origin:120px 200px;">

        <!-- ขาสั้น + เท้าเล็ก -->
        <rect x="93" y="228" width="24" height="38" rx="12" fill="#f2b93f"/>
        <rect x="123" y="228" width="24" height="38" rx="12" fill="#f2b93f"/>
        <ellipse cx="105" cy="270" rx="18" ry="9" fill="#e2952e"/>
        <ellipse cx="135" cy="270" rx="18" ry="9" fill="#e2952e"/>

        <!-- แขนซ้าย (สั้น ป้อม ขยับได้) -->
        <g class="m67-arm ${leftArmAnim}" style="transform-origin:64px 172px;">
          <ellipse cx="50" cy="196" rx="15" ry="34" fill="#ffd35c" stroke="#e2952e" stroke-width="2"/>
          <circle cx="46" cy="222" r="13" fill="#ffd35c" stroke="#e2952e" stroke-width="2"/>
        </g>

        <!-- ลำตัวกลมป้อม -->
        <ellipse cx="120" cy="195" rx="64" ry="60" fill="url(#m67BodyGrad)" stroke="#e2952e" stroke-width="2.5"/>

        <!-- เลข 67 หน้าท้อง -->
        <text x="120" y="208" text-anchor="middle" font-family="Kanit, sans-serif" font-weight="800" font-size="34" fill="#241c33">67</text>

        <!-- แขนขวา (สั้น ป้อม ขยับได้ — โบก/ชูมือ) -->
        <g class="m67-arm ${rightArmAnim}" style="transform-origin:176px 172px;">
          <ellipse cx="190" cy="196" rx="15" ry="34" fill="#ffd35c" stroke="#e2952e" stroke-width="2"/>
          <circle cx="194" cy="222" r="13" fill="#ffd35c" stroke="#e2952e" stroke-width="2"/>
        </g>

        <!-- หัวกลมใหญ่ -->
        <circle cx="120" cy="90" r="66" fill="url(#m67HeadGrad)" stroke="#e2952e" stroke-width="2.5"/>

        <!-- แก้มเล็กน้อย -->
        <ellipse cx="80" cy="100" rx="10" ry="7" fill="#ff9f8f" opacity="0.65"/>
        <ellipse cx="160" cy="100" rx="10" ry="7" fill="#ff9f8f" opacity="0.65"/>

        <!-- คิ้วเล็ก -->
        ${eyebrowPaths(expression)}

        <!-- ตากลมทั้งสองข้าง -->
        ${eyeGroup(98, 90, expression)}
        ${eyeGroup(142, 90, expression)}

        <!-- จมูกเล็ก -->
        <circle cx="120" cy="98" r="2.4" fill="#e2952e"/>

        <!-- ปากยิ้ม (เปลี่ยนตามอารมณ์ แต่เป็นบวกเสมอ) -->
        ${mouthPath(expression)}

        <!-- หมวกแก๊ป น้ำเงิน/แดง (ไม่บังหน้า) -->
        <g transform="rotate(-6 120 40)">
          <path d="M62 52 Q120 6 178 52 Q178 40 120 30 Q62 40 62 52 Z" fill="#3f7fd1" stroke="#2f63ac" stroke-width="2"/>
          <path d="M56 52 Q120 34 184 52 Q184 60 120 66 Q56 60 56 52 Z" fill="#ff6f59" stroke="#e85a45" stroke-width="2"/>
          <circle cx="120" cy="18" r="6" fill="#ff6f59" stroke="#e85a45" stroke-width="1.5"/>
        </g>
      </g>
    </svg>`;
  }

  /** วาดตัวละครลงใน container ทันที (ไม่มี Animation transition ระหว่างเปลี่ยน expression) */
  function mount(container, expression = "idle") {
    if (!container) return;
    container.innerHTML = svg(expression);
  }

  /** แสดง Expression ชั่วคราวสำหรับ interaction (เช่น กด "เริ่มเล่น") แล้วกลับสู่ idle อัตโนมัติ */
  function trigger(container, expression, durationMs = 1400) {
    if (!container) return;
    mount(container, expression);
    clearTimeout(container.__m67Timer);
    container.__m67Timer = setTimeout(() => {
      mount(container, "idle");
    }, durationMs);
  }

  /** เล่น Greeting Animation (โบกมือ) หลังจากโหลดหน้าเปิดสักครู่ */
  function scheduleGreeting(container, delayMs = 1200) {
    if (!container) return;
    clearTimeout(container.__m67GreetTimer);
    container.__m67GreetTimer = setTimeout(() => {
      trigger(container, "greet", 2000);
    }, delayMs);
  }

  /** แปลงจำนวนดาว (จากระบบคะแนนเดิม) เป็น Reaction ที่เป็นบวกเสมอ */
  function celebrateFromStars(container, stars) {
    let expression;
    if (stars >= 3) expression = "cheer-high";
    else if (stars === 2) expression = "cheer-mid";
    else expression = "cheer-low"; // แม้ 0-1 ดาว ก็ยังคงเป็น Reaction เชิงบวก ไม่มีท่าทางผิดหวัง
    mount(container, expression);
    return expression;
  }

  /** ข้อความให้กำลังใจ — สุ่มจากชุดคำเชิงบวกเท่านั้น ไม่มีคำตำหนิ/ทำให้รู้สึกผิด */
  const MESSAGES = {
    "cheer-high": ["เก่งมาก!", "สุดยอดเลย!", "67 ภูมิใจในตัวเรานะ!"],
    "cheer-mid": ["ทำได้ดีมาก!", "เยี่ยมไปเลย!", "พร้อมไปบทต่อไปกันไหม?"],
    "cheer-low": ["ลองอีกครั้งก็ได้นะ!", "67 อยู่ตรงนี้เป็นเพื่อนเสมอ!", "ทำได้ดีแล้วนะ ลองใหม่อีกทีสิ!"]
  };
  function messageFor(expression) {
    const pool = MESSAGES[expression] || MESSAGES["cheer-mid"];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  return { svg, mount, trigger, scheduleGreeting, celebrateFromStars, messageFor };
})();
