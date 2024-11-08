// Seleção de equipe (como no código anterior)
document.addEventListener("DOMContentLoaded", function() {
    const selectSelected = document.querySelector(".select-selected");
    const selectItems = document.querySelector(".select-items");
    const hiddenInput = document.querySelector("#Equipe");

    selectSelected.addEventListener("click", function() {
        selectItems.style.display = selectItems.style.display === "none" ? "block" : "none";
    });

    selectItems.addEventListener("click", function(e) {
        if (e.target.tagName === "DIV" || e.target.tagName === "IMG") {
            const selectedDiv = e.target.tagName === "IMG" ? e.target.parentElement : e.target;
            selectSelected.innerHTML = selectedDiv.innerHTML;
            hiddenInput.value = selectedDiv.getAttribute("data-value");
            selectItems.style.display = "none";

            // Remove a classe de seleção anterior
            Array.from(selectItems.children).forEach(div => div.classList.remove("same-as-selected"));
            selectedDiv.classList.add("same-as-selected");
        }
    });

    document.addEventListener("click", function(e) {
        if (!e.target.closest(".custom-select")) {
            selectItems.style.display = "none";
        }
    });
});

// Função para buscar dados do Pokémon
document.getElementById("NomePokemon").addEventListener("blur", async function() {
    const pokemonName = this.value.toLowerCase();
    if (pokemonName) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById("pokemon-info").style.display = "block";
                document.getElementById("pokemon-name").innerText = `Nome: ${data.name}`;
                document.getElementById("pokemon-type").innerText = `Tipo: ${data.types.map(t => t.type.name).join(", ")}`;
                document.getElementById("pokemon-image").src = data.sprites.front_default;
            } else {
                alert("Pokémon não encontrado. Verifique o nome e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao buscar Pokémon:", error);
            alert("Ocorreu um erro ao buscar os dados do Pokémon.");
        }
    }
});
