import React, { useState, useEffect } from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@material-ui/core'
import axios from 'axios'




const UsersTable = () => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [usersList, setUsersList] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/agent')
            .then(response => {
                setUsersList(response.data.data)
            })
    },[]);




    return (
        <div className="w-auto overflow-auto">
            <Table className="whitespace-pre">
            <colgroup>
                <col style={{width:'11%'}}/>
                <col style={{width:'11%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'10%'}}/>
                <col style={{width:'6%'}}/>
                <col style={{width:'7%'}}/>
                <col style={{width:'7%'}}/>
            </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Nom</TableCell>
                        <TableCell className="px-0">Prénom</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Département</TableCell>
                        <TableCell className="px-0">Rôle</TableCell>
                        <TableCell className="px-0">Supprimer</TableCell>
                        <TableCell className="px-0">Modifier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.nom}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.prenom}
                                </TableCell>
                                <TableCell
                                    className="px-0 "
                                    align="left"
                                >
                                    {user.email}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {user.departement}
                                </TableCell>
                                <TableCell className="px-0">
                                    {user.role}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell className="px-2">
                                    <IconButton href="/modifierUtilisateur">
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default UsersTable
