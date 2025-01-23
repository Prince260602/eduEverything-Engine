import {createContext, useState} from 'react'

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [mcqAnswer, setMcqAnswer] = useState({})
    const [qnaAnswer, setQnaAnswer] = useState({})
    const [domain, setDomain] = useState("")
    const [subDomain, setSubDomain] = useState("")
    const [description, setDescription] = useState("")

    const saveAnswer = (e, questionIndex, questionText) => {
        setMcqAnswer({
            ...mcqAnswer,
            [questionIndex] : { question: questionText, answer: e.target.value}
        })
    };

    const saveQnaAnswer = (e, currentQuestionIndex, questionText) => {
        setQnaAnswer({...qnaAnswer, [currentQuestionIndex]: {question: questionText, answer: e.target.value }});
    };

    return (
        <DataContext.Provider value={{ mcqAnswer, saveAnswer, qnaAnswer, saveQnaAnswer, domain, setDomain, subDomain, setSubDomain, description, setDescription }}>
            {children}
        </DataContext.Provider>
    )
}