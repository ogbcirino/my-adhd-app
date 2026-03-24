import React, { useState, useEffect, useRef } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) { return initialValue; }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const styles = `
:root { 
  --bg: #0a0a0f; --card: #12121e; --accent: #7c3aed; --text: #f0eeff; 
  --muted: #7b6fa0; --success: #10b981; --gradient: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); 
}
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; }
.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.progress-container { width: 100%; height: 8px; background: #222; border-radius: 10px; margin-bottom: 30px; overflow: hidden; }
.progress-bar { height: 100%; background: var(--gradient); transition: width 0.5s ease; }
.nav-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 10px; margin-bottom: 30px; }
.nav-card { background: var(--card); padding: 12px; border-radius: 12px; text-align: center; cursor: pointer; border: 1px solid #222; transition: 0.2s; font-size: 0.75rem; font-weight: bold; }
.nav-card.active { background: var(--gradient); border-color: transparent; }
.main-card { background: var(--card); border-radius: 20px; padding: 40px; border: 1px solid #222; min-height: 450px; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
.btn { background: var(--gradient); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
.stat-box { background: #080810; padding: 12px; border-radius: 10px; border: 1px solid #2a2a45; margin-bottom: 10px; font-size: 0.9rem; }
input, textarea { width: 100%; background: #080810; border: 1px solid #2a2a45; border-radius: 8px; padding: 14px; color: white; margin-top: 10px; font-family: inherit; }
.sound-btn { background: #1a1a2e; border: 1px solid #2a2a45; color: white; padding: 10px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
.sound-btn.active { border-color: var(--accent); background: #2a2a45; }
.history-item { padding: 10px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; color: var(--muted); font-size: 0.9rem; }
`;

export default function ADHDApp() {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "dash");
  const [wins, setWins] = useLocalStorage("wins_count", 0);
  const [tasks, setTasks] = useLocalStorage("global_tasks", []);
  const [history, setHistory] = useLocalStorage("task_history", []);
  const [purgeText, setPurgeText] = useLocalStorage("purge_text", "");
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isActive, setIsActive] = useState(false);

  // Audio State
  const [currentSound, setCurrentSound] = useState(null);
  const audioRef = useRef(new Audio());

  const sounds = {
    rain: "https://www.soundjay.com/nature/rain-01.mp3",
    white: "https://www.soundjay.com/misc/white-noise-01.mp3",
    cafe: "https://www.soundjay.com/misc/soundshell-1.mp3"
  };

  const toggleSound = (key) => {
    if (currentSound === key) {
      audioRef.current.pause();
      setCurrentSound(null);
    } else {
      audioRef.current.src = sounds[key];
      audioRef.current.loop = true;
      audioRef.current.play();
      setCurrentSound(key);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      handleComplete("Micro-Burst Session");
      setTimeLeft(300);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = (taskName) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory([{ name: taskName, time: timestamp }, ...history].slice(0, 50));
    setWins(prev => prev + 1);
    setTasks(prev => prev.filter(t => t !== taskName));
  };

  const progressPct = Math.min(100, (history.filter(h => h.name !== "Micro-Burst Session").length / 5) * 100);

  return (
    <div className="container">
      <style>{styles}</style>
      <header className="header">
        <h1>ADHD_OS</h1>
        <div className="stat-box">Dopamine: <span style={{ color: '#f9a8d4' }}>{wins}</span></div>
      </header>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPct}%` }}></div>
      </div>

      <nav className="nav-grid">
        {['dash', 'dump', 'focus', 'timer', 'history'].map(tab => (
          <div key={tab} className={`nav-card ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </nav>

      <main className="main-card">
        {activeTab === 'dash' && (
          <div>
            <h2>Dashboard</h2>
            <div className="stat-box"><strong>Current Target:</strong> {tasks[0] || "None"}</div>
            <div style={{ marginTop: '20px' }}>
              <h3>Focus Sounds</h3>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className={`sound-btn ${currentSound === 'rain' ? 'active' : ''}`} onClick={() => toggleSound('rain')}>🌧️ Rain</button>
                <button className={`sound-btn ${currentSound === 'white' ? 'active' : ''}`} onClick={() => toggleSound('white')}>🌫️ White Noise</button>
                <button className={`sound-btn