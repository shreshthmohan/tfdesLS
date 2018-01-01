import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class ChooseDesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storedDesigns : props.storedDesigns,
            selectedDesign : props.loadedDesign.id || '',
            loadedDesign : props.loadedDesign.id || '',
            error: ''
        };
    }
    onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });

    };
    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.storedDesigns.length != 0 && this.state.selectedDesign == '') {
            this.setState(() => {
                return {
                    error: 'No design selected'
                };
            })
        } else {
            this.props.onSubmit({
                id : this.state.selectedDesign,
                // should be false if design is already loaded
                toLoad : this.state.loadedDesign === ''

            });
        }

    };

    render() {
        return (
            <div>
            {this.state.storedDesigns.length === 0 ?
                <h2>
                    No saved designs 
                    <Link to="/">Go Home</Link>
                </h2> :
                <h2>Choose design to {this.props.customText}</h2>
            }
            {this.state.storedDesigns.length > 0 &&
                <form onSubmit={this.onSubmit}>
                    <select
                        onChange={this.onInputChange}
                        value={this.state.selectedDesign}
                        name="selectedDesign"
                    >
                        {this.state.selectedDesign == '' &&
                            <option value="">Nothing selected</option>}
                    {this.state.storedDesigns.map((des) => {
                        return (
                            <option key={des.id} value={des.id}>
                                {des.design_name + ' '}
                                {moment(des.created_at).format('D MMM Y')}
                            </option>);
                    })}
                    </select>
                    <button>Edit</button>
                </form>
            }
            </div>
        );
    }
}
