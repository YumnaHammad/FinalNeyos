import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "../../components/Blog/BlogCard";
import CategoryTabs from "../../components/Blog/CategoryTabs";
import SearchBar from "../../components/Searchbar";
import styles from "../../style/BlogPage.module.css";
import BannerBlog from "../../components/Company/BannerBlog";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch blog data
  useEffect(() => {
    const fetchBlogsAndCategories = async () => {
      try {
        // Fetch blogs
        const blogRes = await axios.get("https://nexyos.deeptech.pk/api/blogs");
        const formatted = blogRes.data.map((blog) => ({
          id: blog.id,
          title: blog.head, 
          excerpt: blog.desc?.replace(/(<([^>]+)>)/gi, "").slice(0, 120) + "...", // ✅ from API
          date: "August 2025",
          categories: Array.isArray(blog.categories) && blog.categories.length > 0
            ? [...new Set(blog.categories)]
            : ["Solution"],
          image: blog.image, // ✅ from API
        }));
        setBlogs(formatted);

        // Fetch categories separately from API
        const catRes = await axios.get("https://nexyos.deeptech.pk/api/blogs/category");
        const uniqueCategories = Array.isArray(catRes.data)
          ? [...new Set(catRes.data.map(cat => cat.name))]
          : [];
        setCategories([ ...uniqueCategories]);



      } catch (error) {
        console.error("Failed to fetch blogs or categories:", error);
      }
    };

    fetchBlogsAndCategories();
  }, []);


  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.categories.includes(activeCategory);
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <BannerBlog />
      <Container className={styles.blogPage}>
        <Row className="mb-4">
          <Col md={8}>
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </Col>
          <Col md={4}>
            <SearchBar onSearch={setSearchTerm} />
          </Col>
        </Row>

        <Row>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Col key={blog.id} xs={12} sm={6} lg={4} className={styles.blogcols}>
                <BlogCard blog={blog} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4 data-aos="fade-right">No blogs found matching your criteria</h4>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
