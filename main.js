var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var points = [];
var lastPoint = { x:0, y:0 };

function Point(x, y, pointSize, r, g, b, a){
    this.x = x;
    this.y = y;
    this.pointSize = pointSize;
    this.scaled_x = mapRange(-2.1820, 2.6558, 0, c.width, x);
    this.scaled_y = mapRange(0, 9.9983, 0, c.height, y);
    this.pointColor = { r: r, g: g, b: b, a: a}
}

function Color(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function mapRange(a, b, c, d, x){
    return ((x - a) * ((d - c) / (b - a)) + c);
}

function setup(){
    ctx.canvas.width = window.innerHeight;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.translate(0, c.height);
    ctx.scale(1, -1);
    draw()
}

function draw(){
    points = [];
    for (let i = 0; i < 20000; i++) {
        next_point();
    }
    for (let p of points){
        drawPoint(p);
    }
    window.requestAnimationFrame(draw);
}


function next_point(){
    var r = Math.random();
    var x;
    var y;
    if (r < 0.01){
        x = 0;
        y = 0.16 * lastPoint.y;
    } else if (r < 0.86){
        x = 0.85 * lastPoint.x + 0.04 * lastPoint.y;
        y = -0.04 * lastPoint.x + 0.85 * lastPoint.y + 1.6;
    } else if (r < 0.93){
        x = 0.2 * lastPoint.x - 0.26 * lastPoint.y;
        y = 0.23 * lastPoint.x + 0.22 * lastPoint.y + 1.6;
    } else{
        x = -0.15 * lastPoint.x + 0.28 * lastPoint.y;
        y = 0.26 * lastPoint.x + 0.24 * lastPoint.y + 0.44;
    }
    lastPoint.x = x;
    lastPoint.y = y;
    var r = 225;
    var g = mapRange(0, 9.9983, 35, 225, y);
    var b = 105;
    var a = 0.5;
    points.push(new Point(x, y, 0.1, r, g, b, a));
}

function drawPoint(p){
    ctx.fillStyle = `rgba(${p.pointColor.r}, ${p.pointColor.g}, ${p.pointColor.b}, ${p.pointColor.a})`;
    ctx.fillRect(p.scaled_x, p.scaled_y, p.pointSize, p.pointSize);
}

setup();