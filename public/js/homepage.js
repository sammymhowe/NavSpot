function check(form) {
  if(form.userid.value == "NavSpotUser" && form.password.value == "Password123!") {
    window.open('/dashboard', '_top');
  }
  else {
    alert("Invalid username or password.")
  }
}
