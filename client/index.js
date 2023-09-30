document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3001/getAll') //no headers sent
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data'])); //needs the ['data'] because it's the key in the object
})

const addBtn = document.querySelector('#add-name-btn');
// const addBtn = document.getElementById // could use document.get id

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value; // corrected from ariaValueMax
    nameInput.value = ""; // corrected typo

    fetch('http://localhost:3001/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable((data['data'])))
    ;
};

function insertRowIntoTable(data) {

}


function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    console.log(`${data} is the data coming through`);
    console.log(`${JSON.stringify(data)} is the data coming through`); // if object which it is?

    
    if (data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        // Table row
        return;
    }
    let tableHtml = "";

    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id="${id}">Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id="${id}">Edit</button></td>`;
        tableHtml += "</tr>";
    });
    
    table.innerHTML = tableHtml;
} 