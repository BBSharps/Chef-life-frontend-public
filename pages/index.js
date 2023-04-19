import Head from "next/head";
import Link from "next/link";
import Header from "../componenets/page_components/Header.js";
import HomePageHover from "../componenets/page_components/HomePageHover.js";
import styles from "../css/cssHomepage.module.css";
import { useState } from "react";

function HomePage() {
  const [display, setDisplay] = useState(true);
  const [page, setPage] = useState(true);
  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0px;
        }
      `}</style>
      <Head>
        <title>Chef Life</title>
      </Head>
      <Header page="Home"></Header>
      <div className={styles.HomePage_body}>
        <ul className={styles.HomePage_list}>
          <li className={styles.HomePage_list_item}>
            <Link
              href="/menu"
              onMouseOver={(e) => {
                setDisplay(false);
                setPage("menu");
              }}
              onMouseLeave={(e) => {
                setDisplay(true);
              }}
            >
              Menu
            </Link>
          </li>
          <li className={styles.HomePage_list_item}>
            <Link
              href="/sales"
              onMouseOver={(e) => {
                setDisplay(false);
                setPage("sales");
              }}
              onMouseLeave={(e) => {
                setDisplay(true);
              }}
            >
              Sales
            </Link>
          </li>
          <li className={styles.HomePage_list_item}>
            <Link
              href="/inventory"
              onMouseOver={(e) => {
                setDisplay(false);
                setPage("inventory");
              }}
              onMouseLeave={(e) => {
                setDisplay(true);
              }}
            >
              Inventory
            </Link>
          </li>
        </ul>
        <HomePageHover hidden={display} page={page}></HomePageHover>
      </div>
    </div>
  );
}

export default HomePage;
