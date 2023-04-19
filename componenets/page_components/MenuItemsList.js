import Link from "next/link";
import styles from "../../css/cssMenu.module.css";
import { useState } from "react";

export default function MenuItemsList({
  dataMenuItems,
  createdItem,
  item_type,
}) {
  const [showItemList, setShowItemList] = useState(true);
  return (
    <div className={styles.menuItems_list_list}>
      <button
        type="button"
        className={styles.menuItems_list_button}
        onClick={(e) => {
          setShowItemList(!showItemList);
        }}
      >
        {item_type}
      </button>
      <div hidden={showItemList}>
        <ul className={styles.menuItems_list_list}>
          {dataMenuItems.menuItems.map((item) => {
            return item.item_type === item_type ? (
              <li
                className={styles.menuItems_list_item}
                key={`mi${item.item_id}`}
              >
                <Link
                  href={`/menu/${item.item_id}`}
                >{`${item.item_name}`}</Link>
              </li>
            ) : null;
          })}
          {createdItem.map((item) => {
            return item.item_type === item_type ? (
              <li
                className={styles.menuItems_list_item}
                key={`ci${item.item_id}`}
              >
                <Link
                  href={`/menu/${item.item_id}`}
                >{`${item.item_name}`}</Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
}
