"use client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Badge, Card, Image, Tabs, Button } from "@chakra-ui/react";
import { FaLocationDot, FaKey } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { getBackground, getStateFullName } from "@/utils";
import { MdOutlineLocationOff } from "react-icons/md";
import { Spinner } from "@chakra-ui/react";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";
import CitiesList from "@/components/CitiesList";
import LocationCard from "@/components/LocationCard";
import Slider from "react-slick";
import styles from "./location.module.css";

export default function Layout({ id }) {
  const [cities, setCities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState(null);
  const [value, setValue] = useState("overview");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`,
        );
        const locationData = await locationResponse.json();
        const nearbyLocationsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/nearby?zipcode=${locationData.location.zipcode}&state=${locationData.location.state}`,
        );
        const nearbyLocationsData = await nearbyLocationsResponse.json();
        setLocation(locationData.error ? null : locationData.location);
        setCities(locationData.error ? null : locationData.cities);
        setNearbyLocations(
          nearbyLocationsData.error ? null : nearbyLocationsData,
        );
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function topContainer(styles) {
    const classes = [styles.top];
    switch (location.photos.length) {
      case 0:
      case 1:
        classes.push(styles.grid1);
        break;
      case 2:
        classes.push(styles.grid2);
        break;
      case 3:
        classes.push(styles.grid3);
        break;
      case 4:
        classes.push(styles.grid4);
        break;
      case 5:
        classes.push(styles.grid5);
        break;
    }
    return classes.join(" ");
  }

  if (isLoading) {
    return (
      <>
        <div className={styles.loadingContainer}>
          <Spinner size="xl" color={"#FDF7F4"} borderWidth="3px" />
        </div>
      </>
    );
  }

  if (!location) {
    return (
      <>
        <div className={styles.notFoundContainer}>
          <MdOutlineLocationOff color="#685752" />
          <p>Location not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className={topContainer(styles)}>
          {location.photos.length === 0 || location.photos.length === 1 ? (
            <Image
              className={`${styles.img1} ${styles.slider}`}
              src={getBackground(location.type, location.theme, "original")}
            />
          ) : (
            <Slider {...settings} className={styles.slider}>
              {location.photos.map((photo, index) => (
                <Image
                  key={index}
                  className={styles[`img${index + 1}`]}
                  src={photo.url}
                />
              ))}
            </Slider>
          )}
          {location.photos.length === 0 ? (
            <Image
              className={`${styles.img1} ${styles.desktopImg}`}
              src={getBackground(location.type, location.theme, "original")}
            />
          ) : (
            <>
              {location.photos.map((photo, index) => (
                <Image
                  key={index}
                  className={`${styles[`img${index + 1}`]} ${styles.desktopImg}`}
                  src={photo.url}
                />
              ))}
            </>
          )}
        </div>
        <div className={styles.bottom}>
          <Card.Root className={styles.card}>
            <Tabs.Root
              value={value}
              onValueChange={(e) => setValue(e.value)}
              fitted
              variant={"outline"}
            >
              <Tabs.List>
                <Tabs.Trigger
                  className={styles.tabTrigger}
                  value="overview"
                  onClick={() => {
                    window.clarity("event", "overview_tab_clicked");
                  }}
                >
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger
                  className={styles.tabTrigger}
                  value="nearbyLocations"
                  onClick={() => {
                    window.clarity("event", "nearby_locations_tab_clicked");
                  }}
                >
                  Nearby Locations
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="overview" className={styles.tabContent}>
                <div className={styles.contentGrid}>
                  <p className={styles.name}>{location?.name}</p>
                  <div className={styles.badges}>
                    {Boolean(location.type) && (
                      <Badge variant="solid" className={styles.badge} size="lg">
                        {location.type.replace().toLowerCase()}
                      </Badge>
                    )}
                    {Boolean(location.theme) && (
                      <Badge variant="solid" className={styles.badge} size="lg">
                        {location.theme.replace(/_/g, " ").toLowerCase()}
                      </Badge>
                    )}
                    <Button
                      tabIndex="-1"
                      className={styles.claimBtn}
                      size="xs"
                      asChild
                    >
                      <a
                        href="https://forms.gle/DJvB4E68bdUrQ3EF6"
                        target="_blank"
                        onClick={() => {
                          window.clarity(
                            "event",
                            "claim_this_course_btn_clicked",
                          );
                        }}
                      >
                        <FaKey />
                        Own This Course? Claim Now
                      </a>
                    </Button>
                  </div>
                  <div className={styles.contactContainer}>
                    <p className={styles.cardHeader}>Contact</p>
                    <div className={styles.contact}>
                      <a
                        href={`tel:${location.phoneNumber}`}
                        className={styles.cardLink}
                        onClick={() => {
                          window.clarity("event", "call_btn_clicked");
                        }}
                      >
                        <Button className={styles.contactCTA} size="xs">
                          <FaPhoneAlt />
                          Call
                        </Button>
                      </a>
                      {location.website && (
                        <a
                          className={styles.cardLink}
                          href={location.website}
                          target="_blank"
                          onClick={() => {
                            window.clarity("event", "website_btn_clicked");
                          }}
                        >
                          <Button className={styles.contactCTA} size="xs">
                            <TbWorldWww />
                            Website
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={styles.hoursContainer}>
                    <p className={styles.cardHeader}>Hours</p>
                    <div className={styles.cardData}>
                      {location.hours?.length > 0 ? (
                        location.hours.map((hour) => (
                          <p key={hour.day}>
                            {hour.day}:{" "}
                            {hour.openTime === "CLOSED"
                              ? "CLOSED"
                              : `${hour.openTime} - ${hour.closeTime}`}
                          </p>
                        ))
                      ) : (
                        <p>No hours available</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.locationInfo}>
                    <p className={styles.cardHeader}>Location</p>
                    <div className={styles.cardData}>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.zipcode}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLink}
                      >
                        <FaLocationDot />
                        {location.street}, {location.city}, {location.state}{" "}
                        {location.zipcode}
                      </a>
                      <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen={true}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    &q=${encodeURIComponent(`${location.name} ${location.zipcode}`)}`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content
                value="nearbyLocations"
                className={styles.tabContent}
              >
                <div className={styles.nearbyLocationsContainer}>
                  {nearbyLocations.map(
                    ({ name, id, city, state, type, theme, photos }) => (
                      <a
                        href={`/locations/${id}`}
                        target="_blank"
                        className={styles.locationLink}
                        key={id}
                        onClick={() => {
                          window.clarity(
                            "event",
                            "nearby_location_card_clicked",
                          );
                        }}
                      >
                        <LocationCard
                          colorMode="dark"
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
                    ),
                  )}
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Root>
        </div>
        <CitiesList
          className={styles.citiesList}
          cities={cities}
          state={getStateFullName(location.state)}
        />
      </div>
    </>
  );
}
