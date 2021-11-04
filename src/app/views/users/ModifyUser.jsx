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
        date: new Date(),
    })

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.mdp) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.mdp])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:8000/api/add-agent', state);
        if (res.data.status === 200)
        {
            console.log(res.data.message);
            setState({
                nom: '',
                prenom: '',
                mdp: '',
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

    const {
        nom= 'zakaria',
        prenom= 'ziani',
        mdp= '123456',
        confirmPassword = '123456',
        departement = 'SI',
        email = 'zakaria ziani',
        role = 'agent de l\'entité',
    } = state

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
                        <Select native id="departement" name="departement" className="mb-4 w-full">
                            <optgroup label="Département 1">
                                <option value={departement || ''}>Service 1</option>
                                <option value={departement || ''}>Service 2</option>
                            </optgroup>
                            <optgroup label="Département 2">
                                <option value={departement || ''}>Service 3</option>
                                <option value={departement || ''}>Service 4</option>
                            </optgroup>
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
                            <option value={role}>Agent de l'entité</option>
                            <option value={role}>Responsable de l'entité</option>
                            <option value={role}>Responsable central</option>
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

export default NewUser
