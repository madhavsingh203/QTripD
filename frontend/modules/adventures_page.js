import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //const params = new URLSearch(search)
  //console.log(search)
  const cityName = search.split("=");
  //console.log(cityName[1])
  return cityName[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const URL = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    //console.log(URL)
    //resolve(URL)
    const data = await URL.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentElement = document.getElementById("data");
  adventures.forEach((element) => {
    const divElement = document.createElement("div");
    divElement.className = "col-6 col-lg-3 mb-4"
    const divContent = `
<div style="position: relative">
<a href= "detail/?adventure=${element.id}" id="${element.id}">
<div class="category-banner">${element.category}</div>
<div class="activity-card ">
<img src="${element.image}" alt="${element.name}">
<div class="">
<div class=" d-flex justify-content-between m-1">
<h6>${element.name}</h6>
<h6>${element.currency} ${element.costPerHead}</h6>
</div>
<div class="d-flex justify-content-between m-1">

<h6>Duration</h6
<h6>${element.duration}Hours</h6>
</div>
</div>

</div>
</a>
</div>
</div>`;
    //console.log(divContent)
    divElement.innerHTML += divContent;
    parentElement.appendChild(divElement);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list\

  //console.log("from duration",list,high,low);
  let filteredList=list.filter(item=>{
    if (item.duration>=low && item.duration<=high) return 1;
  })

  return filteredList;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];

  categoryList.forEach((key) => {
    list.forEach((item) => {
      if (item.category === key) filteredList.push(item);
    });
  });

  return filteredList;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
  console.log(list, filters);
  if (!filters.category.length && !filters.duration) {
    filteredList=list;
  } else {
    if (filters.category.length && !filters.duration) 
    {
      filteredList = filterByCategory(list, filters.category);
    } 
    else if (!filters.category.length && filters.duration)
    {
      let [low,high]=filters.duration.split('-');
      filteredList= filterByDuration(list, low, high);
    }
    else if (filters.category.length && filters.duration) {
      let [low,high]=filters.duration.split('-');
      let List1= filterByDuration(list, low, high);
      filteredList=filterByCategory(List1, filters.category);
    }
  }
  //console.log("filteredList", filteredList);
  // Place holder for functionality to work in the Stubs
  return filteredList;
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters= JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let parent=document.getElementById('category-list');
  filters.category.forEach((item,i)=>{
    parent.innerHTML+=`<span class="category-filter">${item} <span class="ms-2" onclick="FilterRemover(${i})"><b>x</b> </span></span> `
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
