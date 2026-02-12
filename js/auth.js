function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  if (!username || !password) {
    error.textContent = "Please enter username and password";
    return;
  }

  if (username === "admin" && password === "admin123") {
    sessionStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Invalid Username or Password";
  }
}
