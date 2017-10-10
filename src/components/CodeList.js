import React from 'react'
import Code from './Code'


const CodeList = ({codeArr}) => {
  let displayCode = codeArr.map((code, index) => <Code key={index} code={code}/>)
  return(
    <div>
      {displayCode}
    </div>
  )
}

export default CodeList
