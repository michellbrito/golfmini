"use client";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./index.module.css";

export default function Navbar() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  return (
    <nav className={styles.root}>
      <Text textStyle="4xl">GolfMini ⛳</Text>
    </nav>
  );
}
