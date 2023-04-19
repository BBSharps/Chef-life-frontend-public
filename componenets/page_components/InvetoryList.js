import { patchMenuIngredients } from "../axios";
import styles from "../../css/cssInventory.module.css";

export default function InventoryList({
  ingredient,
  setUpdate_quantity,
  update_price,
  setUpdate_price,
  update_quantity,
  setUpdateIsDisabled,
  updateIsDisabled,
  dataMenuIngredients,
  setStateDataMenuIngredients,
}) {
  return (
    <div>
      <li>
        <p
          className={styles.Inventory_list_list_name}
        >{`${ingredient.ingredient_name}`}</p>
        <label htmlFor="ingredient_quantity">quantity : </label>
        <input
          className={styles.Inventory_list_list_input}
          type="number"
          id="ingredient_quantity"
          value={
            updateIsDisabled !== ingredient.ingredient_id
              ? ingredient.ingredient_quantity
              : update_quantity
          }
          min="0"
          onChange={(e) => {
            setUpdate_quantity(Number(e.target.value));
            setUpdate_price(ingredient.ingredient_price);
            e.target.value
              ? setUpdateIsDisabled(ingredient.ingredient_id)
              : null;
          }}
        ></input>
        <label htmlFor="ingredient_price">Price : £</label>
        <input
          className={styles.Inventory_list_list_input}
          type="number"
          id="ingredient_price"
          value={
            updateIsDisabled !== ingredient.ingredient_id
              ? ingredient.ingredient_price / 100
              : update_price / 100
          }
          min="0"
          onChange={(e) => {
            setUpdate_price(Number(e.target.value) * 100);
            setUpdate_quantity(ingredient.ingredient_quantity);
            e.target.value
              ? setUpdateIsDisabled(ingredient.ingredient_id)
              : null;
          }}
        ></input>
        <button
          className={styles.Inventory_list_list_button}
          disabled={
            updateIsDisabled !== ingredient.ingredient_id ? true : false
          }
          onClick={(e) => {
            console.log(dataMenuIngredients);
            patchMenuIngredients(
              ingredient.ingredient_id,
              update_price,
              update_quantity
            ).then((res) => {
              const filterClone = [];
              dataMenuIngredients.menuIngredients.forEach((ingredient) => {
                ingredient.ingredient_id ===
                res.menuIngredients[0].ingredient_id
                  ? filterClone.push(res.menuIngredients[0])
                  : filterClone.push(ingredient);
              });
              setStateDataMenuIngredients({ menuIngredients: filterClone });
            });
            setUpdateIsDisabled(0);
          }}
        >
          update
        </button>
      </li>
    </div>
  );
}
