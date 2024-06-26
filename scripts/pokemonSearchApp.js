const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const validateSearch = search => {
    const invalidCharacters = /\W/g;

    return search.toLowerCase().replace(invalidCharacters, "");
};

const searchPokemon = async () => {
    const pokemonApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
    const request = await fetch(`${pokemonApi}/${validateSearch(searchInput.value)}`, { method: "GET" });

    if (request.status === 200) {
        const response = await request.json();

        showPokemon(response);
    }
    else {
        window.alert("Pokémon not found");
    }
};

const showPokemon = pokemonData => {
    const sprite = document.getElementById("sprite");
    const name = document.getElementById("pokemon-name");
    const id = document.getElementById("pokemon-id");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const types = document.getElementById("types");
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const specialAttack = document.getElementById("special-attack");
    const specialDefense = document.getElementById("special-defense");
    const speed = document.getElementById("speed");

    sprite.src = pokemonData.sprites.front_default;
    sprite.style.display = "block";

    name.innerText = capitalizeFirstLetter(pokemonData.name);
    id.innerText = pokemonData.id;
    weight.innerText = pokemonData.weight;
    height.innerText = pokemonData.height;

    types.innerHTML = "";
    pokemonData.types.forEach(type => {
        const typeEl = document.createElement("li");
        typeEl.innerText = type.type.name.toUpperCase();
        types.appendChild(typeEl);
    });

    hp.innerText = pokemonData.stats[0].base_stat;
    attack.innerText = pokemonData.stats[1].base_stat;
    defense.innerText = pokemonData.stats[2].base_stat;
    specialAttack.innerText = pokemonData.stats[3].base_stat;
    specialDefense.innerText = pokemonData.stats[4].base_stat;
    speed.innerText = pokemonData.stats[5].base_stat;
};

searchBtn.addEventListener("click", searchPokemon);