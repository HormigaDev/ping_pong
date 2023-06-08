let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

export default function drawMargins(){
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(20,20,window.innerWidth-340, window.innerHeight-40);
    ctx.clearRect(22,22,window.innerWidth-344, window.innerHeight-44);
    ctx.fillStyle = '#da0000';
    ctx.fillRect(20,window.innerHeight-22, window.innerWidth-340, 2);
}