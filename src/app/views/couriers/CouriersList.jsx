import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import TopSellingTable from '../dashboard/shared/TopSellingTable'

const Analytics = () => {
    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                    <Grid container spacing={3} item lg={12} md={12} sm={12} xs={12}>
                        <TopSellingTable />
                    </Grid>
            </div>
        </Fragment>
    )
}

export default Analytics
