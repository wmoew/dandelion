// Interactive dandelion by Meng Na
// use a microphone to control the dandelion's petals
//--------------------------------------------------------------------------------------------------
// varibles and arrays of petals
//The dandelion consists of three layers.
var petals = [];
var midpetals = [];
var innerpetals = [];
// The original status of the pedals is still.
var mode = "still";
var mic;
// variables for control three layers
var on1 = false;
var on2 = false;
var on3 = false;

//preload images
function preload() {
    petalPic = loadImage("Asset_9.svg");
    stemPic = loadImage("Asset_stem.png");
}

function setup() {
    mic = new p5.AudioIn();
    mic.start();
    createCanvas(windowWidth, windowHeight);
    noStroke();

    //the loop of the petals to reach the number set
    var count = 15
    var span = PI * 2 / count
    for (var i = 0; i < count; i++) {
        // put the object of petals into the array of petals
        petals.push(new Petal(windowWidth / 8, windowHeight / 2 + 100, span * i, i));
        midpetals.push(new Midpetal(windowWidth / 8, windowHeight / 2 + 100, span * i, i));
        innerpetals.push(new Innerpetal(windowWidth / 8, windowHeight / 2 + 100, span * i, i));
    }
}

function draw() {
    background(255);
    micLevel = mic.getLevel() * 100; //get microphone volume
    text("mode : " + mode, 30, 30);
    text("micLevel : " + micLevel, 30, 50);
    //the location of dandelion stem
    //add rotation to create swinging with breeze effect
    translate(windowWidth / 8 - 20, windowHeight);
    rotate(sin(frameCount / 100) / 40);
    translate(-windowWidth / 8 + 20, -windowHeight);
    image(stemPic, windowWidth / 8 - 20, windowHeight / 2 + 93, 40, 300);

    // set three different conditions for three layers of petals
    //if microphone's volume reachs 50, on1 is executed
    //if microphone's volume reachs 70, on2 is executed
    //if microphone's volume reachs 80, on3 is executed
    if (micLevel > 30) {
        on1 = true;
    }
    if (micLevel > 50) {
        on2 = true;
    }
    if (micLevel > 70) {
        on3 = true;
    }
    //the object of petals
    for (var i = 0; i < petals.length; i++) {
        if (mode == "move1") {
            petals[i].move();
        } else if (mode == "move2") {
            midpetals[i].move();
            petals[i].move();
        } else if (mode == "move3") {
            innerpetals[i].move();
            midpetals[i].move();
            petals[i].move();
        }
        petals[i].draw();
        midpetals[i].draw();
        innerpetals[i].draw();
    }

    if (on1 == true) {
        mode = "move1";
    }
    if (on2 == true) {
        mode = "move2";
    }
    if (on3 == true) {
        mode = "move3";
    }
}

//The movement of petals is learned from the movement of Sakura by masuirumika https://www.openprocessing.org/sketch/574229
function Petal(xs, ys, rot, index) {
    //define the parameters of the petals
    var x, y;
    this.index = index
    this.xStart = xs;
    this.yStart = ys;
    this.xDis = random(50, 100);
    this.xSpeed = random(0, 1);
    this.xTheta = random(360);
    this.ox = this.xStart;
    this.oy = this.yStart;
    this.rotateT = rot;
    this.size = random(55, 60);
    this.ySpeed = this.size / 80;
    this.sizeYT = random(360);
    this.sizeYSpeed = this.size / 50;
    this.sizeYScale = 0;
    this.draw = function() {
        fill(100);
        push();
        //translate ordinate system
        translate(this.ox, this.oy);
        rotate(this.rotateT);
        rotate(sin(frameCount / (40 + noise(index) * 50) + noise(index)) / 16);

        //draw the shape
        beginShape();
        x = 0;
        y = 3;
        image(petalPic, x, y, this.size * 3 * 0.35, this.size * 4 * 0.35);
        endShape(CLOSE);
        pop();
    };

    //define the move method of object pedal by variation in x and y
    this.move = function() {
        this.xStart += this.xDis * 0.05;
        this.ox = this.xStart;
        this.oy -= this.ySpeed * random(1, 3);
        this.xTheta += this.xSpeed;
        this.sizeYT += this.sizeYSpeed;
        this.sizeYScale = abs(sin(radians(this.sizeYT)));
    }
}

function Midpetal(xs, ys, rot) {
    //define the parameters of the petals
    var x, y;
    this.xStart = xs;
    this.yStart = ys;
    this.xDis = random(50, 100);
    this.xSpeed = random(1.5, 1.8);
    this.xTheta = random(360);
    this.ox = this.xStart;
    this.oy = this.yStart;
    this.rotateT = rot * 1.5;
    this.size = random(55, 60);
    this.ySpeed = this.size / 80;
    this.sizeYT = random(360);
    this.sizeYSpeed = this.size / 50;
    this.sizeYScale = 0;
    this.draw = function() {
        fill(100);
        push();
        //translate ordinate system
        translate(this.ox, this.oy);
        rotate(this.rotateT);

        //draw the shape
        beginShape();
        x = 0;
        y = 3;
        image(petalPic, x, y, this.size * 3 * 0.28, this.size * 4 * 0.28);
        endShape(CLOSE);
        pop();
    };

    //define the move method of object pedal by variation in x and y
    this.move = function() {
        this.xStart += this.xDis * 0.04
        this.ox = this.xStart;
        this.oy -= this.ySpeed * random(1, 3);
        this.xTheta += this.xSpeed;
        this.sizeYT += this.sizeYSpeed;
        this.sizeYScale = abs(sin(radians(this.sizeYT)));
    }
}

function Innerpetal(xs, ys, rot) {
    //define the parameters of the petals
    var x, y;
    this.xStart = xs;
    this.yStart = ys;
    this.xDis = random(50, 100);
    this.xSpeed = random(1.5, 1.8);
    this.xTheta = random(360);
    this.ox = this.xStart;
    this.oy = this.yStart;
    this.rotateT = rot * 1.5;
    this.size = random(55, 60);
    this.ySpeed = this.size / 80;
    this.sizeYT = random(360);
    this.sizeYSpeed = this.size / 50;
    this.sizeYScale = 0;
    this.draw = function() {
        fill(100);
        push();
        //translate ordinate system
        translate(this.ox, this.oy);
        rotate(this.rotateT);

        //draw the shape
        beginShape();
        x = 0;
        y = 3;
        image(petalPic, x, y, this.size * 3 * 0.2, this.size * 4 * 0.2);
        endShape(CLOSE);
        pop();
    };

    //define the move method of object pedal by variation in x and y
    this.move = function() {
        this.xStart += this.xDis * 0.04
        this.ox = this.xStart;
        this.oy -= this.ySpeed * random(1, 3);
        this.xTheta += this.xSpeed;
        this.sizeYT += this.sizeYSpeed;
        this.sizeYScale = abs(sin(radians(this.sizeYT)));
    }
}

//tried to use keyTyped to control the petals
function keyTyped() {
    if (key == 'q') {
        mode = "move1";
    }
    if (key == 'w') {
        mode = "move2";
    }
    if (key == 'e') {
        mode = "move3";
    }
}
