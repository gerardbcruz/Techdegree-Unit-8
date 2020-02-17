/////////// VARIABLES ///////////
const searchBox = document.getElementById("search");
const employeesList = document.querySelector(".employees");
const usersURL = "https://randomuser.me/api/?results=12&nat=us";


/////////// FUNCTIONS ///////////
// Fetch Function
function fetchData(url) {
  return fetch(url)
           .then(checkStatus)
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}

// Checks if the response from the server is successful
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateHTML(data) {
  console.log(data.results);
  data.results.map( employee => {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add("employee-container");
    employeesList.appendChild(employeeDiv);
    employeeDiv.innerHTML = `
    <div class="employee-card">
      <img class="profile-image" src="${employee.picture.medium}" alt="employee">
      <div class="employee-text">
        <p class="employee-name">${employee.name.first} ${employee.name.last}</p>
        <a class="employee-email" href="#">${employee.email}</a>
        <p class="employee-city">${employee.location.city}</p>
      </div>
      <span class="arrow-btn"></span>
    </div>
    <div class="modal">
      <div class="modal-content">
        <p class="modal-close-btn">&times;</p>
        <img class="profile-image modal-image" src="${employee.picture.medium}" alt="employee">
        <div class="modal-info-1">
          <p class="modal-employee-name">${employee.name.first} ${employee.name.last}</p>
          <a href="#">${employee.email}</a>
          <p>${employee.location.city}</p>
        </div>
        <div class="modal-info-2">
          <p>${employee.phone}</p>
          <p>${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p>Birthday: ${employee.dob.date}</p>
        </div>
      </div>
    </div>
    `;
  });
  //Create variable to capture employee names
  const employeeNames = document.querySelectorAll(".employee-name");
  return employeeNames;
}


function openModal(e) {
  e.preventDefault();
  const clicked = e.target;
  //targets all clicked items inside of the employee-card and opens modal
  if (clicked.className === "employee-card") {
    clicked.nextElementSibling.style.display = "block";
  } else if (clicked.className === "profile-image" || clicked.className === "employee-text" || clicked.className === "arrow-btn") {
    clicked.parentNode.nextElementSibling.style.display = "block";
  } else if (clicked.className === "employee-name" || clicked.className === "employee-email" || clicked.className === "employee-city") {
    clicked.parentNode.parentNode.nextElementSibling.style.display = "block";
  }
}

function closeModal(e) {
  const closeButton = e.target;
  if (closeButton.className === "modal-close-btn") {
    closeButton.parentNode.parentNode.style.display = "none";
  }
}

function modalOutsideClick(e) {
  if (e.target.className === "modal") {
    e.target.style.display = "none";
  }
}

//Search Functionality
function searchEmployees(employeeCollection) {
  searchBox.addEventListener("keyup", function() {
    const searchValue = searchBox.value.toLowerCase();
    //Loop through employee names
    for (let i=0; i < employeeCollection.length; i++) {
      pTag = employeeCollection[i];
      const lowerCaseName = pTag.textContent.toLowerCase();

      // Check for input match on Employee names 
      if (lowerCaseName.indexOf(searchValue) > -1) {
        pTag.parentNode.parentNode.style.display = "block";
      } else {
        pTag.parentNode.parentNode.style.display = "none";
      }
    }
  })
}

/////////// INITIALIZE PAGE ///////////
fetchData(usersURL)
  .then(generateHTML)
  .then(searchEmployees);


/////////// EVENT LISTENERS ///////////
//Open modal
employeesList.addEventListener("click", openModal);

//Close modal
employeesList.addEventListener("click", closeModal)

// Modal close from outside click
window.addEventListener("click", modalOutsideClick);
