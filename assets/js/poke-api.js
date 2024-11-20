
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities; 

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.showdown.front_default;

    return pokemon    
}

pokeApi.getPokemonDetail = (pokemon) => {
    // Novo fetch feito buscando pela url que vem na primeira lista, e convertendo a resposta em json
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 25) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    // Buscando a lista de pokemons
    return fetch(url)
    // Trazendo a resposta e convertendo a mesmo em json
    .then((response) => response.json())
    // Caapturando o body do json
    .then((jsonBody) => jsonBody.results)  
    // Mapeando a lista de pokemons em uma lista de requisições do detalhe dos pokemons, ou seja, um novo fetch para a url que está na primeira lista
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    // Após definir as requisições, aguardando que todas as requisições terminem
    .then((detailRequest) => Promise.all(detailRequest))
    // Assim que todas terminarem, nos tras uma lista de detalhes dos pokemons
    .then((pokemonDetails) => pokemonDetails)
}

