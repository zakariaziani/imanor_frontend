import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    InputLabel,
} from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'app/components'

const NewUser = () => {
    const [state, setState] = useState({
        date: new Date(),
    })

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

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
        lastName,
        firstName,
        password,
        confirmPassword,
        gender,
        departement,
        email,
        role,
    } = state

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
                            name="username"
                            value={lastName || ''}
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
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <InputLabel htmlFor="grouped-native-select">Département</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select" className="mb-4 w-full" value={departement || ''}>
                            <optgroup label="Département 1">
                                <option value={1}>Service 1</option>
                                <option value={2}>Service 2</option>
                            </optgroup>
                            <optgroup label="Département 2">
                                <option value={3}>Service 3</option>
                                <option value={4}>Service 4</option>
                            </optgroup>
                        </Select>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
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
                            name="firstName"
                            value={firstName || ''}
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
                        <InputLabel htmlFor="grouped-native-select">Rôle</InputLabel>
                        <Select native 
                            defaultValue="" 
                            id="grouped-native-select" 
                            className="mb-4 w-full" 
                            value={role || ''}
                            onChange={handleChange}>
                            <option value={"Agent d'entité"}>Agent de l'entité</option>
                            <option value={"Responsable de l'entité"}>Responsable de l'entité</option>
                            <option value={"Responsable central"}>Responsable central</option>
                        </Select>
                        <RadioGroup
                            className="mb-4"
                            value={gender || ''}
                            name="gender"
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="Male"
                                control={<Radio color="secondary" />}
                                label="Homme"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="Female"
                                control={<Radio color="secondary" />}
                                label="Femme"
                                labelPlacement="end"
                            />
                        </RadioGroup>
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
