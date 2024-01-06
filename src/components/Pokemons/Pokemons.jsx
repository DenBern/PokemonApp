import { useEffect, useState } from "react";
import { PokeAPI } from "../../service/PokeAPI";
import { Pokemon } from "../Pokemon/Pokemon";

import './Pokemons.scss';

export const Pokemons = () => {
  const {getPokemons, pokemonsData} = PokeAPI();

  const translateNext = -100;
  const translatePrev = 100;
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    getPokemons(3, 4);
  }, []);

  return (
    <>
      <button
        onClick={() => setTranslate(translate + translatePrev)}
        className="arrow-left"
      />
      <div className="pokemons__wrapper">
        <div
          className="pokemons"
          style={
            {
              transform: `translateX(${translate}%)`
            }
          }
        >
          {pokemonsData.map(pokemon =>
            <Pokemon
              img={pokemon.img}
              name={pokemon.name}
              key={pokemon.id}
              types={pokemon.types}
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setTranslate(translate + translateNext)}
        className="arrow-right"
      />
    </>
  );
};