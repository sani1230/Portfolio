function checkCode() {
  const code = document.getElementById('codeInput').value;
  const errorDiv = document.getElementById('error');

  if (!/^\d{8}$/.test(code)) {
    errorDiv.innerText = "Please enter a valid 8-digit number.";
    return;
  }

  // Redirect to backend route
  window.location.href = `/check/${code}`;
}
