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
                // Debugging logs
                console.log("Current VITE_GOOGLE_SHEET_CSV_URL:", import.meta.env.VITE_GOOGLE_SHEET_CSV_URL);
                console.log("Fetching from:", url);

                const data = await fetchQuizData(url);
                // Validating structure
                // Normalize keys (remove spaces, handle different casing)
                const normalizedData = data.map(item => {
                    const newItem = {};
                    Object.keys(item).forEach(key => {
                        // Standardize keys: "Correct Answer" -> "CorrectAnswer", "Option A" -> "OptionA"
                        const newKey = key.replace(/\s+/g, '');
                        newItem[newKey] = item[key];
                    });
                    return newItem;
                });

                const validData = normalizedData.filter(q => q.Question && q.CorrectAnswer);
                setQuestions(validData);
                console.log("Validated data:", validData);
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
