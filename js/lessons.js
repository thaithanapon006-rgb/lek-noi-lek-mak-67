/* =========================================================
   ระบบบทเรียน — ข้อมูลทั้งหมดอยู่ที่นี่ที่เดียว
   ต้องการเพิ่มบทที่ 7, 8, 9 ในอนาคต? แค่ push object ใหม่
   เข้าไปใน LESSONS ด้านล่าง ไม่ต้องแก้ไฟล์อื่นเลย
   ========================================================= */

/**
 * โครงสร้างของแต่ละบท
 * id           : เลขบท (unique)
 * title        : ชื่อบท
 * description  : คำอธิบายสั้นๆ (ขึ้นในการ์ด)
 * badge        : ป้ายเล็กๆ บนการ์ด เช่น "ง่าย", "ปานกลาง"
 * icon         : อิโมจิ/สัญลักษณ์ประจำบท ใช้ตกแต่งการ์ดและสไลด์
 * slides       : เนื้อหาสื่อการสอน (อาร์เรย์ของสไลด์) ต้องดูให้ครบก่อนเล่นเกมได้
 * game         : ค่าคอนฟิกมินิเกมของบทนี้
 *   type       : ชนิดเกม ('compare' | 'count' | 'addition' | 'subtraction' | 'order' | 'wordproblem')
 *   questions  : คำถามของเกม (โครงสร้างขึ้นกับ type ดูรายละเอียดใน games.js)
 */
const LESSONS = [
  {
    id: 1,
    title: "เลขไหนมากกว่ากัน",
    description: "มาดูกันว่าเลขไหนมากกว่า",
    badge: "บทที่ 1 · ง่ายมาก",
    icon: "⚖️",
    slides: [
      { visual: "67-wave", text: "สวัสดี! ฉันชื่อ <strong>67</strong> วันนี้เรามาเล่นกับตัวเลขกันนะ" },
      { visual: "compare-56", text: "ดูตัวเลขสองตัวนี้สิ<br><strong>5</strong> กับ <strong>6</strong><br>ตัวไหนใหญ่กว่ากัน?" },
      { visual: "compare-56-answer", text: "ถูกต้อง! <strong>6</strong> มากกว่า <strong>5</strong><br>เพราะนับได้มากกว่านั่นเอง" },
      { visual: "compare-signs", text: "เรามักใช้เครื่องหมาย <strong>&gt;</strong> แปลว่า “มากกว่า”<br>และ <strong>&lt;</strong> แปลว่า “น้อยกว่า”" }
    ],
    game: {
      type: "compare",
      instruction: "แตะตัวเลขที่ <strong>มากกว่า</strong>",
      questions: [
        { a: 3, b: 7 },
        { a: 9, b: 4 },
        { a: 5, b: 8 },
        { a: 12, b: 6 },
        { a: 2, b: 10 }
      ]
    }
  },
  {
    id: 2,
    title: "นับของไปพร้อมกับ 67",
    description: "ลองนับของไปพร้อมกับ 67",
    badge: "บทที่ 2 · ง่าย",
    icon: "🍎",
    slides: [
      { visual: "67-think", text: "มานับสิ่งของกันเถอะ!<br>เรานับทีละหนึ่ง หนึ่ง สอง สาม..." },
      { visual: "count-apples-4", text: "ลองนับแอปเปิลดูสิ<br>🍎🍎🍎🍎<br>มีทั้งหมดกี่ลูก?" },
      { visual: "count-apples-4-answer", text: "เก่งมาก! มี <strong>4</strong> ลูก<br>นับให้ครบทุกชิ้นแล้วค่อยตอบนะ" },
      { visual: "67-encourage", text: "ต่อไปลองนับของหลายๆ แบบดูเลย พร้อมนะ?" }
    ],
    game: {
      type: "count",
      instruction: "นับของในภาพ แล้วแตะจำนวนที่ถูกต้อง",
      questions: [
        { emoji: "⭐", count: 3 },
        { emoji: "🎈", count: 6 },
        { emoji: "🍪", count: 5 },
        { emoji: "🐟", count: 8 },
        { emoji: "🌸", count: 4 }
      ]
    }
  },
  {
    id: 3,
    title: "มารู้จักการบวกกัน",
    description: "มารู้จักการบวกกัน",
    badge: "บทที่ 3 · ปานกลาง",
    icon: "➕",
    slides: [
      { visual: "67-happy", text: "การบวก คือการนำของมารวมกัน แล้วนับใหม่ทั้งหมด" },
      { visual: "add-2-3", text: "มีลูกบอล 🔵🔵 กับอีก 🔵🔵🔵<br><strong>2 + 3</strong> ได้เท่าไร?" },
      { visual: "add-2-3-answer", text: "รวมกันแล้วได้ 🔵🔵🔵🔵🔵<br><strong>2 + 3 = 5</strong>" },
      { visual: "67-think", text: "จำไว้นะ: บวก แปลว่า “รวมกันมากขึ้น” เสมอ" }
    ],
    game: {
      type: "addition",
      instruction: "เลือกคำตอบของโจทย์บวก",
      questions: [
        { a: 2, b: 3 },
        { a: 4, b: 4 },
        { a: 5, b: 6 },
        { a: 7, b: 8 },
        { a: 9, b: 6 }
      ]
    }
  },
  {
    id: 4,
    title: "ลองแก้โจทย์ลบกัน",
    description: "มาลองแก้โจทย์กัน",
    badge: "บทที่ 4 · ปานกลาง",
    icon: "➖",
    slides: [
      { visual: "67-confused", text: "การลบ คือการเอาของ “ออกไป” แล้วนับที่เหลือ" },
      { visual: "sub-5-2", text: "มีลูกโป่ง 🎈🎈🎈🎈🎈 ลอยหายไป 2 ลูก<br><strong>5 − 2</strong> เหลือเท่าไร?" },
      { visual: "sub-5-2-answer", text: "เหลือ 🎈🎈🎈<br><strong>5 − 2 = 3</strong>" },
      { visual: "67-encourage", text: "ลบ แปลว่า “เหลือน้อยลง” จำแบบนี้ไว้นะ" }
    ],
    game: {
      type: "subtraction",
      instruction: "เลือกคำตอบของโจทย์ลบ",
      questions: [
        { a: 5, b: 2 },
        { a: 9, b: 4 },
        { a: 12, b: 5 },
        { a: 15, b: 7 },
        { a: 18, b: 9 }
      ]
    }
  },
  {
    id: 5,
    title: "เรียงเลขให้ถูกช่อง",
    description: "มาเรียงตัวเลขให้เป็นแถวกัน",
    badge: "บทที่ 5 · ค่อนข้างยาก",
    icon: "🔢",
    slides: [
      { visual: "67-think", text: "ตัวเลขเรียงกันได้นะ จากน้อยไปมาก เหมือนบันได!" },
      { visual: "order-demo", text: "ลองดูชุดนี้: 5, 1, 3<br>ถ้าเรียงจากน้อยไปมาก จะได้ 1, 3, 5" },
      { visual: "order-demo-answer", text: "เก่งมาก! นี่คือการ “เรียงลำดับ”<br>เริ่มจากตัวเล็กสุดไปหาตัวใหญ่สุด" },
      { visual: "67-encourage", text: "คราวนี้ลองแตะตัวเลขให้เรียงจากน้อยไปมากดูนะ" }
    ],
    game: {
      type: "order",
      instruction: "แตะตัวเลขเรียงจาก <strong>น้อยไปมาก</strong>",
      questions: [
        { numbers: [4, 1, 3] },
        { numbers: [8, 2, 5, 1] },
        { numbers: [9, 6, 3, 7] },
        { numbers: [10, 2, 6, 4] },
        { numbers: [12, 3, 8, 5] }
      ]
    }
  },
  {
    id: 6,
    title: "โจทย์ปัญหาชวนคิด",
    description: "มาลองแก้โจทย์ปัญหากัน",
    badge: "บทที่ 6 · ท้าทาย",
    icon: "🧩",
    slides: [
      { visual: "67-think", text: "โจทย์ปัญหาคือเรื่องเล่าสั้นๆ ที่ซ่อนการบวกหรือลบไว้" },
      { visual: "word-demo", text: "67 มีดาว 4 ดวง เพื่อนให้มาอีก 3 ดวง<br>67 มีดาวทั้งหมดกี่ดวง?" },
      { visual: "word-demo-answer", text: "อ่านให้ดี แล้วนับ: 4 + 3 = <strong>7</strong> ดวง!" },
      { visual: "67-celebrate", text: "อ่านทีละประโยค คิดเป็นภาพ แล้วจะตอบถูกแน่นอน!" }
    ],
    game: {
      type: "wordproblem",
      instruction: "อ่านโจทย์ แล้วเลือกคำตอบที่ถูกต้อง",
      questions: [
        { text: "67 มีลูกอม 3 เม็ด เพื่อนให้มาอีก 4 เม็ด<br>67 มีลูกอมกี่เม็ด?", a: 3, b: 4, op: "+" },
        { text: "มีนก 8 ตัวเกาะอยู่บนกิ่งไม้ บินหนีไป 3 ตัว<br>เหลือกี่ตัว?", a: 8, b: 3, op: "-" },
        { text: "67 พับดาว 5 ดวง แล้วพับเพิ่มอีก 6 ดวง<br>รวมทั้งหมดกี่ดวง?", a: 5, b: 6, op: "+" },
        { text: "มีลูกโป่ง 12 ลูก แตกไป 5 ลูก<br>เหลือกี่ลูก?", a: 12, b: 5, op: "-" },
        { text: "67 เก็บเปลือกหอย 7 ชิ้น เพื่อนให้อีก 9 ชิ้น<br>รวมกี่ชิ้น?", a: 7, b: 9, op: "+" }
      ]
    }
  }
];
