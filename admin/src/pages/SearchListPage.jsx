import { useNavigate } from 'react-router-dom';
import SearchListManager from '../components/ui/SearchListManager';

export default function SearchListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Catalogue
        </p>
        <h1 className="text-3xl font-black text-gray-900">Search List</h1>
        <p className="text-gray-500 mt-1">
          Every product family has its own search list with filters and product cards. Edit product
          details under <strong>Catalogue → Products</strong>.
        </p>
      </div>
      <SearchListManager
        onEditProduct={() => navigate('/products')}
      />
    </div>
  );
}
