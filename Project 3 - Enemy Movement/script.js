/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//Global Variables
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 5;
const forwardEnemiesArray = [];
const shakeEnemiesArray = [];
const elipseEnemiesArray = [];
const zipEnemiesArray = [];
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
class shakePatternEnemy extends Enemy{
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

//Inheritance Class -> Elipse Pattern
class elipsePatternEnemy extends Enemy{
    constructor(width, height){
        super(width, height);
        this.image.src = './enemies/enemy3.png';
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 10 + 1) ; 
        this.forwardSpeed = Math.random() * 1 + 1;
        this.angleSpeed = Math.random() * difficulty;
        this.angle = Math.random() * 1;
        this.curve = Math.random() * 200 + difficulty;       //curve gain
    }
   
    update(){
        this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/360) + (canvas.width/2 - this.width/2); //center horizontally
        this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/590) + (canvas.height/2 - this.height/2);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        //animate sprites, the number is how many frames are in the animation
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }   

}

//Inheritance Class -> Zip Pattern
class zipPatternEnemy extends Enemy{
    constructor(width, height){
        super(width, height);
        this.image.src = './enemies/enemy4.png';
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.width);
        this.flapSpeed = Math.floor(Math.random() * 10 + 1) ; 
        this.forwardSpeed = Math.random() * 1 + 1;
        this.newX = Math.random() * (canvas.width);
        this.newY = Math.random() * (canvas.height);
        this.interval = Math.floor(Math.random() * 200+50);
    }
   
    update(){
        //this.x = 0; //center horizontally
       // this.y = 0;

       //If statement to reset the random position of the sprite
       if (gameFrame % this.interval === 0){
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.width);
       }
       let dx = this.x - this.newX;
       let dy = this.y - this.newY;
       this.x -= dx/(40 * (1/difficulty));
       this.y -= dy/(40 * (1/difficulty));

        if (this.x + this.width < 0) this.x = canvas.width;
        //animate sprites, the number is how many frames are in the animation
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }   

}

//Create shake Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    shakeEnemiesArray.push(new shakePatternEnemy(293, 155));
}

//Create forward Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    forwardEnemiesArray.push(new forwardPatternEnemy(266, 188));
}

//Create elipse Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    elipseEnemiesArray.push(new elipsePatternEnemy(218, 177));
}

//Create zip Pattern Enemies
for (let i = 0; i< numberOfEnemies; i++){
    zipEnemiesArray.push(new zipPatternEnemy(213, 213));
}


//animate loop function
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    shakeEnemiesArray.forEach(enemy =>{
       enemy.update();
        enemy.draw();
    });
    forwardEnemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    });
    elipseEnemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    });
    zipEnemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw();
    });
    gameFrame ++;
    requestAnimationFrame(animate);
}
animate();