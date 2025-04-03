'use client';

import { Add, FilterAlt, FilterAltOff, RestartAlt } from '@mui/icons-material';
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
import { BasicButtonProps } from '../../../components/BasicButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageTitle from '../../../components/PageTitle';

const PageContent = () => {
  const { authors, setAuthors } = useAuthorContext();
  const [authorRows, setAuthorRows] = useState<IRow[]>([]);

  const handleButtonClick = () => {
    alert('Abrindo Filtro');
  };
  
  const handleIcon1Click = () => {
    alert('Limpando Filtro');
  };
  
  const handleIcon2Click = () => {
    alert('Criando Autor');
  };

  const buttons: BasicButtonProps[] = [
    {
      variant: 'icon',
      icon: <Add />,
      onClick: (handleIcon2Click),
      color: 'primary',
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <RestartAlt />,
      onClick: () => alert('Atualizar dados'),
      color: 'primary',
      size: 'small',
    },
    {
      variant: 'icon',
      icon: <FilterAlt />,
      onClick: (handleButtonClick),
      color: 'primary',
      size: 'large',
    },
    {
      variant: 'icon',
      icon: <FilterAltOff />,
      onClick: (handleIcon1Click),
      color: 'primary',
      size: 'small',
    },
  ];

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
      <PageTitle 
        buttons={buttons} 
        title="Autores"
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
