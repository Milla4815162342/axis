$(document).ready(function () {

    DrawImage(StartExercise);
})

function StartExercise() {

    $("#answer").hide();

    var a = InitializeA();

    var b = InitializeB(a);

    DrawSemicyrcleA(a);

    CheckAnswer(a, "#aInput", "#a", function () {

        var endPointA = CalcEndPoint(a);

        DrawSemicyrcleB(b, endPointA);

        CheckAnswer(b, "#bInput", "#b", function () {
            $("#question").hide();

            $("#answer").show();

            var sum = a + b;

            CheckAnswer(sum, "#answer");
        })
    })
}

function CheckAnswer(correct, input, number, callback) {
    $(input).keyup(function () {
        var answer = Number($(this).val());

        if (answer != correct) {
            $(input).addClass("incorrectInput");

            if (number) {

                $(number).addClass("lightNumber");
            }

        }

        else {
            $(input).removeClass("incorrectInput");

            if (number) {

                $(number).removeClass("lightNumber");
            }

            $(input).prop('disabled', true);

            callback();
        }
    })
}
function InitializeA() {
    var min = 6;

    var max = 10;

    var a = Math.floor(Math.random() * (max - min)) + min;

    $("#a").text(a);

    return a;
}

function InitializeB(a) {
    var max = 15;

    var min = 11;

    var sum = Math.floor(Math.random() * (max - min)) + min;

    var b = sum - a;

    $("#b").text(b);

    return b;
}

function DrawSemicyrcleA(a) {
    var endPointA = CalcEndPoint(a);

    var canvas = document.getElementById('canvas');

    var context = canvas.getContext('2d');

    if (context) {
        DrawSemicyrcle(a, STARTX, endPointA / 2, endPointA, endPointA);
    }

    var posX = STARTX * 1.5 + endPointA;

    InsertText("aInput", posX, CalcInputTextY(Y_POS, endPointA));
}

function DrawSemicyrcleB(b, endPointA) {

    var endPointB = CalcEndPoint(b);

    var endPointBIntheScale = endPointA + endPointB;

    DrawSemicyrcle(b, STARTX + endPointA, endPointB / 2, endPointBIntheScale);

    var posX = STARTX * 1.5 + endPointA * 2 + endPointB;

    InsertText("bInput", posX, CalcInputTextY(Y_POS, endPointB));
}

function DrawSemicyrcle(number, xStart, radius, endPoint) {

    var canvas = document.getElementById('canvas');

    var context = canvas.getContext('2d');

    DrawEllipse(context, xStart, radius, endPoint);
}
function CalcInputTextX(startX, endPointA) {

    return startX * 1.5 + endPointA;
}

function CalcInputTextY(yPos, endPointA) {

    var scaledRadius = endPointA / 2;

    var gap = 25;

    return yPos - scaledRadius - gap;
}

function CalcEndPoint(number) {

    return STEP * number;
}

function InsertText(id, xPos, yPos) {

    var text = $("<input type='text'></input>");

    text.attr('id', id);
    text.css('position', 'absolute');
    text.css("top", yPos + "px");
    text.css("left", xPos + "px");
    text.css("width", "15px");
    $("#scale").append(text);
}