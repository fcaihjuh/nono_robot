function Map() {
    var mapData=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
        [0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0],
        [0,1,1,2,1,1,1,1,1,1,1,1,0,1,1,2,0],
        [0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    let cellWidth = 50;
    let cellHight = 50;
    let cells=[];

    let rowNum=mapData.length;
    let colNum = mapData[0].label;

    this.init=function () {
        let length = rowNum;
        for(let i=0;i<length;i++){
            cells[i]= [];
            let buffer=mapData[i];
            for(let j=0;j<buffer.length;j++){
                let cell = new Cell();
                cell.init(buffer[j],j*cellWidth,i*cellHight);
                cells[i][j]=cell;
            }
        }
    }


    this.getMap=function () {
        return mapData;
    }


    this.run=function (paint) {
        cells.forEach(function (cell2) {
            cell2.forEach(function (cell) {
                cell.run(paint);
            });
        })
    }
}