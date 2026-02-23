// Redirect if not logged in
if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// Records data
let records = [
  { id: 1, name: "Vishakha", status: "Active" },
  { id: 2, name: "Record Two", status: "Inactive" },
  { id: 3, name: "Record Three", status: "Approved" }
];

// Render table function
function renderTable(data = records) {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";

  data.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td class="status-${record.status.toLowerCase()}">${record.status}</td>
      <td class="action-buttons">
        <button class="edit-btn" onclick="editRecord(${record.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
        <button class="status-btn" onclick="updateStatus(${record.id}, 'Active')">Active</button>
        <button class="status-btn" onclick="updateStatus(${record.id}, 'Inactive')">Inactive</button>
        <button class="status-btn" onclick="updateStatus(${record.id}, 'Approved')">Approved</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("recordsCount").textContent = records.length;
}

// Add record
function addRecord() {
  const name = prompt("Enter record name:");
  if (!name) return;
  const id = records.length ? records[records.length - 1].id + 1 : 1;
  records.push({ id, name, status: "Active" });
  renderTable();
}

// Edit record
function editRecord(id) {
  const record = records.find(r => r.id === id);
  const newName = prompt("Edit name:", record.name);
  if (!newName) return;
  record.name = newName;
  renderTable();
}

// Delete record
function deleteRecord(id) {
  if (confirm("Are you sure you want to delete this record?")) {
    records = records.filter(r => r.id !== id);
    renderTable();
  }
}

// Update status
function updateStatus(id, newStatus) {
  const record = records.find(r => r.id === id);
  record.status = newStatus;
  renderTable();
}

// Search and filter
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

// Logout
function logout() {
  sessionStorage.removeItem("isAdminLoggedIn");
  window.location.href = "index.html";
}

// Initial render
renderTable();