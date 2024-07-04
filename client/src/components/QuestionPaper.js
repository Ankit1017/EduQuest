import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const QuestionPaperPage = () => {
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');
    const [performance, setPerformance] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    useEffect(() => {
        // Fetch available tags on component mount
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tags');
                console.log("hi")
                setAvailableTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchTags();
    }, []);
    const handleTagChange = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };
    const handleFetchQuestions = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/question-paper', { tags: selectedTags });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/question-paper');
    //             setQuestions(response.data);
    //         } catch (error) {
    //             console.error('Error fetching questions:', error);
    //             setError('Error fetching questions');
    //         }
    //     };

    //     fetchQuestions();
    // }, []);

    const handleChange = (questionId, optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: optionIndex,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        try {
            const response = await axios.post('http://localhost:5000/api/submit-answers', {
                userId: user._id,
                userAnswers
            });
            setReport(response.data);

            // Fetch user performance
            const performanceResponse = await axios.get(`http://localhost:5000/api/user-performance/${user._id}`);
            setPerformance(performanceResponse.data);
        } catch (error) {
            console.error('Error submitting answers:', error);
            setError('Error submitting answers. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <h1>Question Paper</h1>
                <h3>Select Tags:</h3>
                <div>
                    {availableTags.map((tag) => (
                        <label key={tag} style={{ marginRight: '10px' }}>
                            <input
                                type="checkbox"
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
                <button onClick={handleFetchQuestions}>Fetch Questions</button>
                {questions.length === 0 ? (
                    <p>Loading questions...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {questions.map((question) => (
                            <div key={question._id}>
                                <h3>{question.question}</h3>
                                <ul>
                                    {question.options.map((option, idx) => (
                                        <li key={idx}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={question._id}
                                                    value={idx}
                                                    checked={userAnswers[question._id] === idx}
                                                    onChange={() => handleChange(question._id, idx)}
                                                />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button type="submit">Submit Answers</button>
                    </form>
                )}
                {report && (
                    <div>
                        <h2>Report</h2>
                        <p>
                            You scored {report.score} out of {report.total}.
                        </p>
                    </div>
                )}
                {performance && (
                    <div>
                        <h2>Performance Analysis</h2>
                        <ul>
                            {performance.topicAnalysis.map((topic) => (
                                <li key={topic.topic}>
                                    {topic.topic}: {topic.accuracy.toFixed(2)}% accuracy ({topic.correct}/{topic.total})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};

export default QuestionPaperPage;