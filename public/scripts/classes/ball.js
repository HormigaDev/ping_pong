import db from '../classes/database.js';

export default class Ball {
    constructor(){
        this.x = (window.innerWidth-300)/2;
        this.y = (window.innerHeight-150);
        this.directionX = 'none';
        this.directionY = 'none';
        this.radius = 10;
        this.color = '#fafafa';
        this.speed = 1;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update(blocks,player){
        if(this.directionX == 'left'){
            this.x -= this.speed;
            if(this.x <= 20){
                this.directionX = 'right';
            }
        }
        if(this.directionX == 'right'){
            this.x += this.speed;
            if(this.x >= window.innerWidth-320){
                this.directionX = 'left';
            }
        }
        if(this.directionY == 'up'){
            this.y -= this.speed;
            if(this.y < 20){
                this.directionY = 'down';
            }
            
            blocks.forEach(block => {
                let left = this.x-(this.radius/2);
                let right = this.x+(this.radius/2);
                let top = this.y-(this.radius/2);

                // console.log(block.x,block.y,block.width,block.height)
                if(
                    left >= block.x && left <= block.x+block.width && top >= block.y && top <= block.y+block.height
                    ||
                    right >= block.x && right <= block.x+block.width && top >= block.y && top <= block.y+block.height
                    ){
                    this.directionY = 'down';
                    block.dismiss();
                    this.color = block.color;
                    blocks.splice(blocks.indexOf(block),1);
                }
            })
            if(this.x-(this.radius/2) >= player.x && this.x-(this.radius/2) <= player.x+player.width && this.y+(this.radius/2) >= player.y && this.y+(this.radius/2) <= player.y+player.height
            ||
            this.x+(this.radius/2) >= player.x && this.x+(this.radius/2) <= player.x+player.width && this.y+(this.radius/2) >= player.y && this.y+(this.radius/2) <= player.y+player.height){
                this.directionY = 'up';
            }

        }
        if(this.directionY == 'down'){
            this.y += this.speed;
            if(this.y > window.innerHeight-20){
                this.directionY = 'up';
            }
            blocks.forEach(block => {
                let left = this.x-(this.radius/2);
                let right = this.x+(this.radius/2);
                let bottom = this.y+(this.radius/2);

                if(
                    left >= block.x && left <= block.x+block.width && bottom >= block.y && bottom <= block.y+block.height
                    ||
                    right >= block.x && right <= block.x+block.width && bottom >= block.y && bottom <= block.y+block.height
                    ){
                    this.directionY = 'up';
                    block.dismiss();
                    this.color = block.color;
                    blocks.splice(blocks.indexOf(block),1);
                }
            })
            if(this.x-(this.radius/2) >= player.x && this.x-(this.radius/2) <= player.x+player.width && this.y+(this.radius/2) >= player.y && this.y+(this.radius/2) <= player.y+player.height
            ||
            this.x+(this.radius/2) >= player.x && this.x+(this.radius/2) <= player.x+player.width && this.y+(this.radius/2) >= player.y && this.y+(this.radius/2) <= player.y+player.height){
                this.directionY = 'up';
            }
            if(this.y+(this.radius/2) >= window.innerHeight-20){
                this.directionY = 'none';
                this.directionX = 'none';
                db.set('game', 'over')
            }
        }
    }
}