const loginForm = async (event) => {
    event.preventDefault();
  
    // Collects values from the login form
    const Name = document.querySelector('#empLoginName').value.trim();
    const password = document.querySelector('#empLoginPassword').value.trim();
  
    if (Name && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/employee/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the pets(or whatever we call the page with all the pets available for adoption)
        document.location.replace('/04-employee-home.html#');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupForm = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#newEmpName').value.trim();
    const phone = document.querySelector('#newEmpPhone').value.trim();
    const email = document.querySelector('#newEmpEmail').value.trim();
    const password = document.querySelector('#newEmpPassword').value.trim();
  
    if (name && phone && email && password) {
      const response = await fetch('/api/employee', {
        method: 'POST',
        body: JSON.stringify({ name, phone, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // this will send you to the same place as the login endpoint
        document.location.replace('/04-employee-home.html#');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  //whatever the class name of the form is 
    .querySelector('#empLoginForm')
    .addEventListener('submit', loginForm);
  
  document
  //whatever the class name of the form is 
    .querySelector('#newEmpForm')
    .addEventListener('submit', signupForm);
  