import React, { useState } from "react"
import './Quiz.css'
import { data } from "../../assets/data";
import { useRef } from "react";

const Quiz=()=>{
   let[index,setIndex]=useState(0);//q1
   let[question,setQuestion]= useState(data[index]);
   let[lock,setLock]=useState(false);//to choose only 1 ans
   let[score, setScore]=useState(0);//to update the correct count if the ans is right
   //after 5th question
   let [result, setResult]=useState(false);



   //to show the correct ans after user chooses wrong
   
   let Option1= useRef(null);
   let Option2= useRef(null);
   let Option3= useRef(null);
   let Option4= useRef(null);

   let option_array=[Option1,Option2,Option3,Option4];

   const checkAns=(e,ans)=>{
    if(lock===false){//so that user can choose only one option
        if(question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);
           }
           else{
            e.target.classList.add("wrong");
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct")//-1 coz ques starts with 0 but ans starts with 1
           }
    }
   }

//    next button functionality

const next=()=>{
     if(lock===true){//means we have selected an option
        if(index===data.length-1){
            setResult(true);
            return 0;
        }
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((option)=>{
            //to remove the chosen option 
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
        })
     }
}
          
   const reset=()=>{
   setIndex(0);
   setQuestion[data[0]];
   setScore(0);
   setLock(false);
   setResult(false);

   }
    return(
        <div>
           <div className="container">
            <h1>Quiz App</h1>
            <hr></hr>
            {result?<></>:<><h2>{index +1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={Option2}  onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={Option3}  onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={Option4}  onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
           <div className="index">{index+1} of {data.length}questions</div>
           </>}
           {result?<>
            <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
           </>:<></>}
           
            
       

           </div>
        </div>
    )
}
export default Quiz