var on = false;

chrome.runtime.onMessage.addListener(gotMessage);

function showToolbar() {
    var wrapper = document.createElement("DIV");
    wrapper.id = "wrapper"
    var root = wrapper.attachShadow({ mode: "open" });
    // var root = document.querySelector('div').attachShadow({ mode: "open" });;
    var toolbar = 
    `<head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    </head>
<div position="absolute">
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">WebSiteName</a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
        </ul>
        </div>
    </nav>
    <div>`;
    root.innerHTML = toolbar;
    // wrapper.innerHTML = root;

    var list = document.getElementsByTagName("BODY")[0];
    list.insertBefore(wrapper, list.childNodes[0]);
}

function hideToolbar() {
    document.getElementById("wrapper").remove();
}

function gotMessage(message, sender, sendResponse){
    if (message.txt=="true") {
        showToolbar();
        on = true;
        myp5.setup();
    }
    else {
        hideToolbar();
        on = false;
        myp5.clear();
        myp5.createCanvas(0,0);
        document.body.style['userSelect'] = 'auto';
        document.body.style['pointer-events'] = 'auto';
    }
}


var s = function(sketch) {

    sketch.setup = function() {
        if(on) sketch.go();
    }

    sketch.go = function() {
        document.body.style['userSelect'] = 'none';
        document.body.style['pointer-events'] = 'none';
        let h = document.body.clientHeight;
        let c = sketch.createCanvas(sketch.windowWidth, h);
        c.position(0,0);
        c.style('pointer-events', 'none');
        c.style('z-index', '16777270');
        sketch.clear();
    }

    sketch.draw = function() {
        sketch.stroke('rgba(255,0,0,1)');
        sketch.strokeWeight(6);
        if (sketch.mouseIsPressed) {
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        }
    }
};

var myp5 = new p5(s);
