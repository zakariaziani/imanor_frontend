import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Select,
    InputLabel,
} from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'app/components'
import axios from 'axios'
import history from 'history.js'


const NewDepartement = () => {
    const [state, setState] = useState({
        id : '',
        departement : '',
        sigle : '',
        chef_id : '',
        parent : '',
    })


    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:8000/api/departement', state);
        if (res.data.status === 200)
        {
            console.log(res.data.message);
            setState({
                id : '',
                departement : '',
                sigle : '',
                chef_id : '',
                parent : '',
            })

        }
        history.push('/departements')
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        id,
        departement,
        sigle,
        chef_id,
        parent
    } = state


    // get data
    const [agents,setAgents] = useState([])
    const [departements, setDepartements] = useState([])
    var list = []

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/agent')
            .then(response => {
                setAgents(response.data.data)
            })
        axios.get('http://127.0.0.1:8000/api/departement')
            .then(response => {
                setDepartements(response.data.data)
            })
        for (const d of departements) {
            let temp = []
            for (const a of agents) {
                if (a.departement === d.id) {
                    temp.push(a.nom + ' ' + a.prenom)
                }
            }
            list.push({key:d.id, value:temp})
        }
    }, []);

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
                            name="departement"
                            value={departement || ''}
                            validators={[
                                'required',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Sigle"
                            onChange={handleChange}
                            type="text"
                            name="sigle"
                            value={sigle || ''}
                        />
                        <InputLabel htmlFor="grouped-native-select">Chef du département</InputLabel>
                        <Select native 
                            defaultValue="" 
                            id="chef_id" 
                            name="chef_id"
                            className="mb-4 w-full" 
                            value={chef_id || ''}
                            onChange={handleChange}>
                            { //! select departements from the list that we got from the API
                            agents.map(a => (
                                    <option value={a.id}>{a.nom + ' ' + a.prenom}</option>
                            ))
                            }
                        </Select>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Identifiant"
                            onChange={handleChange}
                            name="id"
                            type="number"
                            value={id || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <InputLabel htmlFor="grouped-native-select">Entité Parente</InputLabel>
                        <Select native defaultValue="" id="parent" name="parent" className="mb-4 w-full" value={parent || ''} onChange={handleChange}>
                            { //! select departements from the list that we got from the API
                            departements.map(d => (
                                    <option value={d.id}>{d.departement}</option>
                            ))
                            }
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
