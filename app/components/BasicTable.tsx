import * as React from 'react';
import BasicButton from './BasicButton'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface IBasicTable {
  actions?: IAction[];
  columns: IColumn[];
  rows: IRow[];
}

export interface IAction {
  icon?: React.ReactNode;
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (params?: any) => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

export interface IColumn {
  id: number;
  name: string;
  align?: 'left' | 'right' | 'center';
}

export interface IRow {
  id: string | number;
  [key: string]: string | number | boolean | object | undefined;
  __meta?: {
    cellAligns?: { [key: string]: 'left' | 'right' | 'center' };
  }
}

export default function BasicTable(props: IBasicTable) {
  const { actions, columns, rows } = props;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align={column.align} key={column.id}>
                {column.name}
              </TableCell>
            ))}
            {
              actions && actions.length > 0 && (
                <TableCell align="center">Ações</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => {
                const cellAlign = row.__meta?.cellAligns?.[column.name];

                return (
                  <TableCell align={cellAlign || column.align} key={column.id}>
                    {
                      typeof row[column.name] === 'object'
                        && row[column.name] !== null
                        ? JSON.stringify(row[column.name])
                        : row[column.name] === undefined
                          ? ''
                          : String(row[column.name])
                    }
                  </TableCell>
                );
              })}
              {
                actions && actions.length > 0 && (
                  <TableCell align="center" sx={{
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'row',
                    gap: '0.5rem',
                  }}>
                    {actions.map((action, index) => (
                      <BasicButton
                        color={action.color}
                        icon={action.icon}
                        key={index}
                        onClick={() => action.onClick(row)}
                        size={action.size}
                        text={action.text}
                        variant={action.icon && action.text ? 'icon-text' : 
                          action.icon ? 'icon' : 'text'}
                      />
                    ))}
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
