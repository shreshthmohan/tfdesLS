import React from 'react';

export default class SpecForm5 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore
        };
    };

    onInputChangeNumber = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (!value || value.match(/^\d{1,}(\.\d{0,})?$/)) {

            this.setState(() => {
                return {
                    [name]: value
                };
            });
        }
    };
    onBlur = (event) => {
        const value = parseFloat(event.target.value) || 0;
        const name = event.target.name;

        this.setState(() => {
            return {
                [name]: value
            };
        });
        
    };
    onKeyDown = (event) => {
        const value = parseFloat(event.target.value) || 0;
        const name = event.target.name;

        if (event.keyCode == '13') {
            this.setState(() => {
                return {
                    [name]: value
                };
            });
        }
    }
    evalCost = () => {

        const x = (this.state.cost_lt + this.state.cost_ht) / 2;
        let cost_factor = 0;
        if (x != 0 && this.state.cost_crgo != 0) {
            cost_factor = this.state.cost_crgo / x; 
        } else {
            if (this.state.winding_conductor_ht == 'aluminium') {
                cost_factor = 1.2;
            } else {
                cost_factor = 0.7;
            }
        }
        return cost_factor;
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.props.edit == 'yes') {
            this.props.onSubmit(
                {
                    ...(this.state),
                    cost_factor : this.evalCost()
                }
            );
        } else {

            this.props.onSubmit(
                {
                    ...(this.state)
                }
            );
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.winding_conductor_lt === 'aluminium' &&
                        <label>Aluminium (covered) LT per kg
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.cost_lt}
                                name="cost_lt"
                            />
                        </label>
                    }
                    {this.state.winding_conductor_lt === 'copper' &&
                        <label>Copper (covered) LT per kg
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.cost_lt}
                                name="cost_lt"
                            />
                        </label>
                    }
                    {this.state.winding_conductor_ht === 'aluminium' &&
                        <label>Aluminium (covered) HT per kg
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.cost_ht}
                                name="cost_ht"
                            />
                        </label>
                    }
                    {this.state.winding_conductor_ht === 'copper' &&
                        <label>Copper (covered) HT per kg
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.cost_ht}
                                name="cost_ht"
                            />
                        </label>
                    }
                    <label>CRGO per kg
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.cost_crgo}
                            name="cost_crgo"
                        />
                    </label>
                    <label>Oil per litre
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.cost_oil}
                            name="cost_oil"
                        />
                    </label>
                    <label>Steel per kg
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.cost_steel}
                            name="cost_steel"
                        />
                    </label>
                    <label>Radiators per kg
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.cost_radiator}
                            name="cost_radiator"
                        />
                    </label>
                    <button>Check data & Submit</button>
                </form>
            </div>
        );
    };
};
