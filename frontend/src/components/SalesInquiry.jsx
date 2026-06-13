import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SalesInquiryForm from './Inquiry/SalesInquiryForm';
import '../styles/SalesInquiry.css';

export default function SalesInquiry() {
  const location = useLocation();
  const productContext = location.state || {};

  const defaultMessage = productContext.productModel
    ? `Inquiry about ${productContext.productModel}${
        productContext.productTitle ? ` — ${productContext.productTitle}` : ''
      }`
    : '';

  const productLabel =
    productContext.productModel && productContext.productTitle
      ? `${productContext.productModel} — ${productContext.productTitle}`
      : productContext.productModel || productContext.productTitle || '';

  return (
    <div className="sales-inquiry-page">
      <nav className="sales-inquiry-page__breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
            <span className="sales-inquiry-page__sep">/</span>
          </li>
          <li>
            <span>Contact Sales</span>
          </li>
        </ol>
      </nav>

      <div className="sales-inquiry-page__inner">
        <h1 className="sales-inquiry-page__title">Contact Sales</h1>
        <SalesInquiryForm
          defaultMessage={defaultMessage}
          productLabel={productLabel}
          productId={productContext.productId || ''}
          productSlug={productContext.productSlug || ''}
          productModel={productContext.productModel || ''}
          productTitle={productContext.productTitle || ''}
        />
      </div>
    </div>
  );
}
