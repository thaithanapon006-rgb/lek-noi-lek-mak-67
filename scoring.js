/* =========================================================
   ระบบคะแนน — คำนวณในหน่วยความจำของเบราว์เซอร์เท่านั้น
   ไม่มีการบันทึกถาวร ไม่มีการส่งข้อมูลออกจากเครื่อง
   ========================================================= */

const Scoring = {
  POINTS_PER_CORRECT: 10,

  /** สร้าง session คะแนนใหม่สำหรับการเล่นหนึ่งรอบ */
  createSession() {
    return { correct: 0, total: 0, score: 0 };
  },

  /** บันทึกผลของหนึ่งข้อ แล้วคืนค่า session ที่อัปเดตแล้ว */
  recordAnswer(session, isCorrect) {
    session.total += 1;
    if (isCorrect) {
      session.correct += 1;
      session.score += this.POINTS_PER_CORRECT;
    }
    return session;
  },

  /** แปลงสัดส่วนถูก → จำนวนดาว (1-3) */
  starsFor(session) {
    if (session.total === 0) return 0;
    const ratio = session.correct / session.total;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.6) return 2;
    return 1;
  }
};
