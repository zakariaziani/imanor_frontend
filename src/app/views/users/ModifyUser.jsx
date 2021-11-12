import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router'
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
import {useHistory} from 'react-router-dom'

const ModifyUser = () => {
    const [state, setState] = useState({})
    const {
        nom= '',
        prenom= '',
        mdp= '',
        confirmPassword = '',
        departement = '',
        email = '',
        role = '',
    } = state

    const [departements, setDepartements] = useState([])
    const [agent, setAgent] = useState([])
    const userId = useParams()
    const history = useHistory();
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.mdp) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.mdp])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/departement')
            .then(response => {
                setDepartements(response.data.data)
            })
        axios.get('http://127.0.0.1:8000/api/agent/' + userId.id)
            .then(response => {
                setState(response.data.data)
            })
        console.log(state)
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.put('http://localhost:8000/api/agent/'+userId.id, state);
        setState({
            nom: '',
            prenom: '',
            mdp: '',
            confirmPassword: '',
            departement: '',
            email: '',
            role: '',
        })
        history.push('/Users')
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }



    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Modifier un utilisateur', path: '/' },
                    ]}
                />
            </div>
            <SimpleCard title="Modifier les informations d'un utilisateur">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Nom"
                            onChange={handleChange}
                            type="text"
                            name="nom"
                            value={nom}
                            validators={[
                                'required',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Password"
                            onChange={handleChange}
                            name="mdp"
                            type="password"
                            value={mdp}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <InputLabel htmlFor="departement-select">Département</InputLabel>
                        <Select native defaultValue={departement} id={"departement"} name="departement" className="mb-4 w-full" onChange={handleChange}>
                            { //! select departements from the list that we got from the API
                            departements.map(d => (
                                    <option key={d.id} value={d.id}>{d.departement}</option>
                            ))
                            }
                        </Select>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]} 
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Prénom"
                            onChange={handleChange}
                            type="text"
                            name="prenom"
                            value={prenom}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Confirm Password"
                            onChange={handleChange}
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword || ''}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={[
                                'this field is required',
                                "password didn't match",
                            ]}
                        />

                        <InputLabel htmlFor="role">Rôle</InputLabel>
                        <Select native
                            id="role" 
                            name="role"
                            className="mb-4 w-full" 
                            onChange={handleChange}>
                            <option key="AE" value={role}>Agent de l'entité</option>
                            <option key="RE" value={role}>Responsable de l'entité</option>
                            <option key="RC" value={role}>Responsable central</option>
                        </Select>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit Change</span>
                </Button>
            </ValidatorForm>
            </SimpleCard>
        </div>
    )
}

export default ModifyUser
