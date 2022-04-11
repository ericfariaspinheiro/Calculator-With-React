export default function calculate (toBeCalculated, result){
  let beingCaltulated = toBeCalculated.split(" ");

    while (beingCaltulated.indexOf("X") > 0) {
      let pos = beingCaltulated.findIndex(op=> op==="X");
      result = beingCaltulated[pos-1] * beingCaltulated[pos+1];
      beingCaltulated.splice(pos-1, 3, result)
    }
    

    while (beingCaltulated.indexOf("/") > 0){
      let pos = beingCaltulated.findIndex(op=> op==="/");
      result = beingCaltulated[pos-1] / beingCaltulated[pos+1];
      beingCaltulated.splice(pos-1, 3, result)
    }
    
    while (beingCaltulated.indexOf("+") > 0){
      let pos = beingCaltulated.findIndex(op=> op==="+");
      if(beingCaltulated[pos-2] === "-"){
        result = (((beingCaltulated[pos-1] * -1) + parseFloat(beingCaltulated[pos+1])) * -1);
        beingCaltulated.splice(pos-2, 4, "-", result)
      } else {
        result = parseFloat(beingCaltulated[pos-1]) + parseFloat(beingCaltulated[pos+1]);
        beingCaltulated.splice(pos-1, 3, result);
      }
    }

    while (beingCaltulated.indexOf("-") > 0){
      let pos = beingCaltulated.findIndex(op=> op==="-");
      result = parseFloat(beingCaltulated[pos-1]) - parseFloat(beingCaltulated[pos+1]);
      beingCaltulated.splice(pos-1, 3, result);
    }

  return result;
}