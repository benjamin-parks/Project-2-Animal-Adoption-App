const addPetButtonEl = document.getElementById("addPetButton");

async function addPetFunction(){
const nameEl = document.getElementById("petName");
const ageEl = document.getElementById("petAge");
const typeEl = document.getElementById("petType");
const breedEl = document.getElementById("petBreed");
const descriptionEl = document.getElementById("petDescription");
// const imageEl = document.getElementById("petImage");

const response = await fetch("/api/newpet", {
    method: 'POST',
    body: JSON.stringify({
        pet_name: nameEl.value.trim(),
        pet_age: ageEl.value.trim(),
        pet_type: typeEl.value.trim(),
        pet_breed: breedEl.value.trim(),
        pet_description: descriptionEl.value.trim(),
        // pet_image: imageEl.value.trim(),
    }),
    headers: {
        'Content-Type' : 'application/json'
    }
});

if (response.ok) {
    document.location.replace("/employees")
}
else {
    alert("error unable to submit");
}
}

addPetButtonEl.addEventListener("click", addPetFunction);