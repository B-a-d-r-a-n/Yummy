const loading = document.querySelector(".loading");

let rowData = document.getElementById("rowData");
$(document).ready(() => {
  $(".loading-screen").fadeOut(1500);
  $("body").css("overflow", "visible");
});
function openSideNav() {
  $(".open-icon").on("click", function () {
    $(".side-nav-menu").animate({ left: "0" }, 500);
    $(".top-hideNav").animate({ top: "0" }, 500);
  });
  $(".open-icon").addClass("d-none");
  $(".close-icon").removeClass("d-none");
}

function closeSideNav() {
  $(".close-icon").on("click", function () {
    $(".side-nav-menu").animate({ left: "-256px" }, 500);
    $(".top-hideNav").animate({ top: "295px" }, 500);
    $(".open-icon").removeClass("d-none");
    $(".close-icon").addClass("d-none");
  });
}

async function nameSearch(name) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await url.json();
  data.meals ? displayMeals(data.meals) : displayMeals([]);
  loading.classList.add("d-none");
}
async function letterSearch(L) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${L}`
  );
  let data = await url.json();
  data.meals ? displayMeals(data.meals) : displayMeals([]);
  loading.classList.add("d-none");
}
async function getMealsCat() {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await url.json();
  displayMealsCat(data.categories);
  loading.classList.add("d-none");
}

async function getMealsByCat(cat) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
  );
  let data = await url.json();
  displayMeals(data.meals);
  loading.classList.add("d-none");
}
async function getMealsArea() {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await url.json();
  displayMealsArea(data.meals);
  loading.classList.add("d-none");
}
async function getMealsByArea(area) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await url.json();
  displayMeals(data.meals);
  loading.classList.add("d-none");
}

async function getMealsIngredient() {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await url.json();
  displayMealsIngredient(data.meals);
  loading.classList.add("d-none");
}
async function getMealsByIngredient(ingredient) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await url.json();
  displayMeals(data.meals);
  loading.classList.add("d-none");
}

async function getMealById(id) {
  loading.classList.remove("d-none");
  let url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await url.json();
  displayMealDetails(data.meals);
  loading.classList.add("d-none");
}

function displayMeals(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="w-full md:w-2/4 lg:w-1/3 xl:w-1/4 relative p-3">
          <div
            onclick="getMealById('${arr[i].idMeal}')"
            class="meal relative overflow-hidden rounded-md cursor-pointer group/parent"
          >
            <img
              class="w-full"
              src="${arr[i].strMealThumb}"
              alt=""
              srcset=""
            />
            <div class="meal-layer justify-center">
              <h3 class="text-center w-full font-bold text-sm md:text-lg lg:text-xl">${arr[i].strMeal}</h3>
            </div>
          </div>
        </div>
      `;
  }
  rowData.innerHTML = box;
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    let ingNum = `strIngredient${i + 1}`;
    let measureNum = `strMeasure${i + 1}`;

    if (meal[0][ingNum]) {
      ingredients += `      <li class="bg-ingredients m-2 py-1 px-2 rounded-lg">
      ${meal[0][measureNum]} ${meal[0][ingNum]}
                  </li>
      
      `;
    }
  }
  let strTags = `strTags`;
  let tags = meal[0][strTags]?.split(",");

  if (!tags) tags = [];

  let tagsStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
    <li class="rounded-lg bg-tags m-2 py-1 px-2">${tags[i]}</li>
      `;
  }

  let box = "";

  for (let i = 0; i < meal.length; i++) {
    box += `
    
          <div class="w-full xl:w-1/3  h-full">
            <img
              class="w-full rounded-lg"
              src="${meal[i].strMealThumb}"
              alt=""
            />
            <h2 class="text-white font-bold text-3xl">${meal[i].strMeal}</h2>
          </div>
          <div class="w-full xl:w-2/3 px-2 h-full">
            <div>
              <h2 class="text-white font-bold text-3xl mb-2">Instructions</h2>
              <p class="text-white max-w-full ">
                ${meal[i].strInstructions}
              </p>
              <div class="prose">
                <h3 class="text-white">
                  <span class="font-extrabold">Area : </span>${meal[i].strArea}
                </h3>
                <h3 class="text-white">
                  <span class="font-extrabold">Category : </span>${meal[i].strCategory}
                </h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="list-none flex gap-3 flex-wrap text-ingredientsTxt">
                 ${ingredients}
                </ul>

                <h3 class="text-white">Tags :</h3>
                <ul class="list-none flex gap-3 flex-wrap text-tagsTxt">
                ${tagsStr}
                </ul>

                <a
                  target="_blank"
                  href="${meal[i].strSource}"
                  class="bg-source hover:bg-source-hover btn text-white ms-7 me-1 transition-all duration-300"
                  >Source</a
                >
                <a
                  target="_blank"
                  href="${meal[i].strYoutube}"
                  class="bg-youtube hover:bg-youtube-hover btn text-white me-1 transition-all duration-300"
                  >Youtube</a
                >
      `;
  }
  rowData.innerHTML = box;
}

function displayMealsCat(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `        <div class="w-full md:w-2/4 lg:w-1/3 xl:w-1/4 relative p-2 md:p-5">
    <div
      onclick="getMealsByCat('${arr[i].strCategory}')"
      class="meal relative overflow-hidden rounded-md cursor-pointer group/parent"
    >
      <img
        class="w-full"
        src="${arr[i].strCategoryThumb}"
        alt=""
        srcset=""
      />
      <div class="meal-layer">
        <h3 class="text-center w-full font-bold text-sm md:text-lg lg:text-xl">${arr[i].strCategory}</h3>
        <p class="text-center line-clamp-2">
        ${arr[i].strCategoryDescription}
        </p>
      </div>
    </div>
  </div>`;
  }
  rowData.innerHTML = box;
}
function displayMealsArea(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `            <div class="w-full md:w-2/4 lg:w-1/3 xl:w-1/4p-2 md:p-5">
          <div
            onclick="getMealsByArea('${arr[i].strArea}')"
            class="rounded-md text-center cursor-pointer"
          >
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
            <h3 class="w-full text-3xl font-bold text-white">${arr[i].strArea}</h3>
          </div>
        </div>`;
  }
  rowData.innerHTML = box;
}
function displayMealsIngredient(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `           <div class="w-full md:w-2/4 lg:w-1/3 xl:w-1/4">
          <div
          getMealsByIngredient
            onclick="getMealsByIngredient('${arr[i].strIngredient}')"
            class="rounded-md text-center cursor-pointer"
          >
            <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
            <h3 class="text-white text-sm md:text-lg lg:text-xl font-bold">${
              arr[i].strIngredient
            }</h3>
            <p class="text-white text-lg line-clamp-2">
            ${
              arr[i].strDescription
                ? arr[i].strDescription
                : "a short description"
            }

            </p>
          </div>
        </div>`;
  }
  rowData.innerHTML = box;
}

// كده شكلها اجمد
function searchToggle() {
  $(".searchMeal").toggleClass("invisible");
}

function contactControl() {
  let box = ``;
  box += `        <div
          class="contact h-screen flex justify-center items-center text-center"
        >
          <div class="container w-75 text-center">
            <div class="row-custom">
              <div class="w-1/2 p-2">
                <input
                  id="nameInput"  onkeyup="inputsValidation()"
                  type="text" data-touched="false"
                  class="form-control"
                  placeholder="Enter Your Name"
                />
                <div
                  id="nameAlert"
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Special characters and numbers not allowed
                </div>
              </div>
              <div class="w-1/2 p-2">
                <input
                  id="emailInput"  onkeyup="inputsValidation()"
                  type="email" data-touched="false"
                  class="form-control"
                  placeholder="Enter Your Email"
                />
                <div
                  id="emailAlert"
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Email not valid *exemple@yyy.zzz
                </div>
              </div>
              <div class="w-1/2 p-2">
                <input
                  id="phoneInput"  onkeyup="inputsValidation()"
                  type="text" data-touched="false"
                  class="form-control"
                  placeholder="Enter Your Phone"
                />
                <div
                  id="phoneAlert"
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Enter valid Phone Number
                </div>
              </div>
              <div class="w-1/2 p-2">
                <input
                  id="ageInput"  onkeyup="inputsValidation()"
                  type="number" data-touched="false"
                  class="form-control"
                  placeholder="Enter Your Age"
                />
                <div
                  id="ageAlert"
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Enter valid age
                </div>
              </div>
              <div class="w-1/2 p-2">
                <input
                  id="passwordInput"  onkeyup="inputsValidation()"
                  type="password" data-touched="false"
                  class="form-control"
                  placeholder="Enter Your Password"
                />
                <div
                  id="passwordAlert"  
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Enter valid password *Minimum eight characters, at least one
                  letter and one number:*
                </div>
              </div>
              <div class="w-1/2 p-2">
                <input
                  id="repasswordInput"  onkeyup="inputsValidation()"
                  type="password" data-touched="false"
                  class="form-control"
                  placeholder="Repassword"
                />
                <div
                  id="repasswordAlert" 
                  class="text-white bg-red-950 rounded-lg p-3 w-full mt-2 d-none h-16"
                >
                  Enter valid repassword
                </div>
              </div>
              <div class="subbtn w-full">
                <button
                  id="submitBtn"
                  disabled=""
                  class="text-red-950 btn bg-transparent border-2 disabled:grayscale border-red-950 px-2 mt-3"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>`;
  rowData.innerHTML = box;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("block", "d-none");
    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
getMealsByArea("egyptian");
