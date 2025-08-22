import React, { useState, useEffect } from 'react';
import { Gamepad2, Users, Lightbulb, Vote } from 'lucide-react';

const Games: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'polls' | 'trivia'>('games');
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameWinner, setGameWinner] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState<{ [key: string]: number }>({
    'Chocolate Lava Cake': 12,
    'Gulab Jamun': 8,
    'Tiramisu': 15,
    'Cheesecake': 6,
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);
  const [triviaQuestion, setTriviaQuestion] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [showTriviaResult, setShowTriviaResult] = useState(false);

  const triviaQuestions = [
    {
      question: "Which spice is known as the 'King of Spices'?",
      options: ["Black Pepper", "Saffron", "Cardamom", "Cinnamon"],
      correct: 0,
      fact: "Black pepper has been traded for over 4,000 years and was once worth its weight in gold!"
    },
    {
      question: "What is the main ingredient in traditional hummus?",
      options: ["Lentils", "Chickpeas", "Black Beans", "Kidney Beans"],
      correct: 1,
      fact: "Hummus dates back to ancient Egypt and is mentioned in historical texts from the 13th century!"
    },
    {
      question: "Which fruit is actually a berry?",
      options: ["Strawberry", "Banana", "Apple", "Orange"],
      correct: 1,
      fact: "Bananas are berries, while strawberries are not! In botanical terms, berries have seeds inside the fruit."
    }
  ];

  const foodFacts = [
    "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The world's most expensive spice is saffron, which can cost more than $3,000 per pound.",
    "Chocolate was once used as currency by the Aztecs.",
    "The average person spends about 5 years of their life eating.",
    "Carrots were originally purple, not orange. Orange carrots were bred in the 17th century to honor the Dutch royal family.",
    "The hottest chili pepper in the world is the Carolina Reaper, measuring over 2.2 million Scoville heat units.",
    "Pineapples take 2-3 years to grow from seed to fruit.",
    "The most stolen food in the world is cheese, with an estimated 4% of all cheese produced being stolen annually."
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % foodFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const checkWinner = (board: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (gameBoard[index] || gameWinner) return;

    const newBoard = [...gameBoard];
    newBoard[index] = currentPlayer;
    setGameBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameWinner(winner);
    } else if (newBoard.every(cell => cell !== '')) {
      setGameWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameWinner(null);
  };

  const handleVote = (option: string) => {
    if (userVoted) return;
    
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
    setUserVoted(option);
  };

  const handleTriviaAnswer = (selectedOption: number) => {
    const currentQuestion = triviaQuestions[triviaQuestion];
    if (selectedOption === currentQuestion.correct) {
      setTriviaScore(prev => prev + 1);
    }
    setShowTriviaResult(true);
    
    setTimeout(() => {
      if (triviaQuestion < triviaQuestions.length - 1) {
        setTriviaQuestion(prev => prev + 1);
        setShowTriviaResult(false);
      } else {
        // Game completed
        setShowTriviaResult(false);
      }
    }, 2000);
  };

  const resetTrivia = () => {
    setTriviaQuestion(0);
    setTriviaScore(0);
    setShowTriviaResult(false);
  };

  const totalVotes = Object.values(pollVotes).reduce((sum, votes) => sum + votes, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 Fun While Waiting
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Enjoy interactive games and activities while your food is being prepared
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            {[
              { id: 'games', label: 'Games', icon: Gamepad2 },
              { id: 'polls', label: 'Live Polls', icon: Vote },
              { id: 'trivia', label: 'Food Trivia', icon: Lightbulb }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[600px]">
        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Tic-Tac-Toe
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Challenge your table mates to a classic game!
              </p>
            </div>

            {/* Game Status */}
            <div className="text-center mb-6">
              {gameWinner ? (
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {gameWinner === 'Draw' ? "It's a Draw!" : `Player ${gameWinner} Wins!`}
                </div>
              ) : (
                <div className="text-xl text-gray-700 dark:text-gray-300">
                  Current Player: <span className="font-bold text-primary-600 dark:text-primary-400">{currentPlayer}</span>
                </div>
              )}
            </div>

            {/* Game Board */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-3 gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
                {gameBoard.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={!!cell || !!gameWinner}
                    className={`w-20 h-20 bg-white dark:bg-gray-800 rounded-lg text-3xl font-bold transition-colors ${
                      cell
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Polls Tab */}
        {activeTab === 'polls' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Live Poll: Dessert Choice
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vote for which dessert your table should order! 🍰
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {Object.entries(pollVotes).map(([option, votes]) => {
                const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                const isVoted = userVoted === option;
                
                return (
                  <div key={option} className="relative">
                    <button
                      onClick={() => handleVote(option)}
                      disabled={!!userVoted}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                        isVoted
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                      } ${userVoted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {option}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {votes} votes
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary-500 h-full transition-all duration-500 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      
                      {/* Percentage */}
                      <div className="text-right mt-1">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </button>
                    
                    {isVoted && (
                      <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Voted
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Users className="w-5 h-5" />
                <span>Total votes: {totalVotes}</span>
              </div>
            </div>
          </div>
        )}

        {/* Trivia Tab */}
        {activeTab === 'trivia' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Food Trivia Challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Test your food knowledge! Score: {triviaScore}/{triviaQuestions.length}
              </p>
            </div>

            {triviaQuestion < triviaQuestions.length ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {triviaQuestions[triviaQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {triviaQuestions[triviaQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleTriviaAnswer(index)}
                        disabled={showTriviaResult}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          showTriviaResult
                            ? index === triviaQuestions[triviaQuestion].correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {showTriviaResult && (
                  <div className="text-center">
                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      {triviaQuestions[triviaQuestion].fact}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Trivia Complete!
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  Your final score: {triviaScore}/{triviaQuestions.length}
                </p>
                <button
                  onClick={resetTrivia}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fun Facts Section */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">🍽️ Did You Know?</h2>
          <p className="text-secondary-100">
            Fun food facts to keep you entertained
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <p className="text-lg text-secondary-100">
            {foodFacts[currentFactIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Games;
