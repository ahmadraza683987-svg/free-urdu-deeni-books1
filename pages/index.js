import Link from "next/link";
import Contact from "../components/Contact";  // Contact Component
import Comments from "../components/Comments"; // Comments Component

export default function Home() {
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
        <Link href="/books">
          <button className="bg-white text-green-800 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-100 transition">
            📚 Explore Books
          </button>
        </Link>
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
        <Link href="/books?category=Darsi Kitaben (درسی کتابیں)">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-3xl font-bold text-green-800 mb-2">درسی کتابیں</h3>
            <p className="text-gray-600">Darsi Kitaben</p>
          </div>
        </Link>

        <Link href="/books?category=Ghair Darsi Kitaben (غیر درسی کتابیں)">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-3xl font-bold text-green-800 mb-2">غیر درسی کتابیں</h3>
            <p className="text-gray-600">Ghair Darsi Kitaben</p>
          </div>
        </Link>
      </section>

      {/* 🔹 Comments Section */}
      <Comments />

      {/* 🔹 Contact Section */}
      <Contact />
    </div>
  );
}