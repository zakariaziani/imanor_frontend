import React, { useState, useEffect,useRef, Fragment} from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Fab, 
    Card, 
    Divider,
    Select,
    InputLabel,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { SimpleCard } from 'app/components'
import axios from 'axios'
import history from 'history.js'

const UploadForm = () => {


    const [files, setFiles] = useState([])
    const [state, setState] = useState({
        client: '',
        date: '',
        description: '',
        departement: '',
        agent: '',
    })
    const [Agents, setAgents] = useState([]);
    const [Departements, setDepartements] = useState([]);
    const form = useRef(null)

    

    const handleFileSelect = (event) => {
        let files = event.target.files
        let list = []

        for (const iterator of files) {
            list.push({
                file: iterator,
            })
        }
        setFiles(list)
    }

    const handleSingleRemove = (index) => {
        let tempList = [...files]
        tempList.splice(index, 1)
        setFiles([...tempList])
    }

    let isEmpty = !!!files.length


//Form code

    const handleSubmit = async (event) => {
        event.preventDefault();
        // let data = {
        //     ...state,
        //     'file':files[0],
        // }
        // console.log(data)
        const data = new FormData(form.current);
        // form.append("file", files[0].file)
        // form.append("client", data.client)
        // form.append("departement", data.departement)
        // form.append("agent", data.agent)
        // form.append("description", data.description)
        // form.append("date", data.date)
        console.log(form)
        const res = await axios.post('http://localhost:8000/api/courrier', data);
        console.log(res)
        if (res.data.status === 200)
        {
            console.log(res.data.message);
            setState({
                client : '',
                departement : '',
                date : '',
                agent : '',
                description : '',

            })
            setFiles([])
            // history.push('/courriers')

        }
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = () => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(date);
        setState({ ...state, 'date' : date })
    }

    const {
        client,
        date,
        description,
        departement,
        agent,
    } = state


//? /////////////////////////////// get data ///////////////////////////////
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/agent')
        .then(response => {
            setAgents(response.data.data)
        })
        axios.get('http://127.0.0.1:8000/api/departement')
        .then(response => {
            setDepartements(response.data.data)
        })
    }, []);

    return (
        <div>
        <ValidatorForm method="POST" encType="multipart/form-data" onSubmit={handleSubmit} onError={() => null}>
        <div className="upload-form m-sm-30">
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="upload-single-file">
                        <Fab
                            color="primary"
                            component="span"
                            variant="extended"
                        >
                            <div className="flex items-center">
                                <Icon className="pr-8">cloud_upload</Icon>
                                <span>Importer le courrier</span>
                            </div>
                        </Fab>
                    </label>
                    <input
                        className="hidden"
                        onChange={handleFileSelect}
                        name="files"
                        id="upload-single-file"
                        type="file"

                    />
                </div>


                <Card className="mb-6" elevation={6}>
                    <div className="p-4">
                        <Grid
                            container
                            spacing={2}
                            justify="center"
                            alignItems="center"
                            direction="row"
                        >
                            <Grid item lg={4} md={4}>
                                Name
                            </Grid>
                            <Grid item lg={4} md={4}>
                                Size
                            </Grid>
                            <Grid item lg={4} md={4}>
                                Actions
                            </Grid>
                        </Grid>
                    </div>
                    <Divider></Divider>

                    {isEmpty && <p className="px-4">Que is empty</p>}

                    {files.map((item, index) => {
                        let { file } = item
                        return (
                            <div className="px-4 py-4" key={file.name}>
                                <Grid
                                    container
                                    spacing={2}
                                    justify="center"
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        {file.name}
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        {(file.size / 1024 / 1024 ).toFixed(2)}{' '}
                                        MB
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                className="bg-error"
                                                onClick={() =>
                                                    handleSingleRemove(index)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </Card>
        </div>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Client"
                            onChange={handleChange}
                            type="text"
                            name="client"
                            value={client || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 50',
                            ]}
                            errorMessages={['this field is required']}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                className="mb-4 w-full"
                                onChange={handleDateChange}
                                margin="none"
                                id="date"
                                name="date"
                                label="Date"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                value={date}
                                
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item lg={12} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Description"
                            onChange={handleChange}
                            type="text"
                            name="description"
                            value={description || ''}
                            validators={[
                                'minStringLength: 10',
                                'maxStringLength: 200',
                            ]}
                            errorMessages={['Minimum : 10 caractères', 'Maximum : 200 caractères']}
                        />
                    </Grid>
                    <Grid item lg={12} md={6} sm={12} xs={12}>
                        <SimpleCard title="Affectation">  
                            <Fragment>
                                <InputLabel htmlFor="grouped-native-select">Affecté au département :</InputLabel>
                                <Select native 
                                    id="departement" 
                                    name="departement"
                                    className="mb-4 w-full" 
                                    value={departement || ''}
                                    onChange={handleChange}>
                                    { //! select departements from the list that we got from the API
                                    Departements.map(d => (
                                            <option key={d.id} value={d.id}>{d.departement}</option>
                                    ))
                                    }
                                </Select>
                                <InputLabel htmlFor="grouped-native-select">Affecté à l'agent :</InputLabel>
                                <Select native 
                                    id="agent" 
                                    name="agent"
                                    className="mb-4 w-full" 
                                    value={agent || ''}
                                    onChange={handleChange}>
                                    { //! select departements from the list that we got from the API
                                    Agents.map(a => (
                                            <option key={a.id} value={a.id}>{a.nom + ' ' + a.prenom}</option>
                                    ))
                                    }
                                </Select>
                            </Fragment>
                        </SimpleCard>
                    </Grid>
                </Grid>
                <div className="py-4"></div>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit</span>
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default UploadForm
