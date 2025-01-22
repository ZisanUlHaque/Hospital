const loadServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  const parent = document.getElementById("service-container");
  // Clear existing elements to avoid duplication
  parent.innerHTML = "";

  services.forEach((service) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card shadow h-100">
        <div class="ratio ratio-16x9">
          <img
            src=${service.image}
            class="card-img-top"
            loading="lazy"
            alt="..."
          />
        </div>
        <div class="card-body p-3 p-xl-5">
          <h3 class="card-title h5">${service.name}</h3>
          <p class="card-text">
            ${service.description.slice(0, 140)}
          </p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });
};

const loadDoctors = (search) => {
  const parent = document.getElementById("doctors");
  parent.innerHTML = ""; // Clear existing doctor cards
  document.getElementById("spinner").style.display = "block";

  fetch(
    `https://testing-8az5.onrender.com/doctor/list/?search=${search || ""}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("spinner").style.display = "none";
      if (data.results.length > 0) {
        document.getElementById("nodata").style.display = "none";
        displayDoctors(data.results);
      } else {
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displayDoctors = (doctors) => {
  const parent = document.getElementById("doctors");
  parent.innerHTML = ""; // Clear existing doctor cards

  doctors.forEach((doctor) => {
    const div = document.createElement("div");
    div.classList.add("doc-card");
    div.innerHTML = `
      <img class="doc-img" src=${doctor.image} alt="" />
      <h4>${doctor?.full_name}</h4>
      <h6>${doctor?.designation[0]}</h6>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, numquam!
      </p>
      <p>
        ${doctor?.specialization
          .map((item) => `<button>${item}</button>`)
          .join("")}
      </p>
      <button>
        <a target="_blank" href="docDetails.html?doctorId=${doctor.id}">
          Details
        </a>
      </button>
    `;
    parent.appendChild(div);
  });
};

const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-deg");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerText = item?.name;
          parent.appendChild(li);
        });
      });
};

const loadSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-spe");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
          <li onclick="loadDoctors('${item.name}')"> ${item.name}</li>
            `;
          parent.appendChild(li);
        });
      });
};

const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadDoctors(value);
};
//   Calling Functions

loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
handleSearch();