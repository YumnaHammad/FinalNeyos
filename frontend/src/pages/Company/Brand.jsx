import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../style/WhatMatters.css";
import SensingProducts from "../../components/Company/Sensing";
import SliderPartner from "../../components/Company/SliderPartner";
import Contact from "../../components/Contact";
import BannerSection from "../../components/BannerSection";

const Brand = () => {
  const [BannerData, setBannerData] = useState(null);
  const [brandHeader, setBrandHeader] = useState(null);
  const [brandCards, setBrandCards] = useState(null);
  const [iconCards, setIconCards] = useState([]);
  const [innovativeData, setInnovativeData] = useState(null);
  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/our-brand/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

  const fetchIconCards = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/our-brand/section-2"
      );
      const data = await response.json();
      setIconCards(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching icon cards:", error);
    }
  };
  const [leftData, setLeftData] = useState(null);
  const [rightIcons, setRightIcons] = useState([]);
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchBrand = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/our-brand/section-3"
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setBrandHeader(data[0]); // headings, description
        setBrandCards(data[1]); // cards data
      }
    } catch (error) {
      console.error("Error fetching icon cards:", error);
    }
  };
    const fetchInnovativecards = async () => {
     try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/our-brand/section-4"
      );
      const data = await response.json();
      setInnovativeData(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  useEffect(() => {
    fetch("https://nexyos.deeptech.pk/api/our-brand/section-2-left-side")
      .then((res) => res.json())
      .then((data) => setLeftData(Array.isArray(data) ? data[0] : data));

    fetch("https://nexyos.deeptech.pk/api/our-brand/section-2")
      .then((res) => res.json())
      .then((data) => setRightIcons(Array.isArray(data) ? data : []));
    fetchBannerData();
    fetchIconCards();
    fetchInnovativecards();
    fetchBrand();
  }, []);
  return (
    <>
      {BannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-left"
          textAlign="text-left"
          textColor="text-[#121535]"
          title={BannerData.heading}
          subtitle={BannerData.description}
          image={BannerData.image}
        />
      )}
      <Container className="center-wrap">
        <Row className="align-items-center">
          {/* Left Content */}
          <Col md={6} className="content-left pe-md-5">
            <h2
              className="title mb-4 animate__animated animate__fadeInUp"
              data-aos="fade-right"
            >
              {leftData?.heading}
            </h2>
            <p className="text mb-4 animate__animated animate__fadeInUp">
              {leftData?.description}
            </p>
            <div className="mt-4 pt-3 border-top text-muted small">
              <div>
                <strong>Created:</strong> {formatDate(leftData?.created_at)}
              </div>
              <div>
                <strong>Last updated:</strong>{" "}
                {formatDate(leftData?.updated_at)}
              </div>
            </div>
          </Col>
          {/* Right Content */}
          <Col md={6} className="content-right">
            <Card className="p-4 animate__animated animate__fadeInUp">
              <Card.Body>
                <h4 className="card__title mb-4" data-aos="fade-right">
                  At Nexyos, everything we do is about{" "}
                  <span className="text-primary">Making Sensing Matter</span> so
                  that:
                </h4>
                <Row className="card__icons g-4">
                  {rightIcons.map((item, index) => (
                    <Col
                      xs={12}
                      md={4}
                      className="card__icon text-center"
                      key={index}
                    >
                      <img
                        alt="make sensing matter data icon"
                        src={item.image}
                        className="img-fluid mb-3"
                        style={{ height: "60px" }}
                      />
                      <p className="icon__text">{item.heading}</p>
                    </Col>
                  ))}
                </Row>
                <p className="card__text mt-4">
                  To make sensing truly work across challenges, applications,
                  and industries, that's what "matter" means to us.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {brandHeader && brandCards && (
        <SensingProducts
          heading={brandHeader.heading}
          heading2={brandHeader.heading_2}
          description={brandHeader.description}
          cardHeading={brandCards.heading}
          cardImage={brandCards.image}
          cardDescription={brandCards.description}
        />
      )}
      {innovativeData &&(
        <SliderPartner index={innovativeData.id} title={innovativeData.title} image={innovativeData.image} />
      )}
      
    
      <Contact />
    </>
  );
};

export default Brand;
