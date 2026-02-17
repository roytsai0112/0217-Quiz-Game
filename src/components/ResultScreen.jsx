import React, { useEffect } from 'react';
import { GlassCard } from './UI/GlassCard';
import { exportResultsToCSV } from '../utils/csvHelper';
import { logResultToGoogleSheets } from '../utils/googleSheetsLogger';

export const ResultScreen = ({ score, questions, answers, userInfo, totalTime, timeLeft, onRestart }) => {
    const timeUsedSeconds = totalTime - timeLeft;
    const timeUsedFormatted = `${Math.floor(timeUsedSeconds / 60)}:${(timeUsedSeconds % 60).toString().padStart(2, '0')}`;
    const hasLogged = React.useRef(false);

    const handleDownload = () => {
        const resultData = {
            Name: userInfo.name,
            StudentID: userInfo.studentId,
            Score: score,
            TimeUsed: timeUsedFormatted,
            Date: new Date().toLocaleString(),
        };
        exportResultsToCSV(resultData);
    };

    useEffect(() => {
        if (hasLogged.current) return;

        const resultData = {
            Name: userInfo.name,
            StudentID: userInfo.studentId, // Matches data.StudentID in Apps Script
            Score: score,
            TimeUsed: timeUsedFormatted,
            Date: new Date().toLocaleString(),
        };
        if (score !== null && userInfo.name) {
            logResultToGoogleSheets(resultData);
            hasLogged.current = true;
        }
    }, [score, userInfo, timeUsedFormatted]);

    const incorrectAnswers = questions.map((q, index) => {
        const userAnswer = answers[index];
        const correct = q.CorrectAnswer;
        const isCorrect = userAnswer && correct && userAnswer.trim() === correct.trim();
        if (isCorrect) return null;
        return { ...q, userAnswer, index };
    }).filter(Boolean);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-4xl mx-auto animate-fade-in">
            <GlassCard className="w-full text-center space-y-8">
                <h1 className="text-4xl font-bold text-gray-800">Quiz Completed!</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/40 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-gray-500 uppercase text-sm font-semibold tracking-wider">Score</span>
                        <span className={`text-6xl font-bold ${score >= 60 ? 'text-green-500' : 'text-red-500'}`}>
                            {score}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-left space-y-2 text-sm md:text-base">
                            <p className="text-gray-700"><strong>Name:</strong> {userInfo.name}</p>
                            <p className="text-gray-700"><strong>ID:</strong> {userInfo.studentId}</p>
                            <p className="text-gray-700"><strong>Time Used:</strong> {timeUsedFormatted}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-3 rounded-xl font-semibold bg-blue-500 text-white shadow-md hover:bg-blue-600 transition flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Results
                    </button>
                    <button
                        onClick={onRestart}
                        className="px-6 py-3 rounded-xl font-semibold bg-gray-500 text-white shadow-md hover:bg-gray-600 transition flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Restart Quiz
                    </button>
                </div>
            </GlassCard>

            {incorrectAnswers.length > 0 && (
                <div className="w-full mt-8 animate-slide-up">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 ml-2">Review Incorrect Answers</h3>
                    <div className="space-y-4">
                        {incorrectAnswers.map((item) => (
                            <GlassCard key={item.index} className="p-6 text-left border-l-4 border-red-500 border-t-0 border-r-0 border-b-0">
                                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                                    Q{item.index + 1}: {item.Question}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-3 rounded-lg text-red-700">
                                        <span className="font-bold block text-xs uppercase text-red-400 mb-1">Your Answer</span>
                                        <div className="font-mono text-lg font-bold mb-1">{item.userAnswer || 'No Answer'}</div>
                                        <div className="text-sm opacity-90">{item['Option' + item.userAnswer] || '-'}</div>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg text-green-700">
                                        <span className="font-bold block text-xs uppercase text-green-400 mb-1">Correct Answer</span>
                                        <div className="font-mono text-lg font-bold mb-1">{item.CorrectAnswer}</div>
                                        <div className="text-sm opacity-90">{item['Option' + item.CorrectAnswer] || '-'}</div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
