import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";
import Gallery from "@/components/Gallery";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Filters />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
