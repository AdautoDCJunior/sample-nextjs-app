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
import BookDrawer from '../../../components/BookDrawer';
import BookModal from '../../../components/BookModal';
import { BookService } from '../../../services/BookService';
import ClearALLFilterIcon from '@mui/icons-material/FilterListOff';
import CreateIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IBasicButton } from '../../../components/BasicButton';
import PageTitle from '../../../components/PageTitle';

const PageContent = () => {
  const { books, setBooks } = useBookContext();
  const [bookRows, setBookRows] = useState<IRow[]>([]);
  const [bookSelected, setBookSelected] = useState<IBook | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const bookColumns: IColumn[] = [
    { id: 1, name: 'id',align: 'left' },
    { id: 2, name: 'title', align: 'left' },
    { id: 3, name: 'description', align: 'left' },
  ];

  const buttons: IBasicButton[] = [
    {
      variant: 'icon',
      icon: <CreateIcon />,
      onClick: () => setOpenModal(true),
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <FilterListIcon />,
      onClick: () => setOpenDrawer(true),
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <ClearALLFilterIcon  />,
      onClick: () => console.log('click'),
      size: 'small',
    },
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
      <PageTitle 
        buttons={buttons}  
        title={'Lista de livros'}
      />
      <BasicTable actions={actions} columns={bookColumns} rows={bookRows} />
      <BookModal
        book={bookSelected}
        onCancel={handleCancel}
        onSave={handleSave}
        open={openModal}
      />
      <BookDrawer
        onClose={() => setOpenDrawer(false)}
        onFilter={() => console.log('filter')}
        open={openDrawer}
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
