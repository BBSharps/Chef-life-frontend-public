import styles from "../../css/cssSales.module.css";

export default function SalesDataList({
  dataSalesDates,
  display_data,
  newItem,
}) {
  let key = 1;
  return (
    <ul className={styles.Sales_list}>
      <li className={styles.Sales_list_title}>{`${display_data
        .slice(5, 6)
        .toUpperCase()}${display_data.slice(6)}`}</li>
      {dataSalesDates ? (
        [...dataSalesDates.salesDates, ...newItem].map((date) => {
          key++;
          return (
            <li
              className={styles.Sales_list_item}
              key={`sd${date.item_date}${key}`}
            >
              {date[display_data]}
            </li>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </ul>
  );
}
