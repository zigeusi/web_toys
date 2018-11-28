const init = () => {
  let movieName = "";

  const searchFilmInfo = movieName => {
    fetch( ` http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=b0cac97aa508433ca9835e54ab51d7cd&movieNm=${movieName}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        console.log(movieName)
        const movieDirector = document.querySelector("[data-director]");
        const movieYear = document.querySelector("[data-year]");
        const movieGenre = document.querySelector("[data-genre]");
        const movieType = document.querySelector("[data-type]");

        const movie = data.movieListResult.movieList;
        const director = movie[0].directors[0].peopleNm;
        const year = movie[0].prdtYear;
        const genre = movie[0].genreAlt;
        const filmType = movie[0].typeNm;

        movieDirector.innerHTML = "감독: " + director;
        movieYear.innerHTML = "개봉연도: " + year;
        movieGenre.innerHTML = "장르: " + genre;
        movieType.innerHTML = "영화분류: " + filmType;
        modalOpen();
      }) 
  };

  const searchActor = userInput => {
    fetch( `http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=b0cac97aa508433ca9835e54ab51d7cd&peopleNm=${userInput}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data)
      const actorName = document.querySelector("[data-name]");
          const actorRole = document.querySelector("[data-role]");
          const actorFilmo = document.querySelector("[data-filmos]");

          const people = data.peopleListResult.peopleList;
          const name = people[0].peopleNm;
          const role = people[0].repRoleNm;
          const filmo = people[0].filmoNames;
          const filmArr = filmo.split("|");
          let films = "";

          actorName.innerHTML = name;
          actorRole.innerText = role;
          // filmArr.forEach(film => {
          //     actorFilmo.innerHTML += "<button type='button' data-filmBtn onClick = 'selectFilms(this);'>" + film + "</button>";
          //   })
          actorFilmo.innerHTML = filmArr
            .map(film => {
              return "<button type='button' data-filmBtn>" + film + "</button>";
            })
            .join(" ");

          const filmoBtn = document.querySelectorAll("[data-filmBtn]");

          filmoBtn.forEach(value => {
            value.addEventListener("click", (e) => selectFilms(e.currentTarget));
          });
      })        
  };

  const selectFilms = filmNameEl => {
    movieName = filmNameEl.textContent;
    searchFilmInfo(movieName);
  };
  //
  //Cannot read property 'style' of null
  const modalOpen = () => {
    let modalOverlay = document.querySelector("[data-overlay]");
    modalOverlay.style.display = "block";
  };

  const modalClose = () => {
    let modalOverlay = document.querySelector("[data-overlay]");
    modalOverlay.style.display = "none";
  };

  const preventRedirect = () => {
    const searchForm = document.querySelector("form");

    searchForm.addEventListener("submit", e => {
      e.preventDefault();
    });
  };

  const dispatchSearchEvent = () => {
    const searchBtn = document.querySelector("[data-search-btn]");
    let userInput = "";

    searchBtn.addEventListener("click", e => {
      const searchInput = document.querySelector("[data-search-input]");
      userInput = searchInput.value;
      searchActor(userInput);
    });
  };
  document.querySelector('[ data-close-btn]').addEventListener('click', modalClose)
  preventRedirect();
  dispatchSearchEvent();
};

window.addEventListener("load", () => {
  init();
});
