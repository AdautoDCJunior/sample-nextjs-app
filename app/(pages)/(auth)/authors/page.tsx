'use client';

import {
  AuthorProvider,
  useAuthorContext,
} from '../../../contexts/AuthorContext';
import BasicTable, {
  IAction,
  IColumn,
  IRow,
} from '../../../components/BasicTable';
import React, { useEffect, useState } from 'react';
import { AuthorService } from '../../../services/AuthorService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PageContent = () => {
  const { authors, setAuthors } = useAuthorContext();
  const [authorRows, setAuthorRows] = useState<IRow[]>([]);

  const authorColumns: IColumn[] = [
    { id: 1, name: 'name',align: 'left' },
    { id: 2, name: 'bio', align: 'left' },
    { id: 3, name: 'birthDate', align: 'left' },
    { id: 4, name: 'nationality', align: 'left' },
  ];

  const actions: IAction[] = [
    {
      icon: <EditIcon />,
      onClick: (row) => alert(`Editando ${row.name}`),
    },
    {
      icon: <DeleteIcon />,
      onClick: (row) => alert(`Deletando ${row.name}`),
    },
  ];

  const fetchAuthors = async () => {
    try {
      const data = await AuthorService.getAllAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      setAuthorRows(authors.map(author => ({...author})));
    }
  }, [authors]);

  return (
    <div>
      <h1>Lista de Autores</h1>
      <BasicTable actions={actions} columns={authorColumns} rows={authorRows} />
    </div>
  );
};

export default function Page() {
  return (
    <AuthorProvider>
      <PageContent />
    </AuthorProvider>
  );
}
