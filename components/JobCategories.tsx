import Link from "next/link";

const categories = [
  { name: "Technology", icon: "💻" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Finance", icon: "💰" },
  { name: "Education", icon: "🎓" },
  { name: "Marketing", icon: "📢" },
  { name: "Design", icon: "🎨" },
];

export function JobCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/jobs?category=${encodeURIComponent(category.name)}`}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
        >
          <span className="text-4xl mb-2 block">{category.icon}</span>
          <span className="font-semibold">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
