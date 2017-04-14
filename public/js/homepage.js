function check(form) {
  if(form.userid.value == "NavSpotUser" && form.password.value == "NavSpotPassword") {
    window.open('/dashboard', '_top');
  }
  else {
    alert("Error Password or Username")
  }
}
