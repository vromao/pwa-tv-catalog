import tmdbAPI from '../services/tmdbAPI.js';
import { DetailsPage } from '../components/DetailsPage.js';
import { Catalog } from '../components/Catalog.js';
import installRouter from '../helpers/pwa-route.js';

export class Route {
  
    initRoute() {
        installRouter((location) => this._handleNavigation(location));
    }
   
    _handleNavigation(location) {
        const hashPath = location.hash;
   
        if(hashPath) {

            const idRegex = /\d+/g;
            const idDetails = idRegex.exec(hashPath)[0];
    
            if(this.matchUrl(hashPath, "details/movie")) {
                tmdbAPI.getMovie(idDetails)
                    .then(data => {
                        const detailsPage = new DetailsPage();
                        detailsPage.initDetails('#app', data);

                        window.scrollTo(0, 0);
                    });
            }
    
            if(this.matchUrl(hashPath, "details/serie")) {
                tmdbAPI.getSerie(idDetails)
                    .then(data => {
                        const detailsPage = new DetailsPage();
                        detailsPage.initDetails('#app', data);

                        window.scrollTo(0, 0);
                    });
            }
    
        } else {
            const catalog = new Catalog("#app");
            catalog.loadCatalog();
        }
    }

    matchUrl(string, searchValue) {
        return string.indexOf(searchValue) !== -1;
    }
}