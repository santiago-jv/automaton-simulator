
import './App.css';
import { useEffect, useState } from "react"
import words from "./words.json" 
import START_ARROW  from "./images/start_arrow.svg"
import STATE_0 from "./images/state_0.svg";
import ARROW_Q0_TO_Q1 from "./images/arrow_q0_to_q1.svg"
import STATE_1 from "./images/state_1.svg";
import ARROW_Q1_TO_Q2 from "./images/arrow_q1_to_q2.svg"
import STATE_2 from "./images/state_2.svg";
import ARROW_Q2_TO_Q3 from "./images/arrow_q2_to_q3.svg"
import ARROW_Q2_TO_Q4 from "./images/arrow_q2_to_q4.svg"

import ARROW_RETURN_Q3 from "./images/arrow_return_q3.svg"
import STATE_3 from "./images/state_3.svg";
import ARROW_Q3_TO_Q4 from "./images/arrow_q3_to_q4.svg"
import STATE_4 from "./images/state_4.svg";
import ARROW_Q4_TO_Q1 from "./images/arrow_q4_to_q1.svg"
import Header from './components/Header';


function App() {
	let count = 0
	const [language, setLanguage] = useState("spanish")
	let aux = null
	let word = null
	let isAccept = false
	const [string, setString] = useState("")
	const [result, setResult] = useState(null)
	

	const start = () => {
		count = 0
		isAccept = false
		aux = null
		word = null
		state_0()
		setResult(isAccept? words[language].accepted: words[language].rejected)
	}
	useEffect(() => {
		

		
	}, [])
	const state_0 = () => {
		
		console.log("state_0")
		if (isNotOutRange()) {
			if (string[count] === 'a') {
				count++
				state_1()
				
			}else{
				error();
			}
			
		}else{
			if (string.length === 0) {
				isAccept = true
			}
		}
		
	}
	const isNotOutRange = ()=>string.length > count
	
	const state_1 = () => {
		console.log("state_1")
		if (isNotOutRange()) {
			if (string[count] === 'b') {
				count++
				state_2()
				
			}else{
				error();
			}
		}
	}

	const state_2 = () => {
		console.log("state_2")
		if (isNotOutRange()) {
			if (string[count] === 'c') {
				count++
				state_3()
				
			}
			else if (string[count] === 'd') {
					count++
					state_4()
				
			}
			else {
				error()
			}
		}
	}

	const state_3 = () => {
		
		console.log("state_3")
		if (isNotOutRange()) {
	
			if (string[count] === 'c') {
				count++
				state_3()
				
			} else if (string[count] === 'd') {
				count++
				state_4()
			
			}	
			else{
				error()
			}
	
		}
	}

	const state_4 = () => {
		console.log("state_4")
		isAccept = true
		console.log("auxiliar y word:", aux, word);
		console.log("count",count);
		if (isNotOutRange()) {
			console.log("***** auxiliar:",aux,"********");
			if((aux &&  aux !== word)) {
				console.log("entra");
				error()
			}
			
			else if (string[count] === 'a') {
				aux = string.slice(aux?aux.length:0,count)
				if(!word) word = aux
				console.log("entra por aca xd", aux,word);
				count++
				state_1()
				
			}else{
				error()
				
			}
		}
		else {
			if((aux &&  aux !== word  )) {
				console.log("entra");
				error()
			}
		}
	
	}

	const error = () => {
		isAccept=false
		console.log("error")
		
	}
	const handleInputChange = (event) => {
		setString(event.target.value)
	}
	const verify = (event) => {
		event.preventDefault()
		start()
	}
	const changeLanguage = ()=>{
		setLanguage("spanish"===language? "english":"spanish")
		setResult(isAccept? words[language].accepted: words[language].rejected)
	}
	return (
		<>	
			<Header words={words[language]} changeLanguage={changeLanguage} language={language} />
			<main>
				<form onSubmit={verify}>
				<div className="form-group">
					<label htmlFor="text">{words[language].label}</label>
					<input id="text" onChange={handleInputChange} type="text"/>
				</div>
				<button type="submit">{words[language].textButton}</button>
				</form>

				<h1>{result && result}</h1>


				<div className="automata">
					<div id="start_arrow" className="element">
						<img alt="element of automaton" src={START_ARROW} />
					</div>
					<div id="q0" className="element">
						<img alt="element of automaton" src={STATE_0} />
					</div>
					<div id="arrow_q0_to_q1" className="element">
						<img alt="element of automaton" src={ARROW_Q0_TO_Q1} />
					</div>
					<div id="q1" className="element">
						<img alt="element of automaton" src={STATE_1} />
					</div>
					<div id="arrow_q1_to_q2" className="element">
						<img alt="element of automaton" src={ARROW_Q1_TO_Q2} />
					</div>
					<div id="q2" className="element">
						<img alt="element of automaton" src={STATE_2} />
					</div>
					<div id="arrow_q2_to_q3" className="element">
						<img  alt="element of automaton" src={ARROW_Q2_TO_Q3} />
					</div>
					<div id="arrow_q2_to_q4" className="element">
						<img alt="element of automaton" src={ARROW_Q2_TO_Q4} />
					</div>
					<div id="q3" className="element">
						<img alt="element of automaton" src={STATE_3} />
					</div>
					<div id="arrow_return_q3" className="element">
						<img alt="element of automaton" src={ARROW_RETURN_Q3} />
					</div>
					<div id="arrow_q3_to_q4" className="element">
						<img alt="element of automaton" src={ARROW_Q3_TO_Q4} />
					</div>
					<div id="q4" className="element">
						<img alt="element of automaton" src={STATE_4} />
					</div>
					<div id="arrow_q4_to_q1" className="element">
						<img alt="element of automaton" src={ARROW_Q4_TO_Q1} />
					</div>
				
				</div>
			</main>
		</>
	);
}

export default App;
