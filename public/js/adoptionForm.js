document.addEventListener('DOMContentLoaded', () => {
    const submitFormBtn = document.querySelector('#submitForm');
  
    const addAdoptionForm = async (event) => {
      event.preventDefault();
  
      const petName = document.querySelector('#pet_Name').value.trim();
      const customerName = document.querySelector('#customer_Name').value.trim();
      const customerPhone = document.querySelector('#customer_Phone').value.trim();
      const customerEmail = document.querySelector('#customer_Email').value.trim();
      const customerMessage = document.querySelector('#customer_Message').value.trim();
  
      if (petName && customerName && customerPhone && customerEmail && customerMessage) {
        const response = await fetch('/inquiries', {
          method: 'POST',
          body: JSON.stringify({
            pet_name: petName, // Send pet_name to be processed server-side
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            customer_message: customerMessage,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/inquiries');
        } else {
          alert('Failed to add inquiry');
        }
      } else {
        alert('Please fill out all fields');
      }
    };
  
    submitFormBtn.addEventListener('click', addAdoptionForm);
  });
  