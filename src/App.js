import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const App = () => {
  const [step, setStep] = useState('start');
  const [handsomeStep, setHandsomeStep] = useState(0);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [obsessedNoScale, setObsessedNoScale] = useState(1);
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
      setObsessedNoScale(prev => prev * 0.5);
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

  // Improved variants for a "Pop" effect
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? 10 : -10
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? 10 : -10
    })
  };

  const containerStyle = {
    height: '100dvh', // Uses dynamic viewport height for mobile
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Quicksand", sans-serif',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 'clamp(20px, 5vw, 40px)',
    borderRadius: '40px',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    maxWidth: '450px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  };

  const btnPrimary = {
    backgroundColor: 'white',
    color: '#FF69B4',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '20px',
    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 10px 15px -3px rgba(255, 105, 180, 0.3)',
    transition: 'transform 0.2s'
  };

  const btnSecondary = {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.5)',
    padding: '12px 24px',
    borderRadius: '20px',
    fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
    cursor: 'pointer',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      {/* Visual Background: Responsive Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: (Math.random() * 100) + "vw", opacity: 0 }}
            animate={{ 
                y: "-10vh", 
                opacity: [0, 0.7, 0],
                rotate: [0, 360]
            }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', fontSize: 'clamp(20px, 6vw, 40px)' }}
          >
            {i % 2 === 0 ? '🌸' : '💖'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {step === 'start' && (
          <motion.div key="v1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
            <motion.h2 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', margin: '0 0 20px 0' }}
            >
                Lu Ceris? 🌸
            </motion.h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', width: '100%' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={btnPrimary} onClick={() => setStep('v2')}>Yes!</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} style={btnSecondary} onClick={handleNoClick}>No</motion.button>
            </div>
          </motion.div>
        )}

        {step === 'v2' && (
          <motion.div key="v2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
            <motion.div 
                whileHover={{ rotate: 5 }}
                style={{ width: 'clamp(180px, 50vw, 250px)', height: 'clamp(180px, 50vw, 250px)', overflow: 'hidden', borderRadius: '30px', border: '6px solid white', marginBottom: '20px' }}
            >
                <img src="/assets/cerispic1.png" alt="Ceris" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)' }}>Dis u? ✨</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px', width: '100%' }}>
              <button style={btnPrimary} onClick={() => setStep('v3')}>Yes!</button>
              <button style={btnSecondary} onClick={handleNoClick}>No</button>
            </div>
          </motion.div>
        )}

        {step === 'v3' && (
          <motion.div key="v3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>Final Confirmation...</p>
            <h2 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.6rem)', margin: '15px 0' }}>Ini lu, Charisse Athalia Nancy Siagian?</h2>
            
            <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: 'clamp(140px, 40vw, 180px)', height: 'clamp(140px, 40vw, 180px)', borderRadius: '50%', overflow: 'hidden', border: '5px solid white', marginBottom: '25px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
            >
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src="/assets/cerisvid1.mp4" type="video/mp4" />
                </video>
            </motion.div>

            <button style={btnPrimary} onClick={() => setStep('pre_game')}>Yes, definitely!</button>
          </motion.div>
        )}

        {step === 'pre_game' && (
          <motion.div key="pre_game" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
            <motion.h2 
                animate={{ scale: [1, 1.1, 1] }}
                style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', marginBottom: '15px' }}
            >
                Wait! ✋
            </motion.h2>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', lineHeight: '1.6', marginBottom: '25px' }}>
              I'll ask a few questions. <br/> Answer <span style={{color: '#FFECF0', fontWeight: 'bold'}}>honestly</span>, Ceris!
            </p>
            <button style={btnPrimary} onClick={() => { setDirection(1); setStep('handsome_check'); }}>Okay kuya ray</button>
          </motion.div>
        )}

        {step === 'handsome_check' && (
          <motion.div key={`handsome-${handsomeStep}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
             <div style={{ position: 'relative', width: 'clamp(240px, 70vw, 280px)', height: 'clamp(240px, 70vw, 280px)' }}>
                <motion.img 
                  key={handsomeStep}
                  src={myPhotos[handsomeStep]} 
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px', border: '5px solid white' }} 
                />
                <div style={{ position: 'absolute', top: -10, right: -10, background: '#FF69B4', padding: '8px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  {handsomeStep + 1} / 5
                </div>
             </div>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '25px' }}>Is this guy handsome? 😍</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px', width: '100%', alignItems: 'center' }}>
              <button style={btnPrimary} onClick={handleYesHandsome}>Yes!</button>
              <AnimatePresence>
                {noButtonScale > 0.1 && (
                  <motion.button 
                    layout 
                    initial={{ opacity: 1 }} 
                    exit={{ opacity: 0, scale: 0 }} 
                    animate={{ scale: noButtonScale }} 
                    onClick={handleNoClick} 
                    style={btnSecondary}
                  >
                    No
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {step === 'obsessed' && (
            <motion.div key="obsessed" variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
                <motion.h1 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ fontSize: '4rem', margin: 0 }}
                >
                    🤭
                </motion.h1>
                <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', margin: '20px 0 30px 0', fontWeight: '600' }}>
                    I knew you were obsessed with me.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
                <motion.h1 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '4rem', margin: 0 }}
                >
                    🎁
                </motion.h1>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '15px 0' }}>Karena udah ngakuuu! ✅</p>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '25px', border: '2px dashed white', width: '100%', boxSizing: 'border-box' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        ntar kuya ray bawa ole ole KALO INGAT from <b>Jakarta</b>! 🚄
                    </p>
                </div>
                <h3 style={{ marginTop: '25px', opacity: 0.9 }}>Bye byeee, Ceris! 👋✨</h3>
            </motion.div>
        )}

        {step === 'bye' && (
            <motion.div key="bye" variants={slideVariants} initial="enter" animate="center" exit="exit" style={cardStyle}>
                <h2 style={{ fontSize: '2.5rem', opacity: 0.7 }}>Ok Bye. ✌️</h2>
                <button 
                    style={{ color: 'white', textDecoration: 'underline', background: 'none', border: 'none', marginTop: '20px', cursor: 'pointer', fontSize: '1.1rem' }} 
                    onClick={() => setStep('start')}
                >
                    Wait, Gw Ceris!
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;