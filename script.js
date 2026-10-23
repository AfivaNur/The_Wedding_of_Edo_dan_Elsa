/*
  EDIT DATA PERNIKAHAN DI BAGIAN CONFIG DI BAWAH.
  Tanggal gunakan format YYYY-MM-DD. Contoh: 2027-06-20
  WhatsApp gunakan kode negara tanpa tanda +. Contoh: 6281234567890
*/
const CONFIG = {
  groom: "Edo",
  bride: "Elsa",
  date: "", // YYYY-MM-DD
  akad: "08.00 WIB – selesai",
  reception: "09.00 WIB – selesai",
  location: "Lubuk Makmur, Kecamatan Lempuing Jaya (OKI)",
  mapsUrl:
    "https://www.google.com/maps/search/Lubuk%20makmur/@-3.78975978,104.92359976,17z?hl=en",
  whatsapp: "082375637896", // nomor WhatsApp RSVP, contoh 6281234567890
  accountNumber: "082375637896",
  guestDefault: "Tamu Undangan",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function formatDate(dateString) {
  if (!dateString) return "Hari Minggu, 10 Januari 2027";
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Hari, 10 Januari 2027";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function applyConfig() {
  $$("[data-groom]").forEach(
    (el) => (el.textContent = CONFIG.groom || "Muhammad Edo")
  );
  $$("[data-bride]").forEach(
    (el) => (el.textContent = CONFIG.bride || "Elsa Suharyani")
  );
  $$("[data-date-display]").forEach(
    (el) => (el.textContent = formatDate(CONFIG.date))
  );
  $$("[data-akad]").forEach((el) => (el.textContent = CONFIG.akad));
  $$("[data-resepsi]").forEach((el) => (el.textContent = CONFIG.reception));
  $$("[data-location]").forEach((el) => (el.textContent = CONFIG.location));
  $("#mapsLink").href = CONFIG.mapsUrl || "https://maps.google.com";
  $("#accountNumber").textContent = CONFIG.accountNumber;
  document.title = `Undangan Pernikahan ${CONFIG.groom} & ${CONFIG.bride}`;
}

function setGuestFromUrl() {
  const guest = new URLSearchParams(window.location.search).get("to");
  if (guest) $("#guestName").textContent = guest.replace(/\+/g, " ");
}

function updateCountdown() {
  // Target: 1 Januari 2027, pukul 08.00 WIB
  const target = new Date("2027-01-01T08:00:00+07:00");
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      const el = $("#" + id);
      if (el) el.textContent = "00";
    });
    return;
  }

  $("#days").textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");

  $("#hours").textContent = String(
    Math.floor((diff % 86400000) / 3600000)
  ).padStart(2, "0");

  $("#minutes").textContent = String(
    Math.floor((diff % 3600000) / 60000)
  ).padStart(2, "0");

  $("#seconds").textContent = String(
    Math.floor((diff % 60000) / 1000)
  ).padStart(2, "0");
}

/* TIMER HITUNG MUNDUR */
updateCountdown();
setInterval(updateCountdown, 1000);

/* TOMBOL BUKA UNDANGAN */
const openButton = $("#openInvitation");

if (openButton) {
  openButton.addEventListener("click", async () => {
    // Gulir ke bagian acara
    const tujuan = $("#acara");

    if (tujuan) {
      tujuan.scrollIntoView({ behavior: "smooth" });
    }

    // Putar musik undangan
    const audio = $("#weddingMusic");

    if (audio && audio.getAttribute("src") && audio.paused) {
      try {
        await audio.play();

        const musicToggle = $("#musicToggle");
        const musicLabel = $("#musicLabel");

        if (musicToggle) {
          musicToggle.setAttribute("aria-pressed", "true");
        }

        if (musicLabel) {
          musicLabel.textContent = "Hentikan Musik";
        }
      } catch (error) {
        console.log("Musik belum dapat diputar:", error);
      }
    }
  });
}

$("#musicToggle").addEventListener("click", async () => {
  const audio = $("#weddingMusic");
  if (audio.paused) {
    if (!audio.getAttribute("src")) {
      alert(
        "Tambahkan file musik bernama musik.mp3 ke folder assets terlebih dahulu."
      );
      return;
    }
    try {
      await audio.play();
      $("#musicToggle").setAttribute("aria-pressed", "true");
      $("#musicLabel").textContent = "Hentikan Musik";
    } catch {
      alert(
        "Musik belum bisa diputar. Pastikan file assets/musik.mp3 tersedia."
      );
    }
  } else {
    audio.pause();
    $("#musicToggle").setAttribute("aria-pressed", "false");
    $("#musicLabel").textContent = "Putar Musik";
  }
});

$("#copyAccount").addEventListener("click", async () => {
  const account = CONFIG.accountNumber;
  try {
    await navigator.clipboard.writeText(account);
    $("#copyAccount").textContent = "Berhasil Disalin ✓";
  } catch {
    alert("Silakan salin nomor rekening ini secara manual: " + account);
  }
});

$("#rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!CONFIG.whatsapp) {
    alert("Isi nomor WhatsApp pada CONFIG di script.js terlebih dahulu.");
    return;
  }
  const name = $("#name").value.trim();
  const attendance = $("#attendance").value;
  const message = $("#message").value.trim();
  const text = `Assalamu'alaikum, saya ${name}. Konfirmasi kehadiran: ${attendance}.\\n\\nUcapan dan doa: ${message}`;
  window.open(
    `https://wa.me/6282375637896?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener"
  );
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$(".reveal").forEach((el) => observer.observe(el));

applyConfig();
setGuestFromUrl();
updateCountdown();
setInterval(updateCountdown, 1000);
