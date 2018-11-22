const searchActor = (userInput) => {
  const req = new XMLHttpRequest();
  
  req.open('GET', 
    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=b0cac97aa508433ca9835e54ab51d7cd&peopleNm=${userInput}`
    , true)
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const actorName = document.querySelector('[data-name]');
        const actorRole = document.querySelector('[data-role]');
        const filmoList = document.querySelector('[data-filmos]');
        const data = JSON.parse(req.responseText);
        const people = data.peopleListResult.peopleList
        const name = people[0].peopleNm;
        const role = people[0].repRoleNm;
        const filmos = people[0].filmoNames;
  
        actorName.innerHTML = name;
        actorRole.innerHTML = role;
        filmoList.innerHTML = `<p>${filmos}</p>`;
      } else {
        console.error('Error!');
      }
    }
  }
  req.send();
}

window.addEventListener('load', () => {
  const searchBtn = document.querySelector('[data-search-btn]');
  let userInput = '';
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


