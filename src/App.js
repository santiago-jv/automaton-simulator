
import './App.css';
import { useState } from "react"
const  words = {
	spanish:{
		title:"Automata",
		textButton:"español"

	},

	english:{
		title:"Automataxd",
		textButton:"Inglés"
	}
}
function App() {
	let count = 0
	const [language, setLanguage] = useState("spanish")
	let isAccept = false
	const [string, setString] = useState(null)

	const start = () => {
		count = 0
		isAccept = false
		state_0()
	}

	const state_0 = () => {
		console.log("state_0")
		if (string.length > count) {
			if (string[count] === 'a') {
				state_1()
			}
		}
	}

	const state_1 = () => {
		console.log("state_1")
		if (string.length > count) {

		}
	}

	const state_2 = () => {
		console.log("state_2")
		if (string.length > count) {

		}
	}

	const state_3 = () => {
		console.log("state_3")
		if (string.length > count) {

		}
	}

	const state_4 = () => {
		console.log("state_4")
		if (string.length > count) {

		}
	}

	const error = () => {
		console.log("state_4")
		if (string.length > count) {

		}
	}
	const handleInputChange = (event) => {
		setString(event.target.value)
	}
	return (
		<>	
			<h1>{words[language].title}</h1>
			<input onChange={handleInputChange} type="text"/>
			<button onClick={start}>{words[language].textButton}</button>
			<button onClick={()=>setLanguage("spanish"===language? "english":"spanish")}>change language</button>
		</>
	);
}

export default App;
