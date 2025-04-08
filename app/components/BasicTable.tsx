import * as React from 'react';
import { IconButton } from '@mui/material';
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
  icon: React.ReactNode;
  onClick: (params?: any) => void;
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
                  <TableCell align="center">
                    {actions.map((action, index) => (
                      <IconButton
                        key={index}
                        onClick={() => action.onClick(row)}
                      >
                        {action.icon}
                      </IconButton>
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
