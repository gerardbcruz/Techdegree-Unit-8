/////////// VARIABLES ///////////
const searchBox = document.getElementById("search");
const employeesList = document.querySelector(".employees");
const modal = document.querySelector(".modal");
const modalInner = document.querySelector(".modal-inner");
const usersURL = "https://randomuser.me/api/?results=12&nat=us";

/////////// FUNCTIONS ///////////
// Fetch Function
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem!", error));
}

// Checks if the response from the server is successful
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// Generates Employees on to the page
function generateHTML(data) {
  console.log(data.results);

  data.results.map(employee => {
    const employeeDiv = document.createElement("div");
    employeeDiv.classList.add("employee-container");
    employeesList.appendChild(employeeDiv);

    //Employee Variables
    const employeePicture = employee.picture.large;
    const employeeFullName = `${employee.name.first} ${employee.name.last}`;
    const employeeEmail = employee.email;
    const employeeCity = employee.location.city;
    const employeePhone = employee.phone;
    const employeeStreet = `${employee.location.street.number} ${employee.location.street.name}`;
    const employeeState = employee.location.state;
    const employeePostal = employee.location.postcode;

    const employeeDOBEdit = employee.dob.date.substr(0, 10).split("-");
    const employeeDOB = `${employeeDOBEdit[1]}/${employeeDOBEdit[2]}/${employeeDOBEdit[0]}`;

    //Generate employee containers
    employeeDiv.innerHTML = `
    <div class="employee-card">
      <img class="profile-image" src="${employeePicture}" alt="employee">
      <div class="employee-text">
        <p class="employee-name">${employeeFullName}</p>
        <a class="employee-email" href="#">${employeeEmail}</a>
        <p class="employee-city">${employeeCity}</p>
      </div>
      <span class="arrow-btn"></span>
    </div>
    `;
  });

  data.results.map(employee => {
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalInner.appendChild(modalContent);

    //Employee Variables
    const employeePicture = employee.picture.large;
    const employeeFullName = `${employee.name.first} ${employee.name.last}`;
    const employeeEmail = employee.email;
    const employeeCity = employee.location.city;
    const employeePhone = employee.phone;
    const employeeStreet = `${employee.location.street.number} ${employee.location.street.name}`;
    const employeeState = employee.location.state;
    const employeePostal = employee.location.postcode;

    const employeeDOBEdit = employee.dob.date.substr(0, 10).split("-");
    const employeeDOB = `${employeeDOBEdit[1]}/${employeeDOBEdit[2]}/${employeeDOBEdit[0]}`;

    //Generate modal content
    modalContent.innerHTML = `
        <img
        class="profile-image modal-image"
        src="${employeePicture}"
        alt="employee"
        />
        <div class="modal-info-1">
          <p class="modal-employee-name">${employeeFullName}</p>
          <a href="#">${employeeEmail}</a>
          <p>${employeeCity}</p>
        </div>
        <div class="modal-info-2">
          <p>${employeePhone}</p>
          <p>
            ${employeeStreet}, ${employeeCity}, ${employeeState}
            ${employeePostal}
          </p>
          <p>Birthday: ${employeeDOB}</p>
        </div>
    `;
  });

  //Create variable to capture employee names
  const employeeNames = document.querySelectorAll(".employee-name");
  return employeeNames;
}

// Open Modal
function openModal(e) {
  e.preventDefault();
  const clicked = e.target;
  //targets all clicked items inside of the employee-card and opens modal
  if (
    clicked.className === "employee-card" ||
    clicked.className === "profile-image" ||
    clicked.className === "employee-text" ||
    clicked.className === "arrow-btn" ||
    clicked.className === "employee-name" ||
    clicked.className === "employee-email" ||
    clicked.className === "employee-city"
  ) {
    modal.style.display = "block";
  }
}

//Close Modal
function closeModal(e) {
  const closeButton = e.target;
  if (closeButton.className === "modal-close-btn") {
    modal.style.display = "none";
  }
}

//Close Modal with Outside Click
function modalOutsideClick(e) {
  if (e.target.className === "modal") {
    modal.style.display = "none";
  }
}

//Enable Modal Event Listeners
function enableModal() {
  //Open modal
  employeesList.addEventListener("click", openModal);

  //Close modal
  employeesList.addEventListener("click", closeModal);

  // Modal close from outside click
  window.addEventListener("click", modalOutsideClick);

  // Modal Slider Functionality
  const modalSlides = document.getElementsByClassName("modal-content");
  console.log(modalSlides);
}

//Search Functionality
function searchEmployees(employeeCollection) {
  searchBox.addEventListener("keyup", function() {
    const searchValue = searchBox.value.toLowerCase();
    //Loop through employee names
    for (let i = 0; i < employeeCollection.length; i++) {
      pTag = employeeCollection[i];
      const lowerCaseName = pTag.textContent.toLowerCase();

      // Check for input match on Employee names
      if (lowerCaseName.indexOf(searchValue) > -1) {
        pTag.parentNode.parentNode.style.display = "flex";
      } else {
        pTag.parentNode.parentNode.style.display = "none";
      }
    }
  });
}

/////////// INITIALIZE PAGE ///////////
fetchData(usersURL)
  .then(generateHTML)
  .then(searchEmployees)
  .finally(enableModal);
