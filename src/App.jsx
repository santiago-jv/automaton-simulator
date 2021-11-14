
import './App.css';
import { useEffect, useRef, useState } from "react"
import {words} from "./constants/constants" 

import Header from './components/header/Header.jsx';
import { elementsProperties } from './constants/constants';
import Element from './components/element/Element';


function App() {
	let count = 0
	const [language, setLanguage] = useState("spanish")
	const string = useRef("")
	const [currentChar, setCurrentChar] = useState("")
	const [result, setResult] = useState(null)
	const isAccept = useRef(false)
	const elements = useRef()
	const speed = useRef(500)
	const [isAnimating, setIsAnimating] = useState(false)

	const animateElement = async (index)=>{
		
		return new Promise((resolve)=>{
			const element = elements.current[index]
			element.animate([
				{ transform:'scale(1.1)'},
				{ transform:'scale(1)' }
			], {duration: speed.current});
			
			setTimeout(()=>{
				resolve()
			}
			,speed.current)
		})
	}
	const start = async  () => {
		if(Array.from(string.current).every(char=>char === ' ')) string.current = "λ"
		setIsAnimating(true)
		setResult(null)
		setCurrentChar(null)
		count = 0
		isAccept.current = false
		await state_0()
		setIsAnimating(false)
	}
	
	const showCurrentChart = (char)=>{
		char ? setCurrentChar(char):setCurrentChar("")
	}
	const state_0 = async() => {
		await animateElement(0)
		showCurrentChart(string.current[count])
		await animateElement(1)
		console.log("state_0")
		if (isNotOutRange()) {
			console.log("entra");
			if (string.current[count] === 'a') {
				await animateElement(2)
				count++
				await state_1()
				
			}
			else if (string.current === "λ") isAccept.current = true

			else error();
			
		}
		
	}
	const isNotOutRange = ()=>string.current.length > count
	
	const state_1 = async () => {
		console.log("state_1")
		showCurrentChart(string.current[count])
		await animateElement(3)

		if (isNotOutRange()) {
			if (string.current[count] === 'b') {
				count++
				await animateElement(4)
				await state_2()
				
			}else error();
		}
	}
	
	const state_2 = async () => {
		showCurrentChart(string.current[count])
		await animateElement(5)
		console.log("state_2")
		if (isNotOutRange()) {
			if (string.current[count] === 'c') {
				count++
				await animateElement(6)
				await state_3()
				
			}
			else if (string.current[count] === 'd') {
				count++
				await animateElement(7)
				await state_4()
					
			}
			else error()
		}
	}
		
		const state_3 = async() => {
			showCurrentChart(string.current[count])
			await animateElement(8)
			console.log("state_3")
			if (isNotOutRange()) {
				
				if (string.current[count] === 'c') {
					count++
					await animateElement(9)
					await state_3()
					
				} else if (string.current[count] === 'd') {
					count++
					await animateElement(10)
					await state_4()
				}	
				else error()	
			}
		}
		
		const state_4 = async() => {
			showCurrentChart(string.current[count])
			await animateElement(11)
			console.log("state_4")
			isAccept.current = true
			if (isNotOutRange()) {	
				if (string.current[count] === 'a') {
					isAccept.current =  false
					count++
					await animateElement(12)
					await state_1()		
				} else error()		
			}
		}
		
		const error = () => {
			isAccept.current = false
			console.log("error")
		}
		const handleInputChange = (event) => string.current = event.target.value
		
		const verify = (event) => {
			event.preventDefault()
			start()
		} 	
		const changeLanguage = ()=> setLanguage("spanish"===language? "english":"spanish")	
	
		
		useEffect(() =>{ 
		
			if(elements.current && !isAnimating){
				 setResult(isAccept.current? words[language].accepted: words[language].rejected)
			}
		

		},
		[language,isAnimating])
		useEffect(() => elements.current = document.querySelectorAll('.element'), [])
		
	return (
		<>	
			<Header words={words[language]} changeLanguage={changeLanguage} language={language} />
			<main>
				<form onSubmit={verify}>
					<div className="form-group">
						<label htmlFor="text">{words[language].labelString}</label>
						<input id="text" onChange={handleInputChange} type="text"/>
					</div>

					<div className="form-group">
						<label htmlFor="speed">{words[language].labelSpeed}</label>
						<select id="speed" onChange={(event)=>speed.current= Number(event.target.value)} value={speed}>
							<option value="500">{words[language].fastOption}</option>
							<option value="1500">{words[language].slowOption}</option>
						</select>
					</div>

					<button disabled={isAnimating} type="submit">{words[language].textButton}</button>
				</form>
				
				{(isAnimating && currentChar) && <p className="current-char">{words[language].currentChar}: {currentChar}</p>}
				{result && <h2 className="result" style={{color:result === words[language].accepted ? 'rgb(34, 168, 34)':'red'}}>{result}</h2>}


				<div className="automata">
					{elementsProperties.map((elementProperties,index) => (
						<Element key={index} id={elementProperties.id} image={elementProperties.image} />
					))}
				
				</div>
			</main>
		</>
	);
}

export default App;
