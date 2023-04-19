import styles from "../../css/cssHeader.module.css";
import Link from "next/link";

export default function Header({ page }) {
  return (
    <header className={styles.Header}>
      <img
        alt="logo"
        className={styles.Header_logo}
        src="https://assets.foodhub.com/static/9a6a34fb0ce29c2f31f8246aa2ddb2a3/img/1661266921phpVEe0Fw.jpg"
        id="logo"
      ></img>
      <h1 className={styles.Header_h1}>Chef Life / {page}</h1>
      <Link href="/" className={styles.Header_Link}>
        Home
      </Link>
      <Link href="/menu" className={styles.Header_Link}>
        Menu
      </Link>
      <Link href="/sales" className={styles.Header_Link}>
        Sales
      </Link>
      <Link href="/inventory" className={styles.Header_Link}>
        Inventory
      </Link>
    </header>
  );
}
