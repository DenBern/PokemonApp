import { PokemonTypes } from "../PokemonTypes/PokemonTypes";
import { typesPokemon } from "../../utils/typesPokemon";

import './Pokemon.scss';

export const Pokemon = ({id, name, img, types}) => {
  return (
    <>
      <div className="pokemon__wrapper">
        <div className="name">
          <h2>{name}</h2>
        </div>
        <div
          className="pokemon" key={id}
          style={
            {
              background: `url(${typesPokemon[types[0]].elementTransparent}) no-repeat center / contain`,
            }
          }
        >
          <img
            src={img}
            alt={name}
          />
        </div>
        <div className="types__wrapper">
          <PokemonTypes types={types}/>
        </div>
      </div>
    </>
  )
};