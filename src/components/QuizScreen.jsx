import React from 'react';
import { GlassCard } from './UI/GlassCard';

export const QuizScreen = ({ game, totalQuestions }) => {
    const {
        currentQuestionIndex,
        currentQuestion,
        answers,
        timeLeft,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        finishQuiz,
    } = game;

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const currentAnswer = answers[currentQuestionIndex];

    if (!currentQuestion) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-4xl mx-auto">
            {/* Header / Timer */}
            <div className="w-full flex justify-between items-center mb-6 text-gray-800 px-4">
                <div className="text-xl font-semibold bg-white/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Question <span className="text-blue-600">{currentQuestionIndex + 1}</span> / {totalQuestions}
                </div>
                <div className={`text-2xl font-bold font-mono tracking-widest px-4 py-2 rounded-lg backdrop-blur-sm bg-white/40 ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden shadow-inner">
                <div
                    className="bg-blue-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <GlassCard className="w-full mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                    {currentQuestion.Question}
                </h2>

                <div className="space-y-3">
                    {['OptionA', 'OptionB', 'OptionC', 'OptionD'].map((optKey) => {
                        const optionText = currentQuestion[optKey];
                        const isSelected = currentAnswer === optionText;
                        const label = optKey.replace('Option', '');

                        return (
                            <button
                                key={optKey}
                                onClick={() => selectAnswer(optionText)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 group flex items-center ${isSelected
                                        ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md transform scale-[1.01]'
                                        : 'border-transparent bg-white/50 hover:bg-white/80 hover:border-blue-200 text-gray-700'
                                    }`}
                            >
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 font-bold transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-500'
                                    }`}>
                                    {label}
                                </span>
                                <span className="font-medium">{optionText}</span>
                            </button>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Navigation */}
            <div className="flex justify-between w-full px-4">
                <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition ${currentQuestionIndex === 0
                            ? 'text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-white/50 text-gray-700 hover:bg-white/80 backdrop-blur-sm shadow-sm'
                        }`}
                >
                    Previous
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={finishQuiz}
                        className="px-8 py-2 rounded-lg font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={nextQuestion}
                        className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};
