
import './App.css';
import { useEffect, useRef, useState } from "react"
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

	const [string, setString] = useState("")
	const [result, setResult] = useState(null)
	const [isOver, setIsOver] = useState(false)
	const [isAccept, setIsAccept] = useState(false)
	const elements = useRef();

	const start =async  () => {
		count = 0
		setIsAccept( false)
		setIsOver(false)
		await state_0()
		console.log("hola");
		setIsOver(true)
	}
	useEffect(() => {
		elements.current = document.querySelectorAll('.element')
		console.log(elements.current)
		
	}, [])

	const animateElement = async (index)=>{
		
		return new Promise((resolve, reject)=>{
			const element = elements.current[index]
			element.animate([
				{ transform:'scale(1.1)'},
				{ transform:'scale(1)' }
			  ], {duration: 1000,});

			setInterval(()=>{
				resolve()
			}
			,1000)
		})
	}
	const state_0 = async() => {
		await animateElement(0)
		await animateElement(1)
		console.log("state_0")
		if (isNotOutRange()) {
			if (string[count] === 'a') {
				await animateElement(2)
				count++
				await state_1()
				
			}else{
				error();
			}
			
		}else{
			if (string.length === 0) {
				setIsAccept(true)
			}
		}
		
	}
	const isNotOutRange = ()=>string.length > count
	
	const state_1 = async () => {
		console.log("state_1")
		await animateElement(3)
		if (isNotOutRange()) {
			if (string[count] === 'b') {
				count++
				await animateElement(4)
				await state_2()
				
			}else{
				error();
			}
		}
	}

	const state_2 = async () => {
		await animateElement(5)
		console.log("state_2")
		if (isNotOutRange()) {
			if (string[count] === 'c') {
				count++
				await animateElement(6)
				await state_3()
				
			}
			else if (string[count] === 'd') {
					count++
					await animateElement(7)
					await state_4()
				
			}
			else {
				error()
			}
		}
	}

	const state_3 = async() => {
		await animateElement(8)
		console.log("state_3")
		if (isNotOutRange()) {
	
			if (string[count] === 'c') {
				count++
				await animateElement(9)
				await state_3()
				
			} else if (string[count] === 'd') {
				count++
				await animateElement(10)
				await state_4()
			
			}	
			else{
				error()
			}
	
		}
	}

	const state_4 = async() => {
		await animateElement(11)
		console.log("state_4")
		setIsAccept(true)
		if (isNotOutRange()) {
		
			
			if (string[count] === 'a') {
				setIsAccept( false)
				count++
				await animateElement(12)
				await state_1()
				
			}else{
				error()
				
			}
		}
		
	}

	const error = () => {
		setIsAccept(false)
		console.log("error")
		
	}
	const handleInputChange = (event) => setString(event.target.value)

	const verify = (event) => {
		event.preventDefault()
		start()
	}
	const changeLanguage = ()=>{
		setLanguage("spanish"===language? "english":"spanish")
		
	}

	useEffect(() => {
		setResult(isAccept? words[language].accepted: words[language].rejected)
	}, [isAccept,language,isOver])
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

				<h1>{isOver && result}</h1>


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
