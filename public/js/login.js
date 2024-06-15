// const loginFormHandler = async (event) => {
//     event.preventDefault();
  
//     // Collects values from the login form
//     const email = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();
  
//     if (email && password) {
//       // Send a POST request to the API endpoint
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         // If successful, redirect the browser to the pets(or whatever we call the page with all the pets available for adoption)
//         document.location.replace('/employeehome');   /// from /pets to /employeehome ////
//       } else {
//         alert('Failed to log in');   //// response.statusText to 'Failed to log in'
//       }
//     }
//   };
  

//   const signupFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#name-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const phone = document.querySelector('#phone-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
  
//     if (name && email && phone &&password) {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, phone, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         // this will send you to the same place as the login endpoint
//         document.location.replace('/pets');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };
  
//   document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
//   document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);   






  //handle the logout button
  // const logout = async () => {
  //   const response = await fetch('/employee/logout', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (response.ok) {
  //     document.location.replace('/employee/login');
  //   } else {
  //     alert(response.statusText);
  //   }
  // };
  
  // document.querySelector('#logout').addEventListener('click', logout);
  // document.querySelector('#logout-mobile').addEventListener('click', logout);
  

  const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);