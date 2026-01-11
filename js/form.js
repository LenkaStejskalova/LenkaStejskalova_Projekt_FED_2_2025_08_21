/**
 * Formulář
 * @type {HTMLFormElement}
 */
const formular = document.querySelector("form");

/**
 * Vstupní pole formuláře a notifikace
 * @typedef {Object} FormField
 * @property {HTMLInputElement} input
 * @property {HTMLElement} notification
 */

/**
 * Konfigurace formulářových polí
 * @type {Object<string, FormField>}
 */
const fields = {
  firstName: {
    /** @type {HTMLInputElement} */
    input: document.querySelector(".firstName"),
    /** @type {HTMLElement} */
    notification: document.querySelector(".notificationFirstName"),
  },
  lastName: {
    /** @type {HTMLInputElement} */
    input: document.querySelector(".lastName"),
    /** @type {HTMLElement} */
    notification: document.querySelector(".notificationLastName"),
  },
  email: {
    /** @type {HTMLInputElement} */
    input: document.querySelector(".formEmail"),
    /** @type {HTMLElement} */
    notification: document.querySelector(".notificationEmail"),
  },
  password: {
    /** @type {HTMLInputElement} */
    input: document.querySelector(".password"),
    /** @type {HTMLElement} */
    notification: document.querySelector(".notificationPassword"),
  },
  password2: {
    /** @type {HTMLInputElement} */
    input: document.querySelector(".password2"),
    /** @type {HTMLElement} */
    notification: document.querySelector(".notificationPassword2"),
  },
};

/**
 * Notifikace pro neshodu hesel
 * @type {HTMLElement}
 */
const notPassword3 = document.querySelector(".notificationPassword3");

/**
 * Funkce pro skrytí všech notifikací s chybovými hláškami
 * Používá se před každou validací
 * @returns {void}
 */
function hideAllNotifications() {
  Object.values(fields).forEach((field) => {
    field.notification.classList.remove("visible");
    field.input.classList.remove("input-valid", "input-invalid");
  });

  notPassword3.classList.remove("visible");
}

/**
 * Kontrola povinných polí formuláře
 * @returns {boolean} - true pokud jsou všechna pole vyplněna
 */

// Skrývání notifikace při psaní
Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => {
    field.notification.classList.remove("visible");
  });
});

function validateRequiredFields() {
  let isValid = true;

  if (!formSubmitted) return true;

  Object.values(fields).forEach((field) => {
    if (field.input.value.trim() === "") {
      field.notification.classList.add("visible");
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Kontrola shody hesel
 * Přidává/odebírá CSS třídy a zobrazuje chybovou hlášku
 * @returns {boolean} - true pokud jsou hesla platná a shodná
 */
function checkPasswordsLive() {
  const password = fields.password.input;
  const password2 = fields.password2.input;

  // reset jen polí s heslem
  password.classList.remove("input-valid", "input-invalid");
  password2.classList.remove("input-valid", "input-invalid");

  const hasPassword = password.value.length > 0;
  const hasPassword2 = password2.value.length > 0;

  // Když jsou obě pole prázdná, nic se nezobrazí
  if (!hasPassword && !hasPassword2) {
    notPassword3.classList.remove("visible");
    return false;
  }

  // Vyplněno jen jedno pole s heslem, chyba (obě červeně)
  if (hasPassword !== hasPassword2) {
    password.classList.add("input-invalid");
    password2.classList.add("input-invalid");
    notPassword3.classList.add("visible");
    return false;
  }

  // Obě pole s heslem vyplněná, ale neshoda, chyba
  if (password.value !== password2.value) {
    password.classList.add("input-invalid");
    password2.classList.add("input-invalid");
    notPassword3.classList.add("visible");
    return false;
  }

  // Obě pole s heslem vyplněná a shodná
  password.classList.add("input-valid");
  password2.classList.add("input-valid");
  notPassword3.classList.remove("visible");
  return true;
}

/**
 * Obsluha odeslání formuláře
 * Pokud je validace úspěšná, formulář se resetuje a všechna pole se vyčistí
 */
let formSubmitted = false;

formular.addEventListener("submit", (event) => {
  event.preventDefault();

  formSubmitted = true;

  hideAllNotifications();

  const requiredValid = validateRequiredFields();
  const passwordsValid = checkPasswordsLive();

  if (!requiredValid || !passwordsValid) return;

  // Vymazání polí po úspěšném odeslání
  Object.values(fields).forEach((field) => {
    field.input.value = "";
    // Odstranění třídy valid/invalid
    field.input.classList.remove("input-valid", "input-invalid");
  });

  notPassword3.classList.remove("visible");
});

/**
 * Okamžitá kontrola hesel při psaní
 */
fields.password.input.addEventListener("input", checkPasswordsLive);
fields.password2.input.addEventListener("input", checkPasswordsLive);
