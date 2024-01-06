import { typesPokemon } from "../../utils/typesPokemon";

import './PokemonTypes.scss'
export const PokemonTypes = ({types}) => {

  return (
    types.map((type, i) =>
      <div
        key={i}
        className="type"
        style={
          {
            backgroundColor: `${typesPokemon[type].color}`
          }
        }
      >
        <div className="type__img">
          <img src={typesPokemon[type].element} alt={type}/>
        </div>
        <h4>{type}</h4>
      </div>
      )
  )
};