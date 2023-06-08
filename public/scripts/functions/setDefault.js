import db from '../classes/database.js';

export default function setDefault(player,ball){
    let ids = ['ball_size','ball_speed','player_bar_size','blocks_size','blocks_rows','player_speed'];

    ids.forEach(id => {
        let element = document.getElementById(id);
        if(id == 'blocks_rows' || id == 'ball_speed'){
            element.value = Number(element.value);
            if(id == 'ball_speed'){
                ball.speed = Number(element.value);
            }
        }
        db.set(id, element.value);
    });
    switch (db.get('ball_size')){
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
    switch (db.get('player_bar_size')){
        case 'large':
            player.width = 200;
            player.x = ((window.innerWidth-300)/2)-(player.width/2);
            break;
        case 'big':
            player.width = 150;
            player.x = ((window.innerWidth-300)/2)-(player.width/2);
            break;
        case 'normal':
            player.width = 100;
            player.x = ((window.innerWidth-300)/2)-(player.width/2);
            break;
        case 'small':
            player.width = 50;
            player.x = ((window.innerWidth-300)/2)-(player.width/2);
            break;
    }
    switch(db.get('player_speed')){
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