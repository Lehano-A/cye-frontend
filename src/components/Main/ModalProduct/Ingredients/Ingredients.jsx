import React from "react"
import Ingredient from "./Ingredient/Ingredient"
import CompositeIngredient from "./CompositeIngredient/CompositeIngredient"
import { ListItem } from "@mui/material"

function Ingredients({ data, setRefSelectedIngredient }) {

  /*
   Может быть два типа структуры данных ингредиента:
     1. строка (simple - без дополнительной информации)
     2. объект с свойством ingredient (с дополнительной информацией)
     3. объект с свойством compositeIngredient (составной ингредиент + возможно с дополнительной информацией)
     3.1 внутри compositeIngredient могут быть другие составные ингредиенты - innerCompositeIngredient
   */

  return (
    <ListItem sx={{ padding: 0, display: 'inline-block' }}>
      {data.map((item, id) => {

        return item.compositeIngredient ?
          <CompositeIngredient
            key={id}
            data={item.compositeIngredient}
            setRefSelectedIngredient={setRefSelectedIngredient}
          /> :

          item.innerCompositeIngredient ? <CompositeIngredient
            key={id}
            data={item.innerCompositeIngredient}
            setRefSelectedIngredient={setRefSelectedIngredient}
          /> : <Ingredient
            key={id}
            data={item}
            setRefSelectedIngredient={setRefSelectedIngredient}
          />

      })}
    </ListItem>
  )
}

export default Ingredients