/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//Global Variables
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 40;
const forwardEnemiesArray = [];
const randomEnemiesArray = [];
let gameFrame = 0;
let difficulty = 1;


//Enemy Class
class Enemy{
    constructor(width, height){
        this.image = new Image()
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;
        this.frame = 0;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
    }

    //method to draw object
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

}

//Inheritance class -> Random Pattern Enemy
class randomPatternEnemy extends Enemy{
    constructor(width, height){
        super(width, height);
        this.image.src = './enemies/enemy1.png';
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 5 + 1) ;  //to allow for enemies to not all be moving in 100% sync
    }
   
    update(){
        this.x += difficulty * (Math.random() * 5 - 2.5);
        this.y += Math.random() * 5 - 2.5;
        //animate sprites
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }   
}


// Inheritance class -> Rorward Pattern Enemies
class forwardPatternEnemy extends Enemy{
    constructor(width, height){
        super(width, height);
        this.image.src = './enemies/enemy2.png';
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 10 + 1) ; 
        this.forwardSpeed = Math.random() * 1 + 1;
    }
   
    update(){
        this.x -= this.forwardSpeed;
        this.y += difficulty * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        //animate sprites
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }   
}

//Create random Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    randomEnemiesArray.push(new randomPatternEnemy(293, 155));
}

//Create forward Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    forwardEnemiesArray.push(new forwardPatternEnemy(266, 188));
}

//animate loop function
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    randomEnemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    });
    forwardEnemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    });
    gameFrame ++;
    requestAnimationFrame(animate);
}
animate();