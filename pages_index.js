import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>مفت دینی کتابیں</h1>
      <p>یہاں آپ تمام دینی کتابیں مفت پڑھ اور ڈاؤنلوڈ کر سکتے ہیں۔</p>
      <Link href="/books">
        <button>تمام کتابیں دیکھیں</button>
      </Link>
    </div>
  );
}