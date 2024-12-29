"use client";
import { Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useState } from "react";
import styles from "./index.module.css";

export default function Navbar() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  return (
    <nav className={styles.root}>
      {/* <Text textStyle="xl">GolfMini</Text>
      <div className={styles.right}>
        <MenuRoot open={isThemeOpen} onSelect={() => setIsThemeOpen(false)}>
          <MenuTrigger asChild>
            <Button
              size="lg"
              variant="plain"
              onMouseEnter={() => setIsThemeOpen(true)}
            >
              Discover Themes
            </Button>
          </MenuTrigger>
          <MenuContent onMouseLeave={() => setIsThemeOpen(false)}>
            <MenuItem asChild value="castle">
              <a href="/?theme=castle">Castle</a>
            </MenuItem>
            <MenuItem asChild value="glow_in_the_dark">
              <a href="/?theme=glow_in_the_dark">Glow In The Dark</a>
            </MenuItem>
            <MenuItem asChild value="jungle">
              <a href="/?theme=jungle">Jungle</a>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
        <MenuRoot open={isTypeOpen} onSelect={() => setIsTypeOpen(false)}>
          <MenuTrigger asChild>
            <Button
              size="lg"
              variant="plain"
              onMouseEnter={() => setIsTypeOpen(true)}
              aria-label="Filter mini golf courses by indoor or outdoor venues"
            >
              Location Type
            </Button>
          </MenuTrigger>
          <MenuContent onMouseLeave={() => setIsTypeOpen(false)}>
            <MenuItem asChild value="indoor">
              <a href="/?type=indoor">Indoor</a>
            </MenuItem>
            <MenuItem asChild value="outdoor">
              <a href="/?type=outdoor">Outdoor</a>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </div> */}
    </nav>
  );
}
