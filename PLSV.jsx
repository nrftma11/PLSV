import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA: CP, TP, ATP, Materi, Contoh Soal, Soal Game, Boss
// ============================================================

const CP_TP_ATP = {
  cp: {
    kode: "8.B.1",
    deskripsi:
      "Peserta didik dapat menyelesaikan persamaan linear satu variabel dan menggunakannya dalam pemodelan situasi nyata, serta menginterpretasikan hasilnya.",
    fase: "Fase D (SMP Kelas 7–9)",
  },
  tp: [
    { id: "TP1", deskripsi: "Memahami pengertian persamaan linear satu variabel (PLSV) dan unsur-unsurnya (variabel, koefisien, konstanta)." },
    { id: "TP2", deskripsi: "Menentukan apakah suatu nilai merupakan penyelesaian (akar) dari PLSV." },
    { id: "TP3", deskripsi: "Menyelesaikan PLSV dengan operasi penjumlahan dan pengurangan pada kedua ruas." },
    { id: "TP4", deskripsi: "Menyelesaikan PLSV dengan operasi perkalian dan pembagian pada kedua ruas." },
    { id: "TP5", deskripsi: "Menyelesaikan PLSV berbentuk ax + b = c yang melibatkan koefisien dan konstanta." },
    { id: "TP6", deskripsi: "Menerapkan PLSV untuk menyelesaikan masalah kontekstual/soal cerita." },
  ],
  atp: [
    { pertemuan: 1, tp: "TP1", aktivitas: "Eksplorasi konsep variabel, koefisien, konstanta melalui teka-teki angka." },
    { pertemuan: 2, tp: "TP2", aktivitas: "Verifikasi akar persamaan dengan metode substitusi." },
    { pertemuan: 3, tp: "TP3", aktivitas: "Latihan PLSV bentuk x + b = c dengan sifat kesetaraan." },
    { pertemuan: 4, tp: "TP4", aktivitas: "Latihan PLSV bentuk ax = c dengan sifat kesetaraan." },
    { pertemuan: 5, tp: "TP5", aktivitas: "Latihan PLSV bentuk ax + b = c (gabungan)." },
    { pertemuan: 6, tp: "TP6", aktivitas: "Problem-solving soal cerita kontekstual & evaluasi." },
  ],
};

const MATERI = [
  {
    id: "m1",
    judul: "Pengertian Persamaan Linear Satu Variabel",
    icon: "⚗️",
    konten: [
      {
        subjudul: "Definisi",
        teks: "Persamaan Linear Satu Variabel (PLSV) adalah persamaan yang memiliki satu variabel dengan pangkat tertinggi 1. Bentuk umum: ax + b = c, di mana a ≠ 0.",
      },
      {
        subjudul: "Unsur-unsur PLSV",
        teks: null,
        tabel: {
          header: ["Unsur", "Definisi", "Contoh dalam 3x + 5 = 14"],
          baris: [
            ["Variabel", "Lambang yang mewakili nilai tidak diketahui", "x"],
            ["Koefisien", "Angka yang mengalikan variabel", "3"],
            ["Konstanta", "Nilai tetap tanpa variabel", "5 dan 14"],
          ],
        },
      },
    ],
    contohSoal: [
      {
        soal: "Manakah yang merupakan PLSV?",
        pilihan: ["x² + 2 = 6", "3x + 5 = 14", "2x + y = 8", "x³ = 27"],
        jawaban: 1,
        pembahasan: "3x + 5 = 14 adalah PLSV karena hanya punya satu variabel (x) dengan pangkat 1.",
      },
    ],
  },
  {
    id: "m2",
    judul: "Konsep Penyelesaian (Akar Persamaan)",
    icon: "🔬",
    konten: [
      {
        subjudul: "Apa itu Akar Persamaan?",
        teks: "Akar persamaan adalah nilai variabel yang membuat persamaan bernilai benar. Untuk mencarinya, kita gunakan sifat kesetaraan: operasi yang sama dilakukan pada kedua ruas.",
      },
      {
        subjudul: "Prinsip Kesetaraan",
        teks: "Jika a = b, maka: a + c = b + c, a − c = b − c, a × c = b × c, a ÷ c = b ÷ c (c ≠ 0)",
      },
    ],
    contohSoal: [
      {
        soal: "Apakah x = 3 merupakan akar dari persamaan 2x + 1 = 7?",
        pilihan: ["Ya, karena 2(3) + 1 = 7", "Tidak, karena 2(3) + 1 = 8", "Ya, karena 3 + 1 = 7", "Tidak, karena 2(3) = 7"],
        jawaban: 0,
        pembahasan: "Substitusi: 2(3) + 1 = 6 + 1 = 7 ✓. Jadi x = 3 adalah akar persamaan.",
      },
    ],
  },
  {
    id: "m3",
    judul: "Teknik Penjumlahan & Pengurangan",
    icon: "⚡",
    konten: [
      {
        subjudul: "Langkah Penyelesaian",
        teks: "Untuk PLSV bentuk x + b = c: pindahkan konstanta ke ruas kanan dengan mengurangkan b dari kedua ruas sehingga x = c − b.",
      },
      {
        subjudul: "Contoh Bertahap",
        teks: "Selesaikan x + 7 = 12:\n① x + 7 = 12\n② x + 7 − 7 = 12 − 7  (kurangi kedua ruas dengan 7)\n③ x = 5  ✓",
      },
    ],
    contohSoal: [
      {
        soal: "Nilai x yang memenuhi x + 9 = 16 adalah...",
        pilihan: ["5", "6", "7", "8"],
        jawaban: 2,
        pembahasan: "x + 9 = 16 → x = 16 − 9 = 7. Cek: 7 + 9 = 16 ✓",
      },
    ],
  },
  {
    id: "m4",
    judul: "Teknik Perkalian & Pembagian",
    icon: "🔋",
    konten: [
      {
        subjudul: "Langkah Penyelesaian",
        teks: "Untuk PLSV bentuk ax = c: bagi kedua ruas dengan koefisien a sehingga x = c ÷ a.",
      },
      {
        subjudul: "Contoh Bertahap",
        teks: "Selesaikan 4x = 20:\n① 4x = 20\n② 4x ÷ 4 = 20 ÷ 4  (bagi kedua ruas dengan 4)\n③ x = 5  ✓",
      },
    ],
    contohSoal: [
      {
        soal: "Nilai x dari 5x = 35 adalah...",
        pilihan: ["5", "6", "7", "8"],
        jawaban: 2,
        pembahasan: "5x = 35 → x = 35 ÷ 5 = 7. Cek: 5 × 7 = 35 ✓",
      },
    ],
  },
  {
    id: "m5",
    judul: "PLSV Bentuk ax + b = c",
    icon: "🧪",
    konten: [
      {
        subjudul: "Langkah Penyelesaian",
        teks: "Untuk PLSV ax + b = c:\n① Pindahkan konstanta (b) ke ruas kanan: ax = c − b\n② Bagi dengan koefisien (a): x = (c − b) ÷ a",
      },
      {
        subjudul: "Contoh Bertahap",
        teks: "Selesaikan 3x − 5 = 10:\n① 3x − 5 + 5 = 10 + 5\n② 3x = 15\n③ x = 15 ÷ 3 = 5  ✓",
      },
    ],
    contohSoal: [
      {
        soal: "Nilai x dari 2x + 3 = 11 adalah...",
        pilihan: ["3", "4", "5", "6"],
        jawaban: 1,
        pembahasan: "2x + 3 = 11 → 2x = 11 − 3 = 8 → x = 8 ÷ 2 = 4. Cek: 2(4)+3=11 ✓",
      },
    ],
  },
];

const QUESTIONS_GAME = [
  { id: 1, teks: "Nilai x yang memenuhi x + 3 = 7 adalah...", pilihan: ["2", "3", "4", "5"], jawaban: 2, hint: "x = 7 − 3", xp: 10, diff: "easy" },
  { id: 2, teks: "Jika 3x = 15, maka x = ...", pilihan: ["3", "4", "5", "6"], jawaban: 2, hint: "Bagi kedua ruas dengan 3", xp: 10, diff: "easy" },
  { id: 3, teks: "Nilai x dari x − 4 = 9 adalah...", pilihan: ["5", "11", "13", "12"], jawaban: 2, hint: "x = 9 + 4", xp: 10, diff: "easy" },
  { id: 4, teks: "Persamaan 2x + 5 = 13 mempunyai akar x = ...", pilihan: ["3", "4", "5", "9"], jawaban: 1, hint: "2x = 13 − 5 = 8, lalu bagi 2", xp: 20, diff: "medium" },
  { id: 5, teks: "Jika 4x − 3 = 17, maka nilai x adalah...", pilihan: ["4", "5", "6", "7"], jawaban: 1, hint: "4x = 17 + 3 = 20", xp: 20, diff: "medium" },
  { id: 6, teks: "Nilai x yang memenuhi 5x + 2 = 22 adalah...", pilihan: ["3", "4", "5", "6"], jawaban: 1, hint: "5x = 22 − 2 = 20", xp: 20, diff: "medium" },
  { id: 7, teks: "Harga 3 buku = Rp 36.000. Harga 1 buku adalah...", pilihan: ["Rp 9.000", "Rp 12.000", "Rp 15.000", "Rp 18.000"], jawaban: 1, hint: "3x = 36.000, bagi dengan 3", xp: 30, diff: "medium" },
  { id: 8, teks: "Jika 6x − 10 = 2x + 6, maka x = ...", pilihan: ["3", "4", "5", "6"], jawaban: 1, hint: "Pindahkan suku x ke kiri: 4x = 16", xp: 30, diff: "hard" },
  { id: 9, teks: "Nilai x dari ½x + 3 = 7 adalah...", pilihan: ["6", "7", "8", "9"], jawaban: 2, hint: "½x = 7 − 3 = 4, kali 2", xp: 30, diff: "hard" },
  { id: 10, teks: "Tiga kali suatu bilangan dikurangi 8 hasilnya 19. Bilangan itu adalah...", pilihan: ["7", "8", "9", "10"], jawaban: 2, hint: "3x − 8 = 19, maka 3x = 27", xp: 40, diff: "hard" },
];

const BOSS = {
  nama: "The Variable Phantom",
  hp: 100,
  hpPlayer: 100,
  deskripsi: "Entitas misterius yang menyembunyikan nilai variabel sejati!",
  reward: { xp: 150, badge: "Boss Slayer" },
  soalPool: [4, 5, 6, 8, 9, 10].map(id => QUESTIONS_GAME.find(q => q.id === id)),
};

// ============================================================
// UTILITY
// ============================================================
const LEVEL_TABLE = [
  { level: 1, nama: "Rekrut", xpNeeded: 0 },
  { level: 2, nama: "Pelajar", xpNeeded: 100 },
  { level: 3, nama: "Analis", xpNeeded: 250 },
  { level: 4, nama: "Ilmuwan", xpNeeded: 500 },
  { level: 5, nama: "Pakar", xpNeeded: 900 },
  { level: 6, nama: "Ahli", xpNeeded: 1400 },
  { level: 7, nama: "Master", xpNeeded: 2000 },
  { level: 8, nama: "Legend", xpNeeded: 3000 },
];

function getLevelInfo(xp) {
  let current = LEVEL_TABLE[0];
  let next = LEVEL_TABLE[1];
  for (let i = 0; i < LEVEL_TABLE.length; i++) {
    if (xp >= LEVEL_TABLE[i].xpNeeded) {
      current = LEVEL_TABLE[i];
      next = LEVEL_TABLE[i + 1] || null;
    }
  }
  const progress = next
    ? Math.round(((xp - current.xpNeeded) / (next.xpNeeded - current.xpNeeded)) * 100)
    : 100;
  return { ...current, next, progress };
}

// ============================================================
// STYLES
// ============================================================
const S = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050B18 0%, #0A1628 50%, #050B18 100%)",
    fontFamily: "'Rajdhani', 'Segoe UI', sans-serif",
    color: "#E2E8F0",
    overflowX: "hidden",
  },
  glassCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(0,212,255,0.2)",
    borderRadius: 16,
    backdropFilter: "blur(12px)",
    boxShadow: "0 0 30px rgba(0,212,255,0.05)",
  },
  btn: {
    background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
    border: "none",
    borderRadius: 12,
    padding: "10px 24px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  btnSecondary: {
    background: "rgba(0,212,255,0.1)",
    border: "1px solid rgba(0,212,255,0.3)",
    borderRadius: 12,
    padding: "8px 20px",
    color: "#00D4FF",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  btnGhost: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "8px 18px",
    color: "#94A3B8",
    fontWeight: 500,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  neonText: { color: "#00D4FF", textShadow: "0 0 20px rgba(0,212,255,0.5)" },
  purpleText: { color: "#8B5CF6", textShadow: "0 0 20px rgba(139,92,246,0.4)" },
  successText: { color: "#10F58C" },
  errorText: { color: "#FF3B5C" },
  goldText: { color: "#F59E0B" },
};

// ============================================================
// COMPONENTS
// ============================================================

function XPBar({ xp }) {
  const info = getLevelInfo(xp);
  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#00D4FF", fontWeight: 700 }}>Lv.{info.level} {info.nama}</span>
        <span style={{ color: "#94A3B8" }}>{xp} XP</span>
      </div>
      <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${info.progress}%`,
          background: "linear-gradient(90deg, #00D4FF, #8B5CF6)",
          borderRadius: 4,
          transition: "width 0.8s ease-out",
          boxShadow: "0 0 10px #00D4FF",
        }} />
      </div>
      {info.next && (
        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
          Menuju Lv.{info.next.level} ({info.next.xpNeeded - xp} XP lagi)
        </div>
      )}
    </div>
  );
}

function Badge({ label, color = "#00D4FF", bg = "rgba(0,212,255,0.1)" }) {
  return (
    <span style={{
      background: bg, color, border: `1px solid ${color}40`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
    }}>{label}</span>
  );
}

function HPBar({ current, max, color, label }) {
  const pct = Math.max(0, Math.round((current / max) * 100));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
        <span style={{ color: "#94A3B8" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{current}/{max}</span>
      </div>
      <div style={{ height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden", border: `1px solid ${color}30` }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: color,
          borderRadius: 6,
          transition: "width 0.5s ease",
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: LANDING
// ============================================================
function LandingScreen({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", position: "relative" }}>
      {/* Animated particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: i % 2 === 0 ? "#00D4FF" : "#8B5CF6",
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ fontSize: 64, marginBottom: 8 }}>⚛️</div>
      <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#00D4FF", textTransform: "uppercase", marginBottom: 12 }}>
        MathQuest · Simulator Ilmuwan Muda
      </div>
      <h1 style={{ fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 900, margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        <span style={S.neonText}>SPLSV</span>{" "}
        <span style={{ color: "#fff" }}>Training</span>
        <br />
        <span style={S.purpleText}>Simulator</span>
      </h1>
      <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.6 }}>
        Kuasai Persamaan Linear Satu Variabel melalui misi ilmiah futuristik. Hadapi boss, kumpulkan XP, dan jadilah legenda!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 300 }}>
        <button style={{ ...S.btn, padding: "14px 32px", fontSize: 16 }} onClick={onStart}>
          🚀 Mulai Misi
        </button>
      </div>

      <div style={{ marginTop: 48, display: "flex", gap: 32, color: "#475569", fontSize: 12 }}>
        <span>⚡ XP & Level</span>
        <span>🏆 Boss Fight</span>
        <span>🧪 Materi Lengkap</span>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: CP TP ATP
// ============================================================
function CPTPATPScreen({ onNext }) {
  const [activeTab, setActiveTab] = useState("cp");
  const tabs = [
    { id: "cp", label: "📋 Capaian Pembelajaran" },
    { id: "tp", label: "🎯 Tujuan Pembelajaran" },
    { id: "atp", label: "📅 Alur Tujuan Pembelajaran" },
  ];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#00D4FF", marginBottom: 8 }}>FASE D — KELAS 7–9 SMP</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
          Capaian, Tujuan & Alur{" "}
          <span style={S.neonText}>Pembelajaran</span>
        </h2>
        <p style={{ color: "#64748B", fontSize: 14, marginTop: 8 }}>Kurikulum Merdeka · Matematika · PLSV</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              ...S.btnGhost, whiteSpace: "nowrap",
              background: activeTab === t.id ? "rgba(0,212,255,0.1)" : "transparent",
              color: activeTab === t.id ? "#00D4FF" : "#64748B",
              border: activeTab === t.id ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
              fontWeight: activeTab === t.id ? 700 : 500,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* CP */}
      {activeTab === "cp" && (
        <div style={{ ...S.glassCard, padding: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ fontSize: 32 }}>📋</div>
            <div>
              <div style={{ fontSize: 11, color: "#00D4FF", letterSpacing: "0.2em", marginBottom: 4 }}>CAPAIAN PEMBELAJARAN</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>Kode: {CP_TP_ATP.cp.kode}</div>
              <div style={{ color: "#64748B", fontSize: 13 }}>{CP_TP_ATP.cp.fase}</div>
            </div>
          </div>
          <div style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 12, padding: 20 }}>
            <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "#CBD5E1" }}>
              {CP_TP_ATP.cp.deskripsi}
            </p>
          </div>

          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { icon: "🧩", label: "Konsep", desc: "Memahami unsur PLSV" },
              { icon: "⚙️", label: "Prosedur", desc: "Menyelesaikan PLSV" },
              { icon: "🌍", label: "Kontekstual", desc: "Terapkan ke masalah nyata" },
            ].map(item => (
              <div key={item.label} style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#8B5CF6", marginTop: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TP */}
      {activeTab === "tp" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CP_TP_ATP.tp.map((tp, i) => (
            <div key={tp.id} style={{ ...S.glassCard, padding: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                minWidth: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #00D4FF20, #8B5CF620)",
                border: "1px solid rgba(0,212,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, color: "#00D4FF", fontSize: 14,
              }}>
                {tp.id}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>Tujuan Pembelajaran {i + 1}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#CBD5E1" }}>{tp.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ATP */}
      {activeTab === "atp" && (
        <div style={{ ...S.glassCard, padding: 24 }}>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>
            Urutan pembelajaran per pertemuan berdasarkan tujuan pembelajaran
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {CP_TP_ATP.atp.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 13, color: "#000", flexShrink: 0,
                  }}>
                    {item.pertemuan}
                  </div>
                  {i < CP_TP_ATP.atp.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: "rgba(0,212,255,0.2)", minHeight: 24 }} />
                  )}
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <Badge label={item.tp} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Pertemuan {item.pertemuan}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>{item.aktivitas}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <button style={{ ...S.btn, padding: "13px 36px" }} onClick={onNext}>
          Lanjut ke Materi →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: MATERI
// ============================================================
function MateriScreen({ onNext }) {
  const [activeMateri, setActiveMateri] = useState(0);
  const [showContoh, setShowContoh] = useState(false);
  const [pilihanUser, setPilihanUser] = useState(null);

  const m = MATERI[activeMateri];

  function nextMateri() {
    setShowContoh(false);
    setPilihanUser(null);
    if (activeMateri < MATERI.length - 1) {
      setActiveMateri(activeMateri + 1);
    } else {
      onNext();
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#8B5CF6", marginBottom: 6 }}>MATERI PEMBELAJARAN</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>
          Konten <span style={S.purpleText}>SPLSV</span>
        </h2>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
        {MATERI.map((m2, i) => (
          <button key={i}
            onClick={() => { setActiveMateri(i); setShowContoh(false); setPilihanUser(null); }}
            style={{
              width: i === activeMateri ? 28 : 10, height: 10, borderRadius: 5,
              background: i === activeMateri ? "#00D4FF" : i < activeMateri ? "#8B5CF6" : "rgba(255,255,255,0.12)",
              border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s",
            }} />
        ))}
      </div>

      {/* Materi card */}
      <div style={{ ...S.glassCard, padding: 28, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36 }}>{m.icon}</div>
          <div>
            <div style={{ fontSize: 11, color: "#64748B", letterSpacing: "0.15em" }}>
              MATERI {activeMateri + 1} / {MATERI.length}
            </div>
            <h3 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 800, color: "#fff" }}>{m.judul}</h3>
          </div>
        </div>

        {m.konten.map((k, ki) => (
          <div key={ki} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#00D4FF", letterSpacing: "0.1em", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 14, background: "#00D4FF", borderRadius: 2 }} />
              {k.subjudul.toUpperCase()}
            </div>
            {k.teks && (
              <div style={{
                background: "rgba(0,212,255,0.04)", borderRadius: 10,
                padding: 16, fontSize: 14, lineHeight: 1.9, color: "#CBD5E1",
                border: "1px solid rgba(0,212,255,0.1)",
                whiteSpace: "pre-line",
                fontFamily: k.teks.includes("①") ? "'Courier New', monospace" : "inherit",
              }}>
                {k.teks}
              </div>
            )}
            {k.tabel && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {k.tabel.header.map((h, hi) => (
                        <th key={hi} style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF", fontWeight: 700 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {k.tabel.baris.map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ padding: "10px 14px", color: "#CBD5E1", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            {ci === 0 ? <strong style={{ color: "#8B5CF6" }}>{cell}</strong> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contoh soal */}
      {!showContoh ? (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button style={S.btnSecondary} onClick={() => setShowContoh(true)}>
            🧩 Coba Contoh Soal
          </button>
        </div>
      ) : (
        <div style={{ ...S.glassCard, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#F59E0B", letterSpacing: "0.2em", marginBottom: 12 }}>⚡ CONTOH SOAL</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 20px" }}>
            {m.contohSoal[0].soal}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {m.contohSoal[0].pilihan.map((p, pi) => {
              const isCorrect = pi === m.contohSoal[0].jawaban;
              const isSelected = pilihanUser === pi;
              const revealed = pilihanUser !== null;
              let bg = "rgba(255,255,255,0.04)";
              let border = "1px solid rgba(255,255,255,0.1)";
              let color = "#CBD5E1";
              if (revealed && isCorrect) { bg = "rgba(16,245,140,0.1)"; border = "1px solid #10F58C"; color = "#10F58C"; }
              else if (revealed && isSelected && !isCorrect) { bg = "rgba(255,59,92,0.1)"; border = "1px solid #FF3B5C"; color = "#FF3B5C"; }
              return (
                <button key={pi}
                  onClick={() => { if (pilihanUser === null) setPilihanUser(pi); }}
                  style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", color, fontWeight: 600, fontSize: 14, cursor: pilihanUser === null ? "pointer" : "default", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s" }}>
                  <span style={{ color: "#64748B", marginRight: 8 }}>{["A","B","C","D"][pi]}.</span>
                  {p}
                </button>
              );
            })}
          </div>
          {pilihanUser !== null && (
            <div style={{ marginTop: 16, background: "rgba(16,245,140,0.06)", border: "1px solid rgba(16,245,140,0.2)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: "#10F58C", fontWeight: 700, marginBottom: 4 }}>💡 PEMBAHASAN</div>
              <p style={{ margin: 0, fontSize: 13, color: "#CBD5E1", lineHeight: 1.7 }}>{m.contohSoal[0].pembahasan}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={S.btnGhost}
          onClick={() => { if (activeMateri > 0) { setActiveMateri(activeMateri - 1); setShowContoh(false); setPilihanUser(null); } }}>
          ← Sebelumnya
        </button>
        <button style={{ ...S.btn, padding: "12px 28px" }} onClick={nextMateri}>
          {activeMateri < MATERI.length - 1 ? "Materi Berikutnya →" : "Masuk Arena Game 🎮"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: DASHBOARD / WORLD MAP
// ============================================================
function DashboardScreen({ playerState, onStartChapter, onStartBoss }) {
  const lvl = getLevelInfo(playerState.xp);
  const badges = playerState.badges || [];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ ...S.glassCard, padding: 20, marginBottom: 20, display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 900,
        }}>
          🧑‍🔬
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>Agen Muda</div>
          <XPBar xp={playerState.xp} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#F59E0B" }}>{playerState.streak}</div>
          <div style={{ fontSize: 10, color: "#64748B" }}>🔥 Streak</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total XP", val: playerState.xp, icon: "⚡", color: "#F59E0B" },
          { label: "Soal Dijawab", val: playerState.soalDijawab || 0, icon: "📝", color: "#00D4FF" },
          { label: "Akurasi", val: playerState.soalDijawab > 0 ? Math.round((playerState.benar / playerState.soalDijawab) * 100) + "%" : "–", icon: "🎯", color: "#10F58C" },
        ].map(s => (
          <div key={s.label} style={{ ...S.glassCard, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* World Map */}
      <div style={{ fontSize: 11, color: "#00D4FF", letterSpacing: "0.3em", marginBottom: 16 }}>🗺️ WORLD MAP</div>

      {[
        { id: 1, nama: "World 1: Akar Persamaan", desc: "Chapter 1.1 – 1.3", icon: "⚗️", locked: false, color: "#00D4FF" },
        { id: 2, nama: "World 2: Teknik Dasar", desc: "Chapter 2.1 – 2.3", icon: "⚡", locked: playerState.worldUnlocked < 2, color: "#8B5CF6" },
        { id: 3, nama: "World 3: Persamaan Kompleks", desc: "Chapter 3.1 – 3.3", icon: "🔋", locked: playerState.worldUnlocked < 3, color: "#F59E0B" },
      ].map(w => (
        <div key={w.id} style={{ ...S.glassCard, padding: 20, marginBottom: 12, display: "flex", gap: 16, alignItems: "center", opacity: w.locked ? 0.4 : 1 }}>
          <div style={{ fontSize: 32 }}>{w.locked ? "🔒" : w.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: w.locked ? "#64748B" : "#fff" }}>{w.nama}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>{w.desc}</div>
            {!w.locked && playerState.chaptersDone[w.id] > 0 && (
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(playerState.chaptersDone[w.id] / 10) * 100}%`, background: w.color, borderRadius: 2 }} />
                </div>
              </div>
            )}
          </div>
          {!w.locked && (
            <button style={{ ...S.btn, padding: "8px 18px", fontSize: 13 }} onClick={() => onStartChapter(w.id)}>
              {playerState.chaptersDone[w.id] > 0 ? "Lanjut" : "Mulai"}
            </button>
          )}
        </div>
      ))}

      {/* Boss Fight */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 11, color: "#FF3B5C", letterSpacing: "0.3em", marginBottom: 16 }}>⚔️ BOSS ARENA</div>
        <div style={{
          ...S.glassCard, padding: 24,
          border: "1px solid rgba(255,59,92,0.3)",
          background: "linear-gradient(135deg, rgba(255,59,92,0.06), rgba(139,92,246,0.06))",
          display: "flex", gap: 16, alignItems: "center",
        }}>
          <div style={{ fontSize: 48 }}>👻</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#FF3B5C" }}>The Variable Phantom</div>
            <div style={{ fontSize: 13, color: "#94A3B8", margin: "4px 0" }}>World 1 Boss · HP: 100</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>Reward: 150 XP · Badge "Boss Slayer"</div>
            {playerState.bossDefeated && <Badge label="✓ Dikalahkan" color="#10F58C" bg="rgba(16,245,140,0.1)" />}
          </div>
          <button
            style={{ ...S.btn, background: "linear-gradient(135deg, #FF3B5C, #8B5CF6)", padding: "10px 20px", fontSize: 13 }}
            onClick={onStartBoss}>
            {playerState.bossDefeated ? "⚔️ Replay" : "⚔️ Hadapi"}
          </button>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, color: "#F59E0B", letterSpacing: "0.3em", marginBottom: 12 }}>🏅 BADGE DIPEROLEH</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {badges.map(b => (
              <Badge key={b} label={b} color="#F59E0B" bg="rgba(245,158,11,0.1)" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SCREEN: CHAPTER (Quiz Mode)
// ============================================================
function ChapterScreen({ worldId, playerState, onFinish, onBack }) {
  const questions = QUESTIONS_GAME.filter((_, i) => {
    if (worldId === 1) return i < 4;
    if (worldId === 2) return i >= 3 && i < 7;
    return i >= 6;
  });

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState({ xp: 0, benar: 0, total: 0 });
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);

  const q = questions[qIdx];

  useEffect(() => {
    setTimer(60);
    setSelected(null);
    setShowExplanation(false);
    setShowHint(false);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIdx]);

  function handleAnswer(idx) {
    clearInterval(timerRef.current);
    if (selected !== null) return;
    setSelected(idx);
    const benar = idx === q.jawaban;
    const gainedXP = benar ? q.xp * (combo >= 3 ? 2 : 1) : 0;
    setResults(r => ({ xp: r.xp + gainedXP, benar: r.benar + (benar ? 1 : 0), total: r.total + 1 }));
    setCombo(c => benar ? c + 1 : 0);
    setTimeout(() => setShowExplanation(true), 400);
  }

  function nextQ() {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    const pct = Math.round((results.benar / results.total) * 100);
    return (
      <div style={{ maxWidth: 500, margin: "60px auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>{pct >= 70 ? "🎉" : "💪"}</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "12px 0" }}>
          {pct >= 70 ? "Chapter Selesai!" : "Terus Berlatih!"}
        </h2>
        <div style={{ ...S.glassCard, padding: 24, margin: "20px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#F59E0B" }}>+{results.xp}</div><div style={{ fontSize: 12, color: "#64748B" }}>XP Diperoleh</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#10F58C" }}>{pct}%</div><div style={{ fontSize: 12, color: "#64748B" }}>Akurasi</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#00D4FF" }}>{results.benar}/{results.total}</div><div style={{ fontSize: 12, color: "#64748B" }}>Benar</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#8B5CF6" }}>{combo}x</div><div style={{ fontSize: 12, color: "#64748B" }}>Max Combo</div></div>
          </div>
        </div>
        <button style={{ ...S.btn, padding: "13px 32px" }} onClick={() => onFinish(results)}>
          Kembali ke Dashboard →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
        <button style={S.btnGhost} onClick={onBack}>← Keluar</button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#64748B" }}>Soal {qIdx + 1} / {questions.length}</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((qIdx + 1) / questions.length) * 100}%`, background: "linear-gradient(90deg, #00D4FF, #8B5CF6)", borderRadius: 2 }} />
          </div>
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, padding: "4px 12px", borderRadius: 20,
          background: timer < 15 ? "rgba(255,59,92,0.15)" : "rgba(0,212,255,0.1)",
          color: timer < 15 ? "#FF3B5C" : "#00D4FF",
          border: `1px solid ${timer < 15 ? "rgba(255,59,92,0.3)" : "rgba(0,212,255,0.3)"}`,
        }}>
          ⏱ {timer}s
        </div>
      </div>

      {/* Combo */}
      {combo >= 2 && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <Badge label={`🔥 COMBO x${combo >= 6 ? 3 : 2}${combo >= 3 ? " — XP GANDA!" : ""}`} color="#FF3B5C" bg="rgba(255,59,92,0.1)" />
        </div>
      )}

      {/* Question card */}
      <div style={{ ...S.glassCard, padding: 28, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <Badge label={q.diff === "easy" ? "Mudah" : q.diff === "medium" ? "Sedang" : "Sulit"}
            color={q.diff === "easy" ? "#10F58C" : q.diff === "medium" ? "#F59E0B" : "#FF3B5C"}
            bg={`rgba(${q.diff === "easy" ? "16,245,140" : q.diff === "medium" ? "245,158,11" : "255,59,92"},0.1)`} />
          <Badge label={`+${q.xp} XP`} color="#F59E0B" bg="rgba(245,158,11,0.08)" />
        </div>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.6, margin: 0 }}>{q.teks}</p>
      </div>

      {/* Pilihan */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {q.pilihan.map((p, pi) => {
          const isCorrect = pi === q.jawaban;
          const isSelected = selected === pi;
          const revealed = selected !== null;
          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.08)";
          let color = "#CBD5E1";
          if (revealed && isCorrect) { bg = "rgba(16,245,140,0.12)"; border = "1px solid #10F58C80"; color = "#10F58C"; }
          else if (revealed && isSelected) { bg = "rgba(255,59,92,0.12)"; border = "1px solid #FF3B5C80"; color = "#FF3B5C"; }
          return (
            <button key={pi}
              onClick={() => handleAnswer(pi)}
              disabled={selected !== null}
              style={{ background: bg, border, borderRadius: 12, padding: "14px 16px", color, fontWeight: 600, fontSize: 14, cursor: selected === null ? "pointer" : "default", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ color: "#475569", marginRight: 8 }}>{["A","B","C","D"][pi]}.</span>
              {p}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {selected === null && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <button style={S.btnGhost} onClick={() => setShowHint(true)}>💡 Tampilkan Hint</button>
        </div>
      )}
      {showHint && selected === null && (
        <div style={{ ...S.glassCard, padding: 14, marginBottom: 12, borderColor: "rgba(245,158,11,0.3)" }}>
          <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: 12 }}>HINT: </span>
          <span style={{ color: "#CBD5E1", fontSize: 13 }}>{q.hint}</span>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div style={{ ...S.glassCard, padding: 18, marginBottom: 16, borderColor: "rgba(16,245,140,0.2)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#10F58C", marginBottom: 8 }}>
            {selected === q.jawaban ? "✅ BENAR! " : "❌ SALAH. "}
            <span style={{ color: "#64748B", fontWeight: 400 }}>Penjelasan:</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#CBD5E1", lineHeight: 1.7 }}>
            Jawaban benar: <strong style={{ color: "#10F58C" }}>{q.pilihan[q.jawaban]}</strong>
          </p>
        </div>
      )}

      {showExplanation && (
        <div style={{ textAlign: "right" }}>
          <button style={{ ...S.btn, padding: "11px 28px" }} onClick={nextQ}>
            {qIdx < questions.length - 1 ? "Soal Berikutnya →" : "Lihat Hasil"}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SCREEN: BOSS FIGHT
// ============================================================
function BossFightScreen({ playerState, onFinish, onBack }) {
  const questions = BOSS.soalPool;
  const [qIdx, setQIdx] = useState(0);
  const [playerHP, setPlayerHP] = useState(BOSS.hpPlayer);
  const [bossHP, setBossHP] = useState(BOSS.hp);
  const [selected, setSelected] = useState(null);
  const [combo, setCombo] = useState(0);
  const [flashMsg, setFlashMsg] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [battleEnd, setBattleEnd] = useState(null);
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);
  const [totalXP, setTotalXP] = useState(0);

  const q = questions[qIdx];

  useEffect(() => {
    if (battleEnd) return;
    setTimer(60);
    setSelected(null);
    setShowHint(false);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIdx, battleEnd]);

  function getDamage(c) {
    if (c >= 10) return 75;
    if (c >= 6) return 50;
    if (c >= 3) return 35;
    return 25;
  }

  function handleAnswer(idx) {
    clearInterval(timerRef.current);
    if (selected !== null || battleEnd) return;
    setSelected(idx);

    if (idx === -1) {
      // Timeout
      const newHP = playerHP - 30;
      setPlayerHP(Math.max(0, newHP));
      setFlashMsg({ type: "miss", text: "⏱ WAKTU HABIS! −30 HP" });
      setCombo(0);
      setTimeout(() => {
        setFlashMsg(null);
        if (newHP <= 0) { setBattleEnd("defeat"); return; }
        if (qIdx < questions.length - 1) setQIdx(qIdx + 1);
        else setBattleEnd("victory");
      }, 1200);
      return;
    }

    const benar = idx === q.jawaban;
    if (benar) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const dmg = getDamage(newCombo);
      const newBossHP = Math.max(0, bossHP - dmg);
      setBossHP(newBossHP);
      setTotalXP(xp => xp + q.xp);
      setFlashMsg({ type: "hit", text: `⚔️ SERANGAN! −${dmg} HP BOSS` + (newCombo >= 3 ? " 🔥 COMBO!" : "") });
      setTimeout(() => {
        setFlashMsg(null);
        if (newBossHP <= 0) { setBattleEnd("victory"); return; }
        if (qIdx < questions.length - 1) setQIdx(qIdx + 1);
        else setBattleEnd("victory");
      }, 1200);
    } else {
      const newHP = playerHP - 20;
      setPlayerHP(Math.max(0, newHP));
      setCombo(0);
      setFlashMsg({ type: "miss", text: "💥 SERANGAN BALIK! −20 HP" });
      setTimeout(() => {
        setFlashMsg(null);
        if (newHP <= 0) { setBattleEnd("defeat"); return; }
        if (qIdx < questions.length - 1) setQIdx(qIdx + 1);
        else setBattleEnd("victory");
      }, 1200);
    }
  }

  // Battle end screen
  if (battleEnd) {
    const won = battleEnd === "victory";
    const rewardXP = won ? (playerHP > 60 ? 150 : playerHP > 30 ? 120 : 100) : 20;
    return (
      <div style={{ maxWidth: 500, margin: "60px auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 72 }}>{won ? "🏆" : "💀"}</div>
        <h2 style={{ fontSize: 30, fontWeight: 900, margin: "12px 0", color: won ? "#10F58C" : "#FF3B5C" }}>
          {won ? "VICTORY!" : "DEFEAT!"}
        </h2>
        <p style={{ color: "#94A3B8", fontSize: 14, margin: "0 0 24px" }}>
          {won ? "The Variable Phantom telah dikalahkan!" : "Coba lagi besok, Agen!"}
        </p>
        <div style={{ ...S.glassCard, padding: 24, marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><div style={{ fontSize: 26, fontWeight: 900, color: "#F59E0B" }}>+{rewardXP}</div><div style={{ fontSize: 12, color: "#64748B" }}>XP Reward</div></div>
            <div><div style={{ fontSize: 26, fontWeight: 900, color: won ? "#10F58C" : "#FF3B5C" }}>{playerHP}%</div><div style={{ fontSize: 12, color: "#64748B" }}>HP Tersisa</div></div>
          </div>
          {won && playerHP === 100 && (
            <div style={{ marginTop: 16 }}>
              <Badge label="🏅 UNTOUCHABLE — Tanpa Kerusakan!" color="#F59E0B" bg="rgba(245,158,11,0.1)" />
            </div>
          )}
          {won && <div style={{ marginTop: 12 }}><Badge label="✅ Boss Slayer Badge Diperoleh!" color="#10F58C" bg="rgba(16,245,140,0.08)" /></div>}
        </div>
        <button style={{ ...S.btn, padding: "13px 32px" }} onClick={() => onFinish({ won, xp: rewardXP, bossDefeated: won })}>
          Kembali ke Dashboard →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 16px" }}>
      {/* Flash */}
      {flashMsg && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 999, padding: "16px 32px", borderRadius: 16,
          background: flashMsg.type === "hit" ? "rgba(16,245,140,0.9)" : "rgba(255,59,92,0.9)",
          color: "#000", fontWeight: 900, fontSize: 20, textAlign: "center",
          boxShadow: `0 0 40px ${flashMsg.type === "hit" ? "#10F58C" : "#FF3B5C"}`,
          pointerEvents: "none",
        }}>
          {flashMsg.text}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#FF3B5C", letterSpacing: "0.3em" }}>⚔️ BOSS ARENA</div>
        <div style={{ fontWeight: 900, fontSize: 22, color: "#FF3B5C" }}>THE VARIABLE PHANTOM</div>
      </div>

      {/* HP Bars */}
      <div style={{ ...S.glassCard, padding: 20, marginBottom: 20 }}>
        <HPBar current={bossHP} max={100} color="#FF3B5C" label="👻 Boss HP" />
        <div style={{ margin: "12px 0" }} />
        <HPBar current={playerHP} max={100} color="#10F58C" label="🧑‍🔬 Player HP" />
        <div style={{ marginTop: 12, display: "flex", gap: 12, justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: "#64748B" }}>Soal {qIdx + 1}/{questions.length}</span>
          <span style={{ color: combo >= 3 ? "#FF3B5C" : "#64748B" }}>
            {combo >= 2 ? `🔥 Combo x${combo}` : ""}
          </span>
          <span style={{
            color: timer < 15 ? "#FF3B5C" : "#00D4FF",
            fontWeight: 700,
          }}>⏱ {timer}s</span>
        </div>
      </div>

      {/* Question */}
      <div style={{ ...S.glassCard, padding: 24, marginBottom: 16, border: "1px solid rgba(255,59,92,0.2)" }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.6, margin: 0 }}>{q.teks}</p>
      </div>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {q.pilihan.map((p, pi) => {
          const isCorrect = pi === q.jawaban;
          const isSelected = selected === pi;
          const revealed = selected !== null;
          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.08)";
          let color = "#CBD5E1";
          if (revealed && isCorrect) { bg = "rgba(16,245,140,0.12)"; border = "1px solid #10F58C80"; color = "#10F58C"; }
          else if (revealed && isSelected) { bg = "rgba(255,59,92,0.12)"; border = "1px solid #FF3B5C80"; color = "#FF3B5C"; }
          return (
            <button key={pi}
              onClick={() => handleAnswer(pi)}
              disabled={selected !== null}
              style={{ background: bg, border, borderRadius: 12, padding: "14px 16px", color, fontWeight: 600, fontSize: 14, cursor: selected === null ? "pointer" : "default", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ color: "#475569", marginRight: 8 }}>{["A","B","C","D"][pi]}.</span>
              {p}
            </button>
          );
        })}
      </div>

      {selected === null && (
        <div style={{ textAlign: "center" }}>
          <button style={S.btnGhost} onClick={() => setShowHint(true)}>💡 Hint</button>
        </div>
      )}
      {showHint && selected === null && (
        <div style={{ ...S.glassCard, padding: 12, marginTop: 8, borderColor: "rgba(245,158,11,0.3)" }}>
          <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700 }}>HINT: </span>
          <span style={{ color: "#CBD5E1", fontSize: 13 }}>{q.hint}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [playerState, setPlayerState] = useState({
    xp: 0,
    streak: 1,
    soalDijawab: 0,
    benar: 0,
    worldUnlocked: 1,
    chaptersDone: { 1: 0, 2: 0, 3: 0 },
    bossDefeated: false,
    badges: [],
  });
  const [activeWorld, setActiveWorld] = useState(1);

  function addXP(amount) {
    setPlayerState(p => {
      const newXP = p.xp + amount;
      const newBadges = [...p.badges];
      if (newXP >= 100 && !newBadges.includes("First Contact")) newBadges.push("First Contact");
      return { ...p, xp: newXP, badges: newBadges };
    });
  }

  function handleChapterFinish(results) {
    setPlayerState(p => {
      const newDone = { ...p.chaptersDone, [activeWorld]: p.chaptersDone[activeWorld] + results.total };
      const newWorldUnlocked = results.benar >= 2 && activeWorld >= p.worldUnlocked ? p.worldUnlocked + 1 : p.worldUnlocked;
      const newBadges = [...p.badges];
      if (results.benar === results.total && !newBadges.includes("Accuracy King")) newBadges.push("Accuracy King");
      return {
        ...p,
        xp: p.xp + results.xp,
        soalDijawab: p.soalDijawab + results.total,
        benar: p.benar + results.benar,
        chaptersDone: newDone,
        worldUnlocked: Math.max(p.worldUnlocked, newWorldUnlocked),
        badges: newBadges,
      };
    });
    setScreen("dashboard");
  }

  function handleBossFinish({ won, xp, bossDefeated }) {
    setPlayerState(p => {
      const newBadges = [...p.badges];
      if (won && !newBadges.includes("Boss Slayer")) newBadges.push("Boss Slayer");
      return {
        ...p,
        xp: p.xp + xp,
        bossDefeated: p.bossDefeated || bossDefeated,
        badges: newBadges,
      };
    });
    setScreen("dashboard");
  }

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;900&display=swap');
        @keyframes float { from { transform: translateY(0px); } to { transform: translateY(-12px); } }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.88; }
      `}</style>

      {/* Nav bar (except landing) */}
      {screen !== "landing" && screen !== "chapter" && screen !== "boss" && (
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(5,11,24,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ ...S.neonText, fontWeight: 900, fontSize: 18, letterSpacing: "0.05em" }}>⚛️ MathQuest</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 8 }}>
            {["cptp", "materi", "dashboard"].map(s => (
              <button key={s}
                onClick={() => setScreen(s)}
                style={{
                  ...S.btnGhost,
                  color: screen === s ? "#00D4FF" : "#64748B",
                  borderColor: screen === s ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)",
                  background: screen === s ? "rgba(0,212,255,0.06)" : "transparent",
                  fontSize: 12, padding: "6px 14px",
                }}>
                {s === "cptp" ? "CP/TP/ATP" : s === "materi" ? "Materi" : "Arena 🎮"}
              </button>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>⚡ {playerState.xp} XP</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>Lv.{getLevelInfo(playerState.xp).level}</div>
          </div>
        </div>
      )}

      {/* Screens */}
      {screen === "landing" && <LandingScreen onStart={() => setScreen("cptp")} />}
      {screen === "cptp" && <CPTPATPScreen onNext={() => setScreen("materi")} />}
      {screen === "materi" && <MateriScreen onNext={() => setScreen("dashboard")} />}
      {screen === "dashboard" && (
        <DashboardScreen
          playerState={playerState}
          onStartChapter={worldId => { setActiveWorld(worldId); setScreen("chapter"); }}
          onStartBoss={() => setScreen("boss")}
        />
      )}
      {screen === "chapter" && (
        <ChapterScreen
          worldId={activeWorld}
          playerState={playerState}
          onFinish={handleChapterFinish}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen === "boss" && (
        <BossFightScreen
          playerState={playerState}
          onFinish={handleBossFinish}
          onBack={() => setScreen("dashboard")}
        />
      )}
    </div>
  );
}
