import React, { useState, useEffect } from "react";
import styles from "../../style/NewsPage.module.css";
import BannerNews from "../../components/Company/BannerNews";



const years = ["All", "2025", "2024", "2023", "2022", "2021"];

const NewsPage = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
const [newsData, setNewsData] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/news"
      );
      const data = await response.json();
     setNewsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching icon cards:", error);
    }
  };
  const filteredNews = newsData.filter((item) => {
    const matchesYear =
      selectedYear === "All" || item.year === Number(selectedYear) ||
      item.year === undefined;
    const matchesSearch =
     item.head?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <>
      <BannerNews />
      <div className={styles.newsContainer}>
        <div className={styles.filters}>
          <div className={styles.years}>
            {years.map((year) => (
              <button
                key={year}
                className={`${styles.yearBtn} ${
                  selectedYear === year ? styles.active : ""
                }`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.newsList}>
          {filteredNews.map((item, idx) => (
            <div key={idx} className={styles.newsCard}>
              <img src={item.image} alt="news" className={styles.newsImage} />
              <div className={styles.newsContent}>
                <div className={styles.newsTitle}>{item.head}</div>
                {item.date && (
                  <div className={styles.newsDate}>{item.date}</div>
                )}
                <div className={styles.newsDescription}  dangerouslySetInnerHTML={{ __html: item.desc }}/>
              </div>
            </div>
          ))}
          {filteredNews.length === 0 && (
            <p className={styles.noResults}>No news found for this filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
