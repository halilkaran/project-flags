//* =======================================================================
//*                          FLAG-APP
//* =======================================================================
const fetchSelect = async function () {

  let formSelect = document.querySelector(".form-select");
  let data = "https://restcountries.com/v3.1/all";

  const res = await fetch(data);
  let data1 = await res.json();
  console.log(data1);
  data1.forEach((e) => {
     const {
       name: { common  }
     } = e;
 
     formSelect.innerHTML += `<option>${Object.values(common).join("")}</option>`;
  })
 
}
fetchSelect();

const name2 = document.querySelector(".form-select");
name2.addEventListener("click",()=> {
   fetchCountry(name2.value)
 })











const butn = document.querySelector("button");
butn.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const code = document.querySelector("#code");
 
  if (name || code) {
    fetchCountry(name.value, code.value);
  }
  name.value = "";
  code.value = ""
});

const fetchCountry = async function (name, code) {
  let url;

  if (name) {
    url = `https://restcountries.com/v3.1/name/${name}`;
  } else if (code) {
    url = `https://restcountries.com/v3.1/alpha/${code}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    //! error handling
    renderError(`Something went wrong! :: ${res.status}`);
    throw new Error();
  }
  const data = await res.json();
  renderCountry(data[0]);
};

const renderCountry = (country) => {
  console.log(country);
  const {
    capital,
    name: { common: countryName },
    currencies,
    region,
    languages,
    flags: { svg: countryFlag }
  } = country;

  const countries = document.querySelector(".countries");
  countries.innerHTML = ` 
   <div class="member  text-start w-50 ">
      <img src=${countryFlag} class="card-img-top" alt="...">
      <div class="card-body text-center">
         <h2 class="card-title">${countryName}</h2>
         <h2 class="card-text">${region}</h2>
      </div>
      <p>
     <i class="fas fa-lg fa-landmark"></i> ${capital} <br>
         <i class="fas fa-lg fa-comments"></i>${Object.values(
           languages
         )} <br>
        <i class="fas fa-lg fa-money-bill-wave"></i> ${
           Object.values(currencies)[0].name
         }
      
      </p>
   </div> `;
};

const renderError = (error) => {
  const countries = document.querySelector(".countries");
  countries.innerHTML = `<h2 class='text-danger'>${error}</h2>`;
};

//! HOMEWORK
//* 1- Update fetchCountry() function which can run both country name and country code
//* 2- update the code that user can select country name (or country code) from an input or select element.
