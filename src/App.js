import React, { Component } from 'react';
import './App.css';
import InputTeamDetails from './components/InputTeamDetails';
import NavigationBar from './components/NavigationBar';
import TeamDetails from './components/TeamDetails';

class App extends Component {

  render() {
    return (
      <div className="App">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <NavigationBar />
        <InputTeamDetails />
        <TeamDetails />
      </div>
    );
  }
}

export default App;