import { Autocomplete, 
  AutocompleteRenderOptionState, Grid, TextField } from '@mui/material';
import { Checkbox, CircularProgress } from '@mui/material';
import React from 'react';

export interface IFieldOption {
  label: string;
  value: number;
}

export interface IField {
  id: number;
  label: string;
  type: 'text' | 'number' | 'autocomplete' | 'date';
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
                disableCloseOnSelect
                getOptionLabel={(option) => (typeof 
                option === 'object' && 'label' in option ? option.label : '')}
                isOptionEqualToValue={(
                  option: IFieldOption,
                  value: IFieldOption,
                ) => {
                  return Number(option.value) === Number(value.value);
                }}
                key={field.id}
                limitTags={1}
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
                renderOption={(props, option: IFieldOption, 
                  { selected }: AutocompleteRenderOptionState) => {
                  // eslint-disable-next-line react/prop-types
                  const { key, ...optionProps } = props;  
                  const isSelected = field.multiple && 
                  Array.isArray(field.value) 
                    ? field.value.some((val: IFieldOption) => 
                      Number(val.value) === Number(option.value))
                    : selected;    
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox checked={isSelected} />
                      {option.label}
                    </li>
                  );
                }}
                value={field.value || (field.multiple ? [] : null)}
              />
            ) : (
              <TextField
                InputLabelProps={field.type === 'date' ? 
                  { shrink: true } : undefined}
                disabled={field.disabled || false}
                fullWidth
                inputProps={field.type === 'date' ? 
                  { max: '9999-12-31' } : undefined}
                key={field.id}
                label={field.label}
                margin="normal"
                maxRows={field.maxRows || 1}
                multiline={field.multiline || false}
                onChange={(e) => field.onChange(e.target.value)}
                type={field.type}
                value={field.value === null ? '' : field.value}
              />
            )
          }
        </Grid>
      ))}
    </Grid>
  );
}
