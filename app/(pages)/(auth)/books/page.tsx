'use client';

import BasicTable, { IColumn, IRow } from '../../../components/BasicTable';
import { BookProvider, useBookContext } from '../../../contexts/BookContext';
import React, { useEffect, useState } from 'react';
import { BookService } from '../../../services/BookService';

const PageContent = () => {
  const { books, setBooks } = useBookContext();
  const [bookRows, setBookRows] = useState<IRow[]>([]);

  const bookColumns: IColumn[] = [
    { id: 1, name: 'id',align: 'left' },
    { id: 2, name: 'title', align: 'left' },
  ];

  const fetchBooks = async () => {
    try {
      const data = await BookService.getAllBooks();
      setBooks(data);
    }
    catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      setBookRows(books.map(book => ({...book})));
    }
  }, [books]);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <BasicTable columns={bookColumns} rows={bookRows} />
    </div>
  );
};

export default function Page() {
  return (
    <BookProvider>
      <PageContent />
    </BookProvider>
  );
}
