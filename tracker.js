/*

PUT THIS IN INDEX.HTML

<head>
	<title>Cue Ball Tracker</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/addons/p5.dom.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/addons/p5.sound.js"></script>
	<script src="tracker.js"></script>
	
	<style>

	</style>

</head>
*/



var canvasX = window.innerWidth;
var canvasY = window.innerHeight;

var tableX = 2 * canvasX/3;
var tableY = tableX/2;

var pocketX = -canvasX/2 + tableX;
var pocketY = tableY - canvasY/2;
var pocketSize = tableX * .05;

var tablePosX = -canvasX/2 + tableX;
var tablePosY = tableY - canvasY/2;

var cushionX = tableX - 2 * pocketSize/3;
var cushionY = tableY - 2 * pocketSize/3;
var cushionPosX = tablePosX + pocketSize/3;
var cushionPosY = tablePosY + pocketSize/3;

var borderExt = tableX / 80;

var ballSize = pocketSize/2;
var ballPosX = cushionPosX + cushionX/4;
var ballPosY = cushionPosY + cushionY/2;

var trailX = [];
var trailY = [];
var trailSize = 2;
var trailLen = 300;
var k = 0;

var velX = 3;
var velY = 3;

var pocketX = [];
var pocketY = [];
var pocketNum = 0;


function setup(){
	createCanvas(canvasX, canvasY);
	background(0);
	//drawTable();

	for(var i = 0; i<trailLen; i++){
		trailX[i] = ballPosX;
		trailY[i] = ballPosY;
	}

	for(var i = 0; i<3; i++){
		for(var j = 0; j<2; j++){
			pocketX[pocketNum] = pocketX + i * tableX/2;
			pocketY[pocketNum] = pocketY + j * tableY;
			pocketNum++;
		}
	}

}

function draw(){
	//background(0);
	drawTable();
	updateFrame();
	
}

function drawTable(){

	strokeWeight(4);
	stroke('white');

	fill(10,10,10);
	rect(tablePosX - pocketSize/2 - borderExt, tablePosY - pocketSize/2 - borderExt, tableX + pocketSize + borderExt*2, tableY + pocketSize + borderExt*2, pocketSize/2);
	fill(10,110,10);
	rect(tablePosX, tablePosY, tableX, tableY);
	fill(10,110,10);
	rect(cushionPosX, cushionPosY, cushionX, cushionY);

	fill(30,30,10);
	for(var i = 0; i<3; i++){
		for(var j = 0; j<2; j++){
			ellipse(pocketX + i * tableX/2,pocketY + j * tableY,pocketSize);
			
		}
	}
}

function updateFrame(){
	//updatePos(x,y);
	moveBall();
	fill('white');
	ellipse(ballPosX, ballPosY, ballSize);
	for(var i = 0; i<trailLen; i++){
		ellipse(trailX[i], trailY[i], trailSize);
	}
	updateTrail();

}

function updatePos(x, y){
	ballPosX = x + pocketX;
	ballPosY = y + pocketY;
}

function updateTrail(){
	if(k >= trailLen){
		k = 0;
	}
	trailX[k] = ballPosX;
	trailY[k] = ballPosY;
	ellipse(trailX[k], trailY[k], trailSize);
	k++;
}

function restart(){

}

// Don't call functions below if receiving x, y values
//////////////////////////////////////////////////////////////////////////////

function moveBall(){
	changeSpeed();	
	ballPosX += velX;
	ballPosY += velY;

	if(ballPosX <= cushionPosX + ballSize/2 || ballPosX >= cushionPosX + cushionX - ballSize/2){
		velX = -velX;
	}

	if(ballPosY <= cushionPosY + ballSize/2 || ballPosY >= cushionPosY + cushionY - ballSize/2){
		velY = -velY;
	}
}

function changeSpeed(){
	if(velX < 0){
		velX = -mouseX/150;
	}
	else{
		velX = mouseX/150;
	}

	if(velY < 0){
		velY = -mouseY/150;
	}
	else{
		velY = mouseY/150;
	}
	
}








