import React, {useEffect, useState} from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from "axios"

const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '44px',
        opacity: 0.6,
        color: palette.primary.main,
    },
}))

const StatCards = () => {
    const classes = useStyles()
    const [usersNumber, setUsersNumber]=useState(0)
    const [courriersNumber, setCourriersNumber]=useState(1)


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/agent')
            .then(response => {
                setUsersNumber(response.data.data.length)
            })
        axios.get('http://127.0.0.1:8000/api/courrier')
            .then(response => {
                setCourriersNumber(response.data.data.length)
        })
    }, [])

    return (
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Nombre d'utilisateurs</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {usersNumber}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton href="/users" >
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>email</Icon>
                        <div className="ml-3">
                            <small className="text-muted">
                                Nombre de couriers
                            </small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {courriersNumber}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton href="/courriers">
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatCards
