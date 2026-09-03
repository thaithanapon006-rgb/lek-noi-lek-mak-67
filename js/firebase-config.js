/* =========================================================
   Firebase Config — กรอกค่าจากโปรเจกต์ Firebase ของคุณเอง
   -------------------------------------------------------
   วิธีหา: Firebase Console > โปรเจกต์ของคุณ > ⚙️ Project settings
   > เลื่อนลงมาที่ "Your apps" > เลือกแอปแบบ Web (</>) หรือสร้างใหม่
   > คัดลอกค่าจาก firebaseConfig มาแทนที่ด้านล่างนี้

   ตราบใดที่ apiKey ยังเป็นค่า "YOUR_API_KEY" (ค่าเริ่มต้น) เว็บไซต์จะทำงาน
   แบบ "Local Mode" อัตโนมัติ — เก็บข้อมูล Progress ไว้ใน localStorage ของ
   เบราว์เซอร์เครื่องนี้เท่านั้น (ไม่ sync ข้ามอุปกรณ์ แต่ใช้งานได้ครบทุก
   ฟีเจอร์ทันทีโดยไม่ต้องตั้งค่า Firebase ก่อน) เหมาะสำหรับทดสอบระบบ

   เมื่อกรอกค่าจริงแล้ว ให้ตั้งค่า Realtime Database Security Rules ตามที่
   แนะนำไว้ใน README.md (หัวข้อ "การตั้งค่า Firebase") ก่อนใช้งานจริงเสมอ
   ========================================================= */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBASR2DhnBoRUX0Szug8hc1DekxLfC79O0",
  authDomain: "lek-noi-lek-mak-67-39655.firebaseapp.com",
  databaseURL: "https://lek-noi-lek-mak-67-39655-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lek-noi-lek-mak-67-39655",
  storageBucket: "lek-noi-lek-mak-67-39655.firebasestorage.app",
  messagingSenderId: "188927956166",
  appId: "1:188927956166:web:0089020e9413c9c8a7f3c7"
};
