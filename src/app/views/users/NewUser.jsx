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

const NewUser = () => {
    const [state, setState] = useState({
        nom: '',
        prenom: '',
        password: '',
        confirmPassword: '',
        departement: '',
        email: '',
        role: '',
    })
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




    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:8000/api/agent', state);
        if (res.data.status === 200)
        {
            console.log(res.data.message);
            setState({
                nom: '',
                prenom: '',
                password: '',
                confirmPassword: '',
                departement: '',
                email: '',
                role: '',
            })

        }

    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    // const {
    //     nom,
    //     prenom,
    //     password,
    //     confirmPassword,
    //     departement,
    //     email,
    //     role,
    // } = state

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Nouvel utilisateur', path: '/NouvelUtilisateur' },
                    ]}
                />
            </div>
            <SimpleCard title="Nouvel utilisateur">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Nom"
                            onChange={handleChange}
                            type="text"
                            name="nom"
                            value={state.nom}
                            validators={[
                                'required',
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Password"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={state.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <InputLabel htmlFor="departement">D??partement</InputLabel>
                        <Select native id="departement" name="departement" className="mb-4 w-full" onChange={handleChange}>
                            
                            { //! select departements from the list that we got from the API
                            departements.map(d => (
                                    <option value={d.id}>{d.departement}</option>
                            ))
                            }
                            
                        </Select>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={state.email}
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
                            label="Pr??nom"
                            onChange={handleChange}
                            type="text"
                            name="prenom"
                            value={state.prenom}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Confirm Password"
                            onChange={handleChange}
                            name="confirmPassword"
                            type="password"
                            value={state.confirmPassword || ''}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={[
                                'this field is required',
                                "password didn't match",
                            ]}
                        />
                        <InputLabel htmlFor="role">R??le</InputLabel>
                        <Select native
                            id="role" 
                            name="role"
                            className="mb-4 w-full" 
                            onChange={handleChange}>
                            <option value={"AE"}>Agent de l'entit??</option>
                            <option value={"RE"}>Responsable de l'entit??</option>
                            <option value={"RC"}>Responsable central</option>
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

export default NewUser
