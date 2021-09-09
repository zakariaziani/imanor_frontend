import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Select,
    InputLabel,
} from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'app/components'

const NewDepartement = () => {
    const [state, setState] = useState({
        date: new Date(),
    })


    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        nom,
        entiteParent,
        id,
        chef,
    } = state

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Nouveau département', path: '/nouveauDepartement' },
                    ]}
                />
            </div>
            <SimpleCard title="Nouveau département">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Dénomination"
                            onChange={handleChange}
                            type="text"
                            name="Dénomination"
                            value={nom || ''}
                            validators={[
                                'required',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <InputLabel htmlFor="grouped-native-select">Entité Parent</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select" className="mb-4 w-full" value={entiteParent || ''}>
                            <optgroup label="Départements">
                                <option value={1}>Département 1</option>
                                <option value={2}>Département 2</option>
                                <option value={3}>Département 3</option>
                                <option value={4}>Département 4</option>
                            </optgroup>
                        </Select>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="identifiant"
                            onChange={handleChange}
                            name="identifiant"
                            type="number"
                            value={id || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <InputLabel htmlFor="grouped-native-select">Chef</InputLabel>
                        <Select native 
                            defaultValue="" 
                            id="grouped-native-select" 
                            className="mb-4 w-full" 
                            value={chef || ''}
                            onChange={handleChange}>
                            <option value={"Agent 1"}>Agent 1</option>
                            <option value={"Agent 2"}>Agent 2</option>
                        </Select>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit</span>
                </Button>
            </ValidatorForm>
            </SimpleCard>
        </div>
    )
}

export default NewDepartement
