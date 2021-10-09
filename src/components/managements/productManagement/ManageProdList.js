import React, { Component } from 'react';
import { setProducts, editProducts, productActions } from '../../../redux/actions/ProductActions'
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Galleria } from 'primereact/galleria';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from "react-redux";
import { ActionTypes } from "../../../redux/contant/action-types";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import './ManageProdList.css';
import CommonMessage from '../../common/Message';
import { metaDataAction } from '../../../redux/actions/MetaDataAction';
import Photo from '../../common/photo';
import EditThumbnailsDialog from '../../common/EditThumbnailsDialog';
import { config } from '../../../config/config';
import ComboBox from '../../common/ComboBox';
import Header from '../../../layout/header/Header';
import { ContactInfor } from '../../../layout/header/ContactInfor';


class ManageProdList extends Component {

    prod = {
        name: "this.globalFilter"
    }
    setErrorSate = {
        hasError: false,
        message: "",
    }

    emptyProduct =
        {
            id: '',
            name: "",
            quantity: '',
            thumbnail: [],
            description: "",
            price: '',
            vote: '',
            commentID: '',
            subCateCode: ''
        }
    constructor(props) {
        super(props);

        this.state = {
            totCnt: 0,
            activeProdImgIndex: 0,
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            editProductThumbnailsDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null,
            setErrorSate: null,
            isBlocked: false,
            isAlert: false,
            isCreateProd: false
        };
        //this.productService = new ProductService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.leftToolbarDialogTemplate = this.leftToolbarDialogTemplate.bind(this)
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.handleClearAlert = this.handleClearAlert.bind(this)
        this.onProductImgChange = this.onProductImgChange.bind(this)
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.hideEditProductThumbnailsDialog = this.hideEditProductThumbnailsDialog.bind(this)
        this.saveProduct = this.saveProduct.bind(this);
        this.saveProductAction = this.saveProductAction.bind(this)
        this.editProduct = this.editProduct.bind(this);
        // this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.editProductThumbnails = this.editProductThumbnails.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
        this.removeProductImg = this.removeProductImg.bind(this);
        this.addProductImg = this.addProductImg.bind(this);
        this.itemImgTemplate = this.itemImgTemplate.bind(this);
        this.thumbnailImgTemplate = this.thumbnailImgTemplate.bind(this);
    }


    componentDidMount() {
        this.props.initProducts('')
        this.props.loadMetaDatas()
    }
    saveProductAction(value) {
        console.log("Edit product...")
    }

    onProductImgChange(event) {
        this.setState({ activeProdImgIndex: event.index });
    }
    removeProductImg() {
        console.log("remove image")
        var thumbnails = []
        thumbnails = thumbnails.concat(this.state.product.thumbnail)
        thumbnails.splice(this.state.activeProdImgIndex, 1)
        this.setState({
            product: {
                ...this.state.product, thumbnail: thumbnails
            },
            activeProdImgIndex: 0
        })

    }

    addProductImg() {
        console.log("add image")
        // this.setState((prevState) => ({
        //     activeIndex: (prevState.activeIndex === 0) ? this.state.images.length - 1 : prevState.activeIndex - 1
        // }));
    }

    itemImgTemplate(item) {
        return <img src={`/images/product-img/${item != null ? item : ""}`} style={{ width: '100%', display: 'block' }} />;
    }

    thumbnailImgTemplate(item) {
        return <img src={item} style={{ display: 'block' }} />;
    }


    formatCurrency(value) {
        // return (value == null ? "0" : value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        return (value == null ? "0" : value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            editProductThumbnailsDialog: true,
            isCreateProd: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideEditProductThumbnailsDialog() {
        this.props.initProducts()
        this.setState({
            submitted: false,
            editProductThumbnailsDialog: false,
            isCreateProd: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    hideDeleteProductsDialog() {
        this.setState({ deleteProductsDialog: false });
    }

    saveProduct() {
        let state = { submitted: true };

        if (this.state.product.name.trim()) {
            state = {
                ...state,
                isBlocked: (this.props.type != ActionTypes.EDIT_PRODUCT)
            };
            this.props.saveProductAction(this.state.product, '')

            state = {
                ...state,
                productDialog: false,
                isAlert: true,
                product: this.emptyProduct,
            };

        }

        this.setState(state);
    }

    editProduct(product) {
        this.setState({
            product: { ...product },
            productDialog: true
        });
        console.log("product " + JSON.stringify(this.state.product))
    }

    // confirmDeleteProduct(product) {
    //     this.setState({
    //         product,
    //         deleteProductDialog: true
    //     });
    // }

    editProductThumbnails(product) {
        console.log("editProductThumbnails")
        this.setState({
            product,
            editProductThumbnailsDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteProductsDialog: true });
    }

    deleteSelectedProducts() {
        //let products = this.props.products.filter(val => !this.state.selectedProducts.includes(val));
        this.props.deleteProductAction(this.state.selectedProducts,'')
        this.setState({
            submitted: true,
            isBlocked: (this.props.type != ActionTypes.DELETE_PRODUCT_SEC),
            deleteProductsDialog: false,
            selectedProducts: null,
            isAlert: true,
        });
    }

    onCategoryChange(e) {
        let product = { ...this.state.product };
        product['subCateCode'] = e.value.code;
        this.setState({ product });

        console.log("onCategoryChange")
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let product = { ...this.state.product };
        product[`${name}`] = val;

        this.setState({ product });
    }
    handleClearAlert() {
        this.setState({ isAlert: false })
    }
    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let product = { ...this.state.product };
        product[`${name}`] = val;

        this.setState({ product });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </React.Fragment>
        )
    }
    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    leftToolbarDialogTemplate() {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" uploadHandler={this.addProductImg} maxFileSize={1000000} label="Import" chooseLabel="Add" className="p-mr-2 p-d-inline-block" />
                <Button label="Remove" icon="pi pi-minus" className="p-button-help" onClick={this.removeProductImg} />
            </React.Fragment>
        )
    }

    imageBodyTemplate(rowData) {
        return <Photo
            publicId={rowData.thumbnail[0]}
            cloudName={config.cloudinaryConfig.cloud_name}
        />
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.price);
    }

    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.vote} readOnly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        //return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProduct(rowData)} /> */}
                <Button icon="pi pi-fw pi-cloud-upload" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProductThumbnails(rowData)} />
            </React.Fragment>
        );
    }

    render() {

        const header = (
            <div className="table-header">
                {/* <h5 className="p-m-0">Manage Products</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" name="prodFilter"  onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                    
                </span>
                <Button label="Search" icon="pi pi-check" className="p-button-text" onClick={this.props.initProducts(this.prod)} /> */}
            </div>
        );
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
        const deleteProductsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
            </React.Fragment>
        );
        return (

            <BlockUI blocked={this.props.isLocked} fullScreen template={<ProgressSpinner />}>
                {/* <Header></Header> */}
                <ContactInfor  isLoggedIn={this.props.auth.isLoggedIn}/>
                {this.state.isAlert && this.props.alert.type != null && <CommonMessage severity={this.props.alert.type} detail={this.props.alert.message} handleClearAlert={this.handleClearAlert} />}
                <div className="datatable-crud-demo">
                    <Toast ref={(el) => this.toast = el} />
                    <div className="card">
                        <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>
                        {this.props.count > 0 &&
                            <DataTable ref={(el) => this.dt = el} value={this.props.products} selection={this.state.selectedProducts} onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}
                                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                globalFilter={this.state.globalFilter}
                                header={header}>

                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="id" header="Code" headerStyle={{ width: '5rem' }} sortable></Column>
                                <Column field="name" header="Name" sortable></Column>
                                <Column header="Image" body={this.imageBodyTemplate}></Column>
                                <Column field="price" header="Price" body={this.priceBodyTemplate} sortable></Column>
                                <Column field="quantity" header="Quantity" sortable></Column>
                                <Column field="vote" header="Reviews" body={this.ratingBodyTemplate} sortable></Column>
                                <Column field="description" header="Description" sortable></Column>
                                <Column field="subCateCode" header="Category" sortable></Column>
                                <Column body={this.actionBodyTemplate}></Column>
                            </DataTable>}
                    </div>

                    <Dialog visible={this.state.productDialog} style={{ width: '650px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                        {/* {this.state.product.thumbnail &&
                            <div className="card">
                                <Toolbar className="p-mb-4" left={this.leftToolbarDialogTemplate}></Toolbar>
                                
                                <Galleria  value={this.state.product.thumbnail}  numVisible={5} activeIndex={this.state.activeProdImgIndex} onItemChange={this.onProductImgChange} 
                                    item={this.itemImgTemplate} showThumbnails={false} showIndicators style={{ maxWidth: '400px' }} />
                            </div>} */}
                        {/* <img height = "300px" width = "300px" src={`/images/product-img/${this.state.product.thumbnail != null ? this.state.product.thumbnail[0] : ""}`} className="product-image" /> */}
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={this.state.product.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.name })} />
                            {this.state.submitted && !this.state.product.name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={this.state.product.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="price">Price</label>
                                {/* <InputNumber id="price" value={this.state.product.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" /> */}
                                <InputNumber id="price" value={this.state.product.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="VND" locale="it-IT" />
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={this.state.product.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div>

                        <div className="p-field">
                            <label className="p-mb-3">Category</label>
                            {/* <div className="p-formgrid p-grid">
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={this.onCategoryChange} checked={this.state.product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={this.onCategoryChange} checked={this.state.product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={this.onCategoryChange} checked={this.state.product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={this.onCategoryChange} checked={this.state.product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div> */}
                            <ComboBox comboBoxData={this.props.metaData.subCategoryMeta} changeComboxHandler={e => this.onCategoryChange(e)} />
                        </div>

                    </Dialog>
                    {this.state.editProductThumbnailsDialog && <EditThumbnailsDialog product={this.state.product} isCreateProd={this.state.isCreateProd} metaData={this.props.metaData} hideDialog={this.hideEditProductThumbnailsDialog} />}

                    <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </BlockUI>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.AllProducts.products,
        count: state.AllProducts.count,
        response: state.AllProducts.response,
        loading: state.AllProducts.loading,
        type: state.AllProducts.type,
        isLocked: state.loading.isLocked,
        alert: state.alert,
        metaData: state.MetaData,
        auth: state.authState,
    };
};

const mapDispatchToProps = {

    initProducts: productActions.getAll,
    saveProductAction: productActions.editProduct,
    deleteProductAction: productActions.deleteProduct,
    loadMetaDatas: metaDataAction.getAll
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProdList);