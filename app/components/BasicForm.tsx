import { Autocomplete, Grid, TextField } from '@mui/material';
import { Checkbox, CircularProgress, ListItemText } from '@mui/material';
import React from 'react';

export interface IFieldOption {
  label: string;
  value: string | number;
}

export interface IField {
  id: number;
  label: string;
  type: 'text' | 'number' | 'date' | 'autocomplete';
  value: string | number | IFieldOption | IFieldOption[] | null;
  onChange: (value: any) => void;
  options?: IFieldOption[];
  grid?: number;
  multiple?: boolean;
  onOpen?: () => void;
  loading?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

export interface IBasicForm {
  fields: IField[];
}

export default function BasicForm(props: IBasicForm) {
  const { fields } = props;

  return (
    <Grid container spacing={1}>
      {fields.map(field => (
        <Grid key={field.id} size={field.grid || 12}>
          {(field.type === 'autocomplete' && field.options)
            ? (
              <Autocomplete
                getOptionLabel={(option: IFieldOption | IFieldOption[]) => {
                  console.log(option);
                  
                  return Array.isArray(option)
                    ? `${option.length} opções selecionadas`
                    : option.label;
                }}
                key={field.id}
                loading={field.loading || false}
                multiple={field.multiple || false}
                noOptionsText="Nenhuma opção"
                onChange={(_, value) => field.onChange(value)}
                onOpen={field.onOpen}
                options={field.options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {field.loading
                              ? <CircularProgress color="inherit" size={20} />
                              : null
                            }
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
                renderOption={(props, option: IFieldOption) => {
                  // eslint-disable-next-line react/prop-types
                  const { key, ...restProps } = props;

                  const isSelected = (field.value as IFieldOption[]).some(
                    (selectedOption: IFieldOption) => {
                      if (typeof selectedOption === 'object') {
                        return selectedOption.value === option.value;
                      }
                      return selectedOption === option.value;
                    },
                  );
                  
                  return (
                    <li key={key} {...restProps}>
                      <Checkbox checked={isSelected} />
                      <ListItemText primary={option.label} />
                    </li>
                  );
                }}
                value={field.value || null}
              />
            ) : (
              <TextField
                disabled={field.disabled || false}
                fullWidth
                key={field.id}
                label={field.label}
                margin="normal"
                maxRows={field.maxRows || 1}
                multiline={field.multiline || false}
                onChange={(e) => field.onChange(e.target.value)}
                type={field.type}
                value={field.value}
              />
            )
          }
        </Grid>
      ))}
    </Grid>
  );
}
