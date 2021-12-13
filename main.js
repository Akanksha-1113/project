video = "";
objects = [];
status = "";

function preload() {

}
function gotResult(error, results)
{
if(error)
{
    console.log(error);

}
console.log(results);
objects = results;
}

function setup() {
    canvas = createCanvas(480, 320);
    canvas.position(500, 100);
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 320);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : objects detected ";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are : " + objects.length;

            fill("#03fcca");
            percent = floor(objects[i].confindence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#03fcca");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML = object_name + "Not Found";
            }


        }
    }

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
    object_name = document.getElementById("object_name").value;

}

function modelLoaded() {
    console.log("model Loaded!");
    status = true;

}