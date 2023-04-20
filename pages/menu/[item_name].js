import { useRouter } from "next/router";
import { useState } from "react";
import {
  getMenuIngredientsById,
  getMenuItems,
  getMenuIngredients,
  patchMenuItems,
  postItemsIngredients,
} from "../../componenets/axios";
import styles from "../../css/cssItemName.module.css";
import Header from "../../componenets/page_components/Header";

function ItemName() {
  let keyId = 0;

  const path = useRouter().asPath;
  const item_id = Number(path.slice(6));

  let loadMenuItems = true;
  let loadMenuIngredients = true;
  let loadMenuIngredientsById = false;

  const { dataMenuItems, loadingMenuItems } = getMenuItems(loadMenuItems);
  loadingMenuItems ? null : (loadMenuItems = false);
  item_id ? (loadMenuIngredientsById = true) : null;

  const { dataMenuIngredientsById, loadingMenuIngredientsById } =
    getMenuIngredientsById(loadMenuIngredientsById, item_id);
  loadingMenuIngredientsById ? null : (loadMenuIngredientsById = false);

  const { dataMenuIngredients, loadingMenuIngredients } =
    getMenuIngredients(loadMenuIngredients);
  loadingMenuIngredients ? null : (loadMenuIngredients = false);

  let filterData = dataMenuItems
    ? dataMenuItems.menuItems.filter((item) => {
        return item.item_id === item_id;
      })
    : false;

  const [item_name, setItem_name] = useState();
  const [item_price, setItem_price] = useState();
  const [item_description, setItem_description] = useState();
  const [ingredient_id, setIngredient_id] = useState();
  const [ingredient_name, setIngredient_name] = useState();
  const [addIsDisabled, setAddIsDisabled] = useState(true);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [pageData, setPageData] = useState();
  const [newIngredient, setNewIngredient] = useState([]);

  if (!filterData || filterData.length === 0) {
    return (
      <div className={styles.itemName_body}>
        <Header page="" />
        <style jsx global>{`
          body {
            margin: 0px;
          }
        `}</style>
        <h3>Loading ...</h3>
      </div>
    );
  } else {
    return (
      <div className={styles.itemName_body}>
        <style jsx global>{`
          body {
            margin: 0px;
          }
        `}</style>
        <Header
          page={pageData ? pageData[0].item_name : filterData[0].item_name}
        />
        <div className={styles.itemName_information}>
          <h3>{pageData ? pageData[0].item_name : filterData[0].item_name}</h3>
          <h4>
            Price : £
            {pageData
              ? pageData[0].item_price / 100
              : filterData[0].item_price / 100}
          </h4>
        </div>
        <h4 className={styles.itemName_description}>
          {pageData
            ? pageData[0].item_description
            : filterData[0].item_description}
        </h4>
        <div className={styles.itemName_ingredients}>
          <div className={styles.itemName_ingredients_list}>
            <h5 className={styles.itemName_h5}>Ingredients</h5>
            <ul className={styles.itemName_list}>
              {dataMenuIngredientsById ? (
                [
                  ...dataMenuIngredientsById.ingredientsByMenuId,
                  ...newIngredient,
                ].map((ingredient) => {
                  keyId++;
                  return (
                    <li className={styles.itemName_item} key={`i${keyId}`}>
                      {ingredient.ingredient_name}
                    </li>
                  );
                })
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
          <div className={styles.itemName_ingredients_line}></div>
          <div className={styles.itemName_update_form}>
            <form id="updateDetails">
              <h5 className={styles.itemName_h5}>Update details</h5>
              <div className={styles.itemName_update_form_name}>
                <label htmlFor="item_name">Name : </label>
                <input
                  className={styles.itemName_update_form_itemName_input}
                  defaultValue={
                    pageData ? pageData[0].item_name : filterData[0].item_name
                  }
                  id="item_name"
                  onChange={(e) => {
                    setItem_name(e.target.value.replaceAll("'", "''"));
                    e.target.value === ""
                      ? setSubmitIsDisabled(true)
                      : setSubmitIsDisabled(false);
                  }}
                ></input>
              </div>
              <div className={styles.itemName_update_form_price}>
                <label htmlFor="item_price">Price : £</label>
                <input
                  className={styles.itemName_update_form_price_input}
                  min="0"
                  defaultValue={
                    pageData
                      ? pageData[0].item_price / 100
                      : filterData[0].item_price / 100
                  }
                  type="number"
                  id="item_price"
                  onChange={(e) => {
                    setItem_price(Number(e.target.value) * 100);
                    e.target.value === ""
                      ? setSubmitIsDisabled(true)
                      : setSubmitIsDisabled(false);
                  }}
                ></input>
              </div>
              <div className={styles.itemName_update_form_description}>
                <label htmlFor="item_description">Description : </label>
                <textarea
                  className={styles.itemName_update_form_textArea}
                  defaultValue={
                    pageData
                      ? pageData[0].item_description
                      : filterData[0].item_description
                  }
                  id="item_description"
                  onChange={(e) => {
                    setItem_description(e.target.value.replaceAll("'", "''"));
                    e.target.value === ""
                      ? setSubmitIsDisabled(true)
                      : setSubmitIsDisabled(false);
                  }}
                ></textarea>
              </div>
              <button
                className={styles.itemName_update_ingredient_form_button}
                disabled={submitIsDisabled}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setSubmitIsDisabled(true);
                  patchMenuItems(
                    item_id,
                    item_name,
                    item_price,
                    item_description
                  )
                    .then((res) => {
                      setPageData(res.menuItemsById);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setItem_name();
                  setItem_price();
                  setItem_description();
                  document.forms["updateDetails"].reset();
                }}
              >
                submit
              </button>
            </form>
            <form className={styles.itemName_update_ingredient_form}>
              <label htmlFor="ingredients">New Ingredient : </label>
              {dataMenuIngredients ? (
                <select
                  className={styles.itemName_update_ingredient_form_select}
                  id="ingredients"
                  onChange={(e) => {
                    e.target.value === "Select"
                      ? setAddIsDisabled(true)
                      : setAddIsDisabled(false);
                    setIngredient_name(e.target.value.slice(4));
                    setIngredient_id(Number(e.target.value.slice(0, 2)));
                  }}
                >
                  <option key="opt0">Select</option>
                  {dataMenuIngredients.menuIngredients.map((ingredient) => {
                    return (
                      <option
                        key={`opt${ingredient.ingredient_id}`}
                      >{`${ingredient.ingredient_id} : ${ingredient.ingredient_name}`}</option>
                    );
                  })}
                </select>
              ) : null}
              <button
                className={styles.itemName_update_ingredient_form_button}
                disabled={addIsDisabled}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setAddIsDisabled(true);
                  postItemsIngredients(item_id, ingredient_id)
                    .then((res) => {
                      setNewIngredient([
                        ...newIngredient,
                        { ingredient_name: ingredient_name },
                      ]);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemName;
