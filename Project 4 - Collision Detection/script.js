//Initialize HTML Objects/links
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect() //returns an object and its position relative to a viewport

//Explostion on Collision object
class Explosion{
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.5;
        this.height = this.spriteHeight*0.5;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = './boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2; 
        this.sound = new Audio();
        this.sound.src = './TailWhip.flac';
    }
    //update image method
    update(){
        if (this.frame === 0) this.sound.play();
        this.timer++;

        //slow down the animation to only animate every 10 frames
        if (this.timer %10 === 0){
            this.frame++;
        }
       
    }
    //draw image method
    draw(){
        //canvas rotation
        ctx.save();
        ctx.translate(this.x, this.y);      //set rotation centre point
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame , 0, this.spriteWidth, this.spriteHeight, 0 -this.width*0.5, 0-this.height*0.5, this.width, this.height);
        ctx.restore();
    }

}

//draw explosion
window.addEventListener('click', function(e){
    //accounts for margins
    createAnimation(e);
})

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY =  e.y - canvasPosition.top;

    explosions.push(new Explosion(positionX, positionY));
}

//animation loop
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for (let i = 0; i< explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();

        //remove completed animations (explosions) from array
        if (explosions[i].frame>5){
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();