import React, { Component } from 'react';
import axios from 'axios';
import Games from './Games';
import CreateGame from './CreateGame';
import Chat from '../chat/Chat';
import io from 'socket.io-client';
import Box from 'react-chat-box';
import './Lobby.css'

class Lobby extends  Component {
    constructor(props){
        super(props)
        this.state = {
            openGames: [],
            gameCreate: {}
         }

         this.updateGamesList = this.updateGamesList.bind(this);
         this.handleJoinGame = this.handleJoinGame.bind(this);
         this.handleOnChange = this.handleOnChange.bind(this);
         this.handleCreateGame = this.handleCreateGame.bind(this);
    } 
    componentDidMount(){
        this.props.socket.on('updateGamesList', this.updateGamesList);
    }

    handleJoinGame(data) {
        this.props.socket.emit('joinGame', {
            query: {
                roomId: data,
                username: this.props.user,
            }
        })
    }

    updateGamesList(data) {
        this.setState({
            openGames: data.gameList
        })
    }

    handleOnChange(e) {
        this.setState({ 
            gameCreate: {
                username: this.props.user, 
                numberPlayers: 1,
                maxPlayers: 2,
                comments: e.target.value,
                room: this.props.user,
            }
        })
    }
    
    handleCreateGame() {
        this.props.socket.emit('createGame', {
            query: {
                roomId: this.state.gameCreate.username,
                game: this.state.gameCreate
            }
        })
    }


    render(){
        return (
            <div id="lobby" align="center">
                <div id="created" >
                    <span className="lobby">
                    </span>
                    <span className="chat">
                        <h1> Games List: </h1>
                        <Games games={this.state.openGames} handleJoinGame={this.handleJoinGame}/>
                        <CreateGame handleCreateGame={this.handleCreateGame} handleOnChange={this.handleOnChange}/>
                    </span>
                </div>
                <style>
                    {`
                        .lobby {
                            width: 65%;
                        }

                        .chat {
                            width: 30%;
                        }
                    `}
		        </style>
            </div>
        )
    }

}

export default Lobby;