const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const moreDetailsButton = document.getElementById('two')

// console.log(moreDetailsButton)

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div><button class="details-button" data-pokemon='${JSON.stringify(pokemon)}'>Detalhes</button></div>
        </li>
        
        `
}


document.querySelector('.pokemons').addEventListener('click', (event) => {
    if (event.target.classList.contains('details-button')) {
        const button = event.target;
        const pokemonDataJSON = button.getAttribute('data-pokemon');
        const pokemonData = JSON.parse(pokemonDataJSON);
        displayPokemonDetails(pokemonData);
    }
});



function displayPokemonDetails(pokemon) {

    const detailsContainer = document.querySelector('#two .pokemon-details');
    
    const detailsHTML = `
        <div class="pokemon ${pokemon.type}">
        <h2>${pokemon.name} - #${pokemon.number}</h2>
        <p>Types: ${pokemon.types.join(', ')}</p>
        <img src="${pokemon.photo}" alt="${pokemon.name}">

        <div class="pokemon-abilities">
            <h3>Abilities:</h3>
            <ul>
                ${pokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}
            </ul>
        </div>

        <div class="pokemon-stats">
            <h3>Stats:</h3>
            <p>Ataque: ${pokemon.attack}</p>
            <p>Defesa: ${pokemon.defense}</p>
        </div>

        <div class="pokemon-type">
            <h3>Tipo:</h3>
            <p>${pokemon.type}</p>
        </div>

        </div>
    `;

    detailsContainer.innerHTML = detailsHTML;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})