

function selTool(toolID){
	globalVal.currentTool=toolID;
	console.log(globalVal.currentTool);
}
function usePlot(plotID){
    console.log("usePlotCall");
    switch(globalVal.currentTool){
        case "inspect":
            inspect(plotID);
            break;
        case "harvest":
            harvest(plotID);
            break;
        case "destroy":
            break;
        case "pGrass":
            console.log("pGrass call");
            plant("grass",plotID);
            break;
		case "pTulip":
			plant("tulip",plotID);
			break;
		case "pFourLeafClover":
			plant("fourLeafClover",plotID);
			break;
		case "pRose":
			plant("rose",plotID);
			break;
		case "pCactus":
			plant("Cactus",plotID);
			break;
		case "pPalmTree":
			plant("palmTree",plotID);
			break;
		case "pWishTree":
			plant("wishTree",plotID);
			break;
		case "pBacon":
			plant("bacon",plotID);
			break;
		case "pMixtape":
			plant("mixtape",plotID);
			break;
		case "pEvidence":
			plant("evidence",plotID);
			break;
    }
}


