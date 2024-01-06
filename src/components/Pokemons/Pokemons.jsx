import { useEffect, useState } from "react";
import { PokeAPI } from "../../service/PokeAPI";
import { Pokemon } from "../Pokemon/Pokemon";

import './Pokemons.scss';

export const Pokemons = () => {
  const {getPokemons, getPokemon, pokemonsData} = PokeAPI();

  const translateNext = -100;
  const translatePrev = 100;
  const [translate, setTranslate] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  console.log(currentItem, pokemonsData.length);

  useEffect(() => {
    if ((pokemonsData.length - currentItem) === 1) {
      const newIdPokemon = pokemonsData[pokemonsData.length - 1].id + 1;
      getPokemon(newIdPokemon);
    };
  }, [currentItem]);

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setTranslate(translate + translatePrev);
          setCurrentItem(currentItem - 1);
        }}
        className="arrow-left"
        disabled={!Boolean(currentItem)}
      />
      <div className="pokemons__wrapper">
        <div
          className="pokemons"
          style={
            {
              transform: `translateX(${translate}%)`,
              transition: '.5s',
            }
          }
        >
          {pokemonsData.map(pokemon =>
            <Pokemon
              img={pokemon.img}
              name={pokemon.name}
              key={pokemon.id}
              types={pokemon.types}
              id={pokemon.id}
            />
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setTranslate(translate + translateNext);
          setCurrentItem(currentItem + 1);
        }}
        className="arrow-right"
      />
    </>
  );
};