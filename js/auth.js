function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("loginError");

  // --- Validation ---
  if (!username || !password) {
    errorDiv.textContent = "Please enter username and password";
    return;
  }

  // --- Hardcoded credentials ---
  const correctUsername = "admin";
  const correctPassword = "admin123";

  if (username !== correctUsername) {
    errorDiv.textContent = "Invalid Username";
    return;
  }

  if (password !== correctPassword) {
    errorDiv.textContent = "Invalid Password";
    return;
  }

  // --- Success ---
  sessionStorage.setItem("isAdminLoggedIn", "true");
  window.location.href = "dashboard.html"; // redirect to dashboard
}

// --- Auto redirect if already logged in ---
if (sessionStorage.getItem("isAdminLoggedIn") === "true" && window.location.href.includes("index.html")) {
  window.location.href = "dashboard.html";
}

