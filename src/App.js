import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const App = () => {
  const [step, setStep] = useState('start');
  const [handsomeStep, setHandsomeStep] = useState(0);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [obsessedNoScale, setObsessedNoScale] = useState(1); // New state for the final prank
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.backgroundColor = '#FFB6C1';
  }, []);

  const myPhotos = [
    "/assets/raypic1.png",
    "/assets/raypic2.png",
    "/assets/raypic3.png",
    "/assets/raypic4.png",
    "/assets/raypic5.png",
  ];

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#ffffff', '#FF69B4', '#FFB6C1'];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const handleNoClick = () => {
    if (step === 'handsome_check') {
      setNoButtonScale(prev => prev * 0.5);
    } else if (step === 'obsessed') {
      setObsessedNoScale(prev => prev * 0.5); // Shrink the "ewww" button
    } else {
      setStep('bye');
    }
  };

  const handleYesHandsome = () => {
    if (handsomeStep < 4) {
      setDirection(1); 
      setHandsomeStep(prev => prev + 1);
      setNoButtonScale(1);
    } else {
      setStep('obsessed');
    }
  };

  const handleFinalYes = () => {
    triggerConfetti();
    setStep('final');
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.8 })
  };

  const containerStyle = {
    height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Quicksand", sans-serif', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden'
  };

  const cardStyle = {
    zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.25)', padding: '30px', borderRadius: '40px',
    backdropFilter: 'blur(15px)', border: '2px solid rgba(255, 255, 255, 0.4)', maxWidth: '400px',
    width: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
  };

  const btnPrimary = {
    backgroundColor: 'white', color: '#FF69B4', border: 'none', padding: '12px 25px', borderRadius: '18px',
    fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', flex: 1, boxShadow: '0 8px 15px rgba(255, 105, 180, 0.2)'
  };

  const btnSecondary = {
    backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.5)',
    padding: '12px 25px', borderRadius: '18px', fontSize: '1rem', cursor: 'pointer', flex: 1
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: (Math.random() * 100) + "vw", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
            transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', fontSize: Math.random() * 20 + 20 + 'px' }}
          >
            {i % 2 === 0 ? '🌸' : '✨'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {step === 'start' && (
          <motion.div key="v1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={cardStyle}>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>Lu Ceris? 🌸</h2>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', width: '100%' }}>
              <button style={btnPrimary} onClick={() => setStep('v2')}>Yes!</button>
              <button style={btnSecondary} onClick={handleNoClick}>No</button>
            </div>
          </motion.div>
        )}

        {step === 'v2' && (
          <motion.div key="v2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={cardStyle}>
            <div style={{ width: '250px', height: '250px', overflow: 'hidden', borderRadius: '25px', border: '4px solid white', marginBottom: '15px' }}>
                <img src="/assets/cerispic1.png" alt="Ceris" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem' }}>Dis u? ✨</h2>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', width: '100%' }}>
              <button style={btnPrimary} onClick={() => setStep('v3')}>Yes!</button>
              <button style={btnSecondary} onClick={handleNoClick}>No</button>
            </div>
          </motion.div>
        )}

        {step === 'v3' && (
          <motion.div key="v3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={cardStyle}>
            <p style={{ margin: 0, opacity: 0.8 }}>Final Confirmation...</p>
            <h2 style={{ fontSize: '1.4rem', margin: '10px 0 15px 0' }}>Ini lu, Charisse Athalia Nancy Siagian?</h2>
            
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', marginBottom: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src="/assets/cerisvid1.mp4" type="video/mp4" />
                </video>
            </div>

            <button style={{ ...btnPrimary, width: '100%' }} onClick={() => setStep('pre_game')}>Yes, definitely!</button>
          </motion.div>
        )}

        {step === 'pre_game' && (
          <motion.div key="pre_game" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={cardStyle}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>Wait! ✋</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '20px' }}>
              I'll ask a few questions. <br/> Answer <b>honestly</b>, Ceris!
            </p>
            <button style={{ ...btnPrimary, width: '100%' }} onClick={() => { setDirection(1); setStep('handsome_check'); }}>Okay kuya ray</button>
          </motion.div>
        )}

        {step === 'handsome_check' && (
          <motion.div key={`handsome-${handsomeStep}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 260, damping: 20 }} style={cardStyle}>
             <div style={{ position: 'relative', width: '280px', height: '280px' }}>
                <motion.img 
                  key={handsomeStep}
                  src={myPhotos[handsomeStep]} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '25px', border: '3px solid white' }} 
                />
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.3)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                  {handsomeStep + 1} / 5
                </div>
             </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>Is this guy handsome? 😍</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', width: '100%', alignItems: 'center' }}>
              <button style={btnPrimary} onClick={handleYesHandsome}>Yes!</button>
              <AnimatePresence>
                {noButtonScale > 0.1 && (
                  <motion.button layout initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0 }} animate={{ scale: noButtonScale }} onClick={handleNoClick} style={btnSecondary}>
                    No
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Updated Obsessed Step with shrinking No button */}
        {step === 'obsessed' && (
            <motion.div key="obsessed" variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
                <motion.h1 animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} style={{ fontSize: '3.5rem', margin: 0 }}>🤭</motion.h1>
                <p style={{ fontSize: '1.3rem', margin: '15px 0 25px 0' }}>I knew you were obsessed with me.</p>
                <div style={{ display: 'flex', gap: '15px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <button style={btnPrimary} onClick={handleFinalYes}>yes totally ❤️</button>
                    <AnimatePresence>
                      {obsessedNoScale > 0.1 && (
                        <motion.button 
                          layout
                          animate={{ scale: obsessedNoScale }} 
                          onClick={handleNoClick} 
                          style={btnSecondary}
                        >
                          nooo ewww
                        </motion.button>
                      )}
                    </AnimatePresence>
                </div>
            </motion.div>
        )}

        {step === 'final' && (
            <motion.div key="final" variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
                <h1 style={{ fontSize: '3.5rem', margin: 0 }}>🎁</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>Karena udah ngakuuu! ✅</p>
                <p style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '20px', border: '1px dashed white' }}>
                    ntar kuya ray bawa ole ole KALO INGAT from <b>Jakarta</b>! 🚄
                </p>
                <h3 style={{ marginTop: '20px' }}>Bye byeee, Ceris! 👋✨</h3>
            </motion.div>
        )}

        {step === 'bye' && (
            <motion.div key="bye" variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
                <h2 style={{ opacity: 0.6 }}>Ok Bye. ✌️</h2>
                <button style={{ color: 'white', textDecoration: 'underline', background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer' }} onClick={() => setStep('start')}>Wait, Gw Ceris!</button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;