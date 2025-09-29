import { useRouter } from 'next/router';
import booksData from '../../data/books.json';

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;

  const book = booksData.find(b => b.id === parseInt(id));

  if (!book) return <p>کتاب نہیں ملی</p>;

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <h3>مصنف: {book.author}</h3>
      <p>{book.description}</p>
      <embed src={book.file} type="application/pdf" width="100%" height="600px" />
      <a href={book.file} download>
        <button>ڈاؤنلوڈ کریں</button>
      </a>
    </div>
  );
}