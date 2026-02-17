import { useState, useEffect } from 'react';
import { fetchQuizData } from '../utils/csvHelper';

export const useQuizData = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const url = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || '/questions.csv';
                const data = await fetchQuizData(url);
                // Validating structure
                const validData = data.filter(q => q.Question && q.CorrectAnswer);
                setQuestions(validData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { questions, loading, error };
};
