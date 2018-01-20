//Search queries for the crop with the plot ID. return false if not found
function searchCropWithID(inputPlotID){
    var inspectedLand;
	//search if the crop is in use.
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

//code for this function was modified from from https://gist.github.com/robertpataki/d0b40a1cbbb71764dd94e16cbc99d42f
function millisToTime(millis){
        let hours = Math.floor(millis / (1000 * 60 * 60) % 60);
        let minutes = Math.floor(millis / (1000 * 60) % 60);
        let seconds = Math.floor(millis / 1000 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':'+ minutes + ':' + seconds
}

//inspect attempts to find the crop with that matches the chosen plot id.
//returns info if it finds it. Reason why chosenPlotID is global is so inspect
//can be called on an interval so that the rem time updates in real time.
function inspect(){
    var inspectedLand = searchCropWithID(chosenPlotID);
    if (!inspectedLand){
        document.getElementById("plotInfo").innerHTML = "Nothing!";
    }
    else{
        var infoString=  "Type: "+ inspectedLand.name+"<br/>State: "+inspectedLand.state+" <br/>Remaining Time: "+millisToTime(inspectedLand.remGrowTime);
        document.getElementById("plotInfo").innerHTML = infoString;
    }
}
var chosenPlotID;
setInterval(inspect,500);
