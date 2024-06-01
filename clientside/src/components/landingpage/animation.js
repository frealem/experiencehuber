import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedLanding = () => {
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((index) => (index + 1) % 7);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <motion.h1
          style={{
            fontSize: '4rem',
            fontWeight: '900',
            color: '#333',
            marginBottom: '1rem',
          }}
          animate={{
            color: [ '#300C50', "#AB50E8" ,'#300C50','#6010A0', '#300C50','#673AB7', "#000000"],
          }}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          ExperienceHub
        </motion.h1>

        <p
          style={{
            fontSize: '1.5rem',
            color:'#300C50',
          }}
        >
          Share your experience, see what other experienced
        </p>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        >
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Go to About Page
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        <span style={{ opacity: loadingIndex === 0 ? 1 : 0.5 }}>L</span>
        <span style={{ opacity: loadingIndex === 1 ? 1 : 0.5 }}>o</span>
        <span style={{ opacity: loadingIndex === 2 ? 1 : 0.5 }}>a</span>
        <span style={{ opacity: loadingIndex === 3 ? 1 : 0.5 }}>d</span>
        <span style={{ opacity: loadingIndex === 4 ? 1 : 0.5 }}>i</span>
        <span style={{ opacity: loadingIndex === 5 ? 1 : 0.5 }}>n</span>
        <span style={{ opacity: loadingIndex === 6 ? 1 : 0.5 }}>g</span>
      </div>
    </div>
  );
};

export default AnimatedLanding;