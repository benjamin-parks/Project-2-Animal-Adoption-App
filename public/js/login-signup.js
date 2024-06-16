document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-form');
    const signupForm = document.querySelector('#signup-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', loginFormHandler);
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', signupFormHandler);
    }
  });
  
  async function loginFormHandler(event) {
    event.preventDefault();
  
    const employee_email = document.querySelector('#email-login').value.trim();
    const employee_password = document.querySelector('#password-login').value.trim();
  
    if (employee_email && employee_password) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify({ employee_email, employee_password }),
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("post response: ", response);
        if (response.ok) {
          document.location.replace('/employeehome');
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const employee_name = document.querySelector('#name-signup').value.trim();
    const employee_email = document.querySelector('#email-signup').value.trim();
    const employee_phone = document.querySelector('#phone-signup').value.trim();
    const employee_password = document.querySelector('#password-signup').value.trim();
  
    if (employee_name && employee_email && employee_phone && employee_password) {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          body: JSON.stringify({ employee_name, employee_email, employee_phone, employee_password }),
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          throw new Error('Signup failed');
        }
      } catch (error) {
        console.error('Error signing up:', error.message);
        alert('Signup failed. Please try again.');
      }
    }
  }
  