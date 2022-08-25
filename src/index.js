document.addEventListener('DOMContentLoaded', () => {

    const dogUrl = "http://localhost:3000/dogs"
    //DOM Selectors

    const tableBody = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")
    

    //fetch Requests

    fetch(dogUrl)
    .then(resp => resp.json())
    .then(data => displayDogs(data))

    // Event Handlers

    dogForm.addEventListener("submit", (e) => {
        e.preventDefault()
        editDog(e.target)
    })

    //Rendering

    function displayDogs(dog) {
        dog.forEach(dog => {
            let row = document.createElement("tr")
            row.id = dog.id
            row.innerHTML = `
            <td name="name">${dog.name}</td>
            <td name="breed">${dog.breed}</td>
            <td name="sex">${dog.sex}</td>
            <td><button class="dog-btn" data-id="${dog.id}">Edit</button></td>`
            tableBody.append(row)
        })
       const dogBtns = Array.from(document.querySelectorAll(".dog-btn"))
       dogBtns.forEach(btn => {
        btn.addEventListener("click", (event) => {
            if (event.target.dataset.id === btn.dataset.id) {
                populateForm(btn.dataset.id)
            }
        })
       })
    }

    function populateForm(id) {
        let dog = document.getElementById(`${id}`)
        let name = dog.children['name'].innerText
        let breed = dog.children['breed'].innerText
        let sex = dog.children['sex'].innerText
        dogForm.children['name'].value = name
        dogForm.children['breed'].value = breed
        dogForm.children['sex'].value = sex

        dogForm.dataset.id = id
    }
    
    function editDog(dog) {
        let id = dog.dataset.id
        let dogObj = {
            id: id,
            name: dog.name.value,
            breed: dog.breed.value,
            sex: dog.sex.value
        }
        
        fetch(dogUrl +`/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dogObj)
        
        })

        let currentDog = document.getElementById(id)
        currentDog.children.name.textContent = dogObj.name
        currentDog.children.breed.textContent = dogObj.breed
        currentDog.children.sex.textContent = dogObj.sex
    }

    
})