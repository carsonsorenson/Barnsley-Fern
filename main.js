var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 0
var y = 0

function setup(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.translate(0, c.height);
    ctx.scale(1, -1);
    draw()
}

function draw(){
    var points = [];
    for (let i = 0; i < 1000; i++){
        points.push({x, y})
        next_point()
    }
    for (var p of points){
        map_point(p.x, p.y);
    }
    window.requestAnimationFrame(draw);
}

function map_point(x, y){
    var scaled_x = (x + 2.1820) * (c.width / (2.6558 + 2.1820))
    var scaled_y = y * (c.height / 9.9983)
    point(scaled_x, scaled_y, 1, 255, 255, 255, 1)
}

function next_point(){
    var r = Math.random();
    var next_x;
    var next_y;
    if (r < 0.01){
        next_x = 0;
        next_y = 0.16 * y;
    } else if (r < 0.86){
        next_x = 0.85 * x + 0.04 * y;
        next_y = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93){
        next_x = 0.2 * x - 0.26 * y;
        next_y = 0.23 * x + 0.22 * y + 1.6;
    } else{
        next_x = -0.15 * x + 0.28 * y;
        next_y = 0.26 * x + 0.24 * y + 0.44;
    }
    x = next_x;
    y = next_y;
}

function point(p_x, p_y, pSize, r, g, b, a){
    ctx.beginPath();
    ctx.arc(p_x, p_y, pSize, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fill();
    ctx.closePath();
}

setup();