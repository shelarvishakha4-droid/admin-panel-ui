function login() {
  const username = document.getElementById(&quot;username&quot;).value.trim();
  const password = document.getElementById(&quot;password&quot;).value.trim();
  const errorDiv = document.getElementById(&quot;loginError&quot;);

  // --- Validation ---
  if (!username || !password) {
    errorDiv.textContent = &quot;Please enter username and password&quot;;
    return;
  }

  // --- Hardcoded credentials ---
  const correctUsername = &quot;admin&quot;;
  const correctPassword = &quot;admin123&quot;;

  if (username !== correctUsername) {
    errorDiv.textContent = &quot;Invalid Username&quot;;
    return;
  }

  if (password !== correctPassword) {
    errorDiv.textContent = &quot;Invalid Password&quot;;
    return;

  }

  // --- Success ---
  sessionStorage.setItem(&quot;isAdminLoggedIn&quot;, &quot;true&quot;);
  window.location.href = &quot;dashboard.html&quot;; // redirect to dashboard
}

// --- Auto redirect if already logged in ---
if (sessionStorage.getItem(&quot;isAdminLoggedIn&quot;) === &quot;true&quot; &amp;&amp;
window.location.href.includes(&quot;index.html&quot;)) {
  window.location.href = &quot;dashboard.html&quot;;
}
