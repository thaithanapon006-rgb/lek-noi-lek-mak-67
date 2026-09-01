/* =========================================================
   ระบบบทเรียน — ข้อมูลทั้งหมดอยู่ที่นี่ที่เดียว
   โครงสร้างใหม่: type "course" — บทที่มีครบ Pre-test → วิดีโอ →
   ใบงานทบทวน → ตรวจทาน → Post-test → บันทึกผล → ปลดล็อกบทถัดไป
   (ระบบเดียวใช้ได้กับทุกบท ไม่ต้องเขียน Logic แยก 6 ชุด)
   ========================================================= */

/** เกณฑ์ผ่านบท (คะแนน Post-test ต้องได้อย่างน้อยเท่านี้จาก 10 ข้อ)
 *  แยกเป็นตัวแปร Config เดียว เพื่อเปลี่ยนเกณฑ์ได้ในที่เดียว */
const PASS_SCORE = 6; // จาก 10 ข้อ (60%) — ปรับได้ตรงนี้จุดเดียว

/**
 * โครงสร้างของบทแบบ "course" (มาตรฐานใหม่ ใช้กับทุกบท)
 * id             : เลขบท (unique, ใช้เป็นลำดับการปลดล็อกด้วย)
 * type           : "course"
 * chapterTitle   : เช่น "บทที่ 1: ตะลุยเมืองจำนวน"
 * topic          : หัวข้อย่อย เช่น "การนับ ปริมาณ และการเปรียบเทียบ"
 * difficultyIcon / difficultyLabel : ระดับความยาก
 * hasContent     : true เมื่อมี videoUrl + คำถามครบแล้วเท่านั้น
 *                  false = ยังไม่มีข้อมูลจริง ต้องแสดง "เร็วๆ นี้" เสมอ
 *                  (ไม่ขึ้นกับว่าผ่านบทก่อนหน้าหรือยัง ตามข้อกำหนด)
 * videoUrl/videoId/videoTitle/imageCredit : เหมือนระบบเดิม
 * preTest        : คำถาม 10 ข้อ (ใช้ระบบ quiz เดิม)
 * review         : คำถามทบทวน 3 ข้อ (ใช้ระบบ quiz เดิม) แต่ละข้อมี explanation
 * postTest       : ต้องเป็นชุดเดียวกับ preTest เป๊ะๆ (อ้างอิงตัวแปรเดียวกัน
 *                  ไม่พิมพ์ซ้ำ เพื่อไม่ให้เผลอทำให้ข้อมูลเพี้ยนไปจากกัน)
 */

/* ---------- บทที่ 1: ตะลุยเมืองจำนวน (มีข้อมูลครบ — เปิดใช้งานได้) ---------- */
const LESSON1_TEST_QUESTIONS = [
  {
    title: "ข้อ 1", prompt: "มีลูกบอล 5 ลูก และเพิ่มอีก 1 ลูก มีลูกบอลทั้งหมดกี่ลูก?",
    options: [{ label: "ก. 4" }, { label: "ข. 5" }, { label: "ค. 6", correct: true }, { label: "ง. 7" }]
  },
  {
    title: "ข้อ 2", prompt: "จำนวนใดมากกว่า 7?",
    options: [{ label: "ก. 5" }, { label: "ข. 6" }, { label: "ค. 7" }, { label: "ง. 9", correct: true }]
  },
  {
    title: "ข้อ 3", prompt: "เติมเครื่องหมายให้ถูกต้อง: 8 ___ 5",
    options: [{ label: "ก. <" }, { label: "ข. >", correct: true }, { label: "ค. =" }, { label: "ง. +" }]
  },
  {
    title: "ข้อ 4", prompt: "จำนวนใดน้อยกว่า 6?",
    options: [{ label: "ก. 8" }, { label: "ข. 7" }, { label: "ค. 6" }, { label: "ง. 4", correct: true }]
  },
  {
    title: "ข้อ 5", prompt: "เติมเครื่องหมายให้ถูกต้อง: 9 ___ 9",
    options: [{ label: "ก. <" }, { label: "ข. >" }, { label: "ค. =", correct: true }, { label: "ง. +" }]
  },
  {
    title: "ข้อ 6", prompt: "นับต่อจาก 12 อีก 1 จำนวน คืออะไร?",
    options: [{ label: "ก. 11" }, { label: "ข. 12" }, { label: "ค. 13", correct: true }, { label: "ง. 14" }]
  },
  {
    title: "ข้อ 7", prompt: "มีแอปเปิล 10 ผล กับส้ม 8 ผล สิ่งใดมีจำนวนมากกว่า?",
    options: [{ label: "ก. แอปเปิล", correct: true }, { label: "ข. ส้ม" }, { label: "ค. เท่ากัน" }, { label: "ง. ไม่มีข้อถูก" }]
  },
  {
    title: "ข้อ 8", prompt: "จำนวนใดมีค่ามากที่สุด?",
    options: [{ label: "ก. 3" }, { label: "ข. 9", correct: true }, { label: "ค. 6" }, { label: "ง. 5" }]
  },
  {
    title: "ข้อ 9", prompt: "เติมเครื่องหมายให้ถูกต้อง: 4 ___ 10",
    options: [{ label: "ก. <", correct: true }, { label: "ข. >" }, { label: "ค. =" }, { label: "ง. +" }]
  },
  {
    title: "ข้อ 10", prompt: "มีดาว 7 ดวง และมีพระจันทร์ 7 ดวง จำนวนทั้งสองอย่างเป็นอย่างไร?",
    options: [{ label: "ก. มากกว่า" }, { label: "ข. น้อยกว่า" }, { label: "ค. เท่ากัน", correct: true }, { label: "ง. ต่างกัน 2" }]
  }
];

const LESSON1_REVIEW_QUESTIONS = [
  {
    title: "ข้อ 1", prompt: "เติมเครื่องหมาย: 6 ___ 9",
    options: [{ label: "<", correct: true }, { label: ">" }, { label: "=" }],
    explanation: "6 น้อยกว่า 9 จึงใช้เครื่องหมาย < (น้อยกว่า)"
  },
  {
    title: "ข้อ 2", prompt: "จำนวนใดมากกว่า: 11 หรือ 8",
    options: [{ label: "11", correct: true }, { label: "8" }],
    explanation: "11 มากกว่า 8 เพราะนับได้มากกว่า"
  },
  {
    title: "ข้อ 3", prompt: "นับต่อจาก 15 อีก 1 จำนวน คืออะไร?",
    options: [{ label: "14" }, { label: "16", correct: true }, { label: "17" }],
    explanation: "นับต่อจาก 15 ไปอีกหนึ่งจำนวนคือ 16"
  }
];

/* ---------- บทที่ 2-6: มีชื่อ/หัวข้อ/ระดับความยากแล้ว แต่ยังไม่มีวิดีโอ+คำถามจริง ---------- */
/* ตามข้อกำหนด: ห้ามเปิดใช้งานจนกว่าจะมี YouTube URL และคำถามจริงครบ           */
function lockedCourse(id, chapterTitle, topic, difficultyIcon, difficultyLabel) {
  return {
    id,
    type: "course",
    chapterTitle,
    topic,
    difficultyIcon,
    difficultyLabel,
    hasContent: false, // ยังไม่มี videoUrl/คำถามจริง — ต้องคงเป็น "เร็วๆ นี้" เสมอ
    videoUrl: null,
    videoId: null,
    imageCredit: null,
    preTest: [],
    review: [],
    postTest: []
  };
}

const LESSONS = [
  {
    id: 1,
    type: "course",
    chapterTitle: "บทที่ 1: ตะลุยเมืองจำนวน",
    topic: "การนับ ปริมาณ และการเปรียบเทียบ",
    difficultyIcon: "🟢",
    difficultyLabel: "ง่ายมาก",
    icon: "🔢",
    hasContent: true,
    videoUrl: "https://www.youtube.com/watch?v=f0vfhqyfVyA",
    videoId: "f0vfhqyfVyA",
    videoTitle: "กำลังโหลดชื่อวิดีโอ...",
    imageCredit: "Image Credit: Sheriff Labrador by © BabyBus",
    preTest: LESSON1_TEST_QUESTIONS,
    review: LESSON1_REVIEW_QUESTIONS,
    postTest: LESSON1_TEST_QUESTIONS // ชุดเดียวกับ Pre-test เป๊ะๆ ตามข้อกำหนด (อ้างอิงตัวแปรเดียวกัน ไม่พิมพ์ซ้ำ)
  },
  lockedCourse(2, "บทที่ 2: รวมพลังและแยกพวก", "การบวกและการลบ", "🟢", "ง่าย"),
  lockedCourse(3, "บทที่ 3: ถอดรหัสลับตัวเลข", "แบบรูปและอนุกรม", "🟡", "เริ่มท้าทาย"),
  lockedCourse(4, "บทที่ 4: ชิ้นส่วนที่หายไป", "เศษส่วนและการแบ่งส่วน", "🟠", "ปานกลาง"),
  lockedCourse(5, "บทที่ 5: ปริศนาตัวแปรล่องหน", "สมการจิ๋วและกล่องปริศนา", "🔴", "ยาก"),
  lockedCourse(6, "บทที่ 6: ยอดนักสืบตัวเลข", "โจทย์ปัญหาและการคิดวิเคราะห์", "🟣", "ท้าทายมาก")
];

/* =========================================================
   หมายเหตุ
   -------------------------------------------------------
   1) บทที่ 1 เปลี่ยนจาก "ภารกิจกู้คืนอุโมงค์ปู" เป็น "ตะลุยเมืองจำนวน"
      ตามการยืนยันล่าสุด ใช้วิดีโอใหม่ (f0vfhqyfVyA) และคำถามชุดใหม่ทั้งหมด
      ที่ได้รับมาโดยตรง ไม่มีการแต่งเติมเนื้อหาเอง
   2) บทที่ 2-6 ใส่ชื่อบท/หัวข้อ/ระดับความยากตามที่ได้รับจริง แต่ยังไม่มี
      วิดีโอและคำถาม จึงคง hasContent:false ไว้ — แสดงเป็น "เร็วๆ นี้" เสมอ
      ไม่ว่าจะผ่านบทก่อนหน้าแล้วหรือไม่ก็ตาม เมื่อได้รับ videoUrl + คำถาม
      10 ข้อ + ทบทวน 3 ข้อของบทใด ให้เติมลงใน preTest/review/postTest
      ของบทนั้นแล้วเปลี่ยน hasContent เป็น true
   3) การ์ดทดลอง "worksheet-comparison-1" จากรอบก่อนถูกลบออกแล้ว เพราะ
      บทที่ 1 มีใบงานทบทวนที่แท้จริง (3 ข้อ) รวมอยู่ใน Flow นี้แล้ว
   4) "videoTitle" จะถูกแทนที่ด้วยชื่อจริงจาก YouTube โดยอัตโนมัติทุกครั้ง
      ที่เปิดวิดีโอ (ผ่าน YouTube oEmbed, ดู js/youtube.js)
   ========================================================= */
