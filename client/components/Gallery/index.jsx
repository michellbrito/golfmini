"use client";

// components
import { Badge, Card, Image, Icon } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationPageText,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { List } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";

// icons
import { GiPirateHat, GiJungle } from "react-icons/gi";
import { MdCastle, MdLightMode } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiColorSwatch } from "react-icons/hi";

// misc
import styles from "./index.module.css";
import { getParams } from "@/utils";

export default function Gallery({
  items,
  isLoading,
  totalPages,
  currentPage,
  filter,
}) {
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

  if (isLoading)
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

  if (!isLoading && items.length === 0) {
    return (
      <EmptyState
        icon={<HiColorSwatch color="#685752" />}
        title="No results found"
        color="#FDF7F4"
        className={styles.emptyState}
      >
        <List.Root variant="marker">
          <List.Item _marker={{ color: "#685752" }}>
            Try removing filters
          </List.Item>
          <List.Item _marker={{ color: "#685752" }}>
            Try different keywords
          </List.Item>
        </List.Root>
      </EmptyState>
    );
  }

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
                <Badge variant="solid" className={styles.badge} size="md">
                  {type.replace().toLowerCase()}
                </Badge>
              )}
              {theme?.length && (
                <Badge variant="solid" className={styles.badge} size="md">
                  {themeIcon(theme)}
                  {theme.replace(/_/g, " ").toLowerCase()}
                </Badge>
              )}
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationRoot
          className={styles.paginationRoot}
          count={totalPages * 20}
          pageSize={20}
          page={currentPage}
          getHref={(page) => {
            const params = getParams(filter);
            params.append("page", page);
            return `?${params.toString()}`;
          }}
          variant="solid"
        >
          <HStack className={styles.mobilePagination}>
            <PaginationPrevTrigger className={styles.paginationTrigger} />
            <PaginationPageText className={styles.mobilePagination} />
            <PaginationNextTrigger className={styles.paginationTrigger} />
          </HStack>
          <HStack className={styles.desktopPagination}>
            <PaginationPrevTrigger className={styles.paginationTrigger} />
            <PaginationItems activeClass={styles.activePaginationItem} />
            <PaginationNextTrigger className={styles.paginationTrigger} />
          </HStack>
        </PaginationRoot>
      )}
    </div>
  );
}
