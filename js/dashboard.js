if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
  window.location.href = "index.html";
}

let records = [
  { id: 1, name: "Vishakha", status: "Active" },
  { id: 2, name: "Record Two", status: "Inactive" },
  { id: 3, name: "Record 3", status: "Active" }
];

function renderTable(data = records) {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";

  data.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td class="${record.status === 'Active' ? 'status-active' : 'status-inactive'}">
        ${record.status}
      </td>
      <td class="action-buttons">
        <button class="edit-btn" onclick="editRecord(${record.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("recordsCount").textContent = records.length;
}

function addRecord() {
  const name = prompt("Enter record name:");
  if (!name) return;
  const id = records.length + 1;
  records.push({ id, name, status: "Active" });
  renderTable();
}

function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
  renderTable();
}

function editRecord(id) {
  const record = records.find(r => r.id === id);
  const newName = prompt("Edit name:", record.name);
  if (!newName) return;
  record.name = newName;
  renderTable();
}

function searchRecords() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  const filtered = records
    .filter(r => r.name.toLowerCase().includes(query))
    .filter(r => status === "All" || r.status === status);

  renderTable(filtered);
}

function filterRecords() {
  searchRecords();
}

function logout() {
  sessionStorage.removeItem("isAdminLoggedIn");
  window.location.href = "index.html";
}

renderTable();
