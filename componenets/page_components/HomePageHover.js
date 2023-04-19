import styles from "../../css/cssHomepage.module.css";

export default function HomePageHover({ hidden, page }) {
  return (
    <div className={styles.HomePage_display} hidden={hidden}>
      {page === "menu" ? (
        <ul className={styles.HomePage_list_display}>
          <li className={styles.HomePage_list_display_item}>
            displays the Menu
          </li>
          <li className={styles.HomePage_list_display_item}>
            Add aditional items to the Menue
          </li>
          <li className={styles.HomePage_list_display_item}>
            Links to individual item page with:
            <ul className={styles.HomePage_list_display}>
              <li className={styles.HomePage_list_display_item}>
                information for the item
              </li>
              <li className={styles.HomePage_list_display_item}>
                update information for the item
              </li>
              <li className={styles.HomePage_list_display_item}>
                a list of ingredients for the item
              </li>
              <li className={styles.HomePage_list_display_item}>
                add ingredients to the list of ingredients for the item
              </li>
            </ul>
          </li>
        </ul>
      ) : null}
      {page === "sales" ? (
        <ul className={styles.HomePage_list_display}>
          <li className={styles.HomePage_list_display_item}>
            Select a date to display all Sales data on that day
          </li>
          <li className={styles.HomePage_list_display_item}>
            Select todays date to add new Sales data
          </li>
        </ul>
      ) : null}
      {page === "inventory" ? (
        <ul className={styles.HomePage_list_display}>
          <li className={styles.HomePage_list_display_item}>
            displays the current ingredient Inventory
          </li>
          <li className={styles.HomePage_list_display_item}>
            updating of quantity and price for individual Ingredients
          </li>
          <li className={styles.HomePage_list_display_item}>
            add additional ingredient to the Inventory
          </li>
        </ul>
      ) : null}
    </div>
  );
}
