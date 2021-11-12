import React, {useState, useEffect} from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    colgroup,
} from '@material-ui/core'
import axios from "axios"


const DepartementsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [departTable, setDepartTable] = useState([])
    const [agentTable, setAgentTable] = useState([])
    var list = []


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleDelete = (event , id) => {
        axios.delete('http://127.0.0.1:8000/api/departement/'+id)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/departement')
            .then(response => {
                setDepartTable(response.data.data)
            })
        axios.get('http://127.0.0.1:8000/api/agent')
            .then(response => {
                setAgentTable(response.data.data)
                for (const a of agentTable) {
                    list.push({key : a.id , value : a.nom + ' ' + a.prenom})
                }
            })

    },[]);

    return (
        <div className="w-full">
            <Table className=" whitespace-pre">
            <colgroup>
                <col style={{width:'7%'}}/>
                <col style={{width:'30%'}}/>
                <col style={{width:'7%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'10%'}}/>
                <col style={{width:'7%'}}/>
            </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Identifiant</TableCell>
                        <TableCell  className="px-0">Dénomination</TableCell>
                        <TableCell align="center" className="px-0">Sigle</TableCell>
                        <TableCell className="px-0">Chef</TableCell>
                        <TableCell align="center" className="px-0">Entité Parente</TableCell>
                        <TableCell className="px-0">Supprimer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departTable
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((depart, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {depart.id}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    
                                >
                                    {depart.departement}
                                </TableCell>
                                <TableCell
                                    className="px-1 capitalize"
                                    align="center"
                                >
                                    {depart.sigle}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {list[1]}
                                </TableCell>
                                <TableCell align="center" className="px-0 capitalize">
                                    {depart.parent}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon color="error">delete</Icon>
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
                count={departTable.length}
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

export default DepartementsTable
