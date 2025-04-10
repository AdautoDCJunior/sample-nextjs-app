import BasicForm, { IField } from './BasicForm';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

export interface IBasicModal {
  open: boolean;
  title: string;
  fields: IField[];
  onSave: () => void;
  onCancel: () => void;
}

export default function BasicModal(props: IBasicModal) {
  const { open, title, fields, onSave, onCancel } = props;

  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <BasicForm fields={fields} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button color="primary" onClick={onSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
