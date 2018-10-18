function DrawImage(callback) {

    var canvas = document.getElementById('canvas');

    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = "sprite.png";

    img.onload = function () {

        context.drawImage(img, 0, 200);

        callback();
    }
}
function DrawEllipse(context, xStart, radius, endPoint) {

    var xPos = CalcXPos(xStart, radius);

    var lineColor = COLOR;

    DrawArc(context, xPos, Y_POS, radius, START_ANGLE, END_ANGLE, true, lineColor, endPoint);
}

function DrawArc(context, xPos, yPos,
    radius,
    startAngle, endAngle,
    anticlockwise,
    lineColor, endPoint) {

    var startAngle = startAngle * (Math.PI / 180);
    var endAngle = endAngle * (Math.PI / 180);

    var radius = radius;

    context.strokeStyle = lineColor;
    context.lineWidth = 1;
    
    context.beginPath();

    context.scale(2, 1);

    context.arc(xPos, yPos,
        radius,
        startAngle, endAngle,
        anticlockwise);

    var x = endPoint + STARTX;

    DrawArrow(context, x, yPos - 3, x + 1, yPos + 3, 2);

    context.stroke();

    context.resetTransform();

    context.closePath();
}

function CalcXPos(xStart, radius) {
    return xStart + radius;
}

function DrawArrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;   
    var angle = Math.atan2(toy - fromy, tox - fromx);

    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}