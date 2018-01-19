function inspect(inputPlotID){
    var inspectedLand;
    //search if plotID is in use.
    console.log(plantedQueue);
    inspectedLand = plantedQueue.find(function(cropObject){
        return cropObject.plotID == inputPlotID;
    });
    if (!inspectedLand){
        inspectedLand = plantDecayQueue.find(function(cropObject){
        return cropObject.plotID == inputPlotID;
        });
    }
    
    if (!inspectedLand){
        document.getElementById("plotInfo").innerHTML = "Dirt";
    }
    else{
        var infoString=  "Type: "+ inspectedLand.name+"State: "+inspectedLand.state+"Remaining Time: "+inspectedLand.remGrowTime;
        document.getElementById("plotInfo").innerHTML = infoString;
    }
}