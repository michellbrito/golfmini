"use client";
import { Text } from "@chakra-ui/react";
import styles from "./index.module.css";

export default function Navbar() {
  return (
    <nav className={styles.root}>
      <a href="/">
        <Text textStyle="4xl" cursor="pointer">
          GolfMini ⛳
        </Text>
      </a>
    </nav>
  );
}
