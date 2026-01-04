/**
 * Formulářový prvek
 * @type {HTMLFormElement}
 */
const formular = document.querySelector("form");

/**
 * Vstupní pole formuláře
 * @type {HTMLInputElement}
 */
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const formEmail = document.querySelector(".formEmail");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

/**
 * Notifikační prvky pro zobrazení chybových hlášek
 * @type {HTMLElement}
 */
const notFirstName = document.querySelector(".notificationFirstName");
const notLastName = document.querySelector(".notificationLastName");
const notEmail = document.querySelector(".notificationEmail");
const notPassword = document.querySelector(".notificationPassword");
const notPassword2 = document.querySelector(".notificationPassword2");
const notPassword3 = document.querySelector(".notificationPassword3");

/**
 * Funkce pro skrytí všech notifikací s chybovými hláškami.
 * Používá se před každou novou validací formuláře.
 */
function hideAllNotifications() {
  notFirstName.style.display = "none";
  notLastName.style.display = "none";
  notEmail.style.display = "none";
  notPassword.style.display = "none";
  notPassword2.style.display = "none";
  notPassword3.style.display = "none";
}

/**
 * Obsluha odeslání formuláře.
 * Zabrání výchozímu odeslání a provede kontrolu vstupních polí.
 */
formular.addEventListener("submit", (event) => {
  event.preventDefault();

  // Skrytí všech notifikací před kontrolou
  hideAllNotifications();

  // Kontrola jednotlivých polí
  if (firstName.value === "") {
    notFirstName.style.display = "block";
  }

  if (lastName.value === "") {
    notLastName.style.display = "block";
  }

  if (formEmail.value === "") {
    notEmail.style.display = "block";
  }

  if (password.value === "") {
    notPassword.style.display = "block";
  }

  if (password2.value === "") {
    notPassword2.style.display = "block";
  }

  // Kontrola shody hesel
  checkPasswords();
});

/**
 * Funkce na kontrolu shody hesel ve dvou polích
 * Přidává nebo odebírá CSS třídy pro vizuální validaci
 * a zobrazuje chybovou notifikaci při neshodě.
 */
function checkPasswords() {
  // Reset stavů
  password.classList.remove("input-valid", "input-invalid");
  password2.classList.remove("input-valid", "input-invalid");

  // Kontrola, až když jsou obě pole vyplněná
  if (!password.value || !password2.value) {
    notPassword3.style.display = "none";
    return;
  }

  // Hesla se shodují
  if (password.value === password2.value) {
    password.classList.add("input-valid");
    password2.classList.add("input-valid");
    notPassword3.style.display = "none";
    // Hesla se neshodují
  } else {
    password.classList.add("input-invalid");
    password2.classList.add("input-invalid");
    notPassword3.style.display = "block";
  }
}

/**
 * Okamžitá kontrola hesel při psaní do polí formuláře
 */
password.addEventListener("input", checkPasswords);
password2.addEventListener("input", checkPasswords);
