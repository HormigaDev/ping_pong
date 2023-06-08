import db from '../classes/database.js';
import Block from '../classes/block.js';
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


function randomColor(){
    let hex = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += hex[Math.floor(Math.random()*16)];
    }
    return color;
}

export default function createBlocks(blocks){
    let spaceWidth = 30;
    let spaceHeight = 30;
    let width = 0;
    let columns = 0;
    switch (db.get('blocks_size')){
        case 'big':
            width = ((window.innerWidth-340-70)/6);
            columns = 6;
            break;
        case 'normal':
            width = ((window.innerWidth-340-130)/12);
            columns = 12;
            break;
        case 'small':
            width = ((window.innerWidth-340-190)/18);
            columns = 18;
            break;
    }
    let height = 20;
    let rows = db.get('blocks_rows');
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            let block = new Block(spaceWidth, spaceHeight, width, height, ctx, randomColor());
            blocks.push(block);
            console.log(block.width,block.height)
            spaceWidth += width+10;
        }
        spaceWidth = 30;
        spaceHeight += height+10;
    }
}