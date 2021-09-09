import React from 'react'
import DepartementsTable from '../material-kit/tables/DepartementsTable'
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

const Departements = () => {
    const classes = useStyles()
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Départements', path: '/departements' },
                    ]}
                />
            </div>
            <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    href="/nouveauDepartement"
                >
                    Ajouter
            </Button>
            <div className="py-3" />
            <SimpleCard title="Liste des départements">
                <DepartementsTable />
            </SimpleCard>
        </div>
    )
}

export default Departements

