import { getMenuItems, postMenuItems } from "../../componenets/axios";
import Head from "next/head";
import MenuItemsList from "../../componenets/page_components/MenuItemsList";
import Header from "../../componenets/page_components/Header";
import styles from "../../css/cssMenu.module.css";
import { useState } from "react";

export default function menu() {
  let loadMenuItems = true;
  const { dataMenuItems, loadingMenuItems } = getMenuItems(loadMenuItems);
  loadingMenuItems ? null : (loadMenuItems = false);

  const [item_name, setItem_name] = useState();
  const [item_type, setItem_type] = useState();
  const [item_price, setItem_price] = useState();
  const [item_description, setItem_description] = useState();
  const [createdItem, setCreatedItem] = useState([]);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
        }
      `}</style>
      <Head>
        <title>Menu</title>
      </Head>
      <Header page="Menu" />
      <div className={styles.menuItems_body}>
        {!dataMenuItems ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.menuItems_list}>
            <div className={styles.menuItems_list_line}></div>
            <div className={styles.menuItems_list_all}>
              <MenuItemsList
                dataMenuItems={dataMenuItems}
                createdItem={createdItem}
                item_type={"Burgers and melts"}
              ></MenuItemsList>

              <MenuItemsList
                dataMenuItems={dataMenuItems}
                createdItem={createdItem}
                item_type={"Sides"}
              ></MenuItemsList>

              <MenuItemsList
                dataMenuItems={dataMenuItems}
                createdItem={createdItem}
                item_type={"Drinks"}
              ></MenuItemsList>

              <MenuItemsList
                dataMenuItems={dataMenuItems}
                createdItem={createdItem}
                item_type={"Lighter bites"}
              ></MenuItemsList>

              <MenuItemsList
                dataMenuItems={dataMenuItems}
                createdItem={createdItem}
                item_type={"Dirt box's"}
              ></MenuItemsList>
            </div>
            <div className={styles.menuItems_list_line}></div>
          </div>
        )}
        <form className={styles.menuItems_form} id="newItem">
          <h3 className={styles.menuItems_form_title} htmlFor="newItem">
            Add an item
          </h3>
          <label className={styles.menuItems_form_label} htmlFor="item_name">
            Name :
          </label>
          <input
            className={styles.menuItems_form_name}
            id="item_name"
            onChange={(e) => {
              setItem_name(e.target.value.replaceAll("'", "''"));
              !item_name ||
              !item_type ||
              typeof item_price !== "number" ||
              !item_description ||
              !e.target.value
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          ></input>
          <select
            className={styles.menuItems_form_select}
            id="item_type"
            defaultValue={"Select type"}
            onChange={(e) => {
              e.target.value === "Select type"
                ? setItem_type()
                : setItem_type(e.target.value);
              !item_name ||
              e.target.value === "Select type" ||
              typeof item_price !== "number" ||
              !item_description
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          >
            <option>Select type</option>
            <option>Burgers and melts</option>
            <option>Sides</option>
            <option>Drinks</option>
            <option>Lighter bites</option>
            <option>Dirt box's</option>
          </select>
          <label className={styles.menuItems_form_label} htmlFor="item_price">
            Price : £
          </label>
          <input
            className={styles.menuItems_form_price}
            type="number"
            min="0"
            id="item_price"
            onChange={(e) => {
              setItem_price(Number(e.target.value) * 100);
              console.log(e.target.value);
              !item_name ||
              !item_type ||
              typeof item_price !== "number" ||
              !item_description ||
              !e.target.value
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          ></input>
          <label
            className={styles.menuItems_form_label}
            htmlFor="item_description"
          >
            Description :
          </label>
          <textarea
            className={styles.menuItems_form_description}
            maxLength="500"
            id="item_description"
            onChange={(e) => {
              setItem_description(e.target.value.replaceAll("'", "''"));
              !item_name ||
              !item_type ||
              typeof item_price !== "number" ||
              !item_description ||
              !e.target.value
                ? setSubmitIsDisabled(true)
                : setSubmitIsDisabled(false);
            }}
          ></textarea>
          <button
            className={styles.menuItems_form_button}
            disabled={submitIsDisabled}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              postMenuItems(
                item_name,
                item_type,
                item_price,
                item_description
              ).then((res) => {
                console.log(res.newItem);
                setCreatedItem([...createdItem, ...res.newItem]);
              });
              setItem_name("");
              setItem_name();
              setItem_price();
              setItem_description("");
              document.forms["newItem"].reset();
            }}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
