import { useState, useEffect } from 'react';
import { useQuizData } from './hooks/useQuizData';
import { useQuizGame } from './hooks/useQuizGame';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

function App() {
    const { questions, loading, error } = useQuizData();
    const [gameState, setGameState] = useState('start'); // start, quiz, result
    const [userInfo, setUserInfo] = useState({ name: '', studentId: '' });

    // 2 minutes per question
    const totalTimeSeconds = questions.length * 2 * 60;

    const game = useQuizGame(questions, totalTimeSeconds);

    // Auto-transition to result when game finishes
    useEffect(() => {
        if (game.isFinished && gameState === 'quiz') {
            setGameState('result');
        }
    }, [game.isFinished, gameState]);

    const handleStart = (info) => {
        setUserInfo(info);
        game.startQuiz();
        setGameState('quiz');
    };

    const handleRestart = () => {
        window.location.reload(); // Simple reload to reset everything cleanly
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-sans text-gray-800">
            {gameState === 'start' && (
                <StartScreen
                    totalQuestions={questions.length}
                    onStart={handleStart}
                    loading={loading}
                    error={error}
                />
            )}

            {gameState === 'quiz' && (
                <QuizScreen
                    game={game}
                    totalQuestions={questions.length}
                />
            )}

            {gameState === 'result' && (
                <ResultScreen
                    score={game.score}
                    questions={questions}
                    answers={game.answers}
                    userInfo={userInfo}
                    totalTime={totalTimeSeconds}
                    timeLeft={game.timeLeft}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}

export default App;
