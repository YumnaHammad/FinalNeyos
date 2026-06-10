import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaAirFreshener,
  FaUsers,
  FaCar,
  FaRunning,
  FaTint,
  FaRuler,
  FaTemperatureLow,
  FaEllipsisH,
} from "react-icons/fa";
import styles from "../../style/SensingProducts.module.css";

const SensingProducts = ({
  heading,
  heading2,
  description,
  cardHeading,
  cardImage,
  cardDescription,
}) => {
  // const products = [
  //   {
  //     name: "Indoor Air Quality Monitoring",
  //     icon: <FaAirFreshener className={styles.productIcon} />,
  //   },
  //   {
  //     name: "Occupancy and People Counting",
  //     icon: <FaUsers className={styles.productIcon} />,
  //   },
  //   {
  //     name: "License Plate Recognition",
  //     icon: <FaCar className={styles.productIcon} />,
  //   },
  //   {
  //     name: "Motion Detection",
  //     icon: <FaRunning className={styles.productIcon} />,
  //   },
  //   {
  //     name: "Water Leak Detection",
  //     icon: <FaTint className={styles.productIcon} />,
  //   },
  //   {
  //     name: "Distance Detection",
  //     icon: <FaRuler className={styles.productIcon} />,
  //   },
  //   {
  //     name: "Temperature and Humidity Monitoring",
  //     icon: <FaTemperatureLow className={styles.productIcon} />,
  //   },
  //   {
  //     name: "And more",
  //     icon: <FaEllipsisH className={styles.productIcon} />,
  //   },
  // ];

  return (
    <div className={`${styles.sensingProducts} `}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className={styles.sectionTitle} data-aos="fade-right">
              {heading}
            </h2>
            <h3 className={styles.sectionSubtitle} data-aos="fade-right">
              {heading2}
            </h3>
            <p className={styles.sectionDescription}>{description}</p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`${styles.productCard} h-100`}
              style={{ width: "100%", margin: 0 }}
            >
              <Card.Body className="text-center">
                <div className={styles.iconWrapper}>
                  {" "}
                  <img
                    src={cardImage}
                    alt={cardHeading}
                    className="img-fluid mb-3"
                    style={{ height: "60px" }}
                  />
                </div>
                <Card.Text className={styles.productName}>
                  {cardHeading}
                </Card.Text>
                  <Card.Text className={styles.productName}>
                  {cardDescription}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SensingProducts;
