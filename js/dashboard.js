// ===============================
// Admin Dashboard JS
// ===============================

// --- Sample Records Data ---
let records = [
  { id: 1, name: "Record One", status: "Active" },
  { id: 2, name: "Record Two", status: "Inactive" }
];

// --- Show message on page ---
function showMessage(msg, color = "green") {
  const messageDiv = document.getElementById("message");
  messageDiv.style.color = color;
  messageDiv.textContent = msg;
  setTimeout(() => { messageDiv.textContent = ""; }, 3000); // disappear after 3 sec
}

// --- Render Records Table ---
function renderTable(data = records) {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = ""; // clear previous rows

  data.forEach(record => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td class="${record.status === 'Active' ? 'status-active' : 'status-inactive'}">${record.status}</td>
      <td>
        <button class="edit-btn" onclick="editRecord(${record.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
        <button class="toggle-btn" onclick="toggleStatus(${record.id})">${record.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update records count in summary card
  document.getElementById("recordsCount").textContent = records.length;
}

// --- Add New Record ---
function addRecord() {
  const name = prompt("Enter record name:");
  if (!name) return showMessage("Name cannot be empty", "red");

  const id = records.length ? records[records.length - 1].id + 1 : 1;
  records.push({ id, name, status: "Active" });

  renderTable();
  showMessage("Record added successfully!");
}

// --- Edit Record ---
function editRecord(id) {
  const record = records.find(r => r.id === id);
  const newName = prompt("Edit record name:", record.name);
  if (!newName) return showMessage("Name cannot be empty", "red");

  record.name = newName;
  renderTable();
  showMessage("Record updated successfully!");
}

// --- Delete Record ---
function deleteRecord(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  records = records.filter(r => r.id !== id);
  renderTable();
  showMessage("Record deleted successfully!");
}

// --- Toggle Record Status ---
function toggleStatus(id) {
  const record = records.find(r => r.id === id);
  record.status = record.status === "Active" ? "Inactive" : "Active";
  renderTable();
  showMessage(`Status changed to ${record.status}`);
}

// --- Search Records ---
function searchRecords() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  const filtered = records
    .filter(r => r.name.toLowerCase().includes(query))
    .filter(r => status === "All" || r.status === status);

  renderTable(filtered);
}

// --- Filter Records ---
function filterRecords() {
  searchRecords();
}

// --- Logout Function ---
function logout() {
  sessionStorage.removeItem("isAdminLoggedIn");
  window.location.href = "index.html";
}

// --- Redirect to login if not logged in ---
if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
  window.location.href = "index.html";
} else {
  renderTable();
}
