const CategoryBadge = ({ category, onClick }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${
        onClick ? 'cursor-pointer hover:bg-green-200' : ''
      }`}
      onClick={onClick}
    >
      {category}
    </span>
  );
};

export default CategoryBadge; 