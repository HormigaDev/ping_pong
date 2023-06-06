let canvas= document.getElementById("canvas");
let ctx= canvas.getContext('2d');
let player = new Player(150,15,ctx)
let ball = new Ball(470,310,ctx);

canvas.height = 620;
canvas.width = 940;


function drawMargins(){
    ctx.fillStyle = '#000'
    ctx.fillRect(8,8,922,602);
    ctx.clearRect(10,10,918,598)
}
function drawLimit(){
    ctx.fillStyle = '#990000'
    ctx.fillRect(10,608,918,2);
}

ball.player = player;

function update(){
    if(ctx.pause == true) return;
    canvas.width = 940;
    drawMargins();
    drawLimit();
    ball.update();
    ball.draw();
    player.draw();
    player.update();
    requestAnimationFrame(update);
}

update();