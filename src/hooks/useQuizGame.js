import { useState, useEffect, useCallback } from 'react';

export const useQuizGame = (questions, totalTimeSeconds) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionIndex: answerValue }
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalTimeSeconds);
    const [timerActive, setTimerActive] = useState(false);

    // Reset timer if questions length changes or init
    useEffect(() => {
        if (totalTimeSeconds > 0) {
            setTimeLeft(totalTimeSeconds);
        }
    }, [totalTimeSeconds]);

    const startQuiz = useCallback(() => {
        setTimerActive(true);
    }, []);

    const finishQuiz = useCallback(() => {
        setTimerActive(false);
        setIsFinished(true);
    }, []);

    useEffect(() => {
        if (!timerActive || isFinished) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    finishQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive, isFinished, finishQuiz]);

    const selectAnswer = (answer) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: answer,
        }));
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((q, index) => {
            // Compare trimmed answers to be safe
            const userAnswer = answers[index];
            // Compare keys: userAnswer should be "A", "B", etc.
            // CorrectAnswer from CSV should also be "A", "B", etc. OR "OptionA"
            const correct = q.CorrectAnswer ? q.CorrectAnswer.replace('Option', '').trim() : '';
            if (userAnswer && correct && userAnswer.toUpperCase() === correct.toUpperCase()) {
                correctCount++;
            }
        });
        return questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    };

    return {
        currentQuestionIndex,
        answers,
        isFinished,
        timeLeft,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        startQuiz,
        finishQuiz,
        score: calculateScore(),
        currentQuestion: questions[currentQuestionIndex],
    };
};
