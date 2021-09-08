import React from 'react'
import { Breadcrumb } from 'app/components'
import UploadForm from './UploadForm'

const NewCourier = () => {

    return (
        <div className="upload-form m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Ajouter un courrier', path: '/' },
                    ]}
                />
            </div>
            <UploadForm/>

        </div>
    )
}

export default NewCourier
