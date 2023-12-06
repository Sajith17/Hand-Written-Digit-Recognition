const numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"]
const canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 300;

let context = canvas.getContext("2d")
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0,0, canvas.width, canvas.height)

let draw_color = "black";
let draw_width = "23";
let is_drawing = false;

var input_value = window.location.pathname.split('/').pop();


canvas.addEventListener('touchstart', startTouch, false);
canvas.addEventListener('touchmove', drawTouch, false);
canvas.addEventListener('touchend', stopTouch, false);
canvas.addEventListener('mousedown', startMouse, false);
canvas.addEventListener('mousemove', drawMouse, false);
canvas.addEventListener('mouseup', stopMouse, false);
canvas.addEventListener('mouseout', stopMouse, false);

function startTouch(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
    event.preventDefault();
}

function drawTouch(event) {
    if (is_drawing) {
        context.lineTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}

function stopTouch() {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
}

function startMouse(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function drawMouse(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}

function stopMouse() {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
}

function captureCanvas() {
    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL('image/png');
    var timestamp = new Date().getTime();
    var randomNumber = Math.floor(Math.random() * 1000)
    var uniqueName = "canvas_"+timestamp+"-"+randomNumber+numbers[input_value]
    const payload = {
        image: dataURL,
        button_value: input_value,
        name: uniqueName
    };
    console.log(dataURL)

    fetch('/recieve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(function(data) {
        clearCanvas()
        // var redirectUrl = data.redirect_url;
        // window.location.href = redirectUrl;
    })
    .catch(function(error) {
        console.error(error);
    }) 
}

function clearCanvas(){
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}