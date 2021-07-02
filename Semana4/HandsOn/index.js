const BASE_URL = 'https://rickandmortyapi.com/api/character';
const lst = document.getElementById("list");

/*Haciendo la petición: forma 1 XMLHTTPREQUEST
const xhr = new XMLHttpRequest();
xhr.open('GET',BASE_URL);
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => console.log(xhr.response); 
*/

/*Haciendo la petición:forma 2 FETCH
fetch(BASE_URL).then(response=>response.json()).then(data=>console.log(data));*/

/*Haciendo la petición:forma 3 AXIOS
axios.get(BASE_URL).then(response=>console.log(response.data))*/

function getData(url){ //realizar la petición
    //return fetch(url).then(response=>response.json()).then(data=>console.log(data));
    return fetch(url,{method:'GET',mode:'cors'}).then(res=>res.json());
}

function renderData(data){
    const next = data.info.next; //obtiene la siguiente pagina para hacer request
    localStorage.setItem("nextRequest",next);
    characters = data.results;//se obtiene la lista
    let output = characters.map( character=>{//mapeo
        return `
        <li class = "flex flex-col items-center p-1 m-3 rounded-lg bg-white text-gray-800">
            <img src = "${character.image}"/>
            <h2>${character.name}<h2>
            <h3>${character.species}<h3>
        </li>
        `;
    }).join("");

    preData = preData.concat(output);
    lst.innerHTML = preData; //llenamos nuestra lista en el html
}

async function loadData(url){ //ya que todo esto es asíncrono,entonces se utiliza async y await
    let data= await getData(url);
    renderData(data);
}

const obs = document.getElementById("observer");
let counter = 0;
let maxPage = 5; 
let preData = []; //info antes de la nueva petición
localStorage.clear(); //

const intersectionObserver = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){ //si se llega al final de la pagina
        if(localStorage.getItem("nextRequest") && (counter<maxPage)){
            counter++;
            let nextRequest = localStorage.getItem("nextRequest");
            loadData(nextRequest);
        }else if(counter === maxPage){
            alert("Se acabaron las paginas");
            intersectionObserver.unobserve(obs)
        }else{
            loadData(BASE_URL);
        }
    }
    console.log(counter);
},{rootMargin:"0px 0px 100% 0px"})

//loadData(BASE_URL);
intersectionObserver.observe(obs);