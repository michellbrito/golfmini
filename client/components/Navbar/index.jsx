"use client";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";

export default function Navbar() {
  return (
    <nav className={styles.root}>
      <Link href="/">
        <Text textStyle="4xl" cursor="pointer">
          GolfMini ⛳
        </Text>
      </Link>
    </nav>
  );
}
