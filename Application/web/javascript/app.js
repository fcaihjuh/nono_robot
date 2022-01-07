let app;
let nono;
let keys = {};
let keysDiv;
const Graphics = PIXI.Graphics;

window.onload = function () {
    app = new PIXI.Application({
        width: 670,
        height: 350,
    });
    document.body.appendChild(app.view);
    // ajout d'un container
    const container = new PIXI.Container();
    app.stage.addChild(container);
    // Nono
    nono = new PIXI.Sprite.from("/Application/img/nono.png");
    nono.anchor.set(0.5);
    nono.x = app.view.width / 2;
    nono.y = app.view.height / 1.5;
    nono.anchor.set(0.5, 0.5); //point central

    container.addChild(nono);

    const graphics = new PIXI.Graphics();
    // Circle = nourriture
    for (let i = 0; i < 90; i++) {
        graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        graphics.beginFill(0xDE3249, 1);
        graphics.drawCircle(Math.random(i) * 1300, Math.random(i) * 1050, 5);
        graphics.endFill();
    }
    // shape = obstacle

    container.addChild(graphics);

    const obstacle = new PIXI.Graphics();

    //ajout d'un rectangle 
    for (let i = 0; i < 90; i++) {
        obstacle.lineStyle(4, 0xFFFF, 1);
        obstacle.drawRect(Math.random(i) * 1300, Math.random(i) * 1000, 5);
        obstacle.endFill();
    }
    container.addChild(obstacle);

    //ajout du cube vert
    let vert;
    let speed = 4;
    vert = new PIXI.Sprite.from('img/pipe.png');
    vert.anchor.set(0.5);
    vert.x = 20;
    vert.y = app.view.height / 2;

    container.addChild(vert);

    let vert2;
    vert2 = new PIXI.Sprite.from('img/pipe.png');
    vert2.anchor.set(0.5);
    vert2.x = app.view.width - 20;
    vert2.y = app.view.height / 2;

    container.addChild(vert2);

    app.ticker.add(gameLoop2);

    function gameLoop2(delta) {
        vert.x += speed;
        vert2.x -= speed;
        //collision
        if (rectsIntersect(vert, vert2)) {
            speed = 0;
        }
        if (rectsIntersect(vert, nono)){
            speed = 0;
            console.log('Vous avez cogné un obstacle !')
        }
        if (rectsIntersect(vert2, nono)){
            speed = 0;
            console.log('Vous avez cogné un obstacle !')
        }
        console.log(getDistance(nono.x, vert.y, vert.x, nono.y))
        /*
        if(getDistance(nono.x, vert.y, vert.x, nono.y)< nono.radius + vert.radius){
            alert('Vous avez cogné un obstacle !')
        }*/
    }

function rectsIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height;
}

//obtenir la distance
function getDistance(x1,y1,x2, y2){
    let xDistance = x1 - x2;
    let yDistance =y1 - y2;
    return Math.sqrt(Math.pow(xDistance, 2)+ Math.pow(yDistance, 2));
}

   

    // keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);
    //app.stage.addChild(graphics);

    keysDiv = document.querySelector("#keys");
    /*
                function loop() {    }
    */

}

function keysDown(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop() {
    keysDiv.innerHTML = JSON.stringify(keys);

    //haut
    if (keys["38"]) {
        nono.y -= 5;
        nono.rotation = 6.3;

    }
    //gauche
    if (keys["37"]) {
        nono.x -= 5;
        nono.rotation = -1.6;
    }
    //bas
    if (keys["40"]) {
        nono.y += 5;
        nono.rotation = -3.14;
    }
    //droite
    if (keys["39"]) {
        nono.x += 5;
        nono.rotation = 1.6;
    }
    //flèche du haut+droit
    if (keys["38"] && keys["39"]) {
        nono.rotation = 1;
    }
    //flèche du haut+gauche
    if (keys["38"] && keys["37"]) {
        nono.rotation = -1;
    }
    //flèche du bas+droite
    if (keys["40"] && keys["39"]) {
        nono.rotation = 2;
    }
    //flèche du bas+gauche
    if (keys["40"] && keys["37"]) {
        nono.rotation = -2;
    }
}