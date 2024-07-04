import React from 'react'

const IndividualTopicAnalysis = (props) => {
    const setHasIndividualTopicData = props.setHasIndividualTopicData;
    const correctAnswers = props.correctAnswers;
    const incorrectAnswers = props.incorrectAnswers;
    const indiTopic = props.indiTopic;
    return (
        <div>
            <h2 className="text-center">Topic Analysis - {indiTopic}</h2>
            <div className="individual_topic_div">
                <button className="individual_performance_close" onClick={() => { setHasIndividualTopicData(false); }}>X</button>
                <div className="one">
                    <h3 className="text-center">Correct Answers ({correctAnswers.length})</h3>
                    <div className="individual_topic_subdiv correctAnswers">
                        {correctAnswers.map((item, indx) => (
                            <div className="card m-3 topic_analysis_card" key={indx}>
                                <div className="card-body">
                                    <p className="card-title">Question : {item.questionId.question}</p>
                                    <p className="card-text">Author : {item.questionId.authorId}</p>
                                    <p className="card-text">Correct Option : {item.questionId.correctOption}</p>
                                    <p className="card-text">All Options</p>
                                    <ul className="question_option_list">
                                        {item.questionId.options.map((opt, indx2) => (
                                            <li
                                                className={indx2 === item.questionId.correctOption ? "question_option_list_item question_option_list_item_correct" : "question_option_list_item"}
                                                key={indx2}>
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="card-text">Topics</p>
                                    <ul className="topic_tags_list">
                                        {item.topics.map((tag, indx2) => (
                                            <li
                                                className="topic_tags_list_item"
                                                key={indx2}>
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="two">
                    <h3 className="text-center">Incorrect Answers ({incorrectAnswers.length})</h3>
                    <div className="individual_topic_subdiv incorrectAnswers">
                        {incorrectAnswers.map((item, indx) => (
                            <div className="card m-3 topic_analysis_card" key={indx}>
                                <div className="card-body">
                                    <p className="card-title">Question : {item.questionId.question}</p>
                                    <p className="card-text">Author : {item.questionId.authorId}</p>
                                    <p className="card-text">Correct Option : {item.questionId.correctOption}</p>
                                    <p className="card-text">Your Selection : {item.selectedOption}</p>
                                    <p className="card-text">All Options</p>
                                    <ul className="question_option_list">
                                        {item.questionId.options.map((opt, indx2) => (
                                            <li
                                                className=
                                                {indx2 === item.questionId.correctOption ?
                                                    "question_option_list_item question_option_list_item_correct"
                                                    :
                                                    indx2 === item.selectedOption ?
                                                        "question_option_list_item question_option_list_item_incorrect"
                                                        :
                                                        "question_option_list_item"
                                                }
                                                key={indx2}>
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="card-text">Topics</p>
                                    <ul className="topic_tags_list">
                                        {item.topics.map((tag, indx2) => (
                                            <li
                                                className="topic_tags_list_item"
                                                key={indx2}>
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualTopicAnalysis
