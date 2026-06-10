import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import styles from "../../style/EventCard.module.css";
import BannerEvent from "../../components/Company/EventBanner";
import Contact from "../../components/Contact";

const Events = () => {
  const [activeTab, setActiveTab] = useState("all");

  const events = [
    {
      id: 1,
      title: "Asia Tech",
      date: "May 27 - 29, Singapore",
      location: "Singapore EXPO, SEI-7",
      status: "register",
      category: "Summit",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/smart-building-background.png?t=1747099413572",
    },
    {
      id: 2,
      title: "Roadshow with Partners",
      date: "May 28 - Oct. 22, Italy",
      location: "Italy",
      status: "register",
      category: "Roadshow",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/roadshow-with-partners-background.png?t=1747099413572",
    },
    {
      id: 3,
      title: "Realcomm",
      date: "June 3 - 4, USA",
      location: "International Dr. Savannah, CA 31421 Hall, 1021",
      status: "register",
      category: "Conference",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/realcomm-background.png?t=1747099413572",
    },
    {
      id: 4,
      title: "NRF APAC",
      date: "June 3 - 5, Singapore",
      location: "Marina Bay Sands, Singapore, SP22",
      status: "coming soon",
      category: "Summit",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/pc-nrf-apac-background.png?t=1747099413572",
    },
    {
      id: 5,
      title: "Smart Building Day",
      date: "Apr. 24, Hong Kong",
      location: "Kowloon Shangri-La Hong Kong",
      status: "register",
      category: "IoT",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/milesight-events-bg1.png?t=1747099413572",
    },
    {
      id: 6,
      title: "SECTECH Roadshow",
      date: "May 8/ May 15/ May 20/ May 22/ May 27",
      location: "RCC, Brisbane/ Rosehill Gardens, Sydney",
      status: "coming soon",
      category: "CCTV",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/milesight-events-sectech.png?t=1747099413572",
    },
    {
      id: 7,
      title: "IOTSWC",
      date: "May 13 - 15, Spain",
      location: "Gran Via Venue, Barcelona B16",
      status: "register",
      category: "IOT SOLUTIONS",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/milesight-events-iot.png?t=1747099413572",
    },
    {
      id: 8,
      title: "AIRAH IAO",
      date: "May 26 - 27, Australia",
      location: "Melbourne",
      status: "coming soon",
      category: "IAQ25",
      image:
        "https://www.milesight.com/static/pc/en/company/events/index/pc-iaq25-background.png?t=1747099413572",
    },
  ];

  // Get unique categories for tabs
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  // Filter events based on active tab
  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((event) => event.category === activeTab);

  return (
    <>
      <BannerEvent />
      <div className={styles.eventsContainer}>
        <Container>
          {/* Header Section */}
          <div className={styles.header}>
            <h1 className={styles.mainTitle}  data-aos="fade-right">AIX SUMMIT</h1>
            <p className={styles.subtitle}>
              Discover upcoming events and conferences in the tech industry.
              Join us to learn about the latest innovations and network with
              professionals.
            </p>
          </div>

          {/* Tabs Navigation */}
          <Nav
            variant="pills"
            className={styles.navTabs}
            activeKey={activeTab}
            onSelect={setActiveTab}
          >
            {categories.map((category) => (
              <Nav.Item key={category} className={styles.navItem}>
                <Nav.Link
                  eventKey={category}
                  className={styles.navLink}
                  active={activeTab === category}
                >
                  {category === "all" ? "All Events" : category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Events Grid */}
          <Row>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Col
                  key={event.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={styles.cardcol}
                >
                 <Card 
  className={styles.card} 
  style={{ width: '100%', margin: 0, height: '540px', display: 'flex', flexDirection: 'column' }}
>
  <Card.Img
    variant="top"
    src={event.image}
    className={styles.cardImage}
    alt={event.title}
    style={{ width: '100%', height: '200px', objectFit: 'cover' }} // fixed image height, adjust as needed
  />
  <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className={styles.cardBody}>
    <Card.Title className={styles.cardTitle}>
      {event.title}
    </Card.Title>
    <div className={styles.eventMeta}>
      <div className={styles.eventDate}>{event.date}</div>
      <div className={styles.eventLocation}>{event.location}</div>
    </div>
    {event.status === "coming soon" ? (
      <div className={styles.comingSoon}>Coming Soon</div>
    ) : (
      <Button
        variant="primary"
        className={styles.registerBtn}
      >
        Register Now
      </Button>
    )}
  </Card.Body>
</Card>

                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <h4  data-aos="fade-right">No events found in this category</h4>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <Contact />
    </>
  );
};

export default Events;
