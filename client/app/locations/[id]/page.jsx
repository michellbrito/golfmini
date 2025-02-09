"use client";
import { useEffect, useState, use } from "react";

// components
import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import { Text } from "@chakra-ui/react";
import { Badge, Card, Image } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Slider from "react-slick";

// icons
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineLocationOff } from "react-icons/md";

// misc
import styles from "./page.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Page({ params }) {
  const resolvedParams = use(params);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/${resolvedParams.id}`,
        );
        const data = await response.json();
        setLocation(data.error ? null : data);
        setIsLoading(false);
        document.title = `${data?.name} | GolfMini` || "GolfMini";
      } catch (e) {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className={styles.loadingContainer}>
          <Spinner size="xl" color={"#FDF7F4"} borderWidth="3px" />
        </div>
        <Footer />
      </>
    );
  }

  if (!location) {
    return (
      <>
        <Navbar />
        <div className={styles.notFoundContainer}>
          <MdOutlineLocationOff color="#685752" />
          <p>Location not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.root}>
        <div className={styles.top}>
          <Slider {...settings} className={styles.slider}>
            {location.photos.map((photo, index) => (
              <Image
                key={index}
                className={styles[`img${index + 1}`]}
                src={photo.url}
              />
            ))}
          </Slider>
          {location.photos.map((photo, index) => (
            <Image
              key={index}
              className={`${styles[`img${index + 1}`]} ${styles.desktopImg}`}
              src={photo.url}
            />
          ))}
        </div>
        <div className={styles.bottom}>
          <Card.Root className={styles.card} overflow="hidden">
            <Card.Header className={styles.cardHeader} gap="2">
              <Text textStyle="xl">{location?.name}</Text>
            </Card.Header>
            <Card.Body gap="2">
              <div className={styles.badges}>
                {location.type?.length && (
                  <Badge variant="solid" className={styles.badge} size="md">
                    {location.type.replace().toLowerCase()}
                  </Badge>
                )}
                {location.theme?.length && (
                  <Badge variant="solid" className={styles.badge} size="md">
                    {location.theme.replace(/_/g, " ").toLowerCase()}
                  </Badge>
                )}
              </div>
              <p className={styles.cardHeader}>Contact</p>
              <div className={styles.contact}>
                <a
                  href={`tel:${location.phoneNumber}`}
                  className={styles.cardLink}
                >
                  <FaPhoneAlt />
                  {location.phoneNumber}
                </a>
                {location.website && (
                  <a className={styles.cardLink} href={location.website}>
                    <TbWorldWww className={styles.websiteIcon} />
                    Website
                  </a>
                )}
              </div>
              <div className={styles.locationInfo}>
                <p className={styles.cardHeader}>Location</p>
                <div className={styles.cardData}>
                  <p>
                    {location.street}, {location.city}, {location.state}{" "}
                    {location.zipcode}
                  </p>
                </div>
              </div>
              <p className={styles.cardHeader}>Hours</p>
              <div className={styles.cardData}>
                {location.hours.map((hour) => (
                  <p key={hour.day}>
                    {hour.day}: {hour.openTime} - {hour.closeTime}
                  </p>
                ))}
              </div>
            </Card.Body>
          </Card.Root>
          <Card.Root
            className={`${styles.card} ${styles.locationContainer}`}
            overflow="hidden"
          >
            <Card.Header className={styles.cardHeader} gap="2">
              <Text textStyle="xl">Location</Text>
            </Card.Header>
            <Card.Body gap="2">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDuTtnordK-jeDPLXkj3itLanKSmrgGlaM
    &q=${location.name} ${location.zipcode}`}
              ></iframe>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
      <Footer />
    </>
  );
}
