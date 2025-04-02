import Link from 'next/link';
import React from 'react';

export default function Page() {
  return <div>
    <h1>Hello, Next.js!</h1>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href="/authors">Autores</Link>
      <Link href="/books">Livros</Link>
    </div>
  </div>;
}
