import { useState } from 'react';
import Link from 'next/link';
import booksData from '../data/books.json';

export default function Books() {
  const [search, setSearch] = useState('');

  const filteredBooks = booksData.filter(
    book =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>کتابیں</h1>
      <input
        type="text"
        placeholder="کتاب یا مصنف تلاش کریں"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>
              {book.title} - {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}