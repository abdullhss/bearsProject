function playAndPause() {
    let audio = document.getElementById("myAudio");

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas and its context
    var canvas = document.getElementById("drawing-canvas");
    var context = canvas.getContext("2d");

    // Set up drawing properties
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = "black";

    var isDrawing = false;

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        context.beginPath();
        var rect = canvas.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var offsetY = e.clientY - rect.top;
        context.moveTo(offsetX, offsetY);
    }

    function draw(e) {
        if (!isDrawing) return;
        var rect = canvas.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var offsetY = e.clientY - rect.top;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }
});