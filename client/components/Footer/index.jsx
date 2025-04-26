import styles from "./index.module.css";
import { Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.left}>
        <p>© 2025 GolfMini.com ⛳</p>
      </div>
      <div className={styles.right}>
        <Link href="/legal/terms-conditions">Terms and Conditions</Link>
        <Link href="/legal/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
