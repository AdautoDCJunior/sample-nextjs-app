'use client';

import {
  AuthorProvider,
  IAuthor,
  useAuthorContext,
} from '../../../contexts/AuthorContext';
import BasicTable, {
  IAction,
  IColumn,
  IRow,
} from '../../../components/BasicTable';

import React, { useEffect, useState } from 'react';
import { AuthorService } from '../../../services/AuthorService';
import ClearALLFilterIcon from '@mui/icons-material/FilterListOff';
import CreateIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IBasicButton } from '../../../components/BasicButton';
import PageTitle from '../../../components/PageTitle';

const PageContent = () => {
  const { authors, setAuthors } = useAuthorContext();
  const [authorRows, setAuthorRows] = useState<IRow[]>([]);

  const authorColumns: IColumn[] = [
    { id: 1, name: 'name',align: 'left' },
    { id: 2, name: 'bio', align: 'left' },
    { id: 3, name: 'birthDate', align: 'left' },
    { id: 4, name: 'nationality', align: 'left' },
  ];

  const buttons: IBasicButton[] = [
    {
      variant: 'icon',
      icon: <CreateIcon />,
      onClick: () => console.log('click'),
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <FilterListIcon />,
      onClick: () => console.log('click'),
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <ClearALLFilterIcon  />,
      onClick: () => console.log('click'),
      size: 'small',
    },
  ];

  const actions: IAction[] = [
    {
      icon: <EditIcon />,
      onClick: (row: IAuthor) => alert(`Editando ${row.name}`),
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: IAuthor) => alert(`Deletando ${row.name}`),
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
    (async () => await fetchAuthors())();
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      setAuthorRows(authors.map(author => ({...author})));
    }
  }, [authors]);

  return (
    <div>
      <PageTitle
        buttons={buttons}  
        title={'Lista de Autores'}
      />
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
