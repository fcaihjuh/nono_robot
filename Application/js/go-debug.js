//document.querySelector("#start").addEventListener("click", save)
let objGo = go.GraphObject.make;
let myDiagram = objGo(go.Diagram, "myDiagramDiv",
    {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true,
        allowZoom: false,
        "grid.visible": true,
        "commandHandler.copiesTree": true,
        "commandHandler.deletesTree": true,
        "draggingTool.dragsTree": true,
    });


let myModel = objGo(go.GraphLinksModel);
myModel.nodeDataArray = [
    { key: "EG" },
    { key: "ED" },
    { key: "MG" },
    { key: "MD" },
];

myModel.linkDataArray =
    [
        { from: "EG", to: "MG", poid: "w1" },
        { from: "EG", to: "MD", poid: "w2" },
        { from: "ED", to: "MG", poid: "w3" },
        { from: "ED", to: "MD", poid: "w4" },
    ];

myDiagram.model = myModel;

let linkSelectionAdornmentTemplate =
    objGo(go.Adornment, "Link",
        objGo(go.Shape,
            // isPanelMain declares that this Shape shares the Link.geometry
            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })
    );

myDiagram.linkTemplate =
    objGo(go.Link,
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
            toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        objGo(go.Shape,  // the link path shape
            { isPanelMain: true, strokeWidth: 2 }),
        objGo(go.Shape,  // the arrowhead
            { toArrow: "Standard", stroke: null }),
        objGo(go.Panel, "Auto",
            new go.Binding("visible", "null").ofObject(),
            objGo(go.Shape, "RoundedRectangle",  // the link shape
                { fill: "#F8F8F8", stroke: null }),
            objGo(go.TextBlock,
                {
                    textAlign: "center",
                    font: "10pt helvetica, arial, sans-serif",
                    stroke: "black",
                    margin: 2,
                    minSize: new go.Size(10, NaN),
                    editable: true
                },
                new go.Binding("text").makeTwoWay())
        )
    );


myDiagram.addDiagramListener("Modified", function() {
    let button = document.getElementById("start");
    if (button) button.disabled = !myDiagram.isModified;
    let idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
    } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
    }
});


let EG = 0.1, ED = 0.1;
function save() {
    let linkDataArray = JSON.parse(myDiagram.model.toJson()).linkDataArray;
    let w1 = linkDataArray[0].text
    let w2 = linkDataArray[1].text
    let w3 = linkDataArray[2].text
    let w4 = linkDataArray[3].text

    return [calculerMG(w1, w3), calculerMD(w2, w4)]
}



function calculerMG(w1, w3){
    return Math.tanh(w1 * EG + w3 * ED) ;
}


function calculerMD(w2, w4){
    return  Math.tanh(w2 * EG + w4 * ED);
}

export default{
    save: save,
}


