import SpecificationsManager from '../components/ui/SpecificationsManager';

export default function SpecificationsPage() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Catalogue
        </p>
        <h1 className="text-3xl font-black text-gray-900">Specifications &amp; Filters</h1>
        <p className="text-gray-500 mt-1">
          Manage catalogue search filters. For full product pages (gallery, specs, resources), use{' '}
          <strong>Catalogue → Products</strong>.
        </p>
      </div>
      <SpecificationsManager />
    </div>
  );
}
