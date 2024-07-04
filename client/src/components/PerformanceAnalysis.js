import { Chart } from "react-google-charts";
import { AuthContext } from '../context/AuthContext';
import React, { useState, useContext, useEffect } from 'react';

const PerformanceAnalysis = (props) => {
    const handleCardClick = props.handleCardClick;
    const performance = props.performance;
    const { user } = useContext(AuthContext); // Ensure the context is used inside the provider
    return (
        <>
            <h2 className="text-center">Performance Analysis</h2>
            <div className="preformance_div mb-3 justify-content-evenly">
                {performance.topicAnalysis.map((topic, indx) => (
                    <div className="card m-3 performance_analysis_card" style={{ width: '20rem' }} key={indx}>
                        <div className="card-body" onClick={() => { handleCardClick(topic.topic, user._id) }}>
                            <Chart
                                chartType="PieChart"
                                data={[["AnswerStatus", "Total"], ["correct", (topic.correct)], ["incorrect", (topic.total - topic.correct)]]}
                                width={"100%"}
                                height={"200px"}
                            />
                            <h5 className="card-title">Topic : {topic.topic}</h5>
                            <p className="card-text">Accuracy : {topic.accuracy / 100}</p>
                            <p className="card-text">Correct Answers : {topic.correct}</p>
                            <p className="card-text">Total Answers : {topic.total}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PerformanceAnalysis
