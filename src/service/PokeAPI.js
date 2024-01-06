import { useState } from "react";

export const PokeAPI = () => {
  const defaultLimit = 3;
  const defaultOffset = 0;
  const _pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?offset=';

  const [pokemonsData, setPokemonsData] = useState([]);
  const [maxPages, setMaxPages] = useState();

  const getData = async (url) => {
    let res = await fetch(url);
    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    };
    return await res.json();
  };

  const getPokemons = async (limit = defaultLimit, offset = defaultOffset) => {
    getData(`${_pokemonsURL}${offset}&limit=${limit}`)
      .then((pokemons) => {
        setMaxPages(Math.round(pokemons.count / defaultLimit));
        console.log(pokemons)
        const promises = pokemons.results.map((pokemon) => getData(pokemon.url));
        Promise.all(promises)
          .then((pokemons) => {
            setPokemonsData(pokemons.map(pokemon=> (
              {
                id: pokemon.id,
                name: pokemon.name,
                img: pokemon.sprites.other.home.front_default,
                weight: pokemon.weight,
                height: pokemon.height,
                types: pokemon.types.map(item => item.type.name),
                stats: {
                  hp: pokemon.stats[0].base_stat,
                  attak: pokemon.stats[1].base_stat,
                  defense: pokemon.stats[2].base_stat,
                  special_attack: pokemon.stats[3].base_stat,
                  special_defence: pokemon.stats[4].base_stat,
                  speed: pokemon.stats[5].base_stat,
                },
              }
            )
            ));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getPokemons,
    pokemonsData,
    maxPages,
    defaultOffset,
  }
};