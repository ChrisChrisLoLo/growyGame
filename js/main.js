
var globalVal = {
	money: 10,
	currentTool: "inspect",
}

function crop(name,growTime,buyPrice,sellPrice,timeStamp,plotID){
    this.name = name;
    this.growTime = growTime;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
	this.plotID = plotID;
    //Timestamp to be determined at the point of creation in plant query.
    this.timeStamp = timeStamp;
	this.finishTime = timeStamp+growTime;
	this.remGrowTime = null;
	this.decayTime = null;
}

var cropList = [new crop("grass",10,2,3)];

var plantedQueue = [];

var plantDecayQueue = [];

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



//checks if a plot is already being used. If so return true.
function isDuplicatePlot(testPlotID){
	console.log(plantedQueue.length);
	for(var i=0; i<plantedQueue.length;i++){
		if (plantedQueue[i].plotID == testPlotID){
			return true;
		}
	}
	return false;
}

function plant(cropName,plotID){
	console.log(plotID);
	if(isDuplicatePlot(plotID)){
		console.log("DUPLICATE");
		return;
	}
	
    document.getElementById(plotID).style.backgroundColor = "Green";
	var date = new Date();
	timeStamp = date.getTime();
	console.log(timeStamp);
    switch(cropName){
        case "grass":
			plantedQueue.push(new crop("grass",10000,5,6,timeStamp,plotID));
            break;
        case "turnip":
			plantedQueue.push(new crop("turnip",200000,40,50,timeStamp,plotID));
            break;
        case "beet":
            break;
        case "rhubarb":
            break;
    }
	console.log(plantedQueue);
}

function checkGrowth(){
	for(var i=0; i<plantedQueue.length;i++){
		var date = new Date();
		//should have remGrowTime in terms of milliseconds
		var currentTime = date.getTime();
		plantedQueue[i].remGrowTime = plantedQueue[i].finishTime - currentTime;
		console.log(plantedQueue[i].remGrowTime);
		
		//once the crop has matured, the crop item is to be moved to the decay queue, where
		//it is able to be harvested. when the time for the decay queue is up, then the plant
		//decays.
		if (plantedQueue[i].remGrowTime<0){
			//sell price to be removed
			globalVal.money += plantedQueue[i].sellPrice;
			document.getElementById(plantedQueue[i].plotID).style.backgroundColor = "black";
			plantDecayQueue.push(plantedQueue[i])
			plantedQueue.splice(i,1);
		}
	}
}

setInterval(checkGrowth,1000);