music1="";
music2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist=0;
songStatus1="";
songStatus2="";
function setup(){
    canvas=createCanvas(600,700);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if (results.length > 0){
        
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX+" leftWristY = "+ leftWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " +scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX+" rightWristY = "+ rightWristY);
    }
    }

function modelLoaded(){
        console.log("PoseNet Is Initialized!")
    }

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    songStatus1 = music1.isPlaying();
    if (scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(songStatus1 == false){
        music1.play();
        document.getElementById("songname").innerHTML = "Playing Harry Potter Theme Song";
        }
    }
}
function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}
