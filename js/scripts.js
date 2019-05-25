const randomUserAPI = "https://randomuser.me/api/";
const employeeNumber = 12;
const employeeNationalities = "us,dk,es,fr,gb";

// Builds up the request to pull x random employees from the API with y,z,a nationalities
const requestURL = `${randomUserAPI}?results=${employeeNumber}&nat=${employeeNationalities}`;

// Main HTML elemenent references
const body = document.querySelector("body");
const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");
let cards = "";

// List of employee instances
let employees = [];

function fetchURL(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Builds an employee instance for each retrieved employee data
      data.results.map((employeeJson => employees.push(new Employee(employeeJson))));
      // Creates an employee card for each employee instance
      employees.forEach((employee => gallery.innerHTML += getGalleryCardHTML(employee)));
      
      // Once created, gets the list of card element references and adds click listeners to them
      cards = document.querySelectorAll(".card");
      addClickListenersToGalleryCards(cards);

      // Search bar setup
      createSearchContainer();
    });
}

// Returns the HTML for a card as a dynamically generated string
function getGalleryCardHTML(employee) {
  return `<div id="${employee.id}" class="card">
            <div class="card-img-container">
              <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.city}, ${employee.state}</p>
            </div>
          </div>`;
}

// Creates a click event for each card to open up their information in a gallery modal
function addClickListenersToGalleryCards(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      let target = event.target;
      // The click event target can be any subelement of the card, so we have to find it's Id
      // to know which employee was clicked
      while(!target.id.match(/^#/)) {
        target = target.parentNode;
      }
      
      // We find that employee's information and display it as a gallery modal
      let employee = employees.find(employee => employee.id == target.id);
      createGalleryModal(employee);
    })
  });
}

// Inserts the gallery modal HTML on the page and sets up it's listeners
function createGalleryModal(employee) {
  body.insertAdjacentHTML('beforeend', getGalleryModalHTML(employee));
  addGalleryModalBehaviour(employee);
}

// Returns the HTML for a gallery modal as a dynamically generated string
function getGalleryModalHTML(employee) {
  return `<div class="modal-container">
            <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location}</p>
                <p class="modal-text">Birthday: ${employee.birthday}</p>
              </div>
            </div>
            <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
          </div>`
}

// Sets up the gallery modal behaviour
function addGalleryModalBehaviour(employee) {
  const modalContainer = document.querySelector(".modal-container");
  const closeModalButton = document.querySelector("#modal-close-btn");

  // Clicking the close button will remove the gallery modal from the page
  closeModalButton.addEventListener("click", () => {
    modalContainer.parentNode.removeChild(modalContainer);
  });

  const employeeIndex = employees.indexOf(employee);

  // Clicks made to the previous and next buttons will remove the current gallery modal
  // from the page and create a new one with their corresponding employee data
  const modalPrevButton = document.querySelector("#modal-prev");
  if(employeeIndex == 0) {
    // If the gallery modal corresponds to the first employee, it will not have a previous button
    modalPrevButton.parentNode.removeChild(modalPrevButton);
  } else {
    modalPrevButton.addEventListener("click", () => {
      modalContainer.parentNode.removeChild(modalContainer);

      const prevEmployeeIndex = employeeIndex - 1;
      createGalleryModal(employees[prevEmployeeIndex]);
    });
  }

  const modalNextButton = document.querySelector("#modal-next");
  if(employeeIndex == employees.length -1) {
    // If the gallery modal corresponds to the last employee, it will not have a next button
    modalNextButton.parentNode.removeChild(modalNextButton);
  } else {
    modalNextButton.addEventListener("click", () => {
      modalContainer.parentNode.removeChild(modalContainer);

      const nextEmployeeIndex = employeeIndex + 1;
      createGalleryModal(employees[nextEmployeeIndex]);
    });
  }
}

// Creates a search bar, injects it onto the page and sets it's input and click listeners
function createSearchContainer() {
  const inputForm = `<form action="#" method="get">
                      <input type="search" id="search-input" class="search-input" placeholder="Search...">
                      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                    </form>`;
  
  searchContainer.insertAdjacentHTML('beforeend', inputForm);

  let searchText;
  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener("input", () => {
    searchText = searchInput.value;
    showResult(searchText);
  });
  
  const searchButton = document.querySelector("#search-submit");
  searchButton.addEventListener("click", () => {
    searchText = searchInput.value;
    showResult(searchText);
  });
}

// For a given input, shows all cards in which it's employee's name matches that input,
// else hides the card
function showResult(inputString) {
  employees.forEach((employee) => {
    let employeeCard = document.getElementById(`${employee.id}`);
    if (employee.name.includes(inputString)) {
      employeeCard.style.display = "";
    } else {
      employeeCard.style.display = "none";
    }
  });
}

// Starts the proggram
fetchURL(requestURL);
