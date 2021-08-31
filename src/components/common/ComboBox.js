import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

class ComboBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currVal: null,
        }
        this.changeComboxHandler = this.changeComboxHandler.bind(this)
    }


    changeComboxHandler(e) {
        this.props.changeComboxHandler(e)
        this.setState({
            currVal: e.value
        })
    }
    render() {
        return (
            <div>
                <Dropdown value={this.state.currVal} options={this.props.comboBoxData} onChange={this.changeComboxHandler} optionLabel="name" />
            </div>
        )
    }
}

export default ComboBox