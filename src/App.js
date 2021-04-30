import React, {Component} from 'react'
import './App.css';
import Places from './components/Places'

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Places App</h1>
        </header>
        <Places />
      </div>
    );
  }
}

export default App;
