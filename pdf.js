const handlePdf = () => {
    const doctor_id = new URLSearchParams(window.location.search).get("doctorId");
    console.log(doctor_id);
    const user_id = localStorage.getItem("user_id");
    console.log(`https://testing-8az5.onrender.com/users/${user_id}`);
    
    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
        .then((res) => res.json())
        .then((doctorData) => {
            fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
                .then((res) => res.json())
                .then((userData) => {
                    console.log({ doctorData, userData });
                    const parent = document.getElementById("pdf-container");

                    // Clear the container to avoid duplicates
                    parent.innerHTML = "";

                    const div = document.createElement("div");
                    div.innerHTML = `
                        <div class="pd d-flex justify-content-around align-items-center p-5">
                            <div class="patient doctor p-5">
                                <h1>${userData.username}</h1>
                                <h2>${userData.first_name} ${userData.last_name}</h2>
                                <h4>Email: ${userData.email}</h4>
                            </div>
                            <div class="doctor p-5">
                                <img class="w-25 rounded-circle shadow" src="${doctorData.image}" alt="Doctor Image"/>
                                <h2 class="doc-name">${doctorData.full_name}</h2>
                                <h3>Designation: ${doctorData.designation || "Not provided"}</h3>
                                <h5>Specialization: ${doctorData.specialization || "Not provided"}</h5>
                            </div>
                        </div>
                        <div class="additional-info text-center mt-3">
                            <label for="pdf-symptom" class="form-label">Enter Symptoms:</label>
                            <input id="pdf-symptom" class="symtom" type="text" placeholder="Enter symptoms here..." />
                            <h1 id="pdf-fees" class="text-center p-2 mt-3 text-primary">
                                Fees: ${doctorData.fee || 0} BDT
                            </h1>
                        </div>
                    `;

                    parent.appendChild(div);

                    // Trigger PDF generation
                    downloadPdf();
                });
        });
};

const downloadPdf = () => {
    const element = document.getElementById("pdf-container");

    // Define the options for html2pdf
    const options = {
        margin: 10,
        filename: "SmartCare.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Use html2pdf to generate and download the PDF
    html2pdf().set(options).from(element).save();
};

// Initialize
handlePdf();
