import styles from "./index.module.css";
import { Badge, Card, Image, Icon } from "@chakra-ui/react";
import { getBackground } from "@/utils";
import { GiPirateHat, GiJungle } from "react-icons/gi";
import { MdCastle, MdLightMode } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

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

export default function LocationCard({ isLoading, location }) {
  if (isLoading) {
    return (
      <Card.Root className={styles.card} overflow="hidden">
        <Skeleton className={styles.loadingImg} height="170px" />
        <Card.Body gap="2">
          <SkeletonText noOfLines={2} />
        </Card.Body>
        <Card.Footer gap="2">
          <SkeletonText noOfLines={1} />
        </Card.Footer>
      </Card.Root>
    );
  }

  return (
    <Card.Root className={styles.card} overflow="hidden">
      <Image
        src={
          location.photos.length
            ? location.photos[0].url
            : getBackground(location.type, location.theme)
        }
        alt={`${location.name} banner`}
        aspectRatio={16 / 9}
        className={styles.img}
      />
      <Card.Body gap="2">
        <Card.Title className={styles.title}>{location.name}</Card.Title>
        <Card.Description>
          <span className={styles.locationContainer}>
            <Icon fontSize="14px">
              <FaLocationDot />
            </Icon>
            {location.city}, {location.state}
          </span>
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        {Boolean(location.type) && (
          <Badge variant="solid" className={styles.badge} size="md">
            {location.type.replace().toLowerCase()}
          </Badge>
        )}
        {Boolean(location.theme) && (
          <Badge variant="solid" className={styles.badge} size="md">
            {themeIcon(location.theme)}
            {location.theme.replace(/_/g, " ").toLowerCase()}
          </Badge>
        )}
      </Card.Footer>
    </Card.Root>
  );
}
