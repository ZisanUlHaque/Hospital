document.addEventListener("DOMContentLoaded", () => {
  const getparams = () => {
      const param = new URLSearchParams(window.location.search).get("doctorId");
      if (param) {
          console.log("Param:", param);
          fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
              .then((res) => res.json())
              .then((data) => displayDetails(data))
              .catch((err) => console.error("Error fetching doctor details:", err));
      } else {
          console.error("No doctorId found in URL parameters.");
      }
      fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
      .then((res) => res.json())
      .then((data) => doctorReview(data));

  };

  
  const doctorReview = (reviews) => {
    reviews.forEach((review) => {
      const parent = document.getElementById("doc-details-review");
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
            <img src="./Images/girl.png" alt="" />
                <h4>${review.reviewer}</h4>
                <p>
                 ${review.body.slice(0, 100)}
                </p>
                <h6>${review.rating}</h6>
            `;
      parent.appendChild(div);
    });
  };

  const displayDetails = (doctor) => {
      console.log(doctor);
      const parent = document.getElementById("doc-details");
      if (!parent) {
          console.error("Element with ID 'doc-details' not found.");
          return;
      }
      const div = document.createElement("div");
      div.classList.add("doc-details-container");
      div.innerHTML = `
          <div class="doctor-img">
              <img src=${doctor.image} alt="" />
          </div>
          <div class="doc-info">
              <h1>${doctor.full_name}</h1>
              ${doctor.specialization.map((item) => `<button class="doc-detail-btn">${item}</button>`).join("")}
              ${doctor.designation.map((item) => `<h4>${item}</h4>`).join("")}
              <p class="w-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quibusdam
                  quis excepturi tempore. Eius, qui!
              </p>
              <h4>Fees: ${doctor.fee} BDT</h4>
              <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
              >
              Take Appointment
              </button>
          </div>
      `;
      parent.appendChild(div);
  };

  getparams();
});

