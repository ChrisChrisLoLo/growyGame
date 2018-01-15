var globalVal = {
	money: 500,
	currentTool: "inspect",
}

function selTool(toolID){
	globalVal.currentTool=toolID;
	console.log(globalVal.currentTool);
}

function usePlot(iGrid){
	console.log(iGrid);

}