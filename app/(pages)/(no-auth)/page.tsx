import Link from 'next/link';
import PageTitle from '../../components/PageTitle';
import React from 'react';

export default function Page() {
  return (
    <div>
      <PageTitle title="Título Home"/>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/authors">Autores</Link>
        <Link href="/books">Livros</Link>
      </div>
    </div>
  );
}
