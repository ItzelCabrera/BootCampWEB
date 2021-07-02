const german_URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=a7da7cccc7844466bcf64610462c6d0b&cuisine=German';
const african_URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=a7da7cccc7844466bcf64610462c6d0b&cuisine=African';
const british_URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=a7da7cccc7844466bcf64610462c6d0b&cuisine=British';
const GermanList = document.getElementById("german-list");
const AfricanList = document.getElementById("african-list");
const BritishList = document.getElementById("british-list");

//Paso 1: se obtiene la info de la API
function getData(url){
  return fetch(url).then(response => response.json());
}

//Paso 3: 
function renderData(data,type){
  cuisines = data.results; //se obtiene el array de recetas
  let output = cuisines.map( cuisine=>{//mapeo
      return `<li>
        <img src = "${cuisine.image}"/>
        <h2>${cuisine.title}</h2>
      </li>`;
    }
  ).join("");
  switch(type){
    case 1:
      GermanList.innerHTML = output;
      break;
    case 2:
      AfricanList.innerHTML = output;
      break;
    case 3:
      BritishList.innerHTML = output;
      break;
    default:
      console.log("mistake");
  }
}

//Paso 2: 
async function loadData(url,type){//await y async ya que todo es asíncrono
  let data = await getData(url);
  console.log(data);
  renderData(data,type);
}

loadData(german_URL,1);
loadData(african_URL,2);
loadData(british_URL,3);