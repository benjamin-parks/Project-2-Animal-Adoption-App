document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeBtn = document.querySelector('#addEmployeeButton');
  
    const addNewEmployee = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const employeeName = document.querySelector('#employee_Name').value.trim();
      const employeeEmail = document.querySelector('#employee_Email').value.trim();
      const employeePhone = document.querySelector('#employee_Phone').value.trim();
      const employeePassword = document.querySelector('#employee_Password').value.trim();
      
      if (employeeName && employeeEmail && employeePhone && employeePassword) {
        const response = await fetch('/newEmployee', {
          method: 'POST',
          body: JSON.stringify({
            employee_name: employeeName,
            employee_email: employeeEmail,
            employee_phone: employeePhone,
            employee_password: employeePassword
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // Redirect to a different page or refresh the current page
          document.location.replace('/listemployees');
        } else {
          alert('Failed to add employee');
        }
      } else {
        alert('Please fill out all fields');
      }
    };
  
    addEmployeeBtn.addEventListener('click', addNewEmployee);
  });