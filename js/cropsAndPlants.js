
function crop(name,icon,growTime,buyPrice,sellPrice,timeStamp,plotID){
	this.icon = icon;
    this.name = name;
    this.growTime = growTime;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
	this.plotID = plotID;
    //Timestamp to be determined at the point of creation in plant query.
    this.timeStamp = timeStamp;
	this.finishTime = timeStamp+growTime;
    this.state = "Growing";
	this.remGrowTime = null;
    this.remDecayTime = null;
	this.decayTime = null;
}

var globalVal = {
	money: 100000,
	currentTool: "inspect",
}

var cropList = [new crop("grass",10,2,3)];

var plantedQueue = [];

var plantDecayQueue = [];

var plantDeathQueue = [];

//checks if a plot is already being used. If so return true.
function isDuplicatePlot(testPlotID){
	console.log(plantedQueue.length);
	for(var i=0; i<plantedQueue.length;i++){
		if (plantedQueue[i].plotID == testPlotID){
			return true;
		}
	}
	for(var i=0; i<plantDecayQueue.length;i++){
		if (plantDecayQueue[i].plotID == testPlotID){
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
	var date = new Date();
	timeStamp = date.getTime();
	console.log(timeStamp);
    switch(cropName){
        case "grass":
			plantedQueue.push(new crop("Grass","🌾",10000,5,6,timeStamp,plotID));
            break;
        case "tulip":
			plantedQueue.push(new crop("Tulip","🌷",200000,40,50,timeStamp,plotID));
            break;
        case "fourLeafClover":
            plantedQueue.push(new crop("Four Leaf Clover","🍀",360000,100,160,timeStamp,plotID));
            break;
        case "rose":
            plantedQueue.push(new crop("Rose","🌹",700000,240,380,timeStamp,plotID));
            break;
		case "cactus":
            plantedQueue.push(new crop("Cactus","🌵",700000,240,380,timeStamp,plotID));
            break;
		case "palmTree":
            plantedQueue.push(new crop("Palm Tree","🌴",700000,240,380,timeStamp,plotID));
            break;
		case "wishTree":
            plantedQueue.push(new crop("Wish Tree","🎋",700000,240,380,timeStamp,plotID));
            break;
		case "bacon":
            plantedQueue.push(new crop("Bacon","🥓",10,240,380,timeStamp,plotID));
            break;
		case "mixtape":
            plantedQueue.push(new crop("Mixtape","🔥",10,240,380,timeStamp,plotID));
            break;
		case "evidence":
            plantedQueue.push(new crop("Evidence","🔨",10,240,380,timeStamp,plotID));
            break;
    }
    //get price of last pushed item (what we just planted), and subtract it from our total.
    if ((globalVal.money - plantedQueue[plantedQueue.length-1].buyPrice) >= 0){
        document.getElementById(plotID).style.backgroundColor = "Green";
        document.getElementById(plotID).innerHTML = "🌱";
        globalVal.money -= plantedQueue[plantedQueue.length-1].buyPrice;
        document.getElementById("moneyInfo").innerHTML=globalVal.money;
    }
    else{
        console.log("Insufficient funds!");
        plantedQueue.pop();
    }
	console.log(plantedQueue);
}

function checkGrowth(){
    //may need to move date and time within scope if this function becomes too long
    //took time out as function works fine as is 
    //TODO: test the run time of this function to see if it runs under a second.
    var date = new Date();
    //should have remGrowTime in terms of milliseconds
    var currentTime = date.getTime();
	for(var i=0; i<plantedQueue.length;i++){
        var date = new Date();
        //should have remGrowTime in terms of milliseconds
        var currentTime = date.getTime();
		plantedQueue[i].remGrowTime = plantedQueue[i].finishTime - currentTime;
		
		//once the crop has matured, the crop item is to be moved to the decay queue, where
		//it is able to be harvested. when the time for the decay queue is up, then the plant decays.
		if (plantedQueue[i].remGrowTime<0){
			plantedQueue[i].state = "Grown";
			
			document.getElementById(plantedQueue[i].plotID).style.backgroundColor = "BurlyWood";
			document.getElementById(plantedQueue[i].plotID).innerHTML = plantedQueue[i].icon;
            plantedQueue[i].decayTime = currentTime + (plantedQueue[i].growTime*2);
			plantDecayQueue.push(plantedQueue[i])
		}
	}
	//filter out all grown plants and move them to the decay list
	plantedQueue = plantedQueue.filter(crop => crop.state != "Grown");
	//calc if crop has spoiled. Since we aren't displaying rem time we can simplify calcs
	for (var i=0; i<plantDecayQueue.length;i++){
		var date = new Date();
        var currentTime = date.getTime();
        var spliceArray = [];
        if (plantDecayQueue[i].decayTime < currentTime){
            plantDecayQueue[i].state = "Dead";
           	document.getElementById(plantDecayQueue[i].plotID).style.backgroundColor = "rosybrown";
			document.getElementById(plantDecayQueue[i].plotID).innerHTML ="";
            console.log("DEAD");
        }  
	}
	
	plantDecayQueue = plantDecayQueue.filter(crop => crop.state != "Dead");
    //filters out holes created in array.
    /*
    plantDecayQueue.filter(crop => crop.decayTime < currentTime);
    */
}

document.getElementById("moneyInfo").innerHTML = globalVal.money;
setInterval(checkGrowth,500);