import React from 'react'

const Element = ({id, image}) => {
    return (
        <div id={id} className="element">
            <img alt="element of automaton" src={image} />
        </div>
    )
}

export default Element
