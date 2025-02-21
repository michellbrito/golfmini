"use client";

// libs
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getParams, stateAbbreviations } from "@/utils";

// components
import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";
import Gallery from "@/components/Gallery";
import styles from "./page.module.css";

export default function Home() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(-1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [filter, setFilter] = useState({
    name: searchParams.get("name") || "",
    state: searchParams.get("state")
      ? [searchParams.get("state")?.toUpperCase()]
      : "",
    type: searchParams.get("type")?.toUpperCase() || "ALL",
    theme: searchParams.get("theme")?.toUpperCase() || "",
  });

  const fetchItems = useCallback(async (params) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/locations?${params.toString()}`,
      );
      const { data, pageInfo } = await response.json();
      setItems(data);
      setIsLoading(false);
      setTotalPages(pageInfo?.totalPages);
    } catch (e) {
      setIsLoading(false);
    }
  }, []);

  const getLocalState = useCallback(async () => {
    try {
      const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
      const { region } = await response.json();
      setFilter({ ...filter, state: [stateAbbreviations[region]] });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      filter.name === "" &&
      filter.state === "" &&
      filter.type === "ALL" &&
      filter.theme === "" &&
      currentPage === 1
    ) {
      getLocalState();
    }

    const params = getParams(filter);
    params.append("page", currentPage);

    // Fetch data
    fetchItems(params);

    if (currentPage <= 1) {
      params.delete("page");
    }

    // Update URL without triggering a re-render
    const paramsString = params.toString();
    window.history.replaceState(
      {},
      "",
      paramsString.length ? `/?${paramsString}` : "/",
    );
  }, [filter, currentPage, fetchItems, getLocalState]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Filters
          className={styles.filters}
          filter={filter}
          setFilter={(newFilter) => {
            setFilter(newFilter);
            setCurrentPage(1);
          }}
        />
        <Gallery
          className={styles.gallery}
          items={items}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          filter={filter}
        />
      </main>
      <Footer />
    </>
  );
}
