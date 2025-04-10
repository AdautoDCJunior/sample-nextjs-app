import BasicForm, { IField, IFieldOption } from './BasicForm';
import React, { useEffect, useState } from 'react';
import { AuthorService } from '../services/AuthorService';
import BasicDrawer from './BasicDrawer';
import { CategoryService } from '../services/CategoryService';
import { IAuthor } from '../contexts/AuthorContext';
import { ICategory } from '../contexts/CategoryContext';

interface IBookDrawerProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: IBookFilters) => void;
}

export interface IBookFilters {
  title?: string;
  authorId?: number | null;
  categoryId?: number | null;
  publishedDateStart?: string | null;
  publishedDateEnd?: string | null;
}

const BookDrawer: React.FC<IBookDrawerProps> = ({
  open,
  onClose,
  onFilter,
}) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState<IFieldOption | null>(null);
  const [category, setCategory] = useState<IFieldOption | null>(null);
  const [publishedDateStart, setPublishedDateStart] = useState('');
  const [publishedDateEnd, setPublishedDateEnd] = useState('');

  function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  const fetchAuthors = async () => {
    try {
      setAuthorLoading(true);
      setAuthors([]);
      await sleep(500);
      const data = await AuthorService.getAllAuthors();
      setAuthors(data);
      setAuthorLoading(false);
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
      setAuthorLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategories([]);
      await sleep(500);
      const data = await CategoryService.getAllCategorys();
      setCategories(data);
      setCategoryLoading(false);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTitle('');
      setAuthor(null);
      setCategory(null);
      setPublishedDateStart('');
      setPublishedDateEnd('');
    }
  }, [open]);

  const handleApplyFilters = () => {
    const filters: IBookFilters = {
      title: title || undefined,
      authorId: author ? author.value : null,
      categoryId: category ? category.value : null,
      publishedDateStart: publishedDateStart || null,
      publishedDateEnd: publishedDateEnd || null,
    };
    
    onFilter(filters);
    onClose();
  };

  const fields: IField[] = [
    {
      id: 1,
      label: 'Título',
      type: 'text',
      value: title,
      onChange: setTitle,
      grid: 12,
    },
    {
      id: 2,
      label: 'Autor',
      type: 'autocomplete',
      value: author,
      onOpen: fetchAuthors,
      loading: authorLoading,
      onChange: (value: IFieldOption) => setAuthor(value),
      options: authors.map((author) => ({
        label: author.name,
        value: author.id,
      })),
      grid: 12,
    },
    {
      id: 3,
      label: 'Categoria',
      type: 'autocomplete',
      value: category,
      onOpen: fetchCategories,
      loading: categoryLoading,
      onChange: (value: IFieldOption) => setCategory(value),
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      grid: 12,
    },
    {
      id: 4,
      label: 'Data de Publicação (Início)',
      type: 'date',
      value: publishedDateStart,
      onChange: setPublishedDateStart,
      grid: 6,
    },
    {
      id: 5,
      label: 'Data de Publicação (Fim)',
      type: 'date',
      value: publishedDateEnd,
      onChange: setPublishedDateEnd,
      grid: 6,
    },
  ];

  return (
    <BasicDrawer
      onClose={onClose}
      onFilter={handleApplyFilters}
      open={open}
      title="Filtrar Livros"
      width={450}
    >
      <BasicForm fields={fields} />
    </BasicDrawer>
  );
};

export default BookDrawer;
