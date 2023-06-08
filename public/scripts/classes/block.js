// import db from './classes/database.js';

export default class Block {
    constructor(x,y,w,h,ctx,color){
        this.x = x;
        this.y = y;
        this.width = w
        this.height = h;
        this.ctx = ctx;
        this.color = color;
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.id = '';
        for(let i = 0; i < 40; i++){
            this.id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    draw(){
        this.ctx.fillStyle = this.color ? this.color : '#fff';
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    dismiss(){
        this.ctx.clearRect(this.x,this.y,this.width,this.height);
    }
}