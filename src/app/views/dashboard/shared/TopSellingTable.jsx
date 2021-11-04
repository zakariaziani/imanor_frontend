import React, {useState, useEffect} from 'react'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import axios from 'axios'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    productTable: {
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-child': {
            paddingLeft: '16px !important',
        },
    },
}))

const TopSellingTable = () => {
    const classes = useStyles()
    const [courriersList, setCourriersList]=useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/courrier')
            .then(response => {
                setCourriersList(response.data.data)
            })
    }, []);

    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                <span className="card-title">liste  des courriers</span>
            </div>
            <div className="overflow-auto">
                <Table
                    className={clsx(
                        'whitespace-pre min-w-400',
                        classes.productTable
                    )}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-6" colSpan={3}>
                                Client
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Date
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                Département
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Agent
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Statut
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courriersList.map((courrier, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    className="px-0 capitalize"
                                    colSpan={3}
                                    align="left"
                                >
                                    <div className="flex items-center">
                                        <Avatar src={courrier.imgUrl} />
                                        <p className="m-0 ml-8">
                                            {courrier.client}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={2}
                                >
                                    {courrier.date}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={3}
                                >
                                    {courrier.departement_affecte}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={2}
                                >
                                    {courrier.agent_affecte}
                                </TableCell>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                    colSpan={2}
                                >
                                    {courrier.statut !== 'NV' ? (
                                        courrier.statut === 'CS' ? (
                                            <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                                                Consulté
                                            </small>
                                        ) : (
                                            <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                                                Affecté
                                            </small>
                                        )
                                    ) : (
                                        <small className="border-radius-4 bg-error text-white px-2 py-2px">
                                            Nouveau
                                        </small>
                                    )}
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    <form method="get" action={'http://127.0.0.1:8000/' + courrier.fileUrl}>
                                        <IconButton type="submit" >
                                            <Icon color="primary">visibility</Icon>
                                        </IconButton>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}


export default TopSellingTable
