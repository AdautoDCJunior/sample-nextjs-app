import BasicModal, { IBasicModal } from './BasicModal';
import { IField, IFieldOption } from './BasicForm';
import React, { useEffect, useState } from 'react';
import { AuthorService } from '../services/AuthorService';
import { CategoryService } from '../services/CategoryService';
import { IAuthor } from '../contexts/AuthorContext';
import { IBook } from '../contexts/BookContext';
import { ICategory } from '../contexts/CategoryContext';

interface IBookModal extends Omit<IBasicModal, 'title' | 'fields'> {
  book: IBook | null;
}

const Component = (props: IBookModal) => {
  const { open, book, onSave, onCancel } = props;

  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [authorLoading, setAuthorLoading] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [bookId, setBookId] = useState<number | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookPublishedDate, setBookPublishedDate] = useState('');
  const [bookAuthor, setBookAuthor] = useState<IFieldOption | null>(null);
  const [bookCategories, setBookCategories] = useState<IFieldOption[]>([]);
  const [bookDescription, setBookDescription] = useState('');

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
      await sleep(1000);
      const data = await AuthorService.getAllAuthors();
      setAuthors(data);
      setAuthorLoading(false);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategories([]);
      await sleep(1000);
      const data = await CategoryService.getAllCategorys();
      setCategories(data);
      setCategoryLoading(false);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const formatDateForInput = (dateString: string) => {
    return dateString ? dateString.split('T')[0] : '';
  };

  const fields: IField[] = [
    ...(book !== null
      ? [
        {
          id: 1,
          label: 'ID',
          type: 'number' as const,
          value: bookId !== null ? bookId : '',
          onChange: setBookId,
          grid: 2,
          disabled: true,
        },
      ]
      : []),
    {
      id: 2,
      label: 'Título',
      type: 'text',
      value: bookTitle,
      onChange: setBookTitle,
      grid: book === null ? 12 : 10,
    },
    {
      id: 3,
      label: 'Autor',
      type: 'autocomplete',
      value: bookAuthor,
      onOpen: fetchAuthors,
      loading: authorLoading,
      onChange: (value: IFieldOption) => value && setBookAuthor(value),
      options: authors.map((author) => ({
        label: author.name,
        value: author.id,
      })),
      grid: 6,
    },
    {
      id: 4,
      multiple: true,
      label: 'Categorias',
      type: 'autocomplete',
      value: bookCategories,
      onOpen: fetchCategories,
      loading: categoryLoading,
      onChange: (value: IFieldOption[]) => {
        setBookCategories(value);
      },
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      grid: 6,
    },
    {
      id: 5,
      label: 'Data de Publicação',
      type: 'date',
      value: bookPublishedDate,
      onChange: setBookPublishedDate,
      grid: 12,
    },
    {
      id: 6,
      label: 'Descrição',
      type: 'text',
      value: bookDescription,
      onChange: setBookDescription,
      grid: 12,
      multiline: true,
      maxRows: 4,
    },
  ];

  useEffect(() => {
    if (open && book) {
      setBookId(book.id);
      setBookTitle(book.title);
      setBookPublishedDate(formatDateForInput(book.publishedDate));
      setBookAuthor({ label: book.author.name, value: book.author.id });
      setBookCategories(
        book.categories.map((category) => ({
          label: category.name,
          value: category.id,
        })) || [],
      );
      setBookDescription(book.description);
    } else {
      setBookId(null);
      setBookTitle('');
      setBookPublishedDate('');
      setBookAuthor(null);
      setBookCategories([]);
      setBookDescription('');
    }
  }, [open, book]);

  return (
    <BasicModal
      fields={fields}
      onCancel={onCancel}
      onSave={onSave}
      open={open}
      title={`${book ? 'Editar' : 'Adicionar'} Livro`}
    />
  );
};

export default function BookModal(props: IBookModal) {
  return <Component {...props} />;
}
