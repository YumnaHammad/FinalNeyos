import ProductDetailEditor from '../components/ProductDetailEditor';

export default function Products() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Catalogue
        </p>
        <h1 className="text-3xl font-black text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          View the full Nexyos product catalogue. Contact admin to request changes.
        </p>
      </div>
      <ProductDetailEditor readOnly />
    </div>
  );
}
