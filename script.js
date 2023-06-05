let canvas= document.getElementById("canvas");
let ctx= canvas.getContext('2d');
let player = new Player(150,15,ctx)

canvas.height = 620;
canvas.width = 940;


player.draw();
player.updatePosition();

function update(){
    // canvas.width = 940;
    requestAnimationFrame(update);
}

update();