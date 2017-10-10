import React, { Component } from 'react';
import TextField from './TextField'
import Converter from './Converter'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      code: []
    }
  }

  updateText = (event) => {
    let text = event.target.value
    this.setState({text})
  }

  updateCode = (code) => {
    console.log(code)

  }

  render() {
    this.updateCode()
    return (
      <div className="App">
        <h1>Codify!!!</h1>
        <h3>Enter English and we'll Codify it!</h3>
        <TextField text={this.state.text} updateText={this.updateText}/>
        <Converter text={this.state.text} updateCode={this.updateCode} codeArr={this.state.code}/>
      </div>
    );
  }
}

export default App;
