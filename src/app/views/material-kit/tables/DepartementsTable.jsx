import React from 'react'
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

const DepartTable = [
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
    {
        code: 101,
        nom: 'Système d\'information',
        sigle: 'SI',
        chef: 'Agent 1',
        parent: 'Département 1',
    },
]

const DepartementsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Identifiant</TableCell>
                        <TableCell className="px-0">Dénomination</TableCell>
                        <TableCell className="px-0">Sigle</TableCell>
                        <TableCell className="px-0">Chef</TableCell>
                        <TableCell className="px-0">Entité Parent</TableCell>
                        <TableCell className="px-0">Supprimer</TableCell>
                        <TableCell className="px-0">Modifier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {DepartTable
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {user.code}
                                </TableCell>
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
                                    {user.sigle}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {user.chef}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {user.parent}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon color="error">delete</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
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
                count={DepartTable.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default DepartementsTable
