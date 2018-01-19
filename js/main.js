
var globalVal = {
	money: 10,
	currentTool: "inspect",
}

function selTool(toolID){
	globalVal.currentTool=toolID;
	console.log(globalVal.currentTool);
}
function usePlot(plotID){
    console.log("usePlotCall");
    switch(globalVal.currentTool){
        case "inspect":
            break;
        case "harvest":
            break;
        case "destroy":
            break;
        case "pGrass":
            console.log("pGrass call");
            plant("grass",plotID);
            break;
		case "pTurnip":
			plant("turnip",plotID);
			break;
    }
}


