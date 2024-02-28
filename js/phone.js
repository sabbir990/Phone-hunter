const searchBtn = document.getElementById('search-btn')
async function fetchData(phone_name = 'Iphone') {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone_name}`);
    const data = await response.json();
    const phones = data.data;
    showDataToUI(phones)
}

fetchData();

function showDataToUI(phones) {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    const showAllBtn = document.getElementById('show-all-btn')
    if (phones.length > 20) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }

    phones = phones.slice(0, 10)
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl p-4 w-full flex flex-col items-center space-y-4`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="showDetails('${phone.slug}');">More Details</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });

    showLoadingSpinner(false)
}

function searchFunc() {
    showLoadingSpinner(true)
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value;
    fetchData(inputText)
}

function showLoadingSpinner(isLoading) {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden')
    }

}

async function showDetails(id) {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    // console.log(data)
    getInformationsForModal(data)
}

function getInformationsForModal(data) {
    my_modal_5.showModal();
    const modalBox = document.getElementById('modal-box');
    modalBox.classList = 'flex flex-col space-y-4 items-center bg-white p-6 border-2 border-transparent rounded-3xl'
    modalBox.innerHTML = `
        <h1 class="font-bold text-black-700 text-2xl">${data.data.name}</h1>
        <img src="${data.data.image}" alt="${data.data.name}" />
        <p>Storage - ${data.data.mainFeatures.storage}</p>
        <p>Chipset - ${data.data.mainFeatures.chipSet}</p>
        <p>Display Size - ${data.data.mainFeatures.displaySize}</p>
        <p>Release Date - ${data.data.releaseDate}</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
        </div>
    `
    console.log(data)
}

searchBtn.addEventListener('click', searchFunc)