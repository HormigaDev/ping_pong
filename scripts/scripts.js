//IMPORTS
import db from './classes/database.js';
import drawMargins from './functions/drawMargins.js';
import setDefault from './functions/setDefault.js';
import createBlocks from './functions/createBlocks.js';
import drawBlocks from './functions/drawBlocks.js';
import Player from './classes/player.js';
import Ball from './classes/ball.js';

// MAIN
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let blocks = [];
let player = new Player();
let ball = new Ball();
let buttonStart = document.getElementById('start');
let message = document.getElementById('message');

function listenForChanges(){
    let ids = ['ball_size','ball_speed','player_bar_size','blocks_size','blocks_rows','player_speed', 'behavior'];

    ids.forEach(id => {
        let element = document.getElementById(id);
        element.addEventListener('change', () => {
            if(id == 'blocks_rows' || id == 'ball_speed'){
                element.value = Number(element.value);
                if(id == 'blocks_rows' && element.value >= 15){
                    element.value = 14;
                }
                if(id == 'blocks_rows' && element.value <= 0){
                    element.value = 1;
                }
                if(id == 'ball_speed' && element.value >= 10){
                    element.value = 9;
                }
                if(id == 'ball_speed' && element.value <= 0){
                    element.value = 1;
                }
                if(id == 'ball_speed'){
                    ball.speed = Number(element.value);
                }
            }
            db.set(id, element.value);
            blocks = [];
            createBlocks(blocks);
            if(id == 'player_bar_size'){
                switch (element.value){
                    case 'large':
                        player.width = 200;
                        player.x = (canvas.width/2)-(player.width/2);
                        break;
                    case 'big':
                        player.width = 150;
                        player.x = (canvas.width/2)-(player.width/2);
                        break;
                    case 'normal':
                        player.width = 100;
                        player.x = (canvas.width/2)-(player.width/2);
                        break;
                    case 'small':
                        player.width = 50;
                        player.x = (canvas.width/2)-(player.width/2);
                        break;
                }
            }
            if(id == 'ball_size'){
                switch (element.value){
                    case 'big':
                        ball.radius = 20;
                        break;
                    case 'normal':
                        ball.radius = 10;
                        break;
                    case 'small':
                        ball.radius = 5;
                        break;
                }
            }
            if(id == 'player_speed'){
                switch (element.value){
                    case 'normal':
                        player.speed = 10;
                        break;
                    case 'slow':
                        player.speed = 5;
                        break;
                    case 'fast':
                        player.speed = 20;
                        break;
                    case 'very_fast':
                        player.speed = 40;
                        break;
                }
            }
            if(id == 'behavior'){
                switch (element.value){
                    case 'phisic':
                        ball.behavior = 'phisic';
                        break;
                    case 'anormal':
                        ball.behavior = 'anormal';
                        break;
                }
            }
        });
    })
}


//EXECUTE FUNCTIONS
setDefault(player,ball);
listenForChanges();
createBlocks(blocks);

function start(){
    if(blocks.length == 0){
        let message = document.getElementById('message');
        document.getElementById('content-message').className = 'on';
        setTimeout(() => {
            message.innerHTML = 'PARABÉNS, VOCÊ VENCEU!';
        }, 300);
        buttonStart.textContent = 'DE NOVO';
        return;
    }
    if(db.get('game') == 'over'){
        document.getElementById('content-message').className = 'on';
        setTimeout(() => {
            message.innerHTML = 'MAS VOCÊ É RUIM HEIN!';
        }, 300);
        buttonStart.textContent = 'DE NOVO';
        return;
    }
    if(db.get('pause') == true) return;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth-300;
    drawMargins();
    drawBlocks(blocks);
    ball.draw(ctx);
    ball.update(blocks,player);
    player.draw(ctx);
    player.update();
    requestAnimationFrame(start);
}
console.log(localStorage.getItem('db'));

start();

buttonStart.addEventListener('click', (e) => {
    e.preventDefault();
    if(buttonStart.textContent == 'DE NOVO'){
        window.location.reload();
        return;
    }
    if(!db.get('game')){
        db.set('game', true);
        buttonStart.textContent = 'PAUSE';
        ball.directionX = 'right';
        ball.directionY = 'up';
        return;
    }
    if(db.get('pause') == false){
        db.set('pause', true);
        buttonStart.textContent = 'START';
    }
    else{
        db.set('pause', false);
        start();
        buttonStart.textContent = 'PAUSE';
    }
});