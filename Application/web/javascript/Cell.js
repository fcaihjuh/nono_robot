function Cell() {
    let type;
    let cellX;
    let cellY;
    let cell;

    this.init=function (type1,cellX1,cellY1) {
        cellX=cellX1;
        cellY=cellY1;
        type= type1;
        cell = new Image();
        switch(type){
            case 0:
                cell.src="web/img/wall.png";
                break;
            case 1:
                cell.src="web/img/floor.png";
                break;
            case 2:
                cell.src="web/img/apple.png";
                break;
        }
    }

    this.run = function (paint) {
        paint.drawImage(cell, cellX, cellY, 50, 50);
    }

}
