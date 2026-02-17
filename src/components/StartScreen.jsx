import React, { useState } from 'react';
import { GlassCard } from './UI/GlassCard';

export const StartScreen = ({ totalQuestions, onStart, loading, error }) => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');

    const handleStart = () => {
        if (name.trim() && studentId.trim()) {
            onStart({ name, studentId });
        }
    };

    const totalTimeMinutes = totalQuestions * 2;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                Error loading quiz: {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full">
            <GlassCard className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">Quiz Game</h1>
                <p className="text-gray-600">
                    Total Questions: <span className="font-semibold text-blue-500">{totalQuestions}</span>
                </p>
                <p className="text-gray-600">
                    Time Limit: <span className="font-semibold text-blue-500">{totalTimeMinutes} Minutes</span>
                </p>

                <div className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white/50 backdrop-blur-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Student ID</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white/50 backdrop-blur-sm"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter your ID"
                        />
                    </div>
                </div>

                <button
                    onClick={handleStart}
                    disabled={!name.trim() || !studentId.trim()}
                    className={`w-full py-3 px-6 rounded-xl text-white font-semibold shadow-lg transition transform ${name.trim() && studentId.trim()
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 active:scale-95 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Start Quiz
                </button>
            </GlassCard>
        </div>
    );
};
