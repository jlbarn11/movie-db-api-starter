// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies(){
    // the endpoint
    let endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=6103f928103518e6b9b7a0280f0f9a28&language=en-US&page=1'
    // the place on the page where we'll display the movies
    let popularMovies = document.getElementById("popular");
    let imgUrl = "https://image.tmdb.org/t/p/w400";


    // ajax time!
    // create the object
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.response);
        let json = this.response;
        let html = "";

        // featured popular movie
        html += `
            <section id="featured">
                <h3>${json.results[0].title}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>${json.results[0].overview}</p>
            </section>
        `;

        for(let i = 1; i < 19; i++){
            html += `
                <section class="movie">
                    <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                    <div>
                        <h3>${json.results[i].title}</h3>
                        <p>
                            ${json.results[i].overview}
                            <span class="vote">Vote Average: ${json.results[i].vote_average}</span>
                        </p>
                    </div>
                </section>
            `;
        }

        popularMovies.innerHTML = html;
    }
    });
    xhr.responseType = "json";

    xhr.open('GET', endpoint);

    xhr.send();

}

// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie
function getBirthYearMovies(e){
    e.preventDefault();

    // Get the user's input/year value
    let year = encodeURI(document.getElementById("userYear").value);
    // the place on the page where we'll add the info
    let birthYearMovies = document.getElementById("birthYear");

    if(year < 1940 || year > 2024 || year == ""){
        birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2022</p>`;
    }else{
        
        let beginURL = "https://api.themoviedb.org/3/discover/movie?api_key=6103f928103518e6b9b7a0280f0f9a28&primary_release_year=";
        let endURL = "&sort_by=revenue.desc&language=en-US&page=1&include_adult=false";
        let endpoint = `${beginURL}${year}${endURL}`;
        let imgUrl = "https://image.tmdb.org/t/p/w400";

        // ajax time!
        // create the object
        const xhr = new XMLHttpRequest();

        // attach event handlers
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                console.log(this.response);
                let json = this.response;
                let html = "";

                for(let i = 0; i < 3; i++){
                    if(json.results[i].poster_path === null){
                        continue;
                    }else{
                        
                        html += `
                            <section class="yrMovie">
                                <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                                <h3>${json.results[i].title}</h3>
                            </section>
                        `;
                        }
                }
                birthYearMovies.innerHTML = html;
            }
        });

        // set the response type
        xhr.responseType = "json";

        xhr.open('GET', endpoint);
    
        xhr.send();
        
    }
}

window.addEventListener("load", function(){
    getPopularMovies();
    document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});
