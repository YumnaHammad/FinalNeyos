// pages/BlogDetailPage.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../style/BlogDetailPage.module.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch this data based on the ID
  const blog = {
    id: 1,
    title:
      "Cracking the Congestion Code: Why Precision ANPR is Critical to the Cities of Tomorrow",
    date: "April 29, 2025",
    categories: ["Solution"],
    image: "https://www.milesight.com/static/5-654x327.jpg?t=1746697650604",
    content: `
      <p>Urban congestion is a growing challenge for cities worldwide. As populations increase and more vehicles hit the roads, traditional traffic management systems are struggling to keep up. This is where Automatic Number Plate Recognition (ANPR) technology comes into play, offering a smarter solution for the cities of tomorrow.</p>
      
      <h3>The Congestion Challenge</h3>
      <p>In major metropolitan areas, traffic congestion costs billions annually in lost productivity and increased pollution. Traditional traffic monitoring methods often rely on manual observation or simple vehicle counters, which lack the precision needed for effective traffic flow optimization.</p>
      
      <h3>How Precision ANPR Makes a Difference</h3>
      <p>High-accuracy ANPR systems like those developed by Milesight provide:</p>
      <ul>
        <li>Real-time vehicle identification with 99%+ accuracy</li>
        <li>Detailed traffic pattern analysis</li>
        <li>Automated enforcement of congestion zones</li>
        <li>Integration with smart city infrastructure</li>
      </ul>
      
      <h3>Case Study: Singapore's Smart Traffic System</h3>
      <p>Singapore has implemented an ANPR-based Electronic Road Pricing system that has reduced peak hour congestion by 22%. The system dynamically adjusts toll rates based on real-time traffic conditions detected by ANPR cameras.</p>
      
      <h3>The Future of Urban Mobility</h3>
      <p>As cities continue to grow, precision ANPR will play an increasingly critical role in:</p>
      <ul>
        <li>Supporting autonomous vehicle infrastructure</li>
        <li>Enabling smart parking solutions</li>
        <li>Facilitating emergency vehicle routing</li>
        <li>Providing data for urban planning</li>
      </ul>
      
      <p>Milesight's ANPR solutions are at the forefront of this transformation, helping cities worldwide build smarter, more efficient transportation networks.</p>
    `,
  };

  return (
    <Container className={styles.blogDetailPage}>
      <Button
        variant="outline-primary"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back to Blog
      </Button>

      <article>
        <header className={styles.blogHeader}>
          <div className={styles.categoryBadges}>
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className={`badge bg-primary ${styles.categoryBadge}`}
              >
                {category}
              </span>
            ))}
          </div>
          <h1 className={styles.blogTitle}  data-aos="fade-right">{blog.title}</h1>
          <p className={styles.blogDate}>Published on {blog.date}</p>
        </header>

        <div className={styles.blogImageContainer}>
          <img src={blog.image} alt={blog.title} className={styles.blogImage} />
        </div>

        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </Container>
  );
};

export default BlogDetailPage;
