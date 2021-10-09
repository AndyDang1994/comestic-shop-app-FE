import React, { Component } from 'react';
import { connect } from "react-redux";
import { Dialog } from 'primereact/dialog';
import ImageList from '@material-ui/core/ImageList';
import { makeStyles } from '@material-ui/core/styles';
import ImageListItem from '@material-ui/core/ImageListItem';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { productActions } from '../../redux/actions/ProductActions';
import CommonMessage from './Message';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './EditThumbnailsDialog.css'
import { config } from '../../config/config';
import Photo from './photo';
import { cloudinaryAction } from '../../redux/actions/CloudinaryAction';
import { cloudinarySerevice } from '../../redux/service/CloudinaryService';
import ComboBox from './ComboBox';




class EditThumbnailsDialog extends Component {
    emptyProduct = {
        name: "",
        quantity: 0,
        thumbnail: [],
        description: "",
        price: 0,
        vote: 0,
        subCateCode: ''
    }
    constructor(props) {
        super(props);

        this.state = {
            editProductThumbnailsDialog: true,
            product: this.props.product,
            totalSize: 0,
            isAlert: false,
            submitted: false,
            newProduct: this.emptyProduct,
            files: [],
            thumbnails: [],
        }

        this.handleClearAlert = this.handleClearAlert.bind(this)
        this.hideDialogHandeler = this.hideDialogHandeler.bind(this)
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onTemplateUpload = this.onTemplateUpload.bind(this)
        this.onTemplateCreateNew = this.onTemplateCreateNew.bind(this)
        this.onTemplateSelect = this.onTemplateSelect.bind(this);
        this.onTemplateRemove = this.onTemplateRemove.bind(this);
        this.onTemplateClear = this.onTemplateClear.bind(this);
        this.onBasicUpload = this.onBasicUpload.bind(this);
        this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
        this.headerTemplate = this.headerTemplate.bind(this);
        this.itemTemplate = this.itemTemplate.bind(this);
        this.emptyTemplate = this.emptyTemplate.bind(this);
        this.changeComboxHandler = this.changeComboxHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }
    
    onUpload() {
        this.toast.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
    onTemplateSelect(e) {
        let totalSize = this.state.totalSize;
        var fileArr = []
        Array.from(e.files).forEach(file => {
            totalSize += file.size;
            fileArr.push(file)
        });
        this.setState({
            totalSize,
            files: this.state.files.concat(fileArr)
        });
    }
    onTemplateUpload(e) {
        let state = { submitted: true, isAlert: true, };
        let totalSize = 0;
        
        var fileLst = []
        Array.from(e.files).forEach(file => {
            this.props.uploadProductPhoto(this.state.product, file)
            totalSize += (file.size || 0);
            fileLst.push(file)

        });
        state = {
            ...state,
            totalSize,
        }
        this.setState({
            state,
            files: fileLst
        });
    }
    onTemplateCreateNew() {
        let totalSize = 0;
        var arr = []
        var lstImgSize = 0
        arr.concat(this.state.thumbnails)
        this.state.files.forEach(file => {
            cloudinarySerevice.uploadPhoto(file)
                .then(
                    payload => {
                        lstImgSize++
                        var str = 'v' + payload.version + '/' + payload.public_id + '.' + payload.format
                        if (!this.state.thumbnails.includes(str)) {
                            arr.push(str)

                            this.setState({
                                thumbnails: arr
                            });
                            console.log("str " + this.state.thumbnails)
                        }
                        totalSize += (file.size || 0);
                        if (lstImgSize === this.state.files.length) {
                            var newProduct = { ...this.state.newProduct }
                            newProduct["thumbnail"] = this.state.thumbnails
                            this.props.createNewProduct(newProduct)
                            
                            this.setState({
                                isAlert: true,
                                totalSize,
                                submitted: true,
                                files: [],
                                newProduct: this.emptyProduct,
                                thumbnails: []
                            });
                        }
                    }
                )
                .catch(
                    err => {
                        lstImgSize++
                    }
                )

        });
        

    }

    onTemplateRemove(file, callback) {
        this.setState((prevState) => ({
            totalSize: prevState.totalSize - file.size
        }), callback);
    }

    onTemplateClear() {
        this.setState({ totalSize: 0 });
    }

    onBasicUpload() {
        this.toast.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    onBasicUploadAuto() {
        this.toast.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
    changeComboxHandler(e) {
        let newProduct = { ...this.state.newProduct };
        newProduct['subCateCode'] = e.value.code;
        this.setState({ newProduct });

        console.log("onCategoryChange")
    }
    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let newProduct = { ...this.state.newProduct };
        newProduct[`${name}`] = val;

        this.setState({ newProduct });
    }
    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let newProduct = { ...this.state.newProduct };
        newProduct[`${name}`] = val;

        this.setState({ newProduct });
    }
    headerTemplate(options) {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = this.state.totalSize / 500000;
        const formatedValue = this.fileUploadRef ? this.fileUploadRef.formatSize(this.state.totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {!this.props.isCreateProd && uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 50 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }
    emptyTemplate() {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5">Drag and Drop Image Here</span>
            </div>
        )
    }


    itemTemplate(file, props) {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => this.onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }


    handleClearAlert() {
        this.setState({ isAlert: false, submitted: false })
    }
    hideDialogHandeler() {
        console.log("hideDialogHandeler")
        //this.setState({ editProductThumbnailsDialog: false })
        //this.setState({ editProductThumbnailsDialog: true })
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
            },
            imageList: {
                flexWrap: 'nowrap',
                // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                transform: 'translateZ(0)',
            },

        }));
        const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
        const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
        const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

        return (
            <div className={useStyles.root}>
                {this.state.isAlert && this.props.alert.type != null && <CommonMessage severity={this.props.alert.type} detail={this.props.alert.message} handleClearAlert={this.handleClearAlert} />}
                <Dialog visible={this.state.editProductThumbnailsDialog} maximized="true" style={{ width: '650px' }} header="Product Thumbnails" modal className="p-fluid" onHide={this.props.hideDialog}>
                    <div className="card" hidden={!this.props.isCreateProd}>
                        <div className="p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={this.state.newProduct.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.newProduct.name })} />
                                {this.state.submitted && !this.state.newProduct.name && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="name">Category</label>
                                <ComboBox comboBoxData ={this.props.metaData.subCategoryMeta} changeComboxHandler = {e => this.changeComboxHandler(e)}/>
                            </div>
                        </div>
                        <div className="p-field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={this.state.newProduct.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="VND" locale="it-IT" />
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div>

                    </div>
                    <div className="card dialog-panel" hidden={this.props.isCreateProd} >
                        {this.state.product.thumbnail != null && <ImageList className={useStyles.imageList} cols={5}>
                            {
                                this.state.product.thumbnail.map(
                                    (thumb, index) => {
                                        return (
                                            <ImageListItem key={index}>
                                                <Photo
                                                    publicId={thumb}
                                                    cloudName={config.cloudinaryConfig.cloud_name}
                                                    height="200" aspectRatio="1.0"
                                                />
                                            </ImageListItem>
                                        )
                                    }
                                )
                            }
                        </ImageList>}
                    </div>
                    <div className="card" >
                        <FileUpload ref={(el) => this.fileUploadRef = el} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={50000000}
                            onUpload={this.onTemplateUpload} onSelect={this.onTemplateSelect} onError={this.onTemplateClear} onClear={this.onTemplateClear}
                            headerTemplate={this.headerTemplate} itemTemplate={this.itemTemplate} emptyTemplate={this.emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                    </div>
                    <div hidden={!this.props.isCreateProd}>
                        <Button label="New" icon="pi pi-plus" className="p-button-rounded p-button-success p-mr-2" onClick={this.onTemplateCreateNew} />
                    </div>
                </Dialog>
            </div >
        )
    }

}
const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        cloudinaryPhoto: state.cloudinaryPhoto
    };
};
const mapDispatchToProps = {
    //uploadProductPhoto: productActions.getProductByParams,
    //uploadProductPhoto : cloudinaryAction.uploadPhoto
    uploadProductPhoto: productActions.upLoadImageProduct,
    uploadCloudinaryPhoto: cloudinaryAction.uploadPhoto,
    createNewProduct: productActions.createProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(EditThumbnailsDialog)