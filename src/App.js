
import './App.css';
import { useState } from "react"
import words from "./words.json" 

function App() {
	let count = 0
	const [language, setLanguage] = useState("spanish")
	let aux = []
	let isAccept = false
	const [string, setString] = useState("")
	const [result, setResult] = useState(null)
	

	const start = () => {
		count = 0
		isAccept = false
		setResult("xd")
		aux = []
		state_0()
	}

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
				setResult("Es aceptado")
			}
		}
		
	}

	function isNotOutRange() {
		const isValid = string.length > count
		console.log("IsAccept:",isAccept);
		if(!isValid) {
			setResult(isAccept? "Es aceptado": "Rechazado")
			
		}
		return isValid

	}
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

	/* const state_4 = () => {
		console.log("state_4")
		isAccept = true
		console.log("count",count);
		if (isNotOutRange()) {
			console.log("***** auxiliar:",aux,"********");
			if((aux &&  aux !== string.slice(aux.length, count))) {
				console.log("entra");
				error()
			}
			
			else if (string[count] === 'a') {
			
				aux = string.slice(aux?aux.length:0,count)
				console.log("entra por aca xd", aux);
				count++
				state_1()
				
			}else{
				error()
				
			}
			
		}
		else {
			console.log("auxiliar:", aux);
			if(aux) console.log(string.slice(aux.length, count))
			if((aux &&  aux !== string.slice(aux.length, count)  )) {
				console.log("entra");
				error()
			}
		}
	
	}
 */
	const state_4 = () => {
		console.log("state_4")
		isAccept = true
		aux.push(string.slice(aux?aux.length:0,count))
		console.log("count",count);
		if (isNotOutRange()) {
			console.log("***** auxiliar:",aux,"********");
			for (let index = 0; index < aux.length; index++) {
				const element = aux[index];
				const nextElement = aux[index+1]
				if(element && nextElement  ){
					if(element !== nextElement){
						error()
					}
				}
		
				
			}
		
			if (string[count] === 'a') {
			
				aux.push( string.slice(aux?aux.length:0,count))
				console.log("entra por aca xd", aux);
				count++
				state_1()
				
			}else{
				error()
				
			}
			
		}
		else {
		/* 	console.log("auxiliar:", aux);
			if(aux) console.log(string.slice(aux.length, count))
			if((aux &&  aux !== string.slice(aux.length, count)  )) {
				console.log("entra");
				error()
			} */
		}
	
	}
	const error = () => {
		isAccept=false
		setResult("Rechazado")
		console.log("error")
		
	}
	const handleInputChange = (event) => {
		setString(event.target.value)
	}
	const verify = (event) => {
		event.preventDefault()
		start()
	}
	return (
		<>	
			<main>
				<h1>{words[language].title}</h1>
				<form onSubmit={verify}>
				<div className="form-group">
					<label htmlFor="text">{words[language].label}</label>
					<input id="text" onChange={handleInputChange} type="text"/>
				</div>
				<button type="submit">{words[language].textButton}</button>
				</form>
				<button onClick={()=>setLanguage("spanish"===language? "english":"spanish")}>
					{words[language].changeLanguage}
				</button>

				<h1>{result && result}</h1>
			</main>
		</>
	);
}

export default App;
