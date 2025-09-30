import { useState } from "react";
import Link from "next/link";
import booksData from "../data/books.json";

export default function Home() {
  const [search, setSearch] = useState("");

  // Filter books based on search
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-green-800 text-white">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Alqalam Ishtiaq', serif" }}
        >
          فری دینی اردو کتابیں
        </h1>
        <h2 className="text-xl md:text-2xl mb-6">
          Free Urdu Islamic Books Collection
        </h2>

        {/* Search Box */}
        <div className="max-w-xl mx-auto flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="🔍 کتاب تلاش کریں..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 outline-none"
          />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-12 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold text-green-800 mb-2">✅ Free Access</h3>
          <p className="text-gray-600">تمام کتابیں بالکل مفت دستیاب ہیں</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold text-green-800 mb-2">📖 Online Reading</h3>
          <p className="text-gray-600">کتابیں آن لائن پڑھنے کی سہولت</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold text-green-800 mb-2">⬇️ Easy Download</h3>
          <p className="text-gray-600">PDF ڈاؤنلوڈ کا آسان آپشن</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 pb-16">
        <Link href="/books?category=Darsi Kitaben">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-3xl font-bold text-green-800 mb-2">درسی کتابیں</h3>
            <p className="text-gray-600">Darsi Kitaben</p>
          </div>
        </Link>

        <Link href="/books?category=Ghair Darsi Kitaben">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-3xl font-bold text-green-800 mb-2">غیر درسی کتابیں</h3>
            <p className="text-gray-600">Ghair Darsi Kitaben</p>
          </div>
        </Link>
      </section>

      {/* Search Results */}
      {search && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-bold text-green-800 mb-6">🔍 Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">کوئی کتاب نہیں ملی</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}