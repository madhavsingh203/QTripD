import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log("From init()");
  // console.log(config);
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const data = await fetch(config.backendEndpoint + "/cities")
            .then((res) => res.json())
            .catch((err)=> {return (null)})
  return data;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const ParentElement = document.getElementById("data");
  const childElement = document.createElement("div");
 // console.log(childElement)
 childElement.className = "col-6 col-lg-3 mb-4"
 let text = `<a href="pages/adventures/?city=${id}" id="${id}">
 <div class="tile mb-4">
   <img src="${image}"/> 
    <div class="tile-text text-white text-center">
     <h5>${city}</h5>
        <p>${description}</p> 
        </div>
      </div>
         </a>`
childElement.innerHTML = text;
ParentElement.appendChild(childElement)
  //const newContent = document.createTextNode("Hi there and greetings!")
 // ParentElement.appendChild(childElement);


  

  
}

export { init, fetchCities, addCityToDOM };
