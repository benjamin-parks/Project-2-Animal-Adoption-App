const loginForm = async (event) => {
    event.preventDefault();
  
    // Collects values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the pets(or whatever we call the page with all the pets available for adoption)
        document.location.replace('/pets');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // this will send you to the same place as the login endpoint
        document.location.replace('/pets');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  //whatever the class name of the form is 
    .querySelector('.login-form')
    .addEventListener('submit', loginForm);
  
  document
  //whatever the class name of the form is 
    .querySelector('.signup-form')
    .addEventListener('submit', signupForm);
  