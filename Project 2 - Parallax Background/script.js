//GLOBAL constants
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

//GLOBAL VARIABLES
let gameSpeed = 0.2; //scrolling speed

//IMAGES OF BACKGROUND - 5 layers
const backgroundLayer1 = new Image();
backgroundLayer1.src = './backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './backgroundLayers/layer-5.png';

window.addEventListener('load', function(){
//Background Class
class Layer{
    constructor(image, speedModifier){
        this.image = image;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.speed = gameSpeed * this.speedModifier;
    }

    //method to update the images position for scroll
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x=0;
        }
        this.x = this.x - this.speed;
    }   

    //method to draw the images
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x +this.width, this.y, this.width, this.height);
    }
}

//create background object for each layer
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 0.1);
//object array:
const layersArray = [layer1, layer2, layer3, layer4, layer5];

//on screen slider:
const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

//animation loop - we are using the double image technique for scrolling through the background
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT); //Clears previous frame
    layersArray.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}
animate();

});


