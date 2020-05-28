
let orderedArray = [
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
];
let array = shuffle(orderedArray);

let graphWidth = 36; // set this to = array.length
let graphHeight = 18; // set to = graphWidth
let graph = document.getElementById('graph');

graph.setAttribute("viewBox",`0 0 ${graphWidth} ${graphHeight}`);

function shuffle(givenArray) {
  let shuffledArray = Array(givenArray.length)
  for(let item in givenArray){
    let randomIndex = Math.floor(Math.random() * givenArray.length)
    while(shuffledArray[randomIndex] !== undefined){
      randomIndex = Math.floor(Math.random() * givenArray.length)
    }
    shuffledArray[randomIndex] = givenArray[item]
  }
  return shuffledArray;
}

function generateBars(givenArray) {
  for(let x in givenArray){
    let child = document.createElementNS("http://www.w3.org/2000/svg", "path");
    child.setAttribute("fill",`hsla(${givenArray[x]*10}, 50%, 50%, 100%)`);
    //child.setAttribute("d",`M${x+0.1} ${graphHeight} h.8 v-${graphHeight} h-.8`);
    child.setAttribute("d",`M${parseInt(x)+0.1} ${graphHeight}
    h.8
    v-${(givenArray[x]+0.5)*(graphHeight/graphWidth)}
    h-.8`); // v- has a clamping multiplier to maintain the relative size when the ration between height and width changes.
    child.setAttribute("stroke","none");
    graph.appendChild(child);
  }
}

function clearOldBars(){
  let oldBars = document.getElementsByTagName('path');
  for(let i = oldBars.length - 1; i > -1; i--){ // forgot to clean up behind myself instead of infront so this only removed every other object.
    oldBars[i].remove()
  };
}

function sortBars(givenArray){
    let sortedArray = [...givenArray];
    switchedFlag = true;
    while(switchedFlag == true){
      let index = 0;
      switchedFlag = false;
      while(index < sortedArray.length){
        if(sortedArray[index] > sortedArray[index+1]){
          let tempA = sortedArray[index]; // I can do this without the temp with simple math, but it is much more to write.
          sortedArray[index] = sortedArray[index + 1];
          sortedArray[index + 1] = tempA;
          switchedFlag = true;
        };
        index++;
      };
    };
    return sortedArray;
}

function sort(givenArray){
  clearOldBars();
  let start = performance.now()
  givenArray = sortBars(givenArray)
  let end = performance.now()
  generateBars(givenArray);
  console.log(`Default Sort Took: ${end - start} milliseconds`)
  // 1 millisecond is 1/1000 of a second. My sort usually takes about 0.17 milliseconds.
}




function bars() { // Generates bars
  for(let x = 0; x < graphWidth + 1; x++){
    let child = document.createElementNS("http://www.w3.org/2000/svg", "path");
    child.setAttribute("fill",`hsla(${x*10}, 50%, 50%, 50%)`);
    //child.setAttribute("d",`M${x+0.1} ${graphHeight} h.8 v-${graphHeight} h-.8`); //These bars are the height of the graph
    child.setAttribute("d",`M${x+0.1} ${graphHeight} h.8 v-${x+1} h-.8`); // These bars ascend in order
    child.setAttribute("stroke","none");
    graph.appendChild(child);
  }
}

function dots() { // Grid dots
  for(let x = 1; x < graphWidth; x++){
    for(let y = 1; y < graphHeight; y++){
      let child = document.createElementNS("http://www.w3.org/2000/svg",'circle');
      child.setAttribute("cx",x);
      child.setAttribute("cy",y);
      graph.appendChild(child);
    }
  }
}

function lines() { // Grid Lines
  for(let y = 0; y < graphHeight + 1; y++){ // Down
    let child = document.createElementNS("http://www.w3.org/2000/svg",'path');
    child.setAttribute("stroke-width","0.03");
    child.setAttribute("stroke","#999");
    child.setAttribute("d",`M0 ${y} h${graphWidth}`);
    graph.appendChild(child);
  }
  for(let x = 0; x < graphWidth + 1; x++){ // Across
    let child = document.createElementNS("http://www.w3.org/2000/svg",'path');
    child.setAttribute("stroke-width","0.03");
    child.setAttribute("stroke","#999");
    child.setAttribute("d",`M${x} 0 v${graphHeight}`);
    graph.appendChild(child);
  }
}


// This is the main loop of the program:
//lines()
//dots()
//bars()
generateBars(array);
