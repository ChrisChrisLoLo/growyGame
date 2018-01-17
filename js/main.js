var globalVal = {
	money: 500,
	currentTool: "inspect",
}

function crop(name,growTime,buyPrice,sellPrice){
    this.name = name;
    this.growTime = growTime;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    //Timestamp to be determined at the point of creation in plant query.
    this.timeStamp = null;
}

var cropList = [new crop("grass",10,2,3)];

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
    }
}

var plantedQueue = [];

function plant(cropName,plotID){
    document.getElementById(plotID).style.backgroundColor = "Green";
    switch(cropName){
        case "grass":
            
            break;
        case "turnip":
            break;
        case "beet":
            break;
        case "rhubarb":
            break;
    }
}