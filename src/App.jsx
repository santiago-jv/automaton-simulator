
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
	const isAccept = useRef(null)
	const elements = useRef()
	const [speed, setSpeed] = useState(500)
	const [formData, setFormData] = useState("")
	const [isAnimating, setIsAnimating] = useState(false)
	let auxiliar = ""
	let startIndex = 0

	const animateElement = async (index)=>{	
		return new Promise((resolve)=>{
			const element = elements.current[index]
			element.animate([
				{ transform:'scale(1)'},
				{ transform:'scale(1.08)'},
				{ transform:'scale(1)' }
			], {duration: speed});
			
			setTimeout(()=>{
				resolve()
			}
			,speed)
		})
	}
	const start = async  () => {
		window.scroll({
			top:document.body.scrollHeight,
			behavior:'smooth'
		})
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
	const state_0 = async () => {
		await animateElement(0)
		showCurrentChart(string.current[count])
		await animateElement(1)
		if (isNotOutRange()) {
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
			isAccept.current = true
			if (isNotOutRange()) {	
				
				if (string.current[count] === 'a') {
					
					if(!auxiliar)auxiliar = string.current.slice(auxiliar?auxiliar.length:0,count)
					
					startIndex = startIndex + auxiliar.length
					isAccept.current =  false
					count++
					await animateElement(12)
					await state_1()		
				} else error()		
			}
			else{
				if((auxiliar &&  auxiliar !== string.current.slice(startIndex, count))) {
					error()
				}

			}
		}
		
		const error = () => {
			isAccept.current = false
		}
		const handleInputChange = (event) => {
			setFormData(event.target.value)
		}
		
		const verify = (event) => {
			event.preventDefault()
			string.current = formData
			start()
		} 	
		const changeLanguage = ()=> setLanguage("spanish"===language? "english":"spanish")	
	
		
		useEffect(() =>{ 
			if(elements.current && !isAnimating ){
				let newResult;
				if(isAccept.current === null) newResult = null;
				else if (isAccept.current) newResult = words[language].accepted 
				else newResult = words[language].rejected

				setResult(newResult)
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
						<input value={formData} id="text" onChange={handleInputChange} type="text"/>
						<p className="suggestions">
						{words[language].regularExpressionLabel}: <strong>(abc*d)*</strong>
						</p>
						<div className="examples-container">
							<p className="example-title">{words[language].exampleLabel}</p>
							<div className="examples">
								<b onClick={()=>setFormData("λ")} className="example">λ</b>
								<b onClick={()=>setFormData("abcd")} className="example">abcd</b>
								<b onClick={()=>setFormData("abcccd")} className="example">abcccd</b>
								<b onClick={()=>setFormData( "abcdabcd")} className="example">abcdabcd</b>
								<b onClick={()=>setFormData("abccccdabccccdabccccd")} className="example">abccccdabccccdabccccd</b>
							</div>

						</div>
					</div>

					<div className="form-group">
						
						<label htmlFor="speed">{words[language].labelSpeed}</label>
					
						<input  type="range" min="200" max="1500"  value={speed} onChange={(event)=>setSpeed(Number(event.target.value))}  step="100"/>
						<p className="speed-info">{words[language].currentSpeed} {speed} ms</p>
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
