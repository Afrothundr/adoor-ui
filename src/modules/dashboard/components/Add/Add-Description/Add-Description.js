
import React from 'react';
import './Add-Description.scss';
import Forms from '../../../../shared/utilities/forms';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import { environment } from '../../../../../environments';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import upload from '../../../../../images/imgUpload.svg'

class AddDescription extends React.Component {
    constructor() {
        super();
        this.state = {
            canSubmit: false,
            imgUploadUrls: [],
            isLoading: false
        };
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
        this.props.isFormValid(false);
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
        this.props.isFormValid(true);
    }

    handleClearClick = () => {
        this.refs.form.reset();
        this.setState({
            canSubmit: false,
            imgUploadUrls: [],
            isLoading: false
        })
    }

    submit = model => {
        this.props.handleSubmit({...model, pictures: this.state.imgUploadUrls});
    }

    parentSubmit = () => {
        this.props.handleSubmit({...this.refs.form.getModel(), pictures: this.state.imgUploadUrls});
    }

    handleDrop = files => {
        this.setState({
            isLoading: true
        });
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", this.props.profileId);
            formData.append("upload_preset", environment.CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
            formData.append("api_key", environment.cloudinary); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios
            return axios.post(environment.CLOUDINARY_UPLOAD_URL, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url
                console.log(fileURL);
                this.setState(state => {
                    const images = state.imgUploadUrls;
                    images.push(fileURL);
                    return {imgUploadUrls: images};
                });
                console.log(data);
            })
        });

        axios.all(uploaders).then(() => {
            this.setState({
                isLoading: false
            });

        });
    }

    render() {
        return (
            <div className="add-description">
                <header>
                    <i className="fas fa-images"></i><h3>Add Description</h3>
                </header>
                <Formsy className="form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} ref="form">
                    <Forms.TextArea
                        name="description"
                        type="text"
                        validationError="description is required"
                        label="tell us more about this listing…"
                        required />
                    <Dropzone accept="image/*" onDrop={acceptedFiles => this.handleDrop(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div>
                                {
                                    (this.state.imgUploadUrls.length === 0 && !this.state.isLoading) &&
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className="dropzone">
                                                <img src={upload} alt="upload"></img>
                                                <p>Drop images or click to select files to upload.</p>
                                            </div>
                                        </div>
                                    </section>
                                }
                                {this.state.isLoading && <CircularProgress />}
                                {
                                    this.state.imgUploadUrls.length > 0 &&
                                    <div className="image-preview">
                                        {
                                            this.state.imgUploadUrls.map((url, index) =>
                                                <div className="image-preview-card" key={index}>
                                                    <img alt="preview" src={url}></img>
                                                </div>
                                            )
                                        }
                                    </div>
                                }

                            </div>
                        )}
                    </Dropzone>
                    <div className="add-description-actions">
                        <Button onClick={this.handleClearClick} type="button">clear</Button>
                        <Button variant="contained" color="primary" disabled={!this.state.canSubmit || this.state.imgUploadUrls.length === 0} type="submit">submit</Button>
                    </div>
                </Formsy>
            </div>
        )
    }
}

export default AddDescription;