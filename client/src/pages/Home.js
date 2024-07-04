import React, { useState, useContext, useEffect } from 'react';


import Login from './../components/Login';
import Register from './../components/Register';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

import PerformanceAnalysis from '../components/PerformanceAnalysis';
import IndividualTopicAnalysis from '../components/IndividualTopicAnalysis';

const Home = () => {
    const { user } = useContext(AuthContext); // Ensure the context is used inside the provider
    const [showRegister, setShowRegister] = useState(false);
    const [performance, setPerformance] = useState(null);
    const [hasIdividualTopicData, setHasIndividualTopicData] = useState(false);
    const [indiTopic, setIndiTopic] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const performanceResponse = await axios.get(`http://localhost:5000/api/user-performance/${user._id}`);
                setPerformance(performanceResponse.data);
                console.log(performanceResponse.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchPerformance();
    }, []);

    // window.onbeforeunload = function () {
    //     fetchPerformance();
    //     return null;
    // }

    const handleCardClick = async (topic, user_id) => {
        // console.log(topic);
        // console.log(user_id);
        try {
            const data = await axios.get(`http://localhost:5000/api/user-performance/${user._id}/${topic}`);
            // console.log(data.data);
            let correct = []
            let incorrect = []

            data.data.data.forEach((item) => {
                if (item.isCorrect) {
                    correct.push(item);
                }
                else {
                    incorrect.push(item);
                }
            });

            setHasIndividualTopicData(true);
            setIndiTopic(topic);
            setCorrectAnswers(correct);
            setIncorrectAnswers(incorrect);
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            {/* <h1>Question App</h1> */}
            <Navbar />
            {user ? (
                <>
                    <h1 className="text-center mb-5 mt-3">Welcome to the QuestionPaper App.</h1>
                    {performance &&
                        <PerformanceAnalysis
                            handleCardClick={handleCardClick}
                            performance={performance} />
                    }


                    {hasIdividualTopicData &&
                        <IndividualTopicAnalysis
                            setHasIndividualTopicData={setHasIndividualTopicData}
                            correctAnswers={correctAnswers}
                            incorrectAnswers={incorrectAnswers}
                            indiTopic={indiTopic} />
                    }
                </>
            ) : (
                <div className='login_register_div'>
                    {showRegister ? (
                        <Register />
                    ) : (
                        <Login />
                    )}
                    <button onClick={() => setShowRegister(!showRegister)}>
                        {showRegister ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home
