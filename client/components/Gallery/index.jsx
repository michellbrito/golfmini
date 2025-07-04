"use client";

// components
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationPageText,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import { List } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import LocationCard from "@/components/LocationCard/index.jsx";

// icons
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
  if (isLoading)
    return (
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {Array.from({ length: 20 }, (_, i) => (
            <div className={styles.cardLink} key={i}>
              <LocationCard isLoading />
            </div>
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
        {items.map(({ name, id, city, state, type, theme, photos }) => (
          <a
            href={`/locations/${id}`}
            target="_blank"
            className={styles.cardLink}
            key={id}
            onClick={() => {
              window.clarity("event", "location_card_clicked");
            }}
          >
            <LocationCard
              location={{
                name,
                id,
                city,
                state,
                type,
                theme,
                photos,
              }}
            />
          </a>
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
