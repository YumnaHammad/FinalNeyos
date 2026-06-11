import Breadcrumb from '../../components/Breadcrumb';
import Contact from '../../components/Contact';
import ProductCatalog from '../../components/products/ProductCatalog';
import styles from '../../styles/AllProductsPage.module.css';

const AllProductsPage = () => (
  <>
    <Breadcrumb />
    <header className={styles.hero}>
      <h1 className={styles.title}>Product Categories</h1>
      <p className={styles.subtitle}>
        Browse our full catalogue of network, security, and smart building solutions.
      </p>
    </header>
    <ProductCatalog title="All Products" />
    <Contact />
  </>
);

export default AllProductsPage;
