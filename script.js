let planetList = document.getElementById('planet-list');
let planetDetails = document.getElementById('planet-details');

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

function showPlanetDetails(planet) {
  planetDetails.innerHTML = `
    <h2>Planet Details</h2>
    <p><strong>Name:</strong> ${planet.name}</p>
    <p><strong>Climate:</strong> ${planet.climate}</p>
    <p><strong>Population:</strong> ${planet.population}</p>
    <p><strong>Terrain:</strong> ${planet.terrain}</p>
  `;
}

printData();