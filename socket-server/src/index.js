const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server)

const port = 9002;

const games = [{username: 'truelav', players: 1, maxPlayers: 2, comments: 'no place for nuubs', player1: 'truelav', player2: ''}]
const players = [];
const playedCount = 0;
const rooms = [];
let currentGame = {};

io.on('connection', function(socket) {
    console.log('player connected');
    socket.emit('displayGameList', {activeGames: games});
    socket.on('createGame', function(data) {
        socket.join(`${data.username}`)
        games.push(data);
        socket.emit('displayGameList', {activeGames: games});        
        socket.emit('gameStatus', {msg: socket.rooms})
    })
    socket.on('joinGame', function(data) {
        let gameCreator = data.gameJoined;
        socket.join(`${gameCreator}`);
        games.forEach(function(game) {if (game.username === gameCreator) {game.players++, game.player2 = data.personalData, currentGame = game}} )
        socket.emit('message', {msg: 'get ready for the game'});
        socket.emit('displayGameList', {activeGames: games});
    })

//     if (players.length === 0){
//         players.push(socket);
//         socket.emit('handlePlayer', {msg:"playerOne"});
//         socket.emit('status', {msg: 'waiting for another player..'})
//     } else if (players.length === 1) {
//         players.push(socket);
//         socket.emit('handlePlayer', {msg: 'playerTwo'});
//         players.forEach(player => {player.emit('status', {msg: 'Lets play'})})
//     } else {
//         socket.emit('handleWelcome', {msg: 'the server is full'})
//     }

//     socket.on('played', function(packet) {
//         if(scoket === players[0]) {
//             game.player1 = packet.playerOneChoice;
//             playedCount++
//         } else if (socket === players[1]) {
//             game.player2 = packet.playerTwoChoice;
//             playedCount++
//         } else {
//             console.error('something happened')
//         }
//         if (playedCount === 3) {
// 			playedCount = 0;
// 			var champ = winner(game.player1, game.player2);
// 			players.forEach(player => {
// 				player.emit('gameOver', {winner:champ, player1:game.player1, player2:game.player2});
// 			});
// 		}
//     });

    socket.once('disconnect', () => {
		// players.splice(players.indexOf(socket), 1);
		// players.forEach(player => {
		// 	player.emit('playerLeft', {msg: "The other player left"});
		// });
		socket.disconnect();
		console.log('a user disconnected.');
    });
    
})

server.listen(port, function() {
    console.log('We are listening on port', port);
});


