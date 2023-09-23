
    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact, src){
      this.species = species;
      this.weight = weight;
      this.height = height;
      this.diet = diet;
      this.where = where;
      this.when = when;
      this.fact = fact;
      this.src = src;
    };

    //fetch json data and push them into an array;
    let dinoData = [];

    function initializeObjects(){

    const trice = new Dino (dinoData[0].species, dinoData[0].weight,dinoData[0].height,
            dinoData[0].diet, dinoData[0].where,dinoData[0].when,dinoData[0].fact,'images/triceratops.png');
    const tyran = new Dino (dinoData[1].species, dinoData[1].weight,dinoData[1].height,
            dinoData[1].diet, dinoData[1].where,dinoData[1].when,dinoData[1].fact,'images/tyrannosaurus rex.png');
    const ankly = new Dino (dinoData[2].species, dinoData[2].weight,dinoData[2].height,
            dinoData[2].diet, dinoData[2].where,dinoData[2].when,dinoData[2].fact,'images/anklyosaurus.png');
    const brach = new Dino (dinoData[3].species, dinoData[3].weight,dinoData[3].height,
            dinoData[3].diet, dinoData[3].where,dinoData[3].when,dinoData[3].fact,'images/brachiosaurus.png');
    const stego = new Dino (dinoData[4].species, dinoData[4].weight,dinoData[4].height,
            dinoData[3].diet, dinoData[4].where,dinoData[4].when,dinoData[4].fact,'images/stegosaurus.png');
    const elasm = new Dino (dinoData[5].species, dinoData[5].weight,dinoData[5].height,
            dinoData[5].diet, dinoData[5].where,dinoData[5].when,dinoData[5].fact,'images/elasmosaurus.png');  
    const ptera = new Dino (dinoData[6].species, dinoData[6].weight,dinoData[6].height,
            dinoData[6].diet, dinoData[6].where,dinoData[6].when,dinoData[6].fact,'images/pteranodon.png');
    const pigeon = new Dino (dinoData[7].species, dinoData[7].weight,dinoData[7].height,
        dinoData[7].diet, dinoData[7].where,dinoData[7].when,dinoData[7].fact,'images/pigeon.png');
 
    return[trice, tyran, ankly, brach, stego, elasm, ptera, pigeon];
    }

    // Create Human Object

    // Use IIFE to get human data from form
    const getHumanData = function (){
    return function(){
    //console.log(document.getElementById('name'));
    const yourName = document.getElementById('name').value;
    const yourFeet = document.getElementById('feet').value;
    const yourInches = document.getElementById('inches').value;
    const yourWeight = document.getElementById('weight').value;
    const yourDiet = document.getElementById('diet').value;

    return{
        yourName,
        yourFeet,
        yourInches,
        yourWeight,
        yourDiet,
    }}}();

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareDiet(da){
        let diet = [];
        da.forEach((d) =>{                
           if (getHumanData().yourDiet.toLowerCase() !== d.diet.toLowerCase()){
           diet.push("you and "+ d.species +"have different diet.");
        } else{
           diet.push("you and "+ d.species +" have the same diet.");
        }
        }
        );
        return diet;    
        }
    
       
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    //convert feet to inches
    function feetToinches(feetData){
        const inchesData = feetData *12;
        return inchesData;
    }

    const compareHeight = function(da){
        let height = [];
        da.forEach((d)=>{
         const yourInches = +getHumanData().yourInches;
         const yourFeet = +getHumanData().yourFeet;
         const yourHeight = yourInches + feetToinches(yourFeet);
         const comparison = ((d.height/yourHeight).toFixed(1));
         let textOutput = '';
        
        if (comparison > 1) {
            textOutput = d.species + " is " + comparison + " times taller than you.";
        } else if (comparison == 1){
            textOutput = d.species + " has the same height with you OMG!"
        } else if(comparison <1){
            textOutput = d.species + " is shorter than you.";
        }
        height.push(textOutput);
    })
        return height;

    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    const compareWeight = function (da){
        let weight = [];
        da.forEach((d)=>{
            const yourWeight = +getHumanData().yourWeight;
            const comparison = ((d.weight/yourWeight).toFixed(1));
            let textOutput = '';
            if (comparison >1){
                textOutput = d.species + " is " + comparison + " times heavier than you.";
            } else if (comparison == 1){
                textOutput = d.species + " has the same weight with you OMG! ";
            } else if (comparison < 1 ){
                textOutput = d.species + " is lighter than you."
            }
            weight.push(textOutput);
        })
        return weight;
    }

    const dinoFact = function (da){
        let fact = [];
        da.forEach((d) =>{
            fact.push(d.fact);
        }
        )
        return fact;
    }

    const dinoWeight = function (da){
         let weight = [];
         da.forEach((d) =>{
            weight.push(d.species + '\'s weight is '+ d.weight+' lbs.');
         }
         )
         return weight;
    }

    const dinoHeight = function (da){
        let height = [];
        da.forEach((d) =>{
           height.push(d.species + '\'s height is '+ d.height+' inches.');
        }
        )
        return height;
   }
  

//fetch JSON data
fetch('https://raw.githubusercontent.com/SkylerW99/dinoProject/master/dino.json')
.then(response => response.json())
.then(data=>{
    dinoData = data.Dinos;
    //other code that uss the data should be called here or in another then() statement
    const dinosArray = initializeObjects();
    dinoGrid(dinosArray);
})
.catch(error => console.error('Error fetching the JSON data', error));



const grids = document.getElementById('grid');
const compareForm = document.forms['dino-compare'];

//DOM part
function dinoGrid(dinosArray){
const btn = document.getElementById('btn');
btn.addEventListener('click',(e) => {
    //get human data
    const humanData = getHumanData();
    console.log(humanData);
    const dietComparison = compareDiet(dinosArray);
    const heightComparison = compareHeight(dinosArray);
    const weightComparison = compareWeight(dinosArray);
    const dinoInfo = dinoFact(dinosArray);
    const dinoHeightInfo = dinoHeight(dinosArray);
    const dinoWeightInfo = dinoWeight(dinosArray);

    //random select
    function randomChoice(){
        const options = [dietComparison,heightComparison,weightComparison,dinoInfo,dinoHeightInfo,dinoWeightInfo];
        const selectNum = Math.floor(Math.random()*options.length);
        return options[selectNum];
    }

     //insert array to the grid
    for (let i=0;i< dinosArray.length+1;i++){
        if (i==4){
            humanItem();
            continue;
        }

        let dinoIndex = i < 4 ? i: i-1;

        if (i==8){
            const birdFact = 'All birds are dinosaurs.';
            dinoItems(dinosArray[dinoIndex],birdFact);
        } else { 
        selectedFact = randomChoice();
        dinoItems(dinosArray[dinoIndex],selectedFact[dinoIndex]);
    }
    }

    //dino data
    function dinoItems(d,fact){

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
    
        const name = document.createElement('h3');
        name.textContent = `${d.species}`
        gridItem.appendChild(name);
    
        const img = document.createElement('img');
        img.src = d.src;
        gridItem.appendChild(img);
    
        const info = document.createElement('p');
        //info.textContent = `${dinos.fact}`;
        info.textContent = fact;
        gridItem.appendChild(info);
        grids.appendChild(gridItem);
        
    }

    //human Data
    function humanItem(){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');   

        const name = document.createElement('h3');
        name.textContent=humanData.yourName;
        gridItem.appendChild(name);
        
        const img = document.createElement('img');
        img.src = "images/human.png";
        gridItem.appendChild(img);
        grids.appendChild(gridItem);

    }

      //delete form
      compareForm.parentNode.removeChild(compareForm);

})}




