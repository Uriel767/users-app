import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';

export function UsersTable({ users = [], selectedId, onSelect }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla de Usuarios">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefono</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => {
            const isSelected = selectedId === u.id;

            return (
              <TableRow
                key={u.id}
                hover
                selected={isSelected}
                onClick={() => onSelect(u.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Radio
                    checked={isSelected}
                    onChange={() => onSelect(u.id)}
                    value={u.id}
                    name="userSelect"
                  />
                </TableCell>
                <TableCell >{u.id}</TableCell>
                <TableCell >{u.name}</TableCell>
                <TableCell >{u.email}</TableCell>
                <TableCell >{u.phone.slice(0, 14)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}