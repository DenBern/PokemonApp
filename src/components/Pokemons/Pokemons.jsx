import { useEffect } from "react";
import { PokeAPI } from "../../service/PokeAPI";

export const Pokemons = () => {
  const {getPokemons, pokemonsData} = PokeAPI();

  const pokemon = pokemonsData.map(pokemon => <img key={pokemon.id} src={pokemon.img} alt={pokemon.name} width={150} height={150}/>);

  useEffect(() => {
    console.log('pokemons')
    getPokemons();
  }, []);

  return (
    <>
      {pokemon}
    </>
  );
};