import Head from "next/head";
import { useState } from "react";
import {
  getMenuItems,
  getSalesDates,
  postSalesDates,
} from "../../componenets/axios";
import Header from "../../componenets/page_components/Header";
import SalesDataList from "../../componenets/page_components/SalesDataList";
import SalesFormAddition from "../../componenets/page_components/SalesFormAddition";
import styles from "../../css/cssSales.module.css";

function Sales() {
  const date = new Date();
  const month =
    1 + date.getMonth() < 10 ? `0${1 + date.getMonth()}` : 1 + date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const dateString = `${date.getFullYear()}-${month}-${day}`;

  let key = 0;

  const [choseDate, setChoseDate] = useState(dateString);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [item_name, setItem_name] = useState({});
  const [item_quantity, setItem_quantity] = useState({ 1: 0 });
  const [item_wastage, setItem_wastage] = useState({ 1: 0 });
  const [addElementWithButton, setAddElementWithButton] = useState([1]);
  const [newItem, setNewItem] = useState([]);

  let loadMenuItems = true;
  const { dataMenuItems, loadingMenuItems } = getMenuItems(loadMenuItems);
  loadingMenuItems ? null : (loadMenuItems = false);

  let loadSalesDates = true;
  const { dataSalesDates, loadingSalesDates } = getSalesDates(
    loadSalesDates,
    choseDate
  );
  loadingSalesDates ? null : (loadSalesDates = false);

  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
        }
      `}</style>
      <Head>
        <title>Sales</title>
      </Head>
      <Header page="Sales" />
      <div className={styles.Sales_body}>
        <input
          className={styles.Sales_date}
          type="date"
          defaultValue={dateString}
          max={dateString}
          onChange={(e) => {
            setChoseDate(e.target.value);
          }}
        ></input>
        {choseDate === dateString ? (
          <div>
            <form className={styles.Sales_form} id="addSales">
              {addElementWithButton.map((number) => {
                key++;
                return (
                  <SalesFormAddition
                    key={`${key}`}
                    dataMenuItems={dataMenuItems}
                    setItem_name={setItem_name}
                    item_name={item_name}
                    setItem_quantity={setItem_quantity}
                    item_quantity={item_quantity}
                    setItem_wastage={setItem_wastage}
                    item_wastage={item_wastage}
                    setAddElementWithButton={setAddElementWithButton}
                    addElementWithButton={addElementWithButton}
                    numberOfElements={addElementWithButton.length}
                    setSubmitIsDisabled={setSubmitIsDisabled}
                  ></SalesFormAddition>
                );
              })}
              {addElementWithButton.length <= 8 ? (
                <button
                  className={styles.Sales_form_button}
                  disabled={submitIsDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    setAddElementWithButton([...addElementWithButton, 1]);
                    setSubmitIsDisabled(true);
                    const cloneItem_quantity = structuredClone(item_quantity);
                    cloneItem_quantity[addElementWithButton.length + 1] = 0;
                    setItem_quantity(cloneItem_quantity);
                    const cloneItem_wastage = structuredClone(item_wastage);
                    cloneItem_wastage[addElementWithButton.length + 1] = 0;
                    setItem_wastage(cloneItem_wastage);
                  }}
                >
                  add
                </button>
              ) : null}
              <button
                className={styles.Sales_form_button}
                disabled={submitIsDisabled}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  postSalesDates(
                    dateString,
                    item_name,
                    item_quantity,
                    item_wastage
                  ).then((data) => {
                    setNewItem([...newItem, ...data.salesDates]);
                  });
                  setSubmitIsDisabled(true);
                  setItem_name({});
                  setItem_quantity({ 1: 0 });
                  setItem_wastage({ 1: 0 });
                  setAddElementWithButton([1]);
                  document.forms["addSales"].reset();
                }}
              >
                submit
              </button>
            </form>
            <div className={styles.Sales_grid}>
              <SalesDataList
                dataSalesDates={dataSalesDates}
                display_data={"item_name"}
                newItem={newItem}
              ></SalesDataList>
              <div className={styles.Sales_grid_line}></div>
              <SalesDataList
                dataSalesDates={dataSalesDates}
                display_data={"item_quantity"}
                newItem={newItem}
              ></SalesDataList>
              <div className={styles.Sales_grid_line}></div>
              <SalesDataList
                dataSalesDates={dataSalesDates}
                display_data={"item_wastage"}
                newItem={newItem}
              ></SalesDataList>
            </div>
          </div>
        ) : (
          <div className={styles.Sales_grid}>
            <SalesDataList
              dataSalesDates={dataSalesDates}
              display_data={"item_name"}
              newItem={newItem}
            ></SalesDataList>
            <div className={styles.Sales_grid_line}></div>
            <SalesDataList
              dataSalesDates={dataSalesDates}
              display_data={"item_quantity"}
              newItem={newItem}
            ></SalesDataList>
            <div className={styles.Sales_grid_line}></div>
            <SalesDataList
              dataSalesDates={dataSalesDates}
              display_data={"item_wastage"}
              newItem={newItem}
            ></SalesDataList>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sales;
