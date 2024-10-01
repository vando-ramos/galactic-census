let list = document.getElementById('list');

async function printData() {

  let res = await fetch('https://swapi.dev/api/planets/?format=json');

  let { results } = await res.json();

  console.log(results);

  results.forEach(planet => {

    let li = document.createElement('li');

    li.innerHTML = `<div>                      
                      <button>${planet.name}</button>
                    </div>`;

    list.appendChild(li);
  });     
}

printData();