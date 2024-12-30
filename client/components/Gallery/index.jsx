"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// components
import { Badge, Card, Image, Icon } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import {
  Skeleton,
  SkeletonText,
} from "@/components/ui/skeleton";

// icons
import { GiPirateHat, GiJungle } from "react-icons/gi";
import { MdCastle, MdLightMode } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

// misc
import styles from "./index.module.css";

export default function Gallery() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(-1);

  function themeIcon(theme) {
    switch (theme) {
      case "PIRATE":
        return <GiPirateHat />;
      case "JUNGLE":
        return <GiJungle />;
      case "GLOW_IN_THE_DARK":
        return <MdLightMode />;
      case "CASTLE":
        return <MdCastle />;
      default:
        return null;
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations?page=${currentPage}`
        );
        const { data, pageInfo } = await response.json();
        setItems(data);
        setLoading(false);
        setTotalPages(pageInfo?.totalPages);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading)
    return (
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {Array.from({ length: 20 }, (_, i) => (
            <Card.Root className={styles.card} key={i} overflow="hidden">
              <Skeleton className={styles.loadingImg} height="170px" />
              <Card.Body gap="2">
                <SkeletonText noOfLines={2} />
              </Card.Body>
              <Card.Footer gap="2">
                <SkeletonText noOfLines={1} />
              </Card.Footer>
            </Card.Root>
          ))}
        </div>
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.cardContainer}>
        {items.map(({ name, id, city, state, type, theme }) => (
          <Card.Root className={styles.card} key={id} overflow="hidden">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              aspectRatio={16 / 9}
              className={styles.img}
            />
            <Card.Body gap="2">
              <Card.Title>{name}</Card.Title>
              <Card.Description>
                <p className={styles.locationContainer}>
                  <Icon fontSize="14px">
                    <FaLocationDot />
                  </Icon>
                  {city}, {state}
                </p>
              </Card.Description>
            </Card.Body>
            <Card.Footer gap="2">
              {type?.length && (
                <Badge variant="solid" colorPalette="green" size="md">
                  {type.replace().toLowerCase()}
                </Badge>
              )}
              {theme?.length && (
                <Badge variant="solid" colorPalette="green" size="md">
                  {themeIcon(theme)}
                  {theme.replace(/_/g, " ").toLowerCase()}
                </Badge>
              )}
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
      <PaginationRoot
        className={styles.paginationRoot}
        count={totalPages}
        pageSize={20}
        defaultPage={currentPage}
        getHref={(page) => `?page=${page}`}
        variant="solid"
      >
        <HStack>
          <PaginationPrevTrigger className={styles.paginationTrigger} />
          <PaginationItems className={styles.paginationItems} />
          <PaginationNextTrigger className={styles.paginationTrigger} />
        </HStack>
      </PaginationRoot>
    </div>
  );
}
