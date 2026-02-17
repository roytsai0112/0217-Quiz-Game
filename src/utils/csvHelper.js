import Papa from 'papaparse';

export const fetchQuizData = async (url) => {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    resolve(results.data);
                } else {
                    reject(new Error('No data found in CSV'));
                }
            },
            error: (err) => {
                console.error("PapaParse Error:", err);
                reject(err);
            },
        });
    });
};

export const exportResultsToCSV = (data) => {
    const csv = Papa.unparse([data]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quiz_results_${data.studentId}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
