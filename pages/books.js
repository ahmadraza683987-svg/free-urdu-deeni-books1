import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import booksData from "../data/books.json";

const categories = [
  {
    name: "Darsi Kitaben (درسی کتابیں)",
    subcategories: ["Kitaben (کتابیں)", "Shuruhaat (شروحات)"]
  },
  {
    name: "Ghair Darsi Kitaben (غیر درسی کتابیں)",
    subcategories: []
  }
];

export default function Books() {
  const router = useRouter();
  const { category } = router.query; // URL se category

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Filter books based on category, subcategory and search
  const filteredBooks = booksData.filter((book) => {
    const matchCategory = selectedCategory ? book.category === selectedCategory : true;
    const matchSubcategory = selectedSubcategory ? book.subcategory === selectedSubcategory : true;
    const matchSearch = search ? book.title.toLowerCase().includes(search.toLowerCase()) : true;
    return matchCategory && matchSubcategory && matchSearch;
  });

  useEffect(() => {
    if (category) setSelectedCategory(category);
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans px-6 py-10">
      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 کتاب تلاش کریں..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-full shadow-md outline-none border border-gray-300"
        />
      </div>

      {/* Categories */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl cursor-pointer transition"
            >
              <h3 className="text-3xl font-bold text-green-800 mb-2">{cat.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Subcategories */}
      {selectedCategory && categories.find(c => c.name === selectedCategory)?.subcategories.length > 0 && !selectedSubcategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {categories.find(c => c.name === selectedCategory).subcategories.map((sub) => (
            <div
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl cursor-pointer transition"
            >
              <h3 className="text-2xl font-bold text-green-800">{sub}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Books List */}
      {(selectedSubcategory || (!categories.find(c => c.name === selectedCategory)?.subcategories.length)) && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold text-green-800 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>
                <div className="flex gap-4">
                  <a
                    href={book.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    📖 Read
                  </a>
                  <a
                    href={book.file}
                    download
                    className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                  >
                    ⬇️ Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">کوئی کتاب دستیاب نہیں</p>
          )}
        </div>
      )}
    </div>
  );
}