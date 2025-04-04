import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface IBook {
  id: number;
  title: string;
  description: string;
  author: IAuthor;
  categories: ICategory[];
}

interface IAuthor {
  id: number;
  name: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface BookContextType {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<IBook[]>([]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};
