document.addEventListener('DOMContentLoaded', () => {
    const addPetBtn = document.querySelector('#addPetButton');
  
    const addNewPet = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const petName = document.querySelector('#pet_Name').value.trim();
      const petAge = parseInt(document.querySelector('#pet_Age').value.trim(), 10);
      const petType = document.querySelector('#pet_Type').value.trim();
      const petBreed = document.querySelector('#pet_Breed').value.trim();
      const petDescription = document.querySelector('#pet_Description').value.trim();
      // const imageEl = document.getElementById("petImage").value.trim();
  
      if (isNaN(petAge) || petAge < 0) {
        alert('Please enter a valid age');
        return;
      } else if (petName && petType && petBreed && petDescription) {
        const response = await fetch('/newPet', {
          method: 'POST',
          body: JSON.stringify({
            pet_name: petName,
            pet_age: petAge,
            pet_type: petType,
            pet_breed: petBreed,
            pet_description: petDescription
            // pet_image: imageEl,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // Redirect to a different page or refresh the current page
          document.location.replace('/employeehome');
        } else {
          alert('Failed to add pet');
        }
      } else {
        alert('Please fill out all fields');
      }
    };
  
    addPetBtn.addEventListener('click', addNewPet);
  });
  