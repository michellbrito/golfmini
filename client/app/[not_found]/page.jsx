// components
import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className={styles.notFoundContainer}>
        <Text textStyle="5xl" color="#FDF7F4">
          404
        </Text>
        <Text textStyle="5xl" color="#FDF7F4" textAlign="center">
          Something went wrong!
        </Text>
        <Button
          asChild
          color="#FDF7F4"
          backgroundColor="#685752"
          _hover={{ backgroundColor: "#997C70" }}
        >
          <a href="/">Back to homepage</a>
        </Button>
      </div>
      <Footer />
    </>
  );
}
