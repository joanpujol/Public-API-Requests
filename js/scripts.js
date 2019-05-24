const randomUserAPI = "https://randomuser.me/api/";
const numberOfUsers = 12;

const fetchURL = `${randomUserAPI}?results=${numberOfUsers}`;

const body = document.querySelector("body");
const gallery = document.getElementById("gallery");

let employees = []

fetch(fetchURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.results.map((employeeJson => employees.push(new Employee(employeeJson))));
    employees.forEach((employee => gallery.innerHTML += createGalleryCard(employee)));
    addClickListenersToGalleryCards()
  })

function createGalleryCard(employee) {
  return `<div id="#${employee.id}" class="card">
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

function addClickListenersToGalleryCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      let target = event.target;
      while(!target.id.match(/^#/)) {
        target = target.parentNode;
      }
      let employee = employees.find(employee => employee.id == target.id.slice(1));
      body.insertAdjacentHTML( 'beforeend', createGalleryModal(employee) );
      addGalleryModalBehaviour(employee);
    })
  });
}

function createGalleryModal(employee) {
  console.log("caca")
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

function addGalleryModalBehaviour(employee) {
  const modalContainer = document.querySelector(".modal-container");
  const closeModalButton = document.querySelector("#modal-close-btn");
  closeModalButton.addEventListener("click", () => {
    modalContainer.parentNode.removeChild(modalContainer);
  });

  const employeeIndex = employees.indexOf(employee);

  const modalPrevButton = document.querySelector("#modal-prev");
  modalPrevButton.addEventListener("click", () => {
    modalContainer.parentNode.removeChild(modalContainer);
    body.insertAdjacentHTML( 'beforeend', createGalleryModal(employees[employeeIndex - 1]) );
    addGalleryModalBehaviour(employees[employeeIndex - 1]);
  });

  const modalNextButton = document.querySelector("#modal-next");
  modalNextButton.addEventListener("click", () => {
    modalContainer.parentNode.removeChild(modalContainer);
    body.insertAdjacentHTML( 'beforeend', createGalleryModal(employees[employeeIndex + 1]) );
    addGalleryModalBehaviour(employees[employeeIndex + 1]);
  });
}