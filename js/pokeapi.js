let renderPokemon = document.querySelector("#resultados");
let btnOrdNombre = document.getElementById("name");
let btnOrdNumero = document.getElementById("number");
let btnBorrar1 = document.getElementById("delete1");
let btnBorrar2 = document.getElementById("delete2");
let btnNuevosPokes = document.getElementById("new");
let inputSearch = document.getElementById("search");

let pokemonData;
let pokemonArray = [];

async function cargarPokemons() {

    let numeroPokemons = 24;
    let i = 0;
    pokemonArray = [];

    do {
        i++;
        const randomId = Math.floor(Math.random() * 250);

        let pokemonCall = await obtenerPokemon(randomId);

        pokemonArray.push(pokemonCall);

    } while (i <= numeroPokemons);
    render(pokemonArray);
}

async function obtenerPokemon(pokemonID) {

    return fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID)
        .then((response) => response.json())
        .then((data) => {
            pokemonData = data;

            let pokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                height: pokemonData.height,
                weight: pokemonData.weight,
                firstType: pokemonData.types[0].type.name
            };
            return pokemon;
        });
}

function render(pokemonArray) {

    renderPokemon.innerHTML = "";

    for (let poke of pokemonArray) {

        let col = `<div class="card" style="align-items: center;">
                        <img src="${poke.image}" style="width: 200px; height: 200px;">
                            <div class="card-body">
                                <h5 class="card-title"> #${poke.id} ${poke.name}</h5>
                                <p class="card-text">
                                Peso: ${poke.weight}
                                <br>Altura: ${poke.height}
                                <br>Tipo: ${poke.firstType}
                                </p>
                                <a href="https://pokeapi.co/api/v2/pokemon/${poke.id}" target="_blank" 
                                    class="btn btn-warning">Informacion de ${poke.name}</a>
                            </div>
                    </div>`;

        renderPokemon.innerHTML += (col);
    }
}

function borrarPrimerElemento(pokemonArray) {
    pokemonArray.shift();
    render(pokemonArray);
}

function borrarUltimoElemento(pokemonArray) {
    pokemonArray.pop();
    render(pokemonArray);
}

function ordenarPorID() {
    pokemonArray.sort(function (a, b) {
        return a.id > b.id ? 1 : -1;
    });

    render(pokemonArray);
}

function ordenarPorNombre() {
    pokemonArray.sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
    });

    render(pokemonArray);
}

function buscarPokemon(nombre) {
    let filterPoke = pokemonArray.filter(item => item.name.includes(nombre));
    render(filterPoke);
}

btnBorrar1.addEventListener("click", () => borrarPrimerElemento(pokemonArray));
btnBorrar2.addEventListener("click", () => borrarUltimoElemento(pokemonArray));
btnOrdNumero.addEventListener("click", () => ordenarPorID());
btnOrdNombre.addEventListener("click", () => ordenarPorNombre());
inputSearch.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        buscarPokemon(event.target.value);
    }
});

btnNuevosPokes.addEventListener("click", () => cargarPokemons());
document.addEventListener("fetch", cargarPokemons());