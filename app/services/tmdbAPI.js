const apiKey = '588ec4afaef59a5e2eb312e64af3630e';

function saveAPIRequestsCache(res) {
    fetch(res.url).then(res => {
        caches.open("pwa-tv-catalog-api-requests").then(cache => {
            cache.put(res.url, res);
        });
    });
}

const tmdbAPI = {

    getMoviesList: () => {
       return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&adult=false&page=1`)
            .then(res => {    

                saveAPIRequestsCache(res);

                return res.json()            
            });
    },
    getSeriesList: () => {
        return fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&adult=false&page=1`)
            .then(res => {

                saveAPIRequestsCache(res);

                return res.json()
            });
    },
    getMovie: movieId => {
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&adult=false&page=1`)
            .then(res => {

                saveAPIRequestsCache(res);

                return res.json()
            });
    },
    getSerie: serieId => {
        return fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=en-US&adult=false&page=1`)
            .then(res => { 

                saveAPIRequestsCache(res);
                
                return res.json()
            });
    }
}

export default tmdbAPI;