import React from 'react'

const TextField = ({text, updateText}) => {
  return(
    <input type="text" value={text} onChange={updateText}/>
  )
}

export default TextField
