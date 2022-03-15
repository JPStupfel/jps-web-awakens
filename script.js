
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var l = canvas.getContext('2d');
let defaultCoords = { };
const ballCount = 10;
let color = 'white'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
function makeCoords(x) {
    for (let i = 0; i < x; i++){
        defaultCoords[`Circle${i}`] = {};
        defaultCoords[`Circle${i}`]["northing"] = getRandomIntInclusive(4, 500) ;
        defaultCoords[`Circle${i}`]["easting"] = getRandomIntInclusive(4, 500) ;
        defaultCoords[`Circle${i}`]["speedNorth"] = getRandomIntInclusive(1, 2);
        defaultCoords[`Circle${i}`]["speedEast"] = getRandomIntInclusive(1, 2);   
        defaultCoords[`Circle${i}`]["radius"] = getRandomIntInclusive(10, 40); 
       defaultCoords[`Circle${i}`]["color"] = 'white'; 
         }}
    
  function drawCircle(ballArray) {
    // Creating a circle
    for (key in ballArray){
    l.beginPath();
    l.strokeStyle = ballArray[key].color;
    l.arc(ballArray[key].easting, ballArray[key].northing, ballArray[key].radius, 0, Math.PI * 2, false);
    l.stroke();}}

function advanceCircle(ballArray){

    for (key in ballArray){
        // advancing a circle
    ballArray[key].northing =  ballArray[key].northing + ballArray[key].speedNorth
    ballArray[key].easting =  ballArray[key].easting+ballArray[key].speedEast;}}
    
//get distance between two points
function getDistance(x,y,x1,y1){deltaX = Math.abs(x-x1); deltaY = Math.abs(y-y1); return Math.sqrt( (deltaX**2) + (deltaY ** 2));}
 
function reverseBallEast(ball) {ball.speedEast = 0 - ball.speedEast;}

function reverseBallNorth(ball) { ball.speedNorth = 0 - ball.speedNorth;}

function ballSwapSpeed(ball1,ball2) { 
    let swapSpeedEast = ball1.speedEast; let swapSpeedNorth = ball1.speedNorth;
    ball1.speedEast = ball2.speedEast; ball1.speedNorth = ball2.speedNorth;
    ball2.speedEast = swapSpeedEast; ball2.speedNorth = swapSpeedNorth;}

function checkBallTouchEast(ball) { if (ball.radius + ball.easting > innerWidth || ball.easting - ball.radius < 0) {return true}
else {return false} }

function checkBallTouchNorth(ball) { if (ball.radius + ball.northing > innerHeight || ball.northing - ball.radius < 0) {return true} else return false}

function checkIfBallsTouch(ball1,ball2) {
    let distanceBetweenBalls = getDistance(ball1.easting,ball1.northing,ball2.easting,ball2.northing);
    if (distanceBetweenBalls < ball1.radius + ball2.radius) {return true} else {return false}}



function checkBounce(ballArray)
{ 
for (key in ballArray){ 

    //if x is within radius of edge reverse vx
if (checkBallTouchEast(ballArray[key]))
     {reverseBallEast(ballArray[key])}
         
 //if y is within radius of edge reverse vx
if (checkBallTouchNorth(ballArray[key]))
    {reverseBallNorth(ballArray[key])}

  
for (i in ballArray) {
    if (i>key && checkIfBallsTouch(ballArray[key],ballArray[i])) { ballSwapSpeed(ballArray[key],ballArray[i]) } }
    }

}





//ballArray[key].speedNorth=ballArray[i].speedNorth; ballArray[key].speedEast=ballArray[i].speedEast



makeCoords(ballCount);

setInterval('draw()',0.1);

function draw () {
 l.clearRect(0, 0, innerWidth, innerHeight);
  drawCircle(defaultCoords);
  advanceCircle(defaultCoords);
  checkBounce(defaultCoords);
}