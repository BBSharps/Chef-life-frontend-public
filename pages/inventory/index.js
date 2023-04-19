import {
  getMenuIngredients,
  postMenuIngredients,
} from "../../componenets/axios";
import Head from "next/head";
import Header from "../../componenets/page_components/Header";
import styles from "../../css/cssInventory.module.css";
import { useState } from "react";
import InventoryList from "../../componenets/page_components/InvetoryList";

export default function Inventory() {
  const [ingredient_name, setingredient_name] = useState("");
  const [ingredient_price, setingredient_price] = useState(0);
  const [ingredient_quantity, setingredient_quantity] = useState(0);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [updateIsDisabled, setUpdateIsDisabled] = useState(true);
  const [update_price, setUpdate_price] = useState(0);
  const [update_quantity, setUpdate_quantity] = useState(0);
  const [stateDataMenuIngredients, setStateDataMenuIngredients] =
    useState(false);
  const [search, setSearch] = useState();

  let loadMenuIngredients = true;
  const { dataMenuIngredients, loadingMenuIngredients } =
    getMenuIngredients(loadMenuIngredients);
  loadingMenuIngredients ? true : (loadMenuIngredients = false);

  return (
    <div className={styles.Inventory_body}>
      <style jsx global>{`
        body {
          margin: 0px;
        }
      `}</style>
      <Head>
        <title>Inventory</title>
      </Head>
      <Header page="Inventory" />
      {!dataMenuIngredients ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.Inventory_list}>
          <div className={styles.Inventory_list_search}>
            <label
              className={styles.Inventory_list_search_text}
              htmlFor="search"
            >
              Search :{" "}
            </label>
            <input
              className={styles.Inventory_list_search_input}
              id="search"
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
          </div>
          <ul className={styles.Inventory_list_list}>
            {stateDataMenuIngredients
              ? stateDataMenuIngredients.menuIngredients
                  .filter((ingredient) => {
                    return !search
                      ? ingredient
                      : ingredient.ingredient_name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase());
                  })
                  .map((ingredient) => {
                    return (
                      <InventoryList
                        ingredient={ingredient}
                        setUpdate_quantity={setUpdate_quantity}
                        update_price={update_price}
                        setUpdate_price={setUpdate_price}
                        update_quantity={update_quantity}
                        setUpdateIsDisabled={setUpdateIsDisabled}
                        updateIsDisabled={updateIsDisabled}
                        dataMenuIngredients={stateDataMenuIngredients}
                        setStateDataMenuIngredients={
                          setStateDataMenuIngredients
                        }
                        key={`ild${ingredient.ingredient_id}`}
                      ></InventoryList>
                    );
                  })
              : dataMenuIngredients.menuIngredients
                  .filter((ingredient) => {
                    return !search
                      ? ingredient
                      : ingredient.ingredient_name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase());
                  })
                  .map((ingredient) => {
                    return (
                      <InventoryList
                        ingredient={ingredient}
                        setUpdate_quantity={setUpdate_quantity}
                        update_price={update_price}
                        setUpdate_price={setUpdate_price}
                        update_quantity={update_quantity}
                        setUpdateIsDisabled={setUpdateIsDisabled}
                        updateIsDisabled={updateIsDisabled}
                        dataMenuIngredients={dataMenuIngredients}
                        setStateDataMenuIngredients={
                          setStateDataMenuIngredients
                        }
                        key={`ild${ingredient.ingredient_id}`}
                      ></InventoryList>
                    );
                  })}
          </ul>
        </div>
      )}
      <form className={styles.Inventory_form} id="newIngredient">
        <h3 htmlFor="newIngredient">New ingredient</h3>
        <label htmlFor="ingredient_name">Name : </label>
        <input
          className={styles.Inventory_form_input_name}
          id="ingredient_name"
          value={ingredient_name}
          onChange={(e) => {
            setingredient_name(e.target.value.replaceAll("'", "''"));
            !ingredient_name ||
            typeof ingredient_price !== "number" ||
            typeof ingredient_quantity !== "number" ||
            !e.target.value
              ? setSubmitIsDisabled(true)
              : setSubmitIsDisabled(false);
          }}
        ></input>
        <div className={styles.Inventory_form_wrap}>
          <label htmlFor="ingredient_quantity">quantity : </label>
          <input
            className={styles.Inventory_form_input}
            type="number"
            id="ingredient_quantity"
            value={ingredient_quantity}
            min="0"
            onChange={(e) => {
              setingredient_quantity(Number(e.target.value));
              !ingredient_name ||
              typeof ingredient_price !== "number" ||
              typeof ingredient_quantity !== "number" ||
              !e.target.value
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          ></input>
        </div>
        <div className={styles.Inventory_form_wrap}>
          <label htmlFor="ingredient_price">Price : £</label>
          <input
            className={styles.Inventory_form_input}
            type="number"
            id="ingredient_price"
            value={ingredient_price}
            min="0"
            onChange={(e) => {
              setingredient_price(Number(e.target.value) * 100);
              !ingredient_name ||
              typeof ingredient_price !== "number" ||
              typeof ingredient_quantity !== "number" ||
              !e.target.value
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          ></input>
        </div>
        <button
          className={styles.Inventory_list_form_button}
          disabled={submitIsDisabled}
          type="submit"
          onClick={(e) => {
            setSubmitIsDisabled(true);
            e.preventDefault();
            postMenuIngredients(
              ingredient_name,
              ingredient_price,
              ingredient_quantity
            ).then((res) => {
              stateDataMenuIngredients
                ? setStateDataMenuIngredients({
                    menuIngredients: [
                      ...stateDataMenuIngredients.menuIngredients,
                      res.menuIngredients[0],
                    ],
                  })
                : setStateDataMenuIngredients({
                    menuIngredients: [
                      ...dataMenuIngredients.menuIngredients,
                      res.menuIngredients[0],
                    ],
                  });
            });
            setingredient_name("");
            setingredient_price(0);
            setingredient_quantity(0);
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}
