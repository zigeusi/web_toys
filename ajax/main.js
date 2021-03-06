// var req = new XMLHttpRequest();
// req.open('GET', 'http://www.mozilla.org/', true);
// req.onreadystatechange = function (aEvt) {
//   if (req.readyState === 4) {
//      if(req.status === 200)
//       dump(req.responseText);
//      else
//       dump("Error loading page\n");
//   }
// };
// req.send(null);

let movieName = '';

const selectFilms = (filmNameEl) => {
    movieName = filmNameEl.textContent;
    searchFilmInfo(movieName);
    modalOpen();
}

//Cannot read property 'style' of null   
const modalOpen = ()  => {
    let modalOverlay = document.querySelector('[data-overlay]');  
    modalOverlay.style.display = "block";
}
const modalClose =  () => {
    let modalOverlay = document.querySelector('[data-overlay]');  
    modalOverlay.style.display = "none";
}

const searchActor = (userInput) => {
    const req = new XMLHttpRequest();
    req.open('GET', `http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=b0cac97aa508433ca9835e54ab51d7cd&peopleNm=${userInput}`, true);
    req.onreadystatechange = () => {
        if(req.readyState === 4) {
            if(req.status === 200){
                const actorName = document.querySelector('[data-name]');
                const actorRole = document.querySelector('[data-role]');
                const actorFilmo = document.querySelector('[data-filmo]')

                const data = JSON.parse(req.responseText);
                const people = data.peopleListResult.peopleList;
                const name = people[0].peopleNm;
                const role = people[0].repRoleNm;
                const filmo = people[0].filmoNames;
                const filmArr = filmo.split('|');
                let films = '';

                actorName.innerHTML = name;
                actorRole.innerText = role;
                filmArr.forEach(film => {
                    films += "<button type='button' data-filmBtn onClick = 'selectFilms(this);'>" + film + "</button>"
                    actorFilmo.innerHTML = films;
            })           
            }else{
                console.log('Error!');
            }
        }
    };
    req.send(null);
    function con(e) {
      console.log(e)
    }
}

const searchFilmInfo = (movieName) => {
    const req = new XMLHttpRequest();
    req.open('GET', ` http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=b0cac97aa508433ca9835e54ab51d7cd&movieNm=${movieName}`, true);
    req.onreadystatechange = () => {
        if(req.readyState === 4) {
            if(req.status === 200){
                const movieDirector = document.querySelector('[data-director]');
                const movieYear = document.querySelector('[data-year]');
                const movieGenre = document.querySelector('[data-genre]');
                const movieType = document.querySelector('[data-type]');

                const data = JSON.parse(req.responseText);
                const movie = data.movieListResult.movieList;
                const director = movie[0].directors[0].peopleNm;
                const year = movie[0].prdtYear;
                const genre = movie[0].genreAlt;
                const filmType = movie[0].typeNm;  
                
                movieDirector.innerHTML = '감독: ' + director;
                movieYear.innerHTML = '개봉연도: ' + year;
                movieGenre.innerHTML = '장르: ' + genre;
                movieType.innerHTML = '영화분류: ' + filmType;

            }else{
                console.log('Error!');
            }
        }
    };
    req.send(null);
}
window.addEventListener('load', () => {
    let userInput = '';
    const searchBtn = document.querySelector('[data-search-btn]');
    const searchForm = document.querySelector('form');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    searchBtn.addEventListener('click', (e) => {
        const searchInput = document.querySelector('[data-search-input]');
        userInput = searchInput.value;
        searchActor(userInput);  
    })  
})

