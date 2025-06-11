import { useState, useEffect } from 'react';
import { School, Trophy, Users, Calendar, BookOpen, Crown, Star, Globe, Award } from 'lucide-react';
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
    color: '#001d31',  // Official Indigo Blue
    emblem: '👑',
    dynasty: '1371 – 1714',
    officialImage: './images/stuart-original.png'
  },
  { 
    name: 'Tudor', 
    color: '#820021',  // Official Ruby Red
    emblem: '🌹',
    dynasty: '1485 – 1603',
    officialImage: './images/tudor-original.png'
  },
  { 
    name: 'Windsor', 
    color: '#002718',  // Official British Green
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
  const [hasPlayedWelcomeAudio, setHasPlayedWelcomeAudio] = useState(false);

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
    // Only play audio once per session
    if (hasPlayedWelcomeAudio) return;
    
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
      setHasPlayedWelcomeAudio(true);
    }).catch((error) => {
      console.log('Audio autoplay blocked by browser - this is normal:', error);
      setHasPlayedWelcomeAudio(true);
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

  const getHouseThemeBackground = (houseName: string) => {
    const house = HOUSES.find(h => h.name === houseName);
    if (!house) return '#ffffff';
    
    // Official gradient based on brandbook specifications
    const houseGradients = {
      'Tudor': 'linear-gradient(135deg, #820021 0%, #2b000b 100%)',     // Ruby Red gradient
      'Stuart': 'linear-gradient(135deg, #001d31 0%, #000a10 100%)',    // Indigo Blue gradient  
      'Windsor': 'linear-gradient(135deg, #002718 0%, #000c08 100%)'    // British Green gradient
    };
    
    return houseGradients[houseName as keyof typeof houseGradients] || '#ffffff';
  };

  if (gameState === 'setup') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #373737 50%, #820021 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Century Gothic', 'Segoe UI', sans-serif"
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '60px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <School style={{ 
              width: '120px', 
              height: '120px', 
              color: '#820021', 
              margin: '0 auto 20px',
              filter: 'drop-shadow(0 0 20px rgba(130,0,33,0.3))'
            }} />
            <h1 style={{ 
              color: 'white', 
              fontSize: '3.5rem', 
              marginBottom: '10px',
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              St. Paul's School
            </h1>
            <h2 style={{ 
              color: '#820021', 
              fontSize: '2.5rem',
              marginBottom: '10px',
              fontWeight: 'normal'
            }}>
              History Championship
            </h2>
            <p style={{ 
              color: '#e5e5e5', 
              fontSize: '1.25rem',
              fontStyle: 'italic'
            }}>
              "MANIBUS POTENTIA STUDIUM ANIMIS"
            </p>
          </div>

          {/* Headmaster Section */}
          <div style={{
            marginBottom: '40px',
            padding: '30px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <img 
                src="./images/titus-edge-headmaster.jpg" 
                alt="Headmaster Titus Edge"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #820021',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ 
                  color: '#820021', 
                  fontSize: '1.5rem',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                }}>
                  Welcome from the Headmaster
                </h3>
                <p style={{ 
                  color: '#e5e5e5', 
                  fontSize: '1rem',
                  maxWidth: '500px',
                  lineHeight: '1.6'
                }}>
                  "Our rich history shapes who we are today. Through this championship, 
                  you'll discover the remarkable journey of St. Paul's School and test 
                  your knowledge of our distinguished heritage."
                </p>
                <p style={{ 
                  color: '#cccccc', 
                  fontSize: '0.9rem',
                  marginTop: '10px',
                  fontStyle: 'italic'
                }}>
                  - Mr Titus Edge, Headmaster
                </p>
              </div>
            </div>
          </div>

          {/* House Images Display */}
          <div style={{
            marginBottom: '30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {HOUSES.map(house => (
              <div key={house.name} style={{
                padding: '20px',
                background: `linear-gradient(135deg, ${house.color}22 0%, ${house.color}11 100%)`,
                borderRadius: '12px',
                border: `2px solid ${house.color}`,
                textAlign: 'center'
              }}>
                <img 
                  src={house.officialImage}
                  alt={`${house.name} House Crest`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    marginBottom: '10px'
                  }}
                />
                <h4 style={{ 
                  color: house.color, 
                  fontSize: '1.2rem',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                }}>
                  {house.name} House
                </h4>
                <p style={{ 
                  color: '#cccccc', 
                  fontSize: '0.9rem'
                }}>
                  {house.dynasty}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginBottom: '40px',
            padding: '20px',
            background: 'rgba(130,0,33,0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(130,0,33,0.2)'
          }}>
            <h3 style={{ 
              color: 'white', 
              fontSize: '1.8rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Select Game Mode
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px'
            }}>
              <button
                onClick={() => setShowHouseSelection(true)}
                style={{
                  backgroundColor: '#636363',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Century Gothic', sans-serif"
                }}
              >
                <BookOpen style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                <div>Individual</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Choose Your House</div>
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
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  fontFamily: "'Century Gothic', sans-serif"
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
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  fontFamily: "'Century Gothic', sans-serif"
                }}
              >
                <Trophy style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
                <div>Championship</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>All Houses</div>
              </button>
              
              <button
                onClick={() => setShowHouseSelection(true)}
                style={{
                  backgroundColor: '#002718',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'Century Gothic', sans-serif"
                }}
              >
                <Star style={{ width: '24px', height: '24px' }} />
                <div style={{
                  fontSize: '1.1rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Practice Mode
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#cccccc',
                  marginTop: '4px'
                }}>
                  Hone your knowledge
                </div>
              </button>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
            color: '#cccccc',
            fontSize: '0.9rem'
          }}>
            <div>🎓 Individual Mode: Play solo representing your chosen House</div>
            <div>🏆 2 Houses: Head-to-head competition between Houses</div>
            <div>👑 Championship: All three Houses compete for glory</div>
            <div>📚 Practice Mode: Perfect your knowledge without scoring</div>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '25px',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar style={{ width: '20px', height: '20px', color: '#820021' }} />
                <span style={{ color: '#e5e5e5' }}>Founded 1509 by John Colet</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe style={{ width: '20px', height: '20px', color: '#001d31' }} />
                <span style={{ color: '#e5e5e5' }}>Over 500 years of excellence</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award style={{ width: '20px', height: '20px', color: '#002718' }} />
                <span style={{ color: '#e5e5e5' }}>Preparing leaders for tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    const currentPlayer = players[currentPlayerIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    const houseTheme = getHouseThemeBackground(currentPlayer.house);

    return (
      <div style={{
        minHeight: '100vh',
        background: houseTheme,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Century Gothic', 'Segoe UI', sans-serif"
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          {/* Header with Player Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                fontSize: '2rem'
              }}>
                {getHouseEmblem(currentPlayer.house)}
              </div>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.5rem',
                  color: '#333'
                }}>
                  {currentPlayer.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: houseTheme,
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  House {currentPlayer.house}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Round</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{round}/10</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Score</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: houseTheme }}>{currentPlayer.score}</p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '10px 20px',
                borderRadius: '10px',
                backgroundColor: timeLeft <= 5 ? 'rgba(130,0,33,0.1)' : 'rgba(255,255,255,0.1)',
                minWidth: '80px'
              }}>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Time</p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold',
                  color: timeLeft <= 5 ? '#820021' : '#4caf50'
                }}>
                  {timeLeft}
                </p>
              </div>
            </div>
          </div>

          {/* Question */}
          {currentQuestion && (
            <>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
              }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '15px',
                  color: '#333',
                  textAlign: 'center'
                }}>
                  {currentQuestion.question}
                </h2>
                
                {currentQuestion.hint && (
                  <p style={{
                    fontStyle: 'italic',
                    color: '#666',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '1.1rem'
                  }}>
                    💡 Hint: {currentQuestion.hint}
                  </p>
                )}
              </div>

              {/* Options */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '30px'
              }}>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.answer;
                  let buttonStyle: any = {
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    cursor: showAnswer ? 'default' : 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    color: '#333',
                    textAlign: 'left',
                    fontFamily: "'Century Gothic', sans-serif"
                  };

                  if (showAnswer) {
                    if (isCorrect) {
                      buttonStyle = {
                        ...buttonStyle,
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: '2px solid #4caf50',
                        transform: 'scale(1.02)'
                      };
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = {
                        ...buttonStyle,
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: '2px solid #f44336'
                      };
                    }
                  } else if (isSelected) {
                    buttonStyle = {
                      ...buttonStyle,
                      backgroundColor: houseTheme,
                      color: 'white',
                      border: `2px solid ${houseTheme}`,
                      transform: 'scale(1.02)'
                    };
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !showAnswer && handleAnswer(option)}
                      disabled={showAnswer}
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        if (!showAnswer && !isSelected) {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!showAnswer && !isSelected) {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Show answer feedback */}
              {showAnswer && (
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  backgroundColor: selectedAnswer === currentQuestion.answer ? '#e8f5e9' : '#ffebee',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <p style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: selectedAnswer === currentQuestion.answer ? '#2e7d32' : '#c62828',
                    margin: 0
                  }}>
                    {selectedAnswer === currentQuestion.answer ? '✅ Correct!' : '❌ Incorrect!'}
                  </p>
                  {selectedAnswer !== currentQuestion.answer && (
                    <p style={{ 
                      color: '#666', 
                      marginTop: '10px',
                      fontSize: '1.1rem'
                    }}>
                      The correct answer was: <strong>{currentQuestion.answer}</strong>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // House Selection Modal
  if (showHouseSelection) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #373737 50%, #820021 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Century Gothic', 'Segoe UI', sans-serif"
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '60px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ 
            color: '#820021', 
            fontSize: '2.5rem',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}>
            Select Your House
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {HOUSES.map(house => (
              <button
                key={house.name}
                onClick={() => {
                  const player: Player = {
                    name: 'Player 1',
                    house: house.name as 'Tudor' | 'Stuart' | 'Windsor',
                    score: 0
                  };
                  setPlayers([player]);
                  setShowHouseSelection(false);
                  setupPlayers(1, player.house);
                }}
                style={{
                  backgroundColor: 'white',
                  border: `3px solid ${house.color}`,
                  borderRadius: '15px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = house.color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = house.color;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={house.officialImage}
                  alt={`${house.name} House Crest`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    marginBottom: '15px'
                  }}
                />
                <h3 style={{ 
                  fontSize: '1.8rem',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  {house.name} House
                </h3>
                <p style={{ 
                  fontSize: '1rem',
                  opacity: 0.8
                }}>
                  {house.dynasty}
                </p>
                <div style={{ 
                  fontSize: '2rem',
                  marginTop: '10px'
                }}>
                  {house.emblem}
                </div>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowHouseSelection(false)}
            style={{
              backgroundColor: '#666666',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              fontFamily: "'Century Gothic', sans-serif"
            }}
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === 'finished') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #373737 50%, #820021 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Century Gothic', 'Segoe UI', sans-serif"
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
            color: '#820021', 
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
            color: '#820021', 
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
                  backgroundColor: index === 0 ? 'rgba(130,0,33,0.2)' : 'rgba(255,255,255,0.1)',
                  border: index === 0 ? '2px solid #820021' : 'none'
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
                  color: '#820021', 
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
                backgroundColor: '#001d31',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Century Gothic', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00243e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#001d31';
              }}
            >
              🏠 Back to Home
            </button>
            
            <button
              onClick={resetGame}
              style={{
                backgroundColor: '#820021',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                fontFamily: "'Century Gothic', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#9a0025';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#820021';
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