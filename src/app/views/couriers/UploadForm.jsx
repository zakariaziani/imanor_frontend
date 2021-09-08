import React, { useState, useEffect, Fragment} from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Fab, 
    Card, 
    Divider,
    TextField,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {MatxProgressBar, SimpleCard } from 'app/components'
import { Autocomplete } from '@material-ui/lab'
//import clsx from 'clsx'
//import axios from 'axios'

const UploadForm = () => {

//Upload Code
    const [files, setFiles] = useState([])
    const [queProgress, setQueProgress] = useState(0)
    //const [dargClass, setDragClass] = useState('')

    const handleFileSelect = (event) => {
        let files = event.target.files
        let list = []

        for (const iterator of files) {
            list.push({
                file: iterator,
                uploading: false,
                error: false,
                progress: 0,
            })
        }
        setFiles(list)
    }

    // const handleDragOver = (event) => {
    //     event.preventDefault()
    //     setDragClass('drag-shadow')
    // }

    // const handleDrop = (event) => {
    //     event.preventDefault()
    //     event.persist()

    //     let files = event.dataTransfer.files
    //     let list = []

    //     for (const iterator of files) {
    //         list.push({
    //             file: iterator,
    //             uploading: false,
    //             error: false,
    //             progress: 0,
    //         })
    //     }

    //     setDragClass('')
    //     setFiles(list)

    //     return false
    // }

    // const handleDragStart = (event) => {
    //     setDragClass('drag-shadow')
    // }

    const handleSingleRemove = (index) => {
        let tempList = [...files]
        tempList.splice(index, 1)
        setFiles([...tempList])
    }

    const handleAllRemove = () => {
        setFiles([])
        setQueProgress(0)
    }

    const uploadSingleFile = (index) => {
        let allFiles = [...files]
        let file = files[index]

        allFiles[index] = { ...file, uploading: true, error: false }

        setFiles([...allFiles])

        //! upload file to the backend API
        //axios.post("api/uploadfile", allFiles);
    }

    const uploadAllFile = () => {
        let allFiles = []

        files.map((item) => {
            allFiles.push({
                ...item,
                uploading: true,
                error: false,
            })

            return item
        })

        setFiles([...allFiles])
        setQueProgress(35)
    }

    const handleSingleCancel = (index) => {
        let allFiles = [...files]
        let file = files[index]

        allFiles[index] = { ...file, uploading: false, error: true }

        setFiles([...allFiles])
    }

    const handleCancelAll = () => {
        let allFiles = []

        files.map((item) => {
            allFiles.push({
                ...item,
                uploading: false,
                error: true,
            })

            return item
        })

        setFiles([...allFiles])
        setQueProgress(0)
    }

    let isEmpty = !!!files.length


//Form code

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
        console.log("submitted");
        console.log(event);
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const {
        username,
        date,
        description,
    } = state


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
]



    return (
        <div>
            <div className="upload-form m-sm-30">
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="upload-single-file">
                        <Fab
                            className="capitalize"
                            color="primary"
                            component="span"
                            variant="extended"
                        >
                            <div className="flex items-center">
                                <Icon className="pr-8">cloud_upload</Icon>
                                <span>Un Seul Fichier</span>
                            </div>
                        </Fab>
                    </label>
                    <input
                        className="hidden"
                        onChange={handleFileSelect}
                        id="upload-single-file"
                        type="file"
                    />
                    <div className="px-4"></div>
                    <label htmlFor="upload-multiple-file">
                        <Fab
                            className="capitalize"
                            color="primary"
                            component="span"
                            variant="extended"
                        >
                            <div className="flex items-center">
                                <Icon className="pr-8">cloud_upload</Icon>
                                <span>Plusieurs Fichiers</span>
                            </div>
                        </Fab>
                    </label>
                    <input
                        className="hidden"
                        onChange={handleFileSelect}
                        id="upload-multiple-file"
                        type="file"
                        multiple
                    />
                </div>


                <Card className="mb-6" elevation={2}>
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
                            <Grid item lg={1} md={1}>
                                Size
                            </Grid>
                            <Grid item lg={2} md={2}>
                                Progress
                            </Grid>
                            <Grid item lg={1} md={1}>
                                Status
                            </Grid>
                            <Grid item lg={4} md={4}>
                                Actions
                            </Grid>
                        </Grid>
                    </div>
                    <Divider></Divider>

                    {isEmpty && <p className="px-4">Que is empty</p>}

                    {files.map((item, index) => {
                        let { file, uploading, error, progress } = item
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
                                    <Grid item lg={1} md={1} sm={12} xs={12}>
                                        {(file.size / 1024 / 1024).toFixed(1)}{' '}
                                        MB
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <MatxProgressBar
                                            value={progress}
                                        ></MatxProgressBar>
                                    </Grid>
                                    <Grid item lg={1} md={1} sm={12} xs={12}>
                                        {error && (
                                            <Icon color="error">error</Icon>
                                        )}
                                        {/* {uploading && <Icon className="text-green">done</Icon>} */}
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <div>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                disabled={uploading}
                                                onClick={() =>
                                                    uploadSingleFile(index)
                                                }
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                className="mx-2"
                                                size="small"
                                                variant="contained"
                                                disabled={!uploading}
                                                color="secondary"
                                                onClick={() =>
                                                    handleSingleCancel(index)
                                                }
                                            >
                                                Cancel
                                            </Button>
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

                <div>
                    <p className="m-0">Queue progress:</p>
                    <div className="py-4">
                        <MatxProgressBar value={queProgress}></MatxProgressBar>
                    </div>
                    <div className="flex">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isEmpty}
                            onClick={uploadAllFile}
                        >
                            Upload All
                        </Button>
                        <Button
                            className="mx-2"
                            variant="contained"
                            color="secondary"
                            disabled={isEmpty}
                            onClick={handleCancelAll}
                        >
                            Cancel All
                        </Button>
                        {!isEmpty && (
                            <Button
                                variant="contained"
                                className="bg-error"
                                onClick={handleAllRemove}
                            >
                                Remove All
                            </Button>
                        )}
                    </div>
                </div>
            
        </div>



{/*! information form */}
{/*! information form */}
{/*! information form */}




        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Client"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
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
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                margin="none"
                                id="mui-pickers-date"
                                label="Date"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                value={date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
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
                                <Autocomplete
                                    id="depart"
                                    name="depart"
                                    onChange={handleChange}
                                    className="mb-4 w-500"
                                    options={suggestions}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Département"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    id="agent"
                                    name="agent"
                                    className="mb-4 w-500"
                                    onChange={handleChange}
                                    options={suggestions}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Agent"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
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
