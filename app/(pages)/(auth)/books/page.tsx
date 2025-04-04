'use client';

import BasicTable, {
  IAction,
  IColumn,
  IRow,
} from '../../../components/BasicTable';
import {
  BookProvider,
  IBook,
  useBookContext,
} from '../../../contexts/BookContext';
import React, { useEffect, useState } from 'react';
import BookModal from '../../../components/BookModal';
import { BookService } from '../../../services/BookService';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PageContent = () => {
  const { books, setBooks } = useBookContext();
  const [bookRows, setBookRows] = useState<IRow[]>([]);
  const [bookSelected, setBookSelected] = useState<IBook | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const bookColumns: IColumn[] = [
    { id: 1, name: 'id',align: 'left' },
    { id: 2, name: 'title', align: 'left' },
    { id: 3, name: 'description', align: 'left' },
  ];

  const handleEdit = (book: IBook) => {
    setBookSelected(book);
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      if (bookSelected) {
        await BookService.updateBook(bookSelected.id, bookSelected);
      } else {
        await BookService.createBook(bookSelected);
      }

      setBookSelected(null);
      setOpenModal(false);
    } catch (error) {
      console.log('Erro ao salvar livro:', error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setBookSelected(null);
  };

  const actions: IAction[] = [
    {
      icon: <EditIcon />,
      onClick: (row) => handleEdit(row),
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: IBook) => alert(`Deletando ${row.title}`),
    },
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
      <Button onClick={() => setOpenModal(true)}>Create</Button>
      <BasicTable actions={actions} columns={bookColumns} rows={bookRows} />
      <BookModal
        book={bookSelected}
        onCancel={handleCancel}
        onSave={handleSave}
        open={openModal}
      />
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
