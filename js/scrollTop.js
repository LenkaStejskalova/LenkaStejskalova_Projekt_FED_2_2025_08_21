/**
 * Tlačítko (ikona šipky) pro návrat na začátek stránky
 * @type {HTMLElement}
 */
const scrollTopBtn = document.getElementById("scrollTopBtn");

/**
 * Posluchač události scrollování okna
 *
 * Zobrazení tlačítka pro návrat nahoru, pokud je scrollY větší než výška okna.
 */
window.addEventListener("scroll", () => {
  // Aktuální vertikální pozice scrollu je větší než výška okna
  if (window.scrollY > window.innerHeight) {
    // Zobrazení tlačítka
    scrollTopBtn.classList.add("visible");
  } else {
    // Skrytí tlačítka
    scrollTopBtn.classList.remove("visible");
  }
});
