// JavaScript code goes here

const form = document.getElementById('importForm');
form.addEventListener('submit', (event) => {
event.preventDefault();

const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// Read the file and convert it to a binary string
const reader = new FileReader();
reader.readAsBinaryString(file);
reader.onload = () => {
const binaryStr = reader.result;
// Convert the binary string to a JSON object
const workbook = XLSX.read(binaryStr, { type: 'binary' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Insert the JSON data into the HTML table
const table = document.getElementById('dataTable');
jsonData.forEach((row) => {
  const tr = document.createElement('tr');
  for (const key in row) {
    const td = document.createElement('td');
    td.textContent = row[key];
    tr.appendChild(td);
  }
  table.appendChild(tr);
});
};
});

// Validate the ID field
const idInput = document.getElementById('idInput');
if (typeof idInput.value === 'string' && idInput.value.trim() !== '') {
// ID field is valid, submit the form
form.submit();
} else {
// The ID is invalid, show an error message
alert('The ID must be a string and not empty');
}



