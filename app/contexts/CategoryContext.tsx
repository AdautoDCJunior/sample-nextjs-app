import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface ICategory {
  id: number;
  name: string;
}

interface CategoryContextType {
  category: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const CategoryContext = createContext<
  CategoryContextType | undefined
>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategories] = useState<ICategory[]>([]);

  return (
    <CategoryContext.Provider value={{ category, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    // eslint-disable-next-line @stylistic/max-len
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
