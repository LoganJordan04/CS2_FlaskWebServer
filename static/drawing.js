// Application variables
const position = {x: 0, y: window.innerHeight / 2};
let counter = 0;
const minFontSize = 3;
const letters = "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose." + 
    "You’re on your own. And you know what you know. And YOU are the guy who’ll decide where to go. You’ll get mixed up," +
    "of course, as you already know. You’ll get mixed up with many strange birds as you go. So be sure when you step." +
    "Step with care and great tact and remember that life’s A Great Balancing Act. And will you succeed? Yes! You will, indeed!" +
    "(98 and ¾ percent guaranteed.)";

// Drawing variables
let canvas;
let context;
const mouse = {x: 0, y: 0, down: false};

function init() {
    canvas = document.getElementById( 'canvas' );
    context = canvas.getContext( '2d' );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup',   mouseUp,   false);
    canvas.addEventListener('mouseout',  mouseUp,  false);
    window.addEventListener('keydown', backKey, false);

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function mouseMove ( event ){
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    draw();
}

function draw() {
    if ( mouse.down ) {
        const d = distance(position, mouse);
        const fontSize = minFontSize + d / 2;
        const letter = letters[counter];
        const stepSize = textWidth(letter, fontSize);

        if (d > stepSize) {
            const angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

            context.font = fontSize + "px Georgia";

            context.save();
            context.translate( position.x, position.y);
            context.rotate( angle );
            context.fillStyle = "white";
            context.fillText(letter,0,0);
            context.restore();

            counter++;
            if (counter > letters.length-1) {
                counter = 0;
            }

            //console.log (position.x + Math.cos( angle ) * stepSize)
            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;

        }
    }
}

function distance( pt, pt2 ){

    let xs;
    let ys;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt( xs + ys );
}

function mouseDown( event ){
    mouse.down = true;
    position.x = event.pageX;
    position.y = event.pageY;

    document.getElementById('info').style.display = 'none';
}

function mouseUp(){
    mouse.down = false;
}

function backKey( event ) {
    if (event.key === "Backspace"){
        // console.log('BACKSPACE was pressed');
        canvas.width = canvas.width;
        document.getElementById('info').style.display = 'block';
    }
}

function textWidth( string, size ) {
    context.font = size + "px Georgia";

    if ( context.fillText ) {
        return context.measureText( string ).width;
    } else if ( context.mozDrawText) {
        return context.mozMeasureText( string );
    }

}

init();