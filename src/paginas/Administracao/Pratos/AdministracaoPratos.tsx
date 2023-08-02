import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  private_createTypography,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get('pratos/')
      .then(resposta => setPratos(resposta.data))
  })

  const excluir = (pratosAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratosAhSerExcluido.id}/`)
      .then(() => {
        const listaPrato = pratos.filter(prato => prato.id !== pratosAhSerExcluido.id)
        setPratos([...listaPrato])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>{prato.nome}</TableCell>
            <TableCell>{prato.tag}</TableCell>
            <TableCell>
              [<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
            </TableCell>
            <TableCell>
              <Link to={`/admin/pratos/${prato.id}`}>editar</Link>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
            </TableCell>
          </TableRow>)}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
