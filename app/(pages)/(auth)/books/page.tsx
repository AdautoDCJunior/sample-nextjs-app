'use client';

import { Add, FilterAltOff } from '@mui/icons-material';
import BasicTable, { IColumn, IRow } from '../../../components/BasicTable';
import { BookProvider, useBookContext } from '../../../contexts/BookContext';
import React, { useEffect, useState } from 'react';
import { BookService } from '../../../services/BookService';
import PageTitle from '../../../components/PageTitle';

const handleButtonClick = () => {
  alert('Abrindo Filtro');
};

const handleIcon1Click = () => {
  alert('Limpando Filtro');
};

const handleIcon2Click = () => {
  alert('Criando Livro');
};

const arrayButtons: Array<{
  variant: 'icon' | 'text' | 'icon-text';
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size: 'small' | 'medium' | 'large';
}> = [
  {
    variant: 'icon',
    icon: <FilterAltOff />,
    onClick: (handleIcon1Click),
    color: 'primary',
    size: 'small',
  },
  {
    variant: 'icon',
    icon: <Add />,
    onClick: (handleIcon2Click),
    color: 'primary',
    size: 'small',
  },
  {
    variant: 'text',
    text: 'Filtros',
    onClick: (handleButtonClick),
    color: 'primary',
    size: 'large',
  },
];

const PageContent = ({ buttons }: { buttons: typeof arrayButtons }) => {
  const { books, setBooks } = useBookContext();
  const [bookRows, setBookRows] = useState<IRow[]>([]);

  const bookColumns: IColumn[] = [
    { id: 1, name: 'id', align: 'left' },
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
      <PageTitle 
        buttons={buttons} 
        title="Livros"
      />
      <BasicTable columns={bookColumns} rows={bookRows} />
    </div>
  );
};

export default function Page() {
  return (
    <BookProvider>
      <PageContent buttons={arrayButtons} />
    </BookProvider>
  );
}
