import React from 'react';
import moment from 'moment';

export default class SpecForm5A extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...(props.specFromStore),
            design_name: '',
            name_error: ''
        };
    }

    onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (!!value) {
            this.setState(() => {
                return {
                    [name]: value,
                    name_error: ''
                };
            });
        }
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.design_name == '') {
            this.setState(() => {
                return {
                    name_error: 'Please provide a name for the design'
                };
            })
        } else {
            this.props.onSubmit(
                {
                    ...this.state,
                    created_at: moment.utc().valueOf()
                }
            );
        }
    };

    render() {
        return (
            <div>
                <p>KVA: {this.state.kva}</p>
                <p>Nominal HT Voltage: {this.state.nominal_ht_voltage}</p>
                <p>Nominal LT Voltage: {this.state.nominal_lt_voltage}</p>
                <p>LT Winding Conductor: {this.state.winding_conductor_lt}</p>
                <p>Tank Type: {this.state.tank_type}</p>
                <form onSubmit={this.onSubmit}>
                    <input 
                        onChange={this.onInputChange}
                        value={this.state.design_name}
                        name="design_name"
                    />
                    <p>{this.state.name_error}</p>
                    <button>Save Design</button>
                </form>
            </div>
        );
    }
}

