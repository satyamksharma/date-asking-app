import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PROPOSAL_GIFS, YAY_GIF, DATE_DRESS_GIF,
  ACTIVITY_GIF, PLACE_VEHICLE_GIF, TODO_GIF,
  CELEBRATION_GIF, FALLBACK_EMOJIS,
} from './gifs';

// ---- "No" button phrases ----
const NO_PHRASES = [
  "",
  "Are you sure? 🥺",
  "Really really sure?",
  "Better say yes!",
  "I'm gonna cry.. 😢",
  "You're breaking my heart 💔",
  "Pretty please? 🥺🥺",
  "Think again... 💭",
  "My heart can't take this 😩",
  "I'll be sad forever 😭",
  "Don't do this to me 🥲",
  "Okay last chance... 😤",
  "I'm not giving up! 💪",
  "You know you want to 😏",
  "Say yes already! 😫",
  "I'll ask again... 🔄",
  "Still waiting... ⏳",
  "Pleeeeease 🙏🙏🙏",
  "I won't stop asking 😤💕",
  "Just click YES 👆",
];

// ---- Heart color palette (different shades of pink) ----
const HEART_COLORS = [
  { fill: "#ff7eb3", stroke: "#ffd6e7" },
  { fill: "#ff5b93", stroke: "#ffb8d4" },
  { fill: "#e84a8a", stroke: "#f9a8c9" },
  { fill: "#ff9cbd", stroke: "#ffe8f0" },
  { fill: "#d1497b", stroke: "#f08ab5" },
  { fill: "#ff6fa0", stroke: "#ffd0e3" },
  { fill: "#f472b6", stroke: "#fcd5e5" },
  { fill: "#ec4899", stroke: "#f9a8d4" },
  { fill: "#fb7da8", stroke: "#ffc9dd" },
];

const CONFETTI_COLORS = ["#ff7eb3", "#ff528f", "#ffd700", "#ff69b4", "#fff", "#f472b6", "#fbbf24", "#a855f7"];

// ==================== COMPONENTS ====================

// --- Pixel Heart SVG ---
function PixelHeartSVG({ size, fill, stroke }: { size: number; fill: string; stroke: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="0" width="4" height="2" fill={stroke} />
      <rect x="10" y="0" width="4" height="2" fill={stroke} />
      <rect x="0" y="2" width="2" height="2" fill={stroke} />
      <rect x="6" y="2" width="4" height="2" fill={stroke} />
      <rect x="14" y="2" width="2" height="2" fill={stroke} />
      <rect x="0" y="4" width="2" height="2" fill={stroke} />
      <rect x="14" y="4" width="2" height="2" fill={stroke} />
      <rect x="0" y="6" width="2" height="2" fill={stroke} />
      <rect x="14" y="6" width="2" height="2" fill={stroke} />
      <rect x="2" y="8" width="2" height="2" fill={stroke} />
      <rect x="12" y="8" width="2" height="2" fill={stroke} />
      <rect x="4" y="10" width="2" height="2" fill={stroke} />
      <rect x="10" y="10" width="2" height="2" fill={stroke} />
      <rect x="6" y="12" width="2" height="2" fill={stroke} />
      <rect x="8" y="12" width="2" height="2" fill={stroke} />
      <rect x="2" y="2" width="4" height="2" fill={fill} />
      <rect x="10" y="2" width="4" height="2" fill={fill} />
      <rect x="2" y="4" width="12" height="2" fill={fill} />
      <rect x="2" y="6" width="12" height="2" fill={fill} />
      <rect x="4" y="8" width="8" height="2" fill={fill} />
      <rect x="6" y="10" width="4" height="2" fill={fill} />
    </svg>
  );
}

// --- Floating Hearts ---
function FloatingHearts() {
  const [hearts] = useState(() =>
    Array.from({ length: 22 }).map((_, i) => {
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const size = 40 + Math.floor(Math.random() * 80); // 40px to 120px — BIG hearts!
      return {
        id: i, size,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${7 + Math.random() * 8}s`,
        fill: color.fill, stroke: color.stroke,
      };
    })
  );

  return (
    <div className="floating-hearts-container">
      {hearts.map((h) => (
        <div key={h.id} className="pixel-heart" style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration }}>
          <PixelHeartSVG size={h.size} fill={h.fill} stroke={h.stroke} />
        </div>
      ))}
    </div>
  );
}

// --- Sparkle Stars ---
function Sparkles() {
  const [stars] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 70}%`,
      delay: `${Math.random() * 3}s`,
      size: 3 + Math.random() * 5,
    }))
  );
  return (
    <>
      {stars.map((s) => (
        <div key={s.id} className="sparkle" style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />
      ))}
    </>
  );
}

// --- Pixelated Landscape (mountains + buildings + clouds) ---
function Landscape() {
  return (
    <div className="landscape">
      <svg width="100%" height="100%" viewBox="0 0 1200 260" preserveAspectRatio="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
        {/* Clouds */}
        <g opacity="0.5">
          <rect x="100" y="10" width="80" height="20" rx="10" fill="#fff" />
          <rect x="90" y="15" width="100" height="15" rx="8" fill="#fff" />
          <rect x="400" y="25" width="60" height="15" rx="8" fill="#fff" />
          <rect x="390" y="30" width="80" height="12" rx="6" fill="#fff" />
          <rect x="800" y="5" width="90" height="18" rx="9" fill="#fff" />
          <rect x="790" y="10" width="110" height="14" rx="7" fill="#fff" />
          <rect x="1050" y="20" width="70" height="16" rx="8" fill="#fff" />
        </g>

        {/* Back mountain layer */}
        <polygon points="0,180 80,100 160,130 280,60 400,120 500,80 600,140 700,70 800,110 900,60 1000,130 1100,90 1200,150 1200,260 0,260" fill="#e8679a" opacity="0.5" />

        {/* Mid mountain layer */}
        <polygon points="0,220 100,150 200,180 300,120 420,170 540,130 650,190 750,140 850,170 950,120 1050,160 1150,140 1200,180 1200,260 0,260" fill="#d1497b" opacity="0.6" />

        {/* Front mountain layer */}
        <polygon points="0,240 60,200 150,210 250,180 350,210 450,190 550,220 650,195 750,215 850,190 950,220 1050,200 1150,210 1200,230 1200,260 0,260" fill="#c93a6b" opacity="0.7" />

        {/* Ground */}
        <rect x="0" y="230" width="1200" height="30" fill="#b8316a" />

        {/* Buildings silhouettes */}
        <g fill="#a02a5c" opacity="0.6">
          <rect x="50" y="190" width="25" height="40" />
          <rect x="80" y="200" width="18" height="30" />
          <rect x="200" y="185" width="30" height="45" />
          <rect x="235" y="195" width="20" height="35" />
          <rect x="900" y="180" width="28" height="50" />
          <rect x="935" y="195" width="22" height="35" />
          <rect x="1080" y="190" width="25" height="40" />
          <rect x="1110" y="200" width="18" height="30" />
        </g>

        {/* Small pixel hearts on top of mountains */}
        <g fill="#ff7eb3">
          <rect x="280" y="170" width="4" height="4" />
          <rect x="284" y="170" width="4" height="4" />
          <rect x="278" y="174" width="12" height="4" />
          <rect x="280" y="178" width="8" height="4" />
          <rect x="282" y="182" width="4" height="4" />

          <rect x="700" y="160" width="4" height="4" />
          <rect x="704" y="160" width="4" height="4" />
          <rect x="698" y="164" width="12" height="4" />
          <rect x="700" y="168" width="8" height="4" />
          <rect x="702" y="172" width="4" height="4" />

          <rect x="500" y="185" width="3" height="3" />
          <rect x="503" y="185" width="3" height="3" />
          <rect x="499" y="188" width="8" height="3" />
          <rect x="500" y="191" width="6" height="3" />
          <rect x="502" y="194" width="3" height="3" />
        </g>

        {/* Heart flowers / stems */}
        <g>
          <rect x="281" y="183" width="2" height="12" fill="#6b8e23" />
          <rect x="701" y="173" width="2" height="12" fill="#6b8e23" />
          <rect x="502" y="195" width="2" height="10" fill="#6b8e23" />
        </g>
      </svg>
    </div>
  );
}

// --- Confetti ---
function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${2 + Math.random() * 2}s`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
  );
  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div key={p.id} className="confetti-piece" style={{
          left: p.left, animationDelay: p.delay, animationDuration: p.duration,
          width: p.shape === 'rect' ? p.size : p.size,
          height: p.shape === 'rect' ? p.size * 0.5 : p.size,
          borderRadius: p.shape === 'circle' ? '50%' : '2px',
          backgroundColor: p.color,
        }} />
      ))}
    </div>
  );
}

// --- GIF or Fallback ---
function GifImage({ url, fallbackKey }: { url: string; fallbackKey: string }) {
  if (url) {
    return (
      <div className="gif-container">
        <img src={url} alt={fallbackKey} />
      </div>
    );
  }
  return (
    <div className="gif-container">
      <span className="gif-placeholder">{FALLBACK_EMOJIS[fallbackKey] || '💕'}</span>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState({
    date: '', dress: '', activity: '', place: '', vehicle: '', toDo: '', notToDo: '',
  });

  const updateForm = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => setStep((s) => s + 1), []);

  const handleYes = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      nextStep();
      setTimeout(() => setShowConfetti(false), 3000);
    }, 800);
  }, [nextStep]);

  return (
    <>
      <FloatingHearts />
      <Sparkles />
      <Landscape />
      {showConfetti && <Confetti />}

      <main className="app-container">
        <AnimatePresence mode="wait">
          {step === 0 && <ProposalStep key="s0" onYes={handleYes} />}
          {step === 1 && <SuccessStep key="s1" onContinue={nextStep} />}
          {step === 2 && <DateDressStep key="s2" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 3 && <ActivityStep key="s3" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 4 && <PlaceVehicleStep key="s4" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 5 && <TodoStep key="s5" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 6 && <FinalSummaryStep key="s6" data={formData} />}
        </AnimatePresence>
      </main>
    </>
  );
}

// ===================== STEP 1: PROPOSAL =====================
function ProposalStep({ onYes }: { onYes: () => void }) {
  const [noClicks, setNoClicks] = useState(0);
  const handleNo = () => setNoClicks((p) => p + 1);
  const noPhrase = NO_PHRASES[Math.min(noClicks, NO_PHRASES.length - 1)];

  // Cycle through proposal GIFs every 2 No clicks
  const gifIndex = PROPOSAL_GIFS.length > 0
    ? Math.min(Math.floor(noClicks / 2), PROPOSAL_GIFS.length - 1)
    : 0;
  const currentGif = PROPOSAL_GIFS[gifIndex] || '';

  return (
    <motion.div className="step-content"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}>

      <GifImage url={currentGif} fallbackKey="proposal" />

      <p className="hindi-subtitle">
        Mere dil par kabza karne wali Aatankw<span className="red">ADI</span> 💘
      </p>

      <h1>Will you go<br />out with me? 💕</h1>

      <div className="buttons-row">
        <motion.button className="btn btn-primary"
          style={{ fontSize: `${Math.min(1.25 + noClicks * 0.25, 3)}rem`, padding: `${0.75 + noClicks * 0.15}rem ${1.5 + noClicks * 0.3}rem` }}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          onClick={onYes}>
          YES 🎉
        </motion.button>

        <motion.button className="btn"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleNo}
          style={{ opacity: Math.max(1 - noClicks * 0.12, 0.25) }}>
          No
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {noClicks > 0 && (
          <motion.p key={noClicks} className="no-subtitle"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}>
            {noPhrase}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ===================== STEP 2: YAY =====================
function SuccessStep({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div className="step-content"
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}>
      <GifImage url={YAY_GIF} fallbackKey="yay" />
      <h1>YAY! 🎉💖</h1>
      <p className="pixel-text" style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>I'm so glad u said yes. 🥰</p>
      <motion.button className="btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onContinue}>
        PRESS TO CONTINUE →
      </motion.button>
    </motion.div>
  );
}

// ===================== STEP 3: DATE + DRESS =====================
function DateDressStep({ data, update, onNext }: { data: any; update: (f: string, v: string) => void; onNext: () => void }) {
  const dresses = [
    { label: 'Western', emoji: '👗' },
    { label: 'Traditional', emoji: '🥻' },
  ];
  return (
    <motion.div className="glass-panel"
      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}>
      <GifImage url={DATE_DRESS_GIF} fallbackKey="dateDress" />
      <h2 style={{ marginBottom: '1rem' }}>📅 Pick a Date</h2>
      <input type="date" className="input-field" value={data.date} onChange={(e) => update('date', e.target.value)} />
      <h2 style={{ margin: '1rem 0' }}>👗 Pick a Dress</h2>
      <div className="options-grid">
        {dresses.map((d) => (
          <div key={d.label} className={`option-card ${data.dress === d.label ? 'selected' : ''}`} onClick={() => update('dress', d.label)}>
            <span className="emoji">{d.emoji}</span>{d.label}
          </div>
        ))}
      </div>
      <motion.button className="btn btn-primary" onClick={onNext} disabled={!data.date || !data.dress}
        style={{ opacity: !data.date || !data.dress ? 0.5 : 1, marginTop: '1rem' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Next →
      </motion.button>
    </motion.div>
  );
}

// ===================== STEP 4: ACTIVITY =====================
function ActivityStep({ data, update, onNext }: { data: any; update: (f: string, v: string) => void; onNext: () => void }) {
  const activities = [
    { label: 'Movie', emoji: '🎬' },
    { label: 'Lunch', emoji: '🍝' },
    { label: 'Garden', emoji: '🌺' },
    { label: 'Cafe', emoji: '☕' },
    { label: 'Private Lunch', emoji: '🥂' },
    { label: 'Surprise me', emoji: '🎁' },
  ];
  return (
    <motion.div className="glass-panel"
      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}>
      <GifImage url={ACTIVITY_GIF} fallbackKey="activity" />
      <h2 style={{ marginBottom: '1.5rem' }}>💭 What would you like to do?</h2>
      <div className="options-grid three-col">
        {activities.map((a) => (
          <div key={a.label} className={`option-card ${data.activity === a.label ? 'selected' : ''}`} onClick={() => update('activity', a.label)}>
            <span className="emoji">{a.emoji}</span>{a.label}
          </div>
        ))}
      </div>
      <motion.button className="btn btn-primary" onClick={onNext} disabled={!data.activity}
        style={{ opacity: !data.activity ? 0.5 : 1, marginTop: '1rem' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        🔒 Lock it in
      </motion.button>
    </motion.div>
  );
}

// ===================== STEP 5: PLACE + VEHICLE =====================
function PlaceVehicleStep({ data, update, onNext }: { data: any; update: (f: string, v: string) => void; onNext: () => void }) {
  const vehicles = [
    { label: 'By bike', emoji: '🏍️' },
    { label: 'By car', emoji: '🚗' },
    { label: 'By auto rikshaw', emoji: '🛺' },
  ];
  return (
    <motion.div className="glass-panel"
      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}>
      <GifImage url={PLACE_VEHICLE_GIF} fallbackKey="placeVehicle" />
      <h2 style={{ marginBottom: '1rem' }}>📍 Select a Place</h2>
      <input type="text" className="input-field" placeholder="Where should we go? 💫" value={data.place} onChange={(e) => update('place', e.target.value)} />
      <h2 style={{ margin: '1rem 0' }}>🚗 Mode of Travel</h2>
      <div className="options-grid three-col">
        {vehicles.map((v) => (
          <div key={v.label} className={`option-card ${data.vehicle === v.label ? 'selected' : ''}`} onClick={() => update('vehicle', v.label)}>
            <span className="emoji">{v.emoji}</span>{v.label}
          </div>
        ))}
      </div>
      <motion.button className="btn btn-primary" onClick={onNext} disabled={!data.place || !data.vehicle}
        style={{ opacity: !data.place || !data.vehicle ? 0.5 : 1, marginTop: '1rem' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Next →
      </motion.button>
    </motion.div>
  );
}

// ===================== STEP 6: TO-DO =====================
function TodoStep({ data, update, onNext }: { data: any; update: (f: string, v: string) => void; onNext: () => void }) {
  return (
    <motion.div className="glass-panel"
      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}>
      <GifImage url={TODO_GIF} fallbackKey="todo" />
      <h2 style={{ marginBottom: '1rem' }}>✨ Things to Do</h2>
      <textarea className="input-field" rows={3} placeholder="What should we do together? 💕" value={data.toDo} onChange={(e) => update('toDo', e.target.value)} />
      <h2 style={{ margin: '1rem 0' }}>🚫 Things NOT to Do</h2>
      <textarea className="input-field" rows={3} placeholder="Any dealbreakers this time? 😅" value={data.notToDo} onChange={(e) => update('notToDo', e.target.value)} />
      <motion.button className="btn btn-primary" onClick={onNext} style={{ marginTop: '1rem' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        See Final Date 💌
      </motion.button>
    </motion.div>
  );
}

// ===================== STEP 7: FINAL SUMMARY =====================
function FinalSummaryStep({ data }: { data: any }) {
  const text = `
Our Date is Locked In! 💕

📅 When: ${data.date}
👗 Dress: ${data.dress}
🎉 Activity: ${data.activity}
📍 Place: ${data.place}
🚗 Transport: ${data.vehicle}

✨ Things to do:
${data.toDo || 'None specified'}

🚫 Things NOT to do:
${data.notToDo || 'None specified'}

Can't wait! ❤️
  `.trim();

  const waLink = `https://wa.me/918987519442?text=${encodeURIComponent(text)}`;

  return (
    <motion.div className="glass-panel"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <GifImage url={CELEBRATION_GIF} fallbackKey="celebration" />
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>It's a Date! ❤️</h1>
      <p className="pixel-text" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Here's the plan, cutie 🥰</p>

      <div className="summary-card">
        <p>📅 <strong>Date:</strong> {data.date}</p>
        <p>👗 <strong>Dress:</strong> {data.dress}</p>
        <p>🎉 <strong>Activity:</strong> {data.activity}</p>
        <p>📍 <strong>Place:</strong> {data.place}</p>
        <p>🚗 <strong>Transport:</strong> {data.vehicle}</p>
        {data.toDo && <p>✨ <strong>To do:</strong> {data.toDo}</p>}
        {data.notToDo && <p>🚫 <strong>Not to do:</strong> {data.notToDo}</p>}
      </div>

      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
        <motion.button className="btn btn-primary"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ width: '100%' }}>
          Send this to your Kuchu Puchu 💌
        </motion.button>
      </a>
    </motion.div>
  );
}
