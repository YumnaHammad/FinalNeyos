import ProductDetailEditor from '../components/ProductDetailEditor';

export default function Products() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Catalogue
        </p>
        <h1 className="text-3xl font-black text-gray-900">My Products</h1>
        <p className="text-gray-500 mt-1">
          Create and manage products assigned to your vendor account. Published items appear on the
          Nexyos website.
        </p>
      </div>
      <ProductDetailEditor />
    </div>
  );
}
