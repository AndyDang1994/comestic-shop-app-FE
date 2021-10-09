import React, { Component } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from "react-redux";
import { ActionTypes } from "../../../redux/contant/action-types";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
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
import ComboBox from '../../common/ComboBox';
import { ContactInfor } from '../../../layout/header/ContactInfor';
import { promotionAction } from '../../../redux/actions/PromotionActions';
import SearchParamsComp from '../../common/SearchParamsComp';


class ManagePromotion extends Component {

    prod = {
        name: "this.globalFilter"
    }
    setErrorSate = {
        hasError: false,
        message: "",
    }

    emptyPromotion =
        {
            "promoteId": 0,
            "promoteName": "",
            "promoteStatus": "",
            "startAplTime": "",
            "endAplTime": "",
            "volume": 0,
            "type": "",
        }
    constructor(props) {
        super(props);

        this.state = {
            totCnt: 0,
            activeProdImgIndex: 0,
            promotions: null,
            promotionDialog: false,
            deletePromotionDialog: false,
            editPromotionThumbnailsDialog: false,
            deletePromotionsDialog: false,
            promotion: this.emptyPromotion,
            selectedPromotions: null,
            submitted: false,
            globalFilter: null,
            setErrorSate: null,
            isBlocked: false,
            isAlert: false,
            isCreateProd: false
        };
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.leftToolbarDialogTemplate = this.leftToolbarDialogTemplate.bind(this)
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.promotionTypeBodyTemplate = this.promotionTypeBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.handleClearAlert = this.handleClearAlert.bind(this)
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.savePromotion = this.savePromotion.bind(this);
        this.savePromotionAction = this.savePromotionAction.bind(this)
        this.editPromotion = this.editPromotion.bind(this);
        this.confirmDeletePromotion = this.confirmDeletePromotion.bind(this);
        this.deletePromotion = this.deletePromotion.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedPromotions = this.deleteSelectedPromotions.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeletePromotionDialog = this.hideDeletePromotionDialog.bind(this);
        this.hideDeletePromotionsDialog = this.hideDeletePromotionsDialog.bind(this);
    }


    componentDidMount() {
        this.props.initPromotion('')
        this.props.loadMetaDatas()
    }
    savePromotionAction(value) {
        console.log("Edit promotion...")
    }

    formatCurrency(value) {
        return (value == null ? "0" : value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    openNew() {
        this.setState({
            promotion: this.emptyPromotion,
            submitted: false,
            editPromotionThumbnailsDialog: true,
            isCreateProd: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            promotionDialog: false
        });
    }


    hideDeletePromotionDialog() {
        this.setState({ deletePromotionDialog: false });
    }

    hideDeletePromotionsDialog() {
        this.setState({ deletePromotionsDialog: false });
    }

    savePromotion() {
        let state = { submitted: true };

        if (this.state.promotion.name.trim()) {
            state = {
                ...state,
                isBlocked: (this.props.type != ActionTypes.EDIT_PRODUCT)
            };
            this.props.savePromotionAction(this.state.promotion, '')

            state = {
                ...state,
                promotionDialog: false,
                isAlert: true,
                promotion: this.emptyPromotion,
            };

        }

        this.setState(state);
    }

    editPromotion(promotion) {
        this.setState({
            promotion: { ...promotion },
            promotionDialog: true
        });
        console.log("promotion " + JSON.stringify(this.state.promotion))
    }

    confirmDeletePromotion(product) {
        this.setState({
            product,
            deletePromotionDialog: true
        });
    }

    deletePromotion() {
        //let promotions = this.state.promotions.filter(val => val.id !== this.state.promotion.id);
        
        let state = { submitted: true };

        if (this.state.promotion.name.trim()) {
            state = {
                ...state,
                isBlocked: (this.props.type != ActionTypes.DELETE_PROMOTION_SEC)
            };
            this.props.deletePromotionAction(this.state.promotion)

            state = {
                ...state,
                promotionDialog: false,
                isAlert: true,
                promotion: this.emptyPromotion,
            };

        }
        this.setState({
            state
        });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.promotions.length; i++) {
            if (this.state.promotions[i].id === id) {
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
        this.setState({ deletePromotionsDialog: true });
    }

    deleteSelectedPromotions() {
        //let promotions = this.props.promotions.filter(val => !this.state.selectedPromotions.includes(val));
        this.props.deletePromotionAction(this.state.selectedPromotions,'')
        this.setState({
            submitted: true,
            isBlocked: (this.props.type != ActionTypes.DELETE_PRODUCT_SEC),
            deletePromotionsDialog: false,
            selectedPromotions: null,
            isAlert: true,
        });
    }

    onCategoryChange(e) {
        let promotion = { ...this.state.promotion };
        promotion['subCateCode'] = e.value.code;
        this.setState({ promotion });

        console.log("onCategoryChange")
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let promotion = { ...this.state.promotion };
        promotion[`${name}`] = val;

        this.setState({ promotion });
    }
    handleClearAlert() {
        this.setState({ isAlert: false })
    }
    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let promotion = { ...this.state.promotion };
        promotion[`${name}`] = val;

        this.setState({ promotion });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedPromotions || !this.state.selectedPromotions.length} />
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
                {/* <FileUpload mode="basic" accept="image/*" uploadHandler={this.addProductImg} maxFileSize={1000000} label="Import" chooseLabel="Add" className="p-mr-2 p-d-inline-block" /> */}
                <Button label="Remove" icon="pi pi-minus" className="p-button-help" />
            </React.Fragment>
        )
    }

    promotionTypeBodyTemplate(rowData) {
        return <div> {rowData.type == 'PER' ? '%' :'VND'} </div>;
    }

    statusBodyTemplate(rowData) {
        //return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editPromotion(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeletePromotion(rowData)} />
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
                <Button label="Search" icon="pi pi-check" className="p-button-text" onClick={this.props.initPromotion(this.prod)} /> */}
            </div>
        );
        const promotionDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.savePromotion} />
            </React.Fragment>
        );
        const deletePromotionDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletePromotionDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deletePromotion} />
            </React.Fragment>
        );
        const deletePromotionsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletePromotionsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedPromotions} />
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
                        <SearchParamsComp/>
                        {this.props.count > 0 &&
                            <DataTable ref={(el) => this.dt = el} value={this.props.promotions} selection={this.state.selectedPromotions} onSelectionChange={(e) => this.setState({ selectedPromotions: e.value })}
                                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} promotions"
                                globalFilter={this.state.globalFilter}
                                header={header}>

                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="promoteId" header="Code" headerStyle={{ width: '5rem' }} sortable></Column>
                                <Column field="promoteName" header="Name" sortable></Column>
                                <Column field="volume" header="Volume" sortable></Column>
                                <Column field="type" header="Type" body={this.promotionTypeBodyTemplate} sortable></Column>
                                <Column field="startAplTime" header="Start"  sortable></Column>
                                <Column field="endAplTime" header="End" sortable></Column>
                                <Column field="promoteStatus" header="Category" sortable></Column>
                                <Column body={this.actionBodyTemplate}></Column>
                            </DataTable>}
                    </div>

                    <Dialog visible={this.state.promotionDialog} style={{ width: '650px' }} header="Product Details" modal className="p-fluid" footer={promotionDialogFooter} onHide={this.hideDialog}>
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={this.state.promotion.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.promotion.name })} />
                            {this.state.submitted && !this.state.promotion.name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={this.state.promotion.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="price">Price</label>
                                {/* <InputNumber id="price" value={this.state.promotion.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" /> */}
                                <InputNumber id="price" value={this.state.promotion.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="VND" locale="it-IT" />
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={this.state.promotion.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div>

                        <div className="p-field">
                            <label className="p-mb-3">Category</label>
                            {/* <div className="p-formgrid p-grid">
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={this.onCategoryChange} checked={this.state.promotion.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={this.onCategoryChange} checked={this.state.promotion.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={this.onCategoryChange} checked={this.state.promotion.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="p-field-radiobutton p-col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={this.onCategoryChange} checked={this.state.promotion.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div> */}
                            <ComboBox comboBoxData={this.props.metaData.subCategoryMeta} changeComboxHandler={e => this.onCategoryChange(e)} />
                        </div>

                    </Dialog>
                    <Dialog visible={this.state.deletePromotionDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePromotionDialogFooter} onHide={this.hideDeletePromotionDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {this.state.promotion && <span>Are you sure you want to delete <b>{this.state.promotion.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deletePromotionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePromotionsDialogFooter} onHide={this.hideDeletePromotionsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {this.state.promotion && <span>Are you sure you want to delete the selected promotions?</span>}
                        </div>
                    </Dialog>
                </div>
            </BlockUI>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        promotions: state.promotion.promotions,
        count: state.promotion.count,
        type: state.AllProducts.type,
        isLocked: state.loading.isLocked,
        alert: state.alert,
        metaData: state.MetaData,
        auth: state.authState,
    };
};

const mapDispatchToProps = {

    initPromotion: promotionAction.getPromotionsByParams,
    savePromotionAction: promotionAction.createPromotion,
    deletePromotionAction: promotionAction.deletePromotion,
    loadMetaDatas: metaDataAction.getAll
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePromotion);