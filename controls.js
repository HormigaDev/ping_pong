class Player {
    constructor(w,h,ctx){
        this.x = 395;
        this.y = 590;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.direction = 'none'
        document.onkeydown = (e) => {
            if(e.key == 'a') this.direction = 'left';
            if(e.key == 'd') this.direction = 'right';
        }
        document.onkeyup = (e) => {
            if(e.key == 'a' || e.key == 'd'){
                this.direction = 'none';
            }
        }
    }
    draw(){
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.x,this.y,150,15);
    }
    update(){
        if(this.direction == 'left'){
            this.x -= 15;
                if(this.x < 10){
                    this.x = 10;
                }
        }
        if(this.direction == 'right'){
            this.x += 15;
                if(this.x+150 > 930){
                    this.x = 780;
                }
        }
    }
}

class Ball{
    constructor(x,y,ctx){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.direction = 'left';
        this.direction2 = 'up';
        this.player = null;
        this.speed = 5;
    }
    draw(){
        this.ctx.fillStyle = '#ff4040';
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,10,0,2*Math.PI,false);
        this.ctx.fill();
        this.ctx.closePath();
    }
    update(){
        if(this.direction == 'left'){
            this.x -= this.speed;
            if(this.x-5 < 10){
                this.x = 15;
                this.direction = 'right';
            }
        }
        if(this.direction == 'right'){
            this.x += this.speed;
            if(this.x+5>930){
                this.x = 930-5;
                this.direction = 'left'
            }
        }
        
        if(this.direction2 == 'up'){
            this.y -= this.speed;
            if(this.y-5 < 10){
                this.y = 15;
                this.direction2 = 'down';
            }
        }
        if(this.direction2 == 'down'){
            this.y += this.speed;
            if(this.x-5 >= this.player.x && this.x+5 < this.player.x+150){
                if(this.y+5 >= this.player.y && this.y+5 <= this.player.y+15){
                    this.direction2 = 'up';
                }
            }
            if(this.y+5 > 610){
                this.y = 610-5;
                this.direction2 = 'none';
                this.ctx.pause = true;
            }
        }

    }
}