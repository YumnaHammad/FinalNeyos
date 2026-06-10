const PlaceholderPage = ({ title }) => (
  <div className="p-10">
    <h1 className="text-3xl font-black text-gray-900">{title}</h1>
    <p className="mt-4 text-gray-500">
      This page was restored as a placeholder. Full functionality may need recovery from backup.
    </p>
  </div>
);

export default PlaceholderPage;
