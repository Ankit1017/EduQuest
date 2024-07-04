// import React, { useState, useContext } from 'react';
// // import ReactDOM from 'react-dom';
// import QuestionForm from './components/QuestionForm';
// import QuestionList from './components/QuestionList';
// import Login from './components/Login';
// import { AuthContext } from './context/AuthContext';
// import Register from './components/Register';
// import QuestionPaperPage from './components/QuestionPaper';
// // import AuthProvider from './context/AuthContext';
// const App = () => {
//     const { user } = useContext(AuthContext); // Ensure the context is used inside the provider
//     const [questions, setQuestions] = useState([]);
//     const [showRegister, setShowRegister] = useState(false);
//     const [showQuestionPaper, setShowQuestionPaper] = useState(false);

//     const handleAddQuestion = (newQuestion) => {
//         setQuestions([...questions, newQuestion]);
//     };

//     return (
//         <div>
//             <h1>Question App</h1>
//             {user ? (
//                 <>
//                     {showQuestionPaper ? (
//                         <QuestionPaperPage />
//                     ) : (
//                         <>
//                             <QuestionForm onAddQuestion={handleAddQuestion} />
//                             <QuestionList />
//                         </>
//                     )}
//                     <button onClick={() => setShowQuestionPaper(!showQuestionPaper)}>
//                         {showQuestionPaper ? 'Add Question' : 'Show Question Paper'}
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     {showRegister ? (
//                         <Register />
//                     ) : (
//                         <Login />
//                     )}
//                     <button onClick={() => setShowRegister(!showRegister)}>
//                         {showRegister ? 'Switch to Login' : 'Switch to Register'}
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };



// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Login from './components/Login';
import QuestionForm from './components/QuestionForm';
import QuestionPaperPage from './components/QuestionPaper';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/add-question' element={<QuestionForm />}></Route>
                <Route path='/question-paper' element={<QuestionPaperPage />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/admin' element={<AdminPanel />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;