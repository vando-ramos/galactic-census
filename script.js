let planetList = document.getElementById('planet-list');
let planetDetails = document.getElementById('planet-details');
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
let errorMessage = document.getElementById('error-message');

async function printData() {
  let res = await fetch('https://swapi.dev/api/planets/?format=json');
  let { results } = await res.json();

  console.log(results);

  results.forEach((planet, index) => {
    let li = document.createElement('li');

    li.innerHTML = `<div>
                      <button id="planet-${index}">${planet.name}</button>                  
                    </div>`;

    planetList.appendChild(li);

    let button = document.getElementById(`planet-${index}`);
    button.addEventListener('click', () => {
      showPlanetDetails(planet);
    });

  });     
}

async function searchPlanet() {
  let query = searchInput.value;
  if (!query) {
    errorMessage.innerHTML = `<p class='alert'>Please enter a planet name!</p>`;
    planetDetails.innerHTML = '';
    return;
  }

  errorMessage.innerHTML = '';

  let res = await fetch(`https://swapi.dev/api/planets/?search=${query}`);
  let { results } = await res.json();

  if (results.length > 0) {
    showPlanetDetails(results[0]);
  } else {
    errorMessage.innerHTML = `<p class='alert'>No planets found for "${query}".</p>`;
    planetDetails.innerHTML = '';
  }
}

async function showPlanetDetails(planet) {
  planetDetails.innerHTML = `
    <h2>Planet Details</h2>
    <p><strong>Name:</strong> ${planet.name}</p>
    <p><strong>Climate:</strong> ${planet.climate}</p>
    <p><strong>Population:</strong> ${planet.population}</p>
    <p><strong>Terrain:</strong> ${planet.terrain}</p>
  `;

  if (planet.residents.length > 0) {
    planetDetails.innerHTML += `<table id="residents-table">
                                <caption>Residents</caption>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Birth Year</th>
                                    </tr>
                                  </thead>
                                  <tbody></tbody>
                                </table>`;
    const residentsTableBody = document.querySelector('#residents-table tbody');

    for (const residentUrl of planet.residents) {
      const residentData = await fetchResidentData(residentUrl);
      residentsTableBody.innerHTML += `<tr>
                                          <td>${residentData.name}</td>
                                          <td>${residentData.birth_year}</td>
                                        </tr>`;
    }
  } else {
    planetDetails.innerHTML += `<p class='alert'>No residents for this planet!</p>`;
  }

}

async function fetchResidentData(url) {
  let res = await fetch(url);
  return await res.json();
}

searchButton.addEventListener('click', searchPlanet);

searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchPlanet();
  }
});

printData();