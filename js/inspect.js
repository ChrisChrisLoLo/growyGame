//Search queries for the crop with the plot ID. return false if not found
function searchCropWithID(inputPlotID){
    var inspectedLand;
    //search if plotID is in use.
    console.log(plantedQueue);
    inspectedLand = plantedQueue.find(function(cropObject){
        return cropObject.plotID == inputPlotID;
    });
    if (inspectedLand){
        return inspectedLand;
    }
    else if (!inspectedLand){
        inspectedLand = plantDecayQueue.find(function(cropObject){
        return cropObject.plotID == inputPlotID;
        });
    }
    if (inspectedLand){
        return inspectedLand;
    }
    else if (!inspectedLand){
        return false;
    }
}

function millisToTime(millis){
	var seconds = Math.floor((millis/1000)%60);
	var minutes = Math.floor((millis/(60*1000))%60);
	//var hours = Math.floor((millis/(60*60*1000)%60);
	return minutes + ":" + seconds;
}


function inspect(inputPlotID){
    var inspectedLand = searchCropWithID(inputPlotID);
    if (!inspectedLand){
        document.getElementById("plotInfo").innerHTML = "Dirt";
    }
    else{
        var infoString=  "Type:"+ inspectedLand.name+" State:"+inspectedLand.state+" Remaining Time: "+millisToTime(inspectedLand.remGrowTime);
        document.getElementById("plotInfo").innerHTML = infoString;
    }
}
