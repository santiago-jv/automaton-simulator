import React from 'react'
import "./header.css"
import SPANISH from "../images/spanish.svg"
import ENGLISH from "../images/english.svg"
const Header = ({words,language,changeLanguage}) => {
    return (
        <header>
           <div className="container">
                <h1>{words.title}</h1> 
                <div onClick={changeLanguage} className="language-container">
                    <img src={language==="english"?SPANISH :ENGLISH} alt="language switcher" />
                </div>
            </div>  
        </header>
    )
}

export default Header
