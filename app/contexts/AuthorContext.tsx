import React, { ReactNode, createContext, useState } from 'react';

export interface Author {
  id: number,
  name: string,
  bio: string,
  birthDate: string,
  nationality: string,
  books: Book[]
}

interface Book {
  id: number;
  name: string;
}

interface AuthorContextType {
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  
  return (
    <AuthorContext.Provider value={{ authors, setAuthors }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthorContext = () => {
  const context = React.useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthorContext must be used within a AuthorProvider');
  }
  return context;
};
