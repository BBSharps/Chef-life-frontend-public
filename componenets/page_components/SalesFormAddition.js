import styles from "../../css/cssSales.module.css";

export default function SalesFormAddition({
  dataMenuItems,
  setItem_name,
  item_name,
  setItem_quantity,
  item_quantity,
  setItem_wastage,
  item_wastage,
  setAddElementWithButton,
  addElementWithButton,
  numberOfElements,
  setSubmitIsDisabled,
}) {
  return (
    <div className={styles.Sales_form_input}>
      <label htmlFor="item_name">item :</label>
      <select
        className={styles.Sales_form_input_select}
        id="item_name"
        onChange={(e) => {
          e.target.value === "select"
            ? setSubmitIsDisabled(true)
            : setSubmitIsDisabled(false);
          const cloneItem_name = structuredClone(item_name);
          cloneItem_name[numberOfElements] = e.target.value.replaceAll(
            "'",
            "''"
          );
          setItem_name(cloneItem_name);
        }}
      >
        <option key="mi">select</option>
        {dataMenuItems
          ? dataMenuItems.menuItems.map((item) => {
              return (
                <option key={`mi${item.item_id}`}>{item.item_name}</option>
              );
            })
          : null}
      </select>
      <div className={styles.Sales_form_input_divNumber}>
        <label htmlFor="item_quantity">quantity :</label>
        <input
          className={styles.Sales_form_input_number}
          id="item_quantity"
          type="number"
          defaultValue="0"
          min="0"
          onChange={(e) => {
            const cloneItem_quantity = structuredClone(item_quantity);
            cloneItem_quantity[numberOfElements] = e.target.value;
            setItem_quantity(cloneItem_quantity);
          }}
        ></input>
        <label htmlFor="item_wastage">wastage :</label>
        <input
          className={styles.Sales_form_input_number}
          id="item_wastage"
          type="number"
          defaultValue="0"
          min="0"
          onChange={(e) => {
            const cloneItem_wastage = structuredClone(item_wastage);
            cloneItem_wastage[numberOfElements] = e.target.value;
            setItem_wastage(cloneItem_wastage);
          }}
        ></input>
      </div>
    </div>
  );
}
