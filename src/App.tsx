import React, { useState, useEffect } from 'react';
import { School, Trophy, Users, Calendar, BookOpen, Crown, Star, Globe, Award, Shield } from 'lucide-react';
import { ALL_STPAULS_QUESTIONS, Question } from './data/allStPaulsQuestions';

interface Player {
  name: string;
  house: 'Tudor' | 'Stuart' | 'Windsor';
  score: number;
}

// 🏰 AUTHENTIC ST. PAUL'S SCHOOL HOUSE SYSTEM - SINCE 1931 🏰
const HOUSES = [
  { 
    name: 'Stuart', 
    color: '#002f5c',
    emblem: '👑',
    dynasty: '1371 – 1714',
    officialImage: './images/stuart-original.png'
  },
  { 
    name: 'Tudor', 
    color: '#a3282f',
    emblem: '🌹',
    dynasty: '1485 – 1603',
    officialImage: './images/tudor-original.png'
  },
  { 
    name: 'Windsor', 
    color: '#636363',
    emblem: '👑',
    dynasty: '1917 – Present',
    officialImage: './images/windsor-original.png'
  }
];

function App() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showHouseSelection, setShowHouseSelection] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const stPaulsQuestions: Question[] = ALL_STPAULS_QUESTIONS;

  useEffect(() => {
    setQuestions(stPaulsQuestions);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [isTimerActive, timeLeft]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setShowAnswer(true);
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const playIntroductionAudio = () => {
    // Stop any currently playing audio to prevent overlapping
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    // Create new audio instance
    const audio = new Audio('./Audios/INTRODUCTION.wav');
    audio.volume = 1.0;
    
    // Set as current audio for cleanup
    setCurrentAudio(audio);
    
    // Play the audio
    audio.play().then(() => {
      console.log('🎵 Welcome audio playing successfully!');
    }).catch((error) => {
      console.log('Audio autoplay blocked by browser - this is normal:', error);
    });
    
    // Clean up when audio ends
    audio.addEventListener('ended', () => {
      setCurrentAudio(null);
    });
  };


  const setupPlayers = (numPlayers: number, selectedHouse?: string) => {
    // Play welcome audio when starting any game
    playIntroductionAudio();
    
    const newPlayers: Player[] = [];
    
    if (numPlayers === 1 && selectedHouse) {
      // Quick Start mode with house selection
      newPlayers.push({
        name: `Player 1`,
        house: selectedHouse as any,
        score: 0
      });
    } else {
      // Regular mode
      for (let i = 0; i < numPlayers; i++) {
        newPlayers.push({
          name: `Player ${i + 1}`,
          house: HOUSES[i % 3].name as any,
          score: 0
        });
      }
    }
    
    setPlayers(newPlayers);
    setGameState('playing');
    nextQuestion();
  };

  const resetGame = () => {
    // Stop any playing audio when resetting
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    
    setGameState('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    setShowAnswer(false);
    setSelectedAnswer(null);
    setRound(1);
    setTimeLeft(30);
    setIsTimerActive(false);
    setShowHouseSelection(false);
  };

  const nextQuestion = () => {
    if (usedQuestions.size >= questions.length) {
      setGameState('finished');
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.has(randomIndex));

    setCurrentQuestion(questions[randomIndex]);
    setUsedQuestions(prev => new Set(prev).add(randomIndex));
    setShowAnswer(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answer);
    setIsTimerActive(false);
    setShowAnswer(true);

    if (answer === currentQuestion?.answer) {
      setPlayers(prev => prev.map((player, index) => 
        index === currentPlayerIndex 
          ? { ...player, score: player.score + 1 }
          : player
      ));
    }

    setTimeout(() => {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      if ((currentPlayerIndex + 1) % players.length === 0) {
        setRound(prev => prev + 1);
      }
      nextQuestion();
    }, 3000);
  };

  const getHouseEmblem = (houseName: string) => {
    const house = HOUSES.find(h => h.name === houseName);
    return house?.emblem || '👑';
  };

  if (gameState === 'setup') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'radial-gradient(ellipse at top, rgba(163, 40, 47, 0.15) 0%, rgba(55, 55, 55, 0.1) 30%, rgba(0, 47, 92, 0.08) 70%, rgba(99, 99, 99, 0.05) 100%), linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
      }}>
        {/* Advanced Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {/* Magical Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `rgba(${Math.random() > 0.5 ? '255, 215, 0' : '163, 40, 47'}, ${Math.random() * 0.8 + 0.2})`,
                borderRadius: '50%',
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 215, 0, 0.5)`
              }}
            />
          ))}

          {/* Floating Royal Elements */}
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '3%',
            fontSize: '4rem',
            color: 'rgba(255, 215, 0, 0.3)',
            animation: 'majesticFloat 25s ease-in-out infinite',
            animationDelay: '0s',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
          }}>🏛️</div>
          
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            fontSize: '3.5rem',
            color: 'rgba(163, 40, 47, 0.4)',
            animation: 'royalSway 30s ease-in-out infinite',
            animationDelay: '5s',
            filter: 'drop-shadow(0 0 15px rgba(163, 40, 47, 0.6))'
          }}>👑</div>
          
          <div style={{
            position: 'absolute',
            bottom: '12%',
            left: '5%',
            fontSize: '3rem',
            color: 'rgba(0, 47, 92, 0.35)',
            animation: 'academicDrift 28s ease-in-out infinite',
            animationDelay: '10s',
            filter: 'drop-shadow(0 0 18px rgba(0, 47, 92, 0.5))'
          }}>📚</div>
          
          <div style={{
            position: 'absolute',
            top: '55%',
            right: '4%',
            fontSize: '3.8rem',
            color: 'rgba(255, 215, 0, 0.25)',
            animation: 'nobilitySpin 35s ease-in-out infinite',
            animationDelay: '15s',
            filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.4))'
          }}>⚜️</div>
          
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '12%',
            fontSize: '3.2rem',
            color: 'rgba(99, 99, 99, 0.3)',
            animation: 'castleGlow 32s ease-in-out infinite',
            animationDelay: '8s',
            filter: 'drop-shadow(0 0 20px rgba(99, 99, 99, 0.4))'
          }}>🏰</div>

          {/* Advanced Geometric Animations */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '12%',
            width: '150px',
            height: '150px',
            background: 'conic-gradient(from 0deg, rgba(163, 40, 47, 0.1), rgba(255, 215, 0, 0.1), rgba(0, 47, 92, 0.1), rgba(163, 40, 47, 0.1))',
            borderRadius: '50%',
            animation: 'prismaticRotate 45s linear infinite',
            filter: 'blur(1px)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '35%',
            right: '18%',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(163, 40, 47, 0.1) 50%, transparent 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphBlob 20s ease-in-out infinite',
            filter: 'blur(0.5px)'
          }}></div>

          {/* Mystical Aura Effects */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 30%, rgba(163, 40, 47, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(0, 47, 92, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(99, 99, 99, 0.06) 0%, transparent 50%)
            `,
            animation: 'auraShift 40s ease-in-out infinite'
          }}></div>
        </div>

        {/* Advanced CSS Animations */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes majesticFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-30px) translateX(15px) rotate(3deg) scale(1.05); }
            50% { transform: translateY(-20px) translateX(-10px) rotate(-2deg) scale(0.95); }
            75% { transform: translateY(-25px) translateX(8px) rotate(1deg) scale(1.02); }
          }

          @keyframes royalSway {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            33% { transform: translateY(-25px) rotate(5deg) scale(1.1); }
            66% { transform: translateY(-15px) rotate(-3deg) scale(0.9); }
          }

          @keyframes academicDrift {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(-15px) rotate(-5deg); }
            50% { transform: translateY(-35px) translateX(20px) rotate(3deg); }
            75% { transform: translateY(-10px) translateX(-8px) rotate(-2deg); }
          }

          @keyframes nobilitySpin {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-30px) rotate(90deg) scale(1.15); }
            50% { transform: translateY(-15px) rotate(180deg) scale(0.85); }
            75% { transform: translateY(-25px) rotate(270deg) scale(1.05); }
          }

          @keyframes castleGlow {
            0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 20px rgba(99, 99, 99, 0.4)); }
            50% { transform: translateY(-20px) scale(1.08); filter: drop-shadow(0 0 30px rgba(99, 99, 99, 0.7)); }
          }

          @keyframes prismaticRotate {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.1); }
            50% { transform: rotate(180deg) scale(0.9); }
            75% { transform: rotate(270deg) scale(1.05); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes morphBlob {
            0%, 100% { 
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
              transform: rotate(0deg) scale(1);
            }
            25% { 
              border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
              transform: rotate(90deg) scale(1.1);
            }
            50% { 
              border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
              transform: rotate(180deg) scale(0.9);
            }
            75% { 
              border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
              transform: rotate(270deg) scale(1.05);
            }
          }

          @keyframes auraShift {
            0%, 100% { 
              transform: translateX(0%) translateY(0%) scale(1); 
              opacity: 1; 
            }
            25% { 
              transform: translateX(5%) translateY(-3%) scale(1.05); 
              opacity: 0.8; 
            }
            50% { 
              transform: translateX(-3%) translateY(5%) scale(0.95); 
              opacity: 1.2; 
            }
            75% { 
              transform: translateX(2%) translateY(-2%) scale(1.02); 
              opacity: 0.9; 
            }
          }

          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes mysticalPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }

          @keyframes etherealGlow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(163, 40, 47, 0.2);
            }
            50% { 
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(163, 40, 47, 0.4);
            }
          }
          
          .elegant-title {
            background: linear-gradient(45deg, #ffd700 0%, #a3282f 25%, #002f5c 50%, #a3282f 75%, #ffd700 100%);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 4s ease-in-out infinite;
            filter: drop-shadow(0 4px 8px rgba(163, 40, 47, 0.5));
          }

          .mystical-card {
            animation: mysticalPulse 8s ease-in-out infinite;
          }

          .ethereal-border {
            animation: etherealGlow 6s ease-in-out infinite;
          }
        `}</style>

        {/* Header with Enhanced Typography */}
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 10 }}>
          <h1 className="elegant-title" style={{ 
            fontSize: '3.2rem', 
            fontWeight: '900', 
            marginBottom: '10px',
            fontFamily: '"Playfair Display", serif',
            letterSpacing: '2px',
            lineHeight: '1.1'
          }}>
            ST. PAUL'S SCHOOL
          </h1>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#373737',
            marginBottom: '8px',
            fontFamily: '"Playfair Display", serif',
            letterSpacing: '1px'
          }}>
            HISTORY QUIZ
          </h2>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #a3282f, #373737)',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            fontFamily: '"Crimson Text", serif',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 15px rgba(163, 40, 47, 0.3)',
            marginBottom: '12px'
          }}>
            🏛️ CENTENARY EDITION 🏛️
          </div>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#636363',
            fontFamily: '"Crimson Text", serif',
            fontStyle: 'italic',
            fontWeight: '400'
          }}>
            1926 ➤ 2026 • Nearly a Century of Excellence
          </p>
        </div>

        {/* Main Content */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          position: 'relative',
          zIndex: 10
        }}>
          
          {/* Left Side - Headmaster */}
          <div className="mystical-card ethereal-border" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '25px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #a3282f, #373737)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '20px',
                display: 'inline-block',
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(163, 40, 47, 0.3)',
                textTransform: 'uppercase'
              }}>
                👑 HEADMASTER 👑
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src="./images/titus-edge-nobg.jpg"
                  alt="Mr. Titus Edge" 
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '3px solid #a3282f',
                    marginBottom: '15px'
                  }}
                />
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '700', 
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: '0.5px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                  Mr. Titus Edge
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#f0f0f0',
                  fontFamily: '"Crimson Text", serif',
                  fontStyle: 'italic',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                }}>
                  🏴󠁧󠁢󠁳󠁣󠁴󠁿 Formerly of Gordonstoun School, Scotland
                </p>
              </div>

              <blockquote style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
                padding: '20px',
                borderLeft: '5px solid #a3282f',
                borderRadius: '12px',
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: '#ffffff',
                marginBottom: '20px',
                fontFamily: '"Crimson Text", serif',
                fontWeight: '600',
                lineHeight: '1.4',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(163, 40, 47, 0.3)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '20px',
                  backgroundColor: '#a3282f',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  fontFamily: '"Playfair Display", serif'
                }}>
                  WELCOME MESSAGE
                </div>
                "Welcome to our magnificent centenary celebration quiz!"
              </blockquote>

              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'left',
                border: '1px solid rgba(163, 40, 47, 0.3)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}>
                <h4 style={{ 
                  fontWeight: '700', 
                  marginBottom: '12px', 
                  color: '#ffffff',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}>
                  🏛️ About St. Paul's School
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6', 
                  color: '#f0f0f0',
                  fontFamily: '"Crimson Text", serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}>
                  Founded in <strong>1926</strong>, St. Paul's School is one of Brazil's most prestigious 
                  British international schools, with nearly a century of educational excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Game Setup */}
          <div>
            {/* Houses */}
            <div className="mystical-card ethereal-border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '30px',
              borderRadius: '25px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              marginBottom: '20px',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
            }}>
              <h3 style={{ 
                fontSize: '2.2rem', 
                fontWeight: '900', 
                textAlign: 'center', 
                marginBottom: '8px',
                color: '#a3282f',
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '1px'
              }}>
                👑 Royal House Competition 👑
              </h3>
              <div style={{
                textAlign: 'center',
                marginBottom: '25px',
                background: 'linear-gradient(135deg, #a3282f, #373737)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '20px',
                display: 'inline-block',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: '"Crimson Text", serif',
                boxShadow: '0 4px 12px rgba(163, 40, 47, 0.3)'
              }}>
                Since 1931: British Royal House System
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                marginBottom: '20px'
              }}>
                {HOUSES.map((house) => (
                  <div 
                    key={house.name}
                    style={{
                      backgroundColor: 'transparent',
                      border: `4px solid ${house.color}`,
                      borderRadius: '18px',
                      overflow: 'hidden',
                      textAlign: 'center',
                      boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 20px ${house.color}30`,
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 12px 35px rgba(0,0,0,0.4), 0 0 30px ${house.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 25px rgba(0,0,0,0.3), 0 0 20px ${house.color}30`;
                    }}
                  >
                    <div style={{
                      height: '140px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={house.officialImage}
                        alt={`${house.name} House`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: `${house.color}`,
                        color: 'white',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}>
                        {house.emblem}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: house.color }}>
                      <h4 style={{ 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem',
                        color: 'white',
                        margin: '0 0 4px 0'
                      }}>
                        {house.name}
                      </h4>
                      <p style={{ 
                        fontSize: '0.7rem', 
                        opacity: 0.9,
                        color: 'white',
                        margin: 0
                      }}>
                        {house.dynasty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Modes */}
            <div className="mystical-card ethereal-border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '30px',
              borderRadius: '25px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
            }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                marginBottom: '20px',
                color: '#ffffff',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                Choose Competition Format
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px'
              }}>
                <button
                  onClick={() => setupPlayers(1)}
                  style={{
                    backgroundColor: '#636363',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  <BookOpen style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                  <div>Individual</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Solo Study</div>
                </button>
                
                <button
                  onClick={() => setupPlayers(2)}
                  style={{
                    backgroundColor: '#a3282f',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  <Users style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                  <div>2 Houses</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Competition</div>
                </button>
                
                <button
                  onClick={() => setupPlayers(3)}
                  style={{
                    backgroundColor: '#373737',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  <Trophy style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                  <div>Championship</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>All Houses</div>
                </button>
                
                <button
                  onClick={() => setShowHouseSelection(true)}
                  style={{
                    backgroundColor: '#002f5c',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  <Crown style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                  <div>Quick Start</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Choose House</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* House Selection Modal */}
        {showHouseSelection && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}>
            <div className="mystical-card ethereal-border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '40px',
              borderRadius: '25px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(255, 215, 0, 0.4)',
              maxWidth: '600px',
              width: '90%',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowHouseSelection(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(163, 40, 47, 0.1)',
                  border: '2px solid #a3282f',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#a3282f',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: '900',
                textAlign: 'center',
                marginBottom: '10px',
                color: '#a3282f',
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '1px'
              }}>
                👑 Choose Your Royal House 👑
              </h2>
              
              <p style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: '#373737',
                fontSize: '1.1rem',
                fontFamily: '"Crimson Text", serif',
                fontStyle: 'italic'
              }}>
                Select the house you wish to represent in the quiz
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px'
              }}>
                {HOUSES.map((house) => (
                  <button
                    key={house.name}
                    onClick={() => {
                      setupPlayers(1, house.name);
                      setShowHouseSelection(false);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: `4px solid ${house.color}`,
                      borderRadius: '18px',
                      overflow: 'hidden',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                      boxShadow: `0 8px 25px rgba(0,0,0,0.2), 0 0 15px ${house.color}30`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 12px 35px rgba(0,0,0,0.3), 0 0 25px ${house.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2), 0 0 15px ${house.color}30`;
                    }}
                  >
                    <div style={{
                      height: '120px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent'
                    }}>
                      <img 
                        src={house.officialImage}
                        alt={`${house.name} House`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: `${house.color}`,
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}>
                        {house.emblem}
                      </div>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: house.color }}>
                      <h4 style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1.1rem',
                        color: 'white',
                        margin: '0 0 5px 0',
                        fontFamily: '"Playfair Display", serif'
                      }}>
                        House {house.name}
                      </h4>
                      <p style={{ 
                        fontSize: '0.8rem', 
                        opacity: 0.9,
                        color: 'white',
                        margin: 0,
                        fontFamily: '"Crimson Text", serif'
                      }}>
                        {house.dynasty}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    const currentPlayer = players[currentPlayerIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #373737 50%, #3f4449 100%)',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Back to Home Button */}
            <button
              onClick={resetGame}
              style={{
                backgroundColor: '#636363',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#505050';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#636363';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🏠 Home
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                backgroundColor: '#a3282f',
                padding: '10px',
                borderRadius: '50%'
              }}>
                <School style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  color: '#a3282f',
                  margin: 0
                }}>
                  St. Paul's History Challenge
                </h1>
                <p style={{ color: '#e5e5e5', margin: 0 }}>Centenary Edition Quiz</p>
              </div>
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: timeLeft <= 10 ? '#a3282f' : '#3f4449',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '10px 20px',
              borderRadius: '50%',
              border: `2px solid ${timeLeft <= 10 ? '#a3282f' : '#3f4449'}`
            }}>
              {timeLeft}s
            </div>
          </div>

          {/* Players */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {players.map((player, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index === currentPlayerIndex ? HOUSES.find(h => h.name === player.house)?.color : 'rgba(255,255,255,0.1)',
                  padding: '20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: index === currentPlayerIndex ? '3px solid #a3282f' : 'none'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {getHouseEmblem(player.house)}
                </div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {player.name}
                </div>
                <div style={{ color: '#a3282f', fontWeight: 'bold' }}>
                  HOUSE {player.house.toUpperCase()}
                </div>
                <div style={{
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  padding: '10px',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <div style={{ 
                    color: '#a3282f', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold' 
                  }}>
                    {player.score}
                  </div>
                  <div style={{ color: 'white', fontSize: '0.8rem' }}>Points</div>
                </div>
                {index === currentPlayerIndex && (
                  <div style={{
                    backgroundColor: '#a3282f',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginTop: '10px'
                  }}>
                    YOUR TURN!
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Question */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '12px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                backgroundColor: '#a3282f',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '20px',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                {currentQuestion.year}
              </div>
              <h2 style={{ 
                color: 'white', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                lineHeight: '1.4'
              }}>
                {currentQuestion.question}
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  disabled={showAnswer}
                  style={{
                    backgroundColor: showAnswer
                      ? selectedAnswer === key
                        ? isCorrect ? '#3f4449' : '#a3282f'
                        : 'rgba(255,255,255,0.1)'
                      : 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: showAnswer ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem'
                  }}
                >
                  <span style={{
                    backgroundColor: 'rgba(163,40,47,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}>
                    {key}
                  </span>
                  {value}
                </button>
              ))}
            </div>

            {showAnswer && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: isCorrect ? '#4ade80' : '#f87171'
                }}>
                  {isCorrect ? '✓ Excellent! Well done!' : 'Not quite right this time'}
                </div>
                {isCorrect && (
                  <p style={{ color: 'white', fontSize: '1rem' }}>
                    <span style={{ color: '#a3282f', fontWeight: 'bold' }}>
                      Correct answer: 
                    </span>
                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                      {currentQuestion.options[currentQuestion.answer as keyof typeof currentQuestion.options]}
                    </span>
                  </p>
                )}
                {!isCorrect && (
                  <p style={{ color: '#e5e5e5', fontStyle: 'italic' }}>
                    Keep studying our magnificent school history! 📚
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const winner = players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #373737 50%, #a3282f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <Crown style={{ 
            width: '80px', 
            height: '80px', 
            color: '#a3282f', 
            margin: '0 auto 20px' 
          }} />
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '10px' 
          }}>
            Quiz Complete!
          </h1>
          <h2 style={{ 
            color: '#a3282f', 
            fontSize: '2rem', 
            marginBottom: '20px' 
          }}>
            🏆 {winner.name} Wins! 🏆
          </h2>
          <p style={{ color: '#e5e5e5', fontSize: '1.2rem', marginBottom: '30px' }}>
            House {winner.house} claims victory with {winner.score} correct answers!
          </p>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '20px' }}>
              Final Results
            </h3>
            {sortedPlayers.map((player, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundColor: index === 0 ? 'rgba(163,40,47,0.2)' : 'rgba(255,255,255,0.1)',
                  border: index === 0 ? '2px solid #a3282f' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                  </span>
                  <span style={{ fontSize: '1.5rem' }}>
                    {getHouseEmblem(player.house)}
                  </span>
                  <div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      {player.name}
                    </div>
                    <div style={{ color: '#e5e5e5' }}>{player.house}</div>
                  </div>
                </div>
                <div style={{ 
                  color: '#a3282f', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold' 
                }}>
                  {player.score}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button
              onClick={resetGame}
              style={{
                backgroundColor: '#636363',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🏠 Back to Home
            </button>
            
            <button
              onClick={resetGame}
              style={{
                backgroundColor: '#a3282f',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;