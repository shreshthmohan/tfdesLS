import React from 'react';

export default class WindingDesForm2CrossA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            crossHTDone: false
        };
    }
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

    onSubmitClr = (event) => {
        event.preventDefault();
        const crossResult = this.props.evalCrossHT(this.state);

        this.setState(() => {
            return {
                ...crossResult,
                crossHTDone: true
            };
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitClr}>
                <p>Min. Clearance between HT Winding & Yoke:
                   {this.state.MCLRHTY} </p>
                    <label>Set Clearance for design:
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.CLRHTY}
                            name="CLRHTY"
                        />
                    </label>
                    <label>Sum of clearances between HT Coils:
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.TCLRHTC}
                            name="TCLRHTC"
                        />
                    </label>
                    <label>HT inter-layer Kraft paper thickness in mils
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.HTLYRINS}
                            name="HTLYRINS"
                        />
                    </label>
                    <button>Submit</button>
                </form>
                {this.state.crossHTDone &&
                    <div>
                        <p>HT Winding Design Output</p>
                        <p>Coil Type | No of Coils | Coil Axial Length | Coil Depth</p>
                        {this.state.coilArray.map((coil, id) => {
                            return (
                                <p key={id}>
                                    {coil.coil_type + ' '} 
                                    {coil.coil_count + ' '} 
                                    {coil.coil_axial_length + ' '} 
                                    {coil.coil_B2 + ' '} 
                                </p>
                            );
                        })}
                        <p>Calculated Window Height: {this.state.WH}</p>
                        <p>Average Winding Depth: {this.state.B2_avg}</p>
                        <p>
                            Final HT Winding to Yoke Clearance: {this.state.FINCLRHTY}
                        </p>
                        <p>B2 (TODO Ask? Max winding depth?) {this.state.B2}</p>
                        <p>HT Winding Design Over - End of Design Step 2</p>
                        <button onClick={this.onSubmit}>Next step</button>
                    </div>
                }
            </div>
        );
    }
};
