import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Form,
  Nav,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


// Import images (in a real project, you would place these in your assets folder)
const productImages = {
  building:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/milesight-smart-green-building-for-enhanced-energy-efficiency.jpg",
  city: "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/smart-city-upgrade-in-turkey-central-diagram.jpg",
  poultry:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/smart-poultry-mileisght-in-japan.png",
  energy:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/power-consumption-iot-canada-milesight.jpg",
  agriculture:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/iot-enhancing-public-amenities-monitoring-in-australia.jpg?t=1744350118562",
  healthcare:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/iot-enhancing-public-amenities-monitoring-in-australia.jpg?t=1744350118562",
  industrial:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/iot-enhancing-public-amenities-monitoring-in-australia.jpg?t=1744350118562",
  retail:
    "https://www.milesight.com/static/pc/en/company/success-stories/index/iot/iot-enhancing-public-amenities-monitoring-in-australia.jpg?t=1744350118562",
};

const SuccessCard = () => {
  // Tabs data
  const tabs = [
    { id: "all", name: "All" },
    { id: "tdf", name: "TDF" },
    { id: "smasse", name: "smasse, kiebert" },
    { id: "papi", name: "papi" },
    { id: "pspf", name: "pspf" },
  ];

  // Filter options
  const productModels = [
    { value: "all", label: "All" },
    { value: "AM319", label: "AM319" },
    { value: "AM1031", label: "AM1031" },
    { value: "DS3504", label: "DS3504" },
    { value: "GS301", label: "GS301" },
    { value: "V6330", label: "V6330" },
    { value: "U067", label: "U067" },
    { value: "UC300", label: "UC300" },
  ];

  const productCategories = [
    { value: "all", label: "All" },
    { value: "BuildingOffice", label: "BuildingOffice" },
    { value: "City", label: "City" },
    { value: "Smart Poultry", label: "Smart Poultry" },
    { value: "Smart Water", label: "Smart Water" },
    { value: "Energy", label: "Energy" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Industrial", label: "Industrial" },
    { value: "Retail", label: "Retail" },
  ];

  // Tags data
  const allTags = [
    "BuildingOffice",
    "City",
    "Smart Poultry",
    "Smart Water",
    "AM319",
    "AM1031",
    "DS3504",
    "GS301",
    "V6330",
    "U067",
    "UC300",
  ];

  // Sample product data with images
  const sampleProducts = [
    {
      id: 1,
      title: "Nexyos Green Building",
      location: "China",
      category: "BuildingOffice",
      models:
        "AM319 / AM1031 / DS3504 / GS301 / V6330 / V6133 / V6121 / V6558 / V6520 / V6150",
      tab: "all",
      image: productImages.building,
    },
    {
      id: 2,
      title: "IoT Solution Empowering Smart City in Turkey",
      location: "Turkey",
      category: "City",
      models: "U067 / WT5506 / EU650-UDL / EU650-CO",
      tab: "all",
      image: productImages.city,
    },
    {
      id: 3,
      title: "Smart Poultry in Japan",
      location: "Myazaki, Japan",
      category: "Smart Poultry",
      models: "EM509-CO / U067",
      tab: "all",
      image: productImages.poultry,
    },
    {
      id: 4,
      title: "Smart Water in Slovakia",
      location: "Trenčin, Slovakia",
      category: "Smart Water",
      models: "UC300",
      tab: "all",
      image: productImages.energy,
    },
    {
      id: 5,
      title: "Energy Monitoring in Canada",
      location: "Toronto, Canada",
      category: "Energy",
      models: "EM500-PP / UC511",
      tab: "all",
      image: productImages.energy,
    },
    {
      id: 6,
      title: "Agricultural IoT Solution",
      location: "Netherlands",
      category: "Agriculture",
      models: "WS101 / WS156",
      tab: "all",
      image: productImages.agriculture,
    },
    {
      id: 7,
      title: "Healthcare Monitoring System",
      location: "USA",
      category: "Healthcare",
      models: "EM500-CO2 / EM500-UDL",
      tab: "all",
      image: productImages.healthcare,
    },
    {
      id: 8,
      title: "Industrial IoT Solution",
      location: "Germany",
      category: "Industrial",
      models: "UR32 / UR35",
      tab: "all",
      image: productImages.industrial,
    },
    {
      id: 9,
      title: "Retail Environment Control",
      location: "France",
      category: "Retail",
      models: "VS121 / VS133",
      tab: "all",
      image: productImages.retail,
    },
    // Additional products for the new categories
    {
      id: 10,
      title: "Advanced Building Automation",
      location: "Singapore",
      category: "BuildingOffice",
      models: "V6330 / V6121 / V6558",
      tab: "all",
      image: productImages.building,
    },
    {
      id: 11,
      title: "Urban Smart City Network",
      location: "Dubai",
      category: "City",
      models: "U067 / WT5506",
      tab: "all",
      image: productImages.city,
    },
    {
      id: 12,
      title: "Poultry Farm Monitoring",
      location: "Brazil",
      category: "Smart Poultry",
      models: "EM509-CO / U067",
      tab: "all",
      image: productImages.poultry,
    },
  ];

  const [products] = useState(sampleProducts);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedModel, setSelectedModel] = useState(productModels[0]);
  const [selectedCategory, setSelectedCategory] = useState(
    productCategories[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  // Filter products based on selections
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Tab filtering
      if (activeTab !== "all" && product.tab !== activeTab) {
        return false;
      }

      // Model filtering
      if (
        selectedModel.value !== "all" &&
        !product.models.includes(selectedModel.value)
      ) {
        return false;
      }

      // Category filtering
      if (
        selectedCategory.value !== "all" &&
        product.category !== selectedCategory.value
      ) {
        return false;
      }

      // Search filtering
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Tag filtering
      if (selectedTags.length > 0) {
        const productTags = [product.category, ...product.models.split(" / ")];
        return selectedTags.some((tag) => productTags.includes(tag));
      }

      return true;
    });
    setFilteredProducts(filtered);
  }, [
    activeTab,
    selectedModel,
    selectedCategory,
    searchQuery,
    selectedTags,
    products,
  ]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Container className="products-page">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="page-title">All Products</h1>
        </Col>
      </Row>

      {/* Tabs */}
      <Row className="mb-4">
        <Col md={12}>
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={setActiveTab}
            className="custom-tabs"
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab.id}>
                <Nav.Link eventKey={tab.id} className="text-nowrap">
                  {tab.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4 align-items-end">
        <Col md={3} className="mb-3">
          <Form.Group controlId="search">
            <Form.Label className="filter-label">Search</Form.Label>
            <Form.Control
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Group controlId="modelFilter">
            <Form.Label className="filter-label">Model</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                className="w-100 filter-dropdown"
              >
                {selectedModel.label}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {productModels.map((model) => (
                  <Dropdown.Item
                    key={model.value}
                    active={selectedModel.value === model.value}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Group controlId="categoryFilter">
            <Form.Label className="filter-label">Category</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                className="w-100 filter-dropdown"
              >
                {selectedCategory.label}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {productCategories.map((category) => (
                  <Dropdown.Item
                    key={category.value}
                    active={selectedCategory.value === category.value}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3 text-end">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedModel(productModels[0]);
              setSelectedCategory(productCategories[0]);
              setSearchQuery("");
              setSelectedTags([]);
            }}
            className="reset-btn"
          >
            Reset
          </Button>
        </Col>
      </Row>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <Row className="mb-3">
          <Col md={12}>
            <div className="selected-tags">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  pill
                  bg="primary"
                  className="me-2 mb-2 tag-badge"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
              <Button
                variant="link"
                size="sm"
                className="clear-all"
                onClick={() => setSelectedTags([])}
              >
                Clear all
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* Available Tags */}
      <Row className="mb-4">
        <Col md={12}>
          <div className="available-tags">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={selectedTags.includes(tag) ? "primary" : "light"}
                text={selectedTags.includes(tag) ? "white" : "dark"}
                className="me-2 mb-2 tag-badge"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>

      {/* Product Cards */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col
              key={product.id}
              xl={3}
              lg={4}
              md={6}
              className=""
              style={{
                marginBottom: "50px",
              }}
            >
              <Card className="product-card h-100" style={{ width: "100%", margin: 0 }}>
                <div className="product-image-container">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="product-title">
                    {product.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted location">
                    <i className="bi bi-geo-alt"></i> {product.location}
                  </Card.Subtitle>
                  <div className="product-category mb-2">
                    <span className="badge bg-primary">{product.category}</span>
                  </div>
                  <Card.Text className="product-models">
                    {product.models}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center py-5 no-results">
            <h4>No products found matching your criteria</h4>
          </Col>
        )}
      </Row>

      <Row className="mt-5">
        <Col md={12} className="text-center">
          <Button variant="outline-primary" size="lg" className="contact-btn">
            Contact Us
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessCard;
