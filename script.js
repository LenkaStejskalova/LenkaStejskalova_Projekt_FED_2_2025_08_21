/**
 * Tlačítko (ikona šipky) pro návrat na začátek stránky
 * @type {HTMLElement}
 */
const scrollTopBtn = document.getElementById("scrollTopBtn");

/**
 * Posluchač události scrollování okna
 *
 * Pokud se uživatel po scrollování posune níž, než je výška okna prohlížeče, tlačítko se zobrazí. Jinak je skryté.
 */
window.addEventListener("scroll", () => {
  // Aktuální vertikální pozice scrollu je větší než výška okna
  if (window.scrollY > window.innerHeight) {
    // Zobrazení tlačítka
    scrollTopBtn.style.display = "block";
  } else {
    // Skrytí tlačítka
    scrollTopBtn.style.display = "none";
  }
});
