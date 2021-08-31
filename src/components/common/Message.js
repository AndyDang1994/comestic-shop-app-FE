import React, { Component } from 'react';
import { connect } from "react-redux";
import { alertActions } from '../../redux/actions/AlertActions';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';

class CommonMessage extends Component {
    constructor(props) {
        super(props);
        this.handleClearAlert = this.handleClearAlert.bind(this);

    }

    componentDidMount(){
        this.toast.show({severity: this.props.severity, summary: this.props.severity, detail: this.props.detail, sticky: true})
    }
    handleClearAlert(){
        console.log("handleClearAlert")
        this.props.handleClearAlert()
        //this.toast.clear()
    }
   
    render(){
        
        return(
            <Toast ref={(el) => this.toast = el} onRemove  = {this.handleClearAlert} />
        )
    }

}

const mapDispatchToProps = {
    
    handleClearAlert : alertActions.alertClearAction,
};

export default connect(null, mapDispatchToProps)(CommonMessage);