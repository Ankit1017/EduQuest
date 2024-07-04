import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
// import { verifyToken } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuestionForm = () => {
    const { authTokens } = useContext(AuthContext);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    // const [topicTags, setTopicTags] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        // console.log(authTokens);

        if (user === null) {
            navigate("/");
        }
        if (user.isAdmin === false) {
            navigate("/");
        }

    }, []);

    // Call the function with the desired prompt
    // generateContent('what is physics');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionData = {
            question,
            authorId: user._id,
            options,
            correctOption
            // topicTags: text.split('\n').map(tag => tag.trim())
        };

        // console.log(questionData)

        try {
            const res = await axios.post('http://localhost:5000/api/questions', questionData, {
                headers: {
                    Authorization: `Bearer ${authTokens}`
                }
            });

            console.log(res.data);
            // onAddQuestion(res.data);
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption(0);
            // setTopicTags('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <>
            <Navbar />
            <div className="div_center">
                <h3>Add Question</h3>
                <form onSubmit={handleSubmit} className='form_center'>
                    <textarea
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question"
                        required
                        className="form_input"
                    />
                    <br />
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            required
                            className="form_input"
                        />
                    ))}
                    <br />
                    <select className="form_input" value={correctOption} onChange={(e) => setCorrectOption(Number(e.target.value))}>
                        {options.map((_, index) => (
                            <option className="form_option" key={index} value={index}>{`Option ${index + 1}`}</option>
                        ))}
                    </select>
                    <br />
                    {/* <input
                    type="text"
                    value={topicTags}
                    onChange={(e) => setTopicTags(e.target.value)}
                    placeholder="Enter topic tags (comma-separated)"
                />
                <br /> */}
                    <button className="form_button" type="submit">Add Question</button>
                </form>
            </div>
        </>
    );
};

export default QuestionForm;
