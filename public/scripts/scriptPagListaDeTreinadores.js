async function fetchTrainers() {
    try {
        const response = await fetch('/trainers');
        const trainers = await response.json();
        
        const trainersContainer = document.getElementById('trainersContainer');
        trainersContainer.innerHTML = ''; 

        trainers.forEach(trainer => {
            const trainerDiv = document.createElement('div');
            trainerDiv.classList.add('trainer');

            trainerDiv.innerHTML = `
                <h3>${trainer.name}</h3>
                <p>Idade: ${trainer.age}</p>
                <p>Cidade: ${trainer.city}</p>
                <p>Gênero: ${trainer.gender}</p>
                <p>Equipe: ${trainer.team}</p>
                <h4>Pokémons:</h4>
                <div class="pokemon-list">
                    ${trainer.pokemons.map(pokemon => `
                        <div class="pokemon">
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                            <div class="pokemon-name">${pokemon.name}</div>
                            <div class="pokemon-types">
                                ${pokemon.types.map(type => `
                                    <span class="pokemon-type ${type.toLowerCase()}">${type}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            trainersContainer.appendChild(trainerDiv);
        });
    } catch (error) {
        console.error("Erro ao buscar treinadores:", error);
    }
}

// Chama a função para buscar e renderizar os treinadores
fetchTrainers();