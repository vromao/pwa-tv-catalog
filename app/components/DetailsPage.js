export class DetailsPage {

    constructor() {
        this.backgroundSize = 500;
        this.posterSize = 200;
        this.roundAverageVote = 0;
    }

    initDetails(selector, detailsData) {
        this.roundAverageVote = detailsData.vote_average * 10;

        this._detailsContainer = document.querySelector(selector);
        this._detailsContainer.innerHTML = "";
        this._detailsContainer.insertAdjacentHTML('beforeend', this._template(detailsData));

        const navHomeButton = document.querySelector("#nav-home-link");
        navHomeButton.textContent = "Voltar";
    }

    cacheImages(item) {
        const urlImg = `https://image.tmdb.org/t/p/w${this.backgroundSize}${item.backdrop_path}`;

        fetch(urlImg).then(response => {
            caches.open("pwa-tv-catalog-images").then(cache => {
                cache.put(urlImg, response);
            });
        });
    }

    _template(detailsData) {
        return `
            <section class="detailsPage-section">
                <div class="detailsPage-section__img-container">
                    <img src="https://image.tmdb.org/t/p/w${this.backgroundSize}${detailsData.backdrop_path}" alt="PWA TV Catalog - ${detailsData.original_title || detailsData.name}" class="detailsPage-section__img mb--24">
                </div>
                <div class="detailsPage-section__infos">
                    <h2 class="page-title mb--16">${detailsData.title || detailsData.name}</h2>

                    <h3 class="page-subtitle mb--16">Overview</h3>
                    <p>${detailsData.overview}</p>
                    
                    <hr class="divider">
                    
                    <div class="info-list-container">
                        <ul class="info-list mb--24">
                            <h3 class="page-subtitle mb--16">Infos</h3>
                            <li><span class="info-list__bold-typo">Release:</span> ${detailsData.release_date || detailsData.first_air_date}</li>
                            <li><span class="info-list__bold-typo">Status:</span> ${detailsData.status}</li>
                            ${detailsData.number_of_episodes? `
                                <li><span class="info-list__bold-typo">Episodes:</span> ${detailsData.number_of_episodes}</li>
                                <li><span class="info-list__bold-typo">Seasons:</span> ${detailsData.number_of_seasons}</li>
                            ` : ''}
                            <li><span class="info-list__bold-typo">Score:</span> ${this.roundAverageVote}% approved (TMDB based)</li>

                        </ul>
                        <div class="info-list-container-img-poster">
                            <img src="https://image.tmdb.org/t/p/w${this.posterSize}${detailsData.poster_path}" alt="PWA TV Catalog - ${detailsData.original_title || detailsData.name}" class="detailsPage-section__im">
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}