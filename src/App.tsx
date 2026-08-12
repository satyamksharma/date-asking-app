import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAT_GIF = "https://media.tenor.com/TKbwE0C-5xAAAAAi/mochi-cat.gif";
const PANDA_GIF = "https://media.tenor.com/ef3I-Kk5t9IAAAAj/bubu-dudu-kiss.gif";

const NO_PHRASES = [
  "No",
  "Are you sure?",
  "Better say yes!",
  "I'm gonna cry..",
  "You're breaking my heart",
  "Please? 🥺",
];

export default function App() {
  const [step, setStep] = useState(0);
  
  // Floating Hearts Generation
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
    }));
    setHearts(newHearts);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    date: '',
    dress: '',
    activity: '',
    place: '',
    vehicle: '',
    toDo: '',
    notToDo: ''
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => s + 1);

  return (
    <>
      <div className="floating-hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration }}
          />
        ))}
      </div>
      
      <main className="app-container">
        <AnimatePresence mode="wait">
          {step === 0 && <ProposalStep key="step0" onYes={nextStep} />}
          {step === 1 && <SuccessStep key="step1" onContinue={nextStep} />}
          {step === 2 && <DateDressStep key="step2" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 3 && <ActivityStep key="step3" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 4 && <DetailsStep key="step4" data={formData} update={updateForm} onNext={nextStep} />}
          {step === 5 && <FinalSummaryStep key="step5" data={formData} />}
        </AnimatePresence>
      </main>
    </>
  );
}

// --- Steps Components ---

function ProposalStep({ onYes }: { onYes: () => void }) {
  const [noClicks, setNoClicks] = useState(0);
  
  const handleNo = () => {
    setNoClicks(prev => prev + 1);
  };

  const noPhrase = NO_PHRASES[Math.min(noClicks, NO_PHRASES.length - 1)];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center text-center"
    >
      <div className="gif-container">
        <img src={CAT_GIF} alt="Cute cat" />
      </div>
      
      <h1>Will you go<br/>out with me?</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <motion.button 
          className="btn btn-primary"
          style={{ fontSize: `${Math.min(1.25 + noClicks * 0.2, 3)}rem`, padding: `${0.75 + noClicks * 0.2}rem ${1.5 + noClicks * 0.3}rem` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
        >
          YES+
        </motion.button>
        
        <motion.button 
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNo}
          style={{ opacity: Math.max(1 - (noClicks * 0.15), 0.2) }}
        >
          {noPhrase}
        </motion.button>
      </div>
    </motion.div>
  );
}

function SuccessStep({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center text-center"
    >
      <div className="gif-container">
        <img src={PANDA_GIF} alt="Panda kissing" />
      </div>
      
      <h1>YAY!</h1>
      <p className="pixel-text" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        I'm so glad u said yes.
      </p>
      
      <motion.button 
        className="btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        PRESS TO CONTINUE →
      </motion.button>
    </motion.div>
  );
}

function DateDressStep({ data, update, onNext }: any) {
  const dresses = ["Western", "Traditional"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="glass-panel"
    >
      <h2 style={{ marginBottom: '1.5rem' }}>Pick a Date</h2>
      <input 
        type="date" 
        className="input-field" 
        value={data.date} 
        onChange={(e) => update('date', e.target.value)} 
      />

      <h2 style={{ margin: '2rem 0 1.5rem' }}>Pick a Dress</h2>
      <div className="options-grid">
        {dresses.map(d => (
          <div 
            key={d} 
            className={`option-card ${data.dress === d ? 'selected' : ''}`}
            onClick={() => update('dress', d)}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={onNext}
          disabled={!data.date || !data.dress}
          style={{ opacity: (!data.date || !data.dress) ? 0.5 : 1 }}
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}

function ActivityStep({ data, update, onNext }: any) {
  const activities = ["Movie", "Lunch", "Garden", "Cafe", "Private Lunch", "Surprise me"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="glass-panel"
    >
      <h2 style={{ marginBottom: '1.5rem' }}>What would you like to do?</h2>
      <div className="options-grid">
        {activities.map(a => (
          <div 
            key={a} 
            className={`option-card ${data.activity === a ? 'selected' : ''}`}
            onClick={() => update('activity', a)}
          >
            {a}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={onNext}
          disabled={!data.activity}
          style={{ opacity: !data.activity ? 0.5 : 1 }}
        >
          Lock it in
        </button>
      </div>
    </motion.div>
  );
}

function DetailsStep({ data, update, onNext }: any) {
  const vehicles = ["By bike", "By car", "By auto rikshaw"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="glass-panel"
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Select a place</h2>
      <input 
        type="text" 
        className="input-field" 
        placeholder="Where to?" 
        value={data.place} 
        onChange={(e) => update('place', e.target.value)} 
      />

      <h2 style={{ fontSize: '2rem', margin: '1.5rem 0 1rem' }}>Mode of vehicle</h2>
      <div className="options-grid">
        {vehicles.map(v => (
          <div 
            key={v} 
            className={`option-card ${data.vehicle === v ? 'selected' : ''}`}
            onClick={() => update('vehicle', v)}
          >
            {v}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '2rem', margin: '1.5rem 0 1rem' }}>Things to do</h2>
      <textarea 
        className="input-field" 
        rows={3} 
        placeholder="What should we do?" 
        value={data.toDo} 
        onChange={(e) => update('toDo', e.target.value)} 
      />

      <h2 style={{ fontSize: '2rem', margin: '1.5rem 0 1rem' }}>Things you would not want to do</h2>
      <textarea 
        className="input-field" 
        rows={3} 
        placeholder="Any dealbreakers?" 
        value={data.notToDo} 
        onChange={(e) => update('notToDo', e.target.value)} 
      />

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={onNext}
          disabled={!data.place || !data.vehicle}
          style={{ opacity: (!data.place || !data.vehicle) ? 0.5 : 1 }}
        >
          See Final Date
        </button>
      </div>
    </motion.div>
  );
}

function FinalSummaryStep({ data }: any) {
  const subject = "Our Date is Locked In!";
  const body = `
Date Details:
---------------------
When: ${data.date}
Dress Code: ${data.dress}
Activity: ${data.activity}
Place: ${data.place}
Transport: ${data.vehicle}

Things to do:
${data.toDo || 'None specified'}

Things NOT to do:
${data.notToDo || 'None specified'}

Can't wait! ❤️
  `.trim();

  const mailtoLink = `mailto:ksatyam433@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="glass-panel text-center"
      style={{ textAlign: 'center' }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>It's a Date! ❤️</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.7)', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', color: '#4a0d22', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Dress:</strong> {data.dress}</p>
        <p><strong>Activity:</strong> {data.activity}</p>
        <p><strong>Place:</strong> {data.place}</p>
        <p><strong>Transport:</strong> {data.vehicle}</p>
        {data.toDo && <p><strong>To do:</strong> {data.toDo}</p>}
        {data.notToDo && <p><strong>Not to do:</strong> {data.notToDo}</p>}
      </div>

      <a href={mailtoLink} style={{ textDecoration: 'none' }}>
        <motion.button 
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '100%' }}
        >
          Send to Satyam 💌
        </motion.button>
      </a>
    </motion.div>
  );
}
