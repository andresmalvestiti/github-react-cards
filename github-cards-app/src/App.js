import React, { Component } from 'react';
import logo from './logo.svg';
import github from './github-logo.png';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
  	cards: []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img style={{display: 'inline'}} src={logo} className="App-logo" alt="logo" />
            <img style={{display: 'inline', marginBottom: '0.30em'}} src={github} className="App-logo-git" alt="logo" />
            </div>
          <div>
            <Form onSubmit={this.addNewCard}/>
            <CardList cards={this.state.cards}/>
          </div>
        </header>
      </div>
    );
  }
}

const Card = (props) => {
	return(
  	<div className="card">
  	  <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
      <code>
        <div>{props.name}</div>	
        <div>Repos: {props.public_repos}</div>
        <div>
          <a href={props.html_url} target="_blank">Profile</a>
        </div>
        </code>
      </div>
  	</div>
  );
}

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state = { userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp => {
    	this.props.onSubmit(resp.data);
      this.setState({ userName: '' });
    });
  };

	render() {
  	return(
    	<form onSubmit={this.handleSubmit}>
        <input 
        type="text" 
        value={this.userName}
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="Github username" required/>
        <button type="submit">Add card</button>
      </form>
    );
  }
}


export default App;
