const pokemonInput = document.getElementById("pokemonInput");
const pokemonList = document.getElementById("pokemonList");
const selectedPokemon = document.getElementById("selectedPokemon");
let selectedPokemons = [];
let allPokemons = [];

// Função para carregar todos os Pokémon no início
async function loadAllPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await response.json();
        allPokemons = data.results.map(p => p.name);
    } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
    }
}

loadAllPokemons();

function fetchSuggestions(query) {
    if (!query) {
        pokemonList.style.display = "none";
        return;
    }
    const filteredPokemons = allPokemons.filter(pokemon =>
        pokemon.startsWith(query.toLowerCase())
    );
    showSuggestions(filteredPokemons);
}

function showSuggestions(pokemons) {
    pokemonList.innerHTML = "";
    if (pokemons.length > 0) {
        pokemonList.style.display = "block";
        pokemons.forEach(pokemon => {
            const item = document.createElement("div");
            item.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
            item.onclick = () => addPokemon(pokemon);
            pokemonList.appendChild(item);
        });
    } else {
        pokemonList.style.display = "none";
    }
}

async function addPokemon(name) {
    if (selectedPokemons.length < 6 && !selectedPokemons.find(p => p.name === name)) {
        const pokemonData = await fetchPokemonDetails(name);
        if (pokemonData) {
            selectedPokemons.push({
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                id: pokemonData.id,
                types: pokemonData.types.map(type => type.type.name)
            });
            updateSelectedPokemonList();
        }
    }
    pokemonInput.value = "";
    pokemonList.style.display = "none";
}

async function fetchPokemonDetails(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
        return null;
    }
}

function updateSelectedPokemonList() {
    selectedPokemon.innerHTML = "";
    selectedPokemons.forEach(pokemon => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("selected-pokemon");

        const img = document.createElement("img");
        img.src = pokemon.image;
        img.alt = pokemon.name;

        const infoDiv = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (Nº ${String(pokemon.id).padStart(3, '0')})`;
        infoDiv.appendChild(name);

        const typeDiv = document.createElement("div");
        typeDiv.classList.add("pokemon-types");
        pokemon.types.forEach(type => {
            const typeSpan = document.createElement("span");
            typeSpan.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            typeSpan.classList.add("pokemon-type", type);
            typeDiv.appendChild(typeSpan);
        });
        infoDiv.appendChild(typeDiv);

        pokemonDiv.appendChild(img);
        pokemonDiv.appendChild(infoDiv);
        selectedPokemon.appendChild(pokemonDiv);
    });
}

pokemonInput.addEventListener("input", () => {
    fetchSuggestions(pokemonInput.value);
});

// Submeter o formulário e enviar os dados para o servidor
document.getElementById("trainerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const trainer = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        city: document.getElementById("city").value,
        gender: document.getElementById("gender").value,
        team: document.getElementById("team").value,
        pokemons: selectedPokemons
    };

    try {
        const response = await fetch("http://localhost:3000/trainers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trainer)
        });
        if (response.ok) {
            window.location.href = "PaginaListaTreinadores.html";
        } else {
            alert("Erro ao registrar treinador");
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro de conexão");
    }
});