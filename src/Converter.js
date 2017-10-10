import React from 'react'
import CodeList from './components/CodeList'
import ExampleCode from './components/ExampleCode'

function codeify(text, intent){

  if(intent === "is"){
    let variable = getVariable(text, intent)
    let value = getValue(text, intent)
    let code = createVariable(variable, value)
    return code
  }else if(intent = "if"){
    let removedIf = text.replace("if ", "")
    let variable = getVariable(removedIf, "is")
    let value = getConditionalValue(removedIf)
    let ifThen = getThen(text)
    let ifElse = getElse(text)
    let code = createConditional(variable, value, ifThen, ifElse)
    return code
  }

  function getVariable(text, intent){
    let variable = text.slice(0, text.indexOf(intent) - 1)
    return variable
  }

  function getValue(text, intent){
    let value = text.slice(text.indexOf(intent) + 3)
    return value
  }

  function getConditionalValue(text){
    let isIndex = text.indexOf("is") + 3
    // remove "is"
    text = text.slice(isIndex)
    //find and remove everything after space
    let space = text.indexOf(" ")
    text = text.slice(0, space)
    return text
  }

  function getThen(text){
    //find then
    let findThen = text.indexOf("then ") + 5
    //remove then
    let ifElse = text.indexOf("else")
    if(ifElse === -1){
      text = text.slice(findThen)
    }else{
      text = text.slice(findThen, ifElse)
    }
    return text
  }

  function getElse(text){
    let ifElse = text.indexOf("else")
    if(ifElse === -1){
      return ""
    }else{
      let slicedText = text.slice(ifElse + 5)
      return `else{
        ${slicedText}
      }`
    }
  }

  function createVariable(name, value){
    return `var ${name} = ${value}`
  }

  function createConditional(variable, value, ifThen, ifElse){
    let ifStatement = `if(${variable} === ${value})`
    let then = `{
      ${ifThen}
    }`
    return ifStatement + then + ifElse
  }
}


const Converter = ({text, updateCode, codeArr}) => {
  let convert = text.split(".").filter(sent => sent !== "")
  let intentKeys = ["is", "if"]
  let intent = convert.map(sentence => {
      let words = sentence.split(" ")
      let determineIntent = words.find(key => intentKeys.includes(key))
      return determineIntent
  }).filter(key => key !== undefined)

  let code = convert.map((sentence, index) => {
    return codeify(sentence, intent[index])
  })

  return(
    <div>
      <p>{text}</p>
      <ExampleCode />
      <CodeList codeArr={code}/>
    </div>
  )
}
export default Converter
