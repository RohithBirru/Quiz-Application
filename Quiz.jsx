import React from 'react'
import './Quiz.css'
import { data } from '../assets/data';
import { useState, useRef } from 'react';

const Quiz = () => {

    let [index, setindex] = useState(0);
    let [question, setquestion] = useState(data[index]);
    let [lock, setlock] = useState(false);
    let [score, setscore] = useState(0);
    let [result, setresult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);

    let option_arr = [Option1, Option2, Option3];
 

    const checkans = (ele, ans) => {
        if(lock=== false) {
        if(question.ans===ans) {
            ele.target.classList.add("correct");
            setlock(true);
            setscore(prev=>prev+1)
        } else {
            ele.target.classList.add("incorrect");
            setlock(true);
            option_arr[question.ans-1].current.classList.add("correct");
        }
    }    
}
  const next = () => {
    if(lock===true) {
        if(index===data.length -1) {
            setresult(true);
            return 0;
        }
        setindex(++index);
        setquestion(data[index]);
        setlock(false);
        option_arr.map((option) => {
            PageTransitionEvent.current.classList.remove("incorrect");
            option.current.classList.remove("correct");
            return null;
        })
    }
  } 
  const previous = () => {
    setindex(--index);
    setquestion(data[index]);
    setlock(false);
  }
  const reset = () => {
    setindex(0);
    setquestion(data[0]);
    setscore(0);
    setlock(false);
    setresult(false);
  }
  return (
    <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
        <h2>{index+1}. {question.question}</h2>

        <ul>
            <li ref= {Option1} onClick={(ele)=> {checkans(ele,1)}}>{question.option1}</li>
            <li ref= {Option2} onClick={(ele)=> {checkans(ele,2)}}>{question.option2} </li>
            <li ref= {Option3} onClick={(ele)=> {checkans(ele,3)}}>{question.option3} </li>
        </ul>
        <button onClick={next}>Next</button>
        <button onClick={previous}>Previous</button>

        <div className='index'>{index+1} of {data.length} questions?</div>
        </>}
        {result?<>
        <h2>you scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
        </>:<></>}
      
    </div>
  )
}

export default Quiz
