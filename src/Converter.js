import React from 'react'

//pass splitted paragraph
function codify(splitedPara, order, special){
  function eachSent(splitedPara, order, special){
    let ret = []
    order.forEach((key, index) => {
      let variable = splitedPara[index].slice(0, splitedPara[index].indexOf("is")).join("_")
      let value = splitedPara[index].slice(splitedPara[index].indexOf("is") + 1).join("_")

      if(key === "."){
        ret.push(createVar(variable, value))
      } else if(key === "?" && special.length !== 0){
        ret.push(createConditional(variable, value, special))
      } else if (key === "?") {
        ret.push(createSimpleConditional(variable, value))
      }
    })
    return ret
  }

  function createVar(name, value){
    return `var ${name} = ${value};`
  }
  function createSimpleConditional(name, value){
    return `if(${name} === ${value}){
              return true
            }else{
              return false
            };`
  }
  function createConditional(name, value, action){
    debugger
    return `if(${name} === ${value}){
              ${action}
            };`
  }

  return eachSent(splitedPara, order, special)
}


const Converter = ({text, updateCode, codeArr}) => {
  let splitter = text.split(".").map(sentence => sentence.split(" "))
  let order = text.split("").filter(char => [".", "?", "!"].includes(char))
  let special = text.split(" ").filter(char => ["then"].includes(char))
  //console.log(splitter)
  //console.log(order)
  let code = codify(splitter, order, special)

  if(codeArr.length !== code.length){
    updateCode(code)
  }
  return(
    <div>
      <p>{text}</p>
    </div>
  )
}
export default Converter
