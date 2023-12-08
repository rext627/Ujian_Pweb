var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = alert-className;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#jenis_kelamin").value = "";
    document.querySelector("#alamat").value = "";
}

// Retrieve data from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const storedData = JSON.parse(localStorage.getItem("pekerjadata")) || [];
    const list = document.querySelector("#pekerja-list");

    storedData.forEach(data => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.firstName}</td>
            <td>${data.jenis_kelamin}</td>
            <td>${data.alamat}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
        list.appendChild(row);
    });
});

// Add Data
document.querySelector("#pekerja-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const jenis_kelamin = document.querySelector("#jenis_kelamin").value;
    const alamat = document.querySelector("#alamat").value;

    if(firstName == "" || jenis_kelamin == "" || alamat == ""){
        showAlert("Please fill in all fields", "danger");
    } else {
        const list = document.querySelector("#pekerja-list");

        if (selectedRow == null) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${jenis_kelamin}</td>
                <td>${alamat}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                `;
            list.appendChild(row);
            showAlert("pekerja Added", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = jenis_kelamin;
            selectedRow.children[2].textContent = alamat;
            showAlert("pekerja Info Edited", "info");
        }

        clearFields();

        // Save data to local storage
        saveToLocalStorage();
    }
});

// Edit Data
document.querySelector("#pekerja-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#jenis_kelamin").value = selectedRow.children[1].textContent;
        document.querySelector("#alamat").value = selectedRow.children[2].textContent;
    }
});

// Delete Data
document.querySelector("#pekerja-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("pekerja Data Deleted", "danger");
        // Save updated data to local storage
        saveToLocalStorage();
    }
});

// Save data to local storage
function saveToLocalStorage() {
    const rows = document.querySelectorAll("#pekerja-list tr");
    const pekerjadata = [];

    rows.forEach(row => {
        const pekerjadata = {
            firstName: row.children[0].textContent,
            jenis_kelamin: row.children[1].textContent,
            alamat: row.children[2].textContent,
        };
        pekerjadata.push(pekerja);
    });

    localStorage.setItem("pekerjadata", JSON.stringify(pekerjadata));
}