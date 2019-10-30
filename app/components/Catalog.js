import tmdbAPI from '../services/tmdbAPI.js';

export class Catalog {

    constructor(selector) {
        this.posterSize = 200;
        this.catalogItems = 4;

        this._catalogContainer = document.querySelector(selector);

        const navHomeButton = document.querySelector("#nav-home-link");
        navHomeButton.textContent = "Home";

        this._catalogContainer.innerHTML = "";
    }

    loadMovies() {
        tmdbAPI.getMoviesList()
            .then(movies => {
                this.cacheImages(movies);
                this._catalogContainer.insertAdjacentHTML('beforeend', this._template(movies.results, 'movie'));
            });
    }

    loadSeries() {
        tmdbAPI.getSeriesList()
            .then(series => {
                this.cacheImages(series);
                this._catalogContainer.insertAdjacentHTML('beforeend', this._template(series.results, 'serie'));
            });
    }

    loadCatalog() {
        this.loadMovies();
        this.loadSeries();
    }

    cacheImages(item) {
        item.results.forEach(item => {
            const urlImg = `https://image.tmdb.org/t/p/w${this.posterSize}${item.poster_path}`;

            fetch(urlImg).then(response => {
                caches.open("pwa-tv-catalog-images").then(cache => {
                    cache.put(urlImg, response);
                });
            });
        });
    }

    _template(catalogType, sectionTitle) {
        
        if(this.moviesLoad && this.seriesLoad) {
            if(this.loading) {
                this.loading.classList.remove('all-loading');
            }
        }

        return `
            <section class="catalog-section container">
                <h2 class="catalog-section__title">${sectionTitle}s</h2>
                ${catalogType.slice(0, this.catalogItems).map(item =>`
                    <a id="card-link" class="card-link" href="#/details/${sectionTitle}?id=${item.id}">
                        <div class="card">
                            <img src="https://image.tmdb.org/t/p/w${this.posterSize}${item.poster_path}" alt="PWA TV Catalog - ${item.original_title || item.name}" class="card-img">
                            <div class="card__overlay">
                                <h2 class="card__title mt--0">${item.title || item.name}</h2>
                                <p class="card__overview">${item.overview}</p>
                                <span class="card__details">See more</span>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </section>
        `;
    }
}