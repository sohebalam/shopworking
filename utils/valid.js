const valid = (firstName, lastName, email, password, confirmPassword) => {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return "Please add all fields"
  }
  if (!validateEmail(email)) {
    return "Please add valid email"
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters."
  }

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
}

export default valid
