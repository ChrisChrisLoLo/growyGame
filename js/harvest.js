function harvest(plotID){
    var cropToHarvest = searchCropWithID(plotID);
    //if no crop found
    if (cropToHarvest){
        if(cropToHarvest.state == "grown"){
            console.log("Harvested!");
            globalVal.money += cropToHarvest.sellPrice;
            var index = plantDecayQueue.indexOf(cropToHarvest);
            document.getElementById(plotID).style.backgroundColor="rosybrown";
            document.getElementById(plotID).innerHTML=" ";
            plantDecayQueue.splice(index,1);
            document.getElementById("moneyInfo").innerHTML = globalVal.money;
        }
        else{
            console.log("Crop isn't mature!")
        }
    }
    else{
        console.log("Nothing planted here!");
    }
}