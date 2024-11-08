const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1025;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

let bancoDeDados = [];
const mainTypes = Object.keys(colors);

// Função para buscar todos os Pokémon
const fetchPokemons = async () => {
    console.log("Buscando Pokémon...");
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

// Função para buscar um Pokémon específico
const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Erro ao buscar Pokémon: ' + resp.status);
        const data = await resp.json();
        createPokemonCard(data);
        
        const type = data.types[0].type.name; 
        bancoDeDados.push({
            id: data.id,
            name: data.name.toUpperCase(),
            type: type, 
            color: colors[type]
        });
        console.log("Pokémon adicionado ao banco de dados:", { id: data.id, name: data.name.toUpperCase() });
    } catch (error) {
        console.error('Erro:', error);
    }
};

const createPokemonCard = (poke) => {
    const card = document.createElement("div");
    card.classList.add("pokemon");

    const name = poke.name.toUpperCase();
    const id = poke.id.toString().padStart(3, "0");

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHtml = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>`;

    card.innerHTML = pokemonInnerHtml;
    pokeContainer.appendChild(card);
};

fetchPokemons();

const inputSearch = document.querySelector("#searchInput");

inputSearch.addEventListener("input", () => {
    const pesquisaInput = inputSearch.value.toUpperCase();
    pokeContainer.innerHTML = '';

    if (pesquisaInput === "") {
        // Se a pesquisa estiver vazia, chama fetchPokemons
        fetchPokemons();
    } else {
        // Filtra os Pokémon baseados na pesquisa
        const resultado = bancoDeDados.filter((obj) => {
            return obj.name.includes(pesquisaInput); // Compare com nome em maiúsculas
        });
        
        console.log("Resultados da pesquisa:", resultado); // Verifique os resultados da pesquisa

        resultado.forEach((obj) => {
            const card = document.createElement("div");
            card.classList.add("pokemon");
            const pokemonInnerHtml = `
                <div class="imgContainer">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj.id}.png" alt="${obj.name}">
                </div>
                <div class="info">
                    <span class="number">#${obj.id}</span>
                    <h3 class="name">${obj.name}</h3>
                    <small class="type">Type: <span>${obj.type}</span></small>
                </div>`;

            card.innerHTML = pokemonInnerHtml;
            card.style.backgroundColor = obj.color;

            pokeContainer.appendChild(card);
        });
    }
});
