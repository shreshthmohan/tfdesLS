import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v1';

export default class SpecForm5A extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...(props.specFromStore),
            id: props.specFromStore ? (props.specFromStore.id ? props.specFromStore.id : uuid()) : uuid(),
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

    // TODO currently user cannot completely erase text after typing something in
    // fix that

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
                    created_at: moment()
                }
            );
        }
    };

  render() {
    return (
      <div className="container rounded border-gray-300 bg-light padding-20 margin-tb-30">
        <form onSubmit={this.onSubmit}>
        <div className="">
        <h3 className="text-center">Give a name to this design and save</h3>
          <input 
            onChange={this.onInputChange}
            value={this.state.design_name}
            name="design_name"
            className="form-control"
          />
          <p>{this.state.name_error}</p>
          </div>
          <button className="btn btn-primary">Save Design</button>
        </form>
      </div>
    );
  }
}


        // /*<p>KVA: {this.state.kva}</p>
        // <p>Nominal HT Voltage: {this.state.nominal_ht_voltage}</p>
        // <p>Nominal LT Voltage: {this.state.nominal_lt_voltage}</p>
        // <p>LT Winding Conductor: {this.state.winding_conductor_lt}</p>
        // <p>Tank Type: {this.state.tank_type}</p>
        // */