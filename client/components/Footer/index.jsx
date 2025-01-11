import styles from "./index.module.css";
import { Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.left}>
        <p>© 2025 GolfMini.com ⛳</p>
      </div>
      <div className={styles.right}>
        <p>
          Created By{" "}
          <Link href="https://x.com/michelldbrito" target="_blank">
            Michell Brito
          </Link>
        </p>
      </div>
    </footer>
  );
}
