/* =========================================================
   ระบบวิดีโอ YouTube — ควบคุมด้วย YouTube IFrame Player API
   - ซ่อน Controls เดิมของ YouTube ทั้งหมด (ใช้ปุ่ม Play/Pause ของเว็บแทน)
   - ตรวจจับ "ดูจบจริง" จากสถานะ ENDED ของ Player เท่านั้น
     (ไม่ใช่แค่การกด Play หรือเปิดวิดีโอทิ้งไว้)
   - มีระบบกันข้ามเวลา: ถ้าตำแหน่งเล่นกระโดดไปข้างหน้าเกินกว่าที่เคยดูจริง
     จะดึงกลับไปยังจุดที่ดูล่าสุดโดยอัตโนมัติ
   - ไม่มีการบันทึกความคืบหน้าถาวรใดๆ (Refresh แล้วเริ่มดูใหม่ได้ตามที่ออกแบบไว้)
   ========================================================= */

const YouTubeLesson = (() => {
  let player = null;
  let apiPromise = null;
  let maxWatchedTime = 0;
  let pollTimer = null;
  let callbacks = {};

  function loadApi() {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === "function") prevReady();
        resolve();
      };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    });
    return apiPromise;
  }

  async function mount(containerId, videoId, cbs) {
    callbacks = cbs || {};
    maxWatchedTime = 0;
    stopPolling();
    await loadApi();

    if (player) {
      try { player.destroy(); } catch (e) { /* เล่นครั้งแรกยังไม่มี player ให้ทำลาย */ }
      player = null;
    }

    player = new YT.Player(containerId, {
      videoId,
      playerVars: {
        controls: 0,          // ซ่อนแถบควบคุมเดิมของ YouTube ทั้งหมด (รวม Seek Bar)
        disablekb: 1,         // ปิดการควบคุมด้วยคีย์บอร์ด (กันการกดข้าม)
        modestbranding: 1,
        rel: 0,               // ไม่แสดงวิดีโอแนะนำของช่องอื่นตอนจบ
        fs: 0,                // ปิดปุ่มเต็มจอ
        iv_load_policy: 3,
        playsinline: 1
      },
      events: {
        onReady: () => {
          startPolling();
          callbacks.onReady && callbacks.onReady();
        },
        onStateChange: handleStateChange
      }
    });
  }

  function handleStateChange(e) {
    if (!window.YT) return;
    callbacks.onStateChange && callbacks.onStateChange(e.data);
    if (e.data === YT.PlayerState.ENDED) {
      stopPolling();
      callbacks.onComplete && callbacks.onComplete();
    }
  }

  function startPolling() {
    stopPolling();
    pollTimer = setInterval(() => {
      if (!player || typeof player.getCurrentTime !== "function") return;
      let t, dur;
      try {
        t = player.getCurrentTime();
        dur = player.getDuration();
      } catch (e) {
        return;
      }
      // ป้องกันการข้ามไปข้างหน้า: ถ้ากระโดดเกินกว่าที่เคยดูจริงมากกว่า 1.5 วินาที ให้ดึงกลับ
      if (t > maxWatchedTime + 1.5) {
        player.seekTo(maxWatchedTime, true);
      } else if (t > maxWatchedTime) {
        maxWatchedTime = t;
      }
      // เผื่อกรณีบางวิดีโอไม่ยิง onStateChange ENDED ให้ตรวจจากเวลาที่เหลือด้วย
      if (dur && t >= dur - 0.4) {
        stopPolling();
        callbacks.onComplete && callbacks.onComplete();
      }
    }, 400);
  }

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  function play() { player && player.playVideo && player.playVideo(); }
  function pause() { player && player.pauseVideo && player.pauseVideo(); }

  function destroy() {
    stopPolling();
    if (player) {
      try { player.destroy(); } catch (e) { /* ไม่มี player ให้ทำลายก็ไม่เป็นไร */ }
      player = null;
    }
  }

  /** ดึงชื่อวิดีโอจริงจาก YouTube ผ่าน oEmbed (ไม่ต้องใช้ API Key)
   *  คืนค่า null หากดึงไม่สำเร็จ (เช่น ไม่มีอินเทอร์เน็ต) — ผู้เรียกควรมีข้อความสำรองไว้เสมอ */
  async function fetchTitle(videoUrl) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`);
      if (!res.ok) throw new Error("oEmbed request failed");
      const data = await res.json();
      return data.title || null;
    } catch (e) {
      return null;
    }
  }

  /** สร้าง URL ของ Thumbnail จาก Video ID (ไม่ต้องเรียก API)
   *  ให้ผู้เรียกใส่ onerror ที่ <img> เพื่อ fallback ไปยังความละเอียดที่เล็กลงเมื่อโหลดไม่สำเร็จ */
  function thumbnailUrls(videoId) {
    return {
      max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    };
  }

  return { mount, play, pause, destroy, fetchTitle, thumbnailUrls };
})();
