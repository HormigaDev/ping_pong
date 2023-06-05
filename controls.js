class Player {
    constructor(w,h,ctx){
        this.x = 395;
        this.y = 590;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
    }
    draw(){
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(395,590,150,15);
    }
    updatePosition(){
        document.onkeydown = (e) => {
            console.log(e.key);
        }
    }
}