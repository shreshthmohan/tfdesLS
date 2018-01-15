import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class ChooseDesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            designCount: props.designCount,
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
        if (this.props.storedDesigns.length != 0 && this.state.selectedDesign == '') {
            this.setState(() => {
                return {
                    error: 'No design selected'
                };
            })
        } else {
            this.props.onSubmit({
                id : this.state.selectedDesign,
                // should be false if design is already loaded
                toLoad : this.state.loadedDesign === '' || this.state.selectedDesign != this.state.loadedDesign

            });
        }

    };

    render() {
        return (
            <div>
                    <Link to="/">Go Home</Link>
            {this.props.designCount === 0 ?
                <h2>
                    No saved designs 
                    <Link to="/">Go Home</Link>
                </h2> :
                <h2>Choose design to {this.props.customText}</h2>
            }
            {this.props.storedDesigns.length > 0 &&
                <div>
                <form onSubmit={this.onSubmit}>

                    {this.props.storedDesigns.map((des) => {
                      return (
                        <div
                          key={des.id+des.design_name}
                        >
                        <input
                          type="radio"
                          name="selectedDesign"
                          onChange={this.onInputChange}
                          id={des.id+des.design_name}
                          value={des.id}
                          key={des.id+des.design_name}
                        />
                        <label
                          htmlFor={des.id+des.design_name}
                        >
                          {des.design_name + ' '}
                          {moment(des.created_at).format('D MMM Y')}
                        </label>
                        </div>
                      );

                    })}
                    <label></label>
                    <button>Edit</button>
                </form>
                </div>
            }
            </div>
        );
    }
}
