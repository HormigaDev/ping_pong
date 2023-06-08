import db from '../classes/database.js';

export default class Player {
    constructor(){
        this.y = window.innerHeight-30-20;
        this.x = (window.innerWidth-300)/2
        this.speed = 10;
        this.height = 20;
        this.width = 100;
        this.direction = 'none';

        document.onkeydown = (e) => {
            if(e.key == 'ArrowLeft' || e.key == 'a'){
                this.direction = 'left';
            }
            if(e.key == 'ArrowRight' || e.key == 'd'){
                this.direction = 'right';
            }
        }
        document.onkeyup = (e) => {
            if(e.key == 'ArrowLeft' && this.direction == 'left' || e.key == 'a' && this.direction == 'left'){
                this.direction = 'none';
            }
            if(e.key == 'ArrowRight' && this.direction == 'right' || e.key == 'd' && this.direction == 'right'){
                this.direction = 'none';
            }
        }
    }
    draw(ctx){
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        if(this.direction == 'left' && this.x > 20){
            this.x -= this.speed;
            if(this.x < 20){
                this.x = 20;
            }
        }
        if(this.direction == 'right' && this.x+this.width < window.innerWidth-300-20){
            this.x += this.speed;
            if(this.x+this.width > window.innerWidth-300-20){
                this.x = window.innerWidth-300-20-this.width;
            }
        }
    }
}