function Game() {
    let map;

    this.init=function () {
        this.initGame();
        this.initMap();
    }

    let paint;
    this.initGame=function () {
        let myCanvas = document.getElementById('myCanvas');
        paint = myCanvas.getContext("2d");
    }
    
    this.initMap=function () {
        map = new Map();
        map.init();
    }

    this.mapListener=function () {
        return map.getMap();
    }

    this.run=function () {
        map.run(paint);
    }
}