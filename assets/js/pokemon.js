// Captura o ID do Pokémon da URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

// Função para renderizar os detalhes do Pokémon
function renderPokemonDetails(pokemon) {
    const container = document.getElementById('pokemon-details');
    container.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p><strong>Número:</strong> ${pokemon.number}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <h3>Tipos:</h3>
        <ul>
            ${pokemon.types.map((type) => `<li>${type}</li>`).join('')}
        </ul>
    `;
}

// Buscar e renderizar os detalhes
if (pokemonId) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
        .then(renderPokemonDetails)
        .catch((error) => {
            console.error("Erro ao carregar detalhes do Pokémon:", error);
            document.getElementById('pokemon-details').innerHTML = '<p>Erro ao carregar os detalhes do Pokémon.</p>';
        });
} else {
    document.getElementById('pokemon-details').innerHTML = '<p>Nenhum Pokémon selecionado.</p>';
}
