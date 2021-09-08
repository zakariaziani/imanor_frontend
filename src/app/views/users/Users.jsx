import React from 'react'
import UsersTable from '../material-kit/tables/UsersTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))


const Users = () => {
    const classes = useStyles()

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Utilisateurs', path: '/users' },
                    ]}
                />
            </div>
            <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Ajouter
            </Button>
            <div className="py-3" />
            <SimpleCard title="Tous les utilisateurs">
                <UsersTable />
            </SimpleCard>
        </div>
    )
}

export default Users
