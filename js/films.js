/**
 * Sekce, do které se vykresluje seznam filmů
 * @type {HTMLElement}
 */
const filmsSection = document.querySelector(".films-list");

/**
 * Select (roletka) pro výběr vyhledávacího dotazu
 * @type {HTMLSelectElement}
 */
const select = document.getElementById("search");

/**
 * Vytvoření HTML struktury jednoho filmu
 * @param {string} image - URL obrázku filmu
 * @returns {HTMLDivElement} HTML prvek obsahující jeden film
 */
const addFilmToWebsite = (image) => {
  const div = document.createElement("div");
  div.classList.add("film-box");

  const img = document.createElement("img");
  img.src = image;

  div.append(img);
  return div;
};

/**
 * Vykreslení seznamu filmů do stránky
 * Nejprve vymaže existující obsah a poté přidá nové položky
 * @param {Array<Object>} films - pole filmů získaných z API
 */
const renderFilms = (films) => {
  // Vymazání předchozího obsahu
  filmsSection.innerHTML = "";

  films.forEach((item) => {
    // Kontrola existence obrázku
    if (item.show.image) {
      const filmBox = addFilmToWebsite(item.show.image.medium);
      filmsSection.append(filmBox);
    }
  });
};

/**
 * Načtení filmů z API podle zadaného dotazu
 * @param {string} query - vyhledávací výraz (např. žánr nebo název)
 */
const getFilmsByQuery = (query) => {
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      renderFilms(data);
    });
};

/**
 * Změna hodnoty v roletce
 * Po změně se buď načtou filmy z API, nebo se seznam vymaže
 */
select.addEventListener("change", () => {
  const value = select.value;

  if (value !== "default") {
    // Načtení filmů dle vybrané hodnoty
    getFilmsByQuery(value);
  } else {
    // Vymazání seznamu filmů
    filmsSection.innerHTML = "";
  }
});
