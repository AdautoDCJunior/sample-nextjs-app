'use client';

import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CategoryService } from '../../../services/CategoryService';
import { ICategory } from '../../../contexts/CategoryContext';

interface IFieldOption {
  id: number;
  value: string;
}

export default function Page() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<IFieldOption | null>(null);

  const handleCategoryChange = (_, value: IFieldOption) => {
    setSelectedCategories(value);
  };
  
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategories([]);
      const data = await CategoryService.getAllCategorys();
      setCategories(data);
      setCategoryLoading(false);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };
  return (
    <Autocomplete
      disableCloseOnSelect={true}
      getOptionLabel={(option) => option.value}
      id="checkboxes-categories-demo"
      isOptionEqualToValue={(
        option: IFieldOption,
        value: IFieldOption,
      ) => option.id === value.id}
      loading={categoryLoading}
      multiple={false}
      onChange={handleCategoryChange}
      onOpen={fetchCategories}
      options={categories.map((category) => ({
        id: category.id,
        value: category.name,
      }))}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
      renderOption={(props, option: IFieldOption, { selected }) => {
        // eslint-disable-next-line react/prop-types
        const { key, ...optionProps } = props;

        return (
          <li key={key} {...optionProps}>
            <Checkbox
              checked={selected}
              style={{ marginRight: 8 }}
            />
            {option.value}
          </li>
        );
      }}
      value={selectedCategories}
    />
  );
}
