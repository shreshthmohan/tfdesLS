import React from 'react';

export default class WindingDesForm2Cross extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            NHCOILSubmitDone: false,
            remaining_turns_ht: props.specFromStore.turns_ht,
            coilsAllowed: true,
            CLRHTY: props.specFromStore.CLRHTY || 0,
            coilArray: [
                {
                    coil_type:        'A',
                    coil_count:       0,
                    coil_turns:       0,
                    coil_layers:      0,
                    coil_duct:        0,
                    coil_duct_layers: 0,
                    coil_done: false
                }
            ]
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

    onChangeNumCoil = (event) => {
        const id = event.target.id;
        const name = event.target.name;
        const value = event.target.value;

        if (!value || value.match(/^\d{1,}(\.\d{0,})?$/)) {
            this.state.coilArray[id][name] = value;

            this.setState(() => {
                return {
                    coilArray: this.state.coilArray
                };
            });
        }
    };
    onBlurCoil = (event) => {
        const id = event.target.id;
        const value = parseFloat(event.target.value) || 0;
        const name = event.target.name;
        this.state.coilArray[id][name] = value;

        this.setState(() => {
            return {
                coilArray: this.state.coilArray
            };
        });
        
    };
    onKeyDownCoil = (event) => {
        const id = event.target.id;
        const value = parseFloat(event.target.value) || 0;
        const name = event.target.name;

        if (event.keyCode == '13') {
            this.state.coilArray[id][name] = value;

            this.setState(() => {
                return {
                    coilArray: this.state.coilArray
                };
            });
        }
        
    };
    onSubmitCoil = (event) => {
        event.preventDefault();

        const id = event.target.id;

        let remaining_turns_ht = this.state.remaining_turns_ht;
        remaining_turns_ht = remaining_turns_ht - 
            this.state.coilArray[id].coil_count * this.state.coilArray[id].coil_turns;

        let remainingNHCOIL = 0;
        if (!!this.state.remainingNHCOIL) {
            remainingNHCOIL = this.state.remainingNHCOIL
                - this.state.coilArray[id].coil_count;
        } else {
            remainingNHCOIL = this.state.NHCOIL
                - this.state.coilArray[id].coil_count;
        }


        // set [id]coil_done to true
        // push new array element
        let coilArray = JSON.parse(JSON.stringify(this.state.coilArray));

        coilArray[id].coil_done = true;

        let newCoilType = '';

        // depends on left ht turns
        let coilsAllowed = this.state.coilsAllowed;

        coilsAllowed = !(remainingNHCOIL == 0);

        switch (coilArray[id].coil_type) {
            case 'A':
                newCoilType = 'B';
                break;
            case 'B':
                newCoilType = 'C';
                break;
            case 'C':
                newCoilType = 'D';
                break;
            case 'D':
                newCoilType = 'E';
                break;
            case 'E':
                newCoilType = 'F';
                break;
            default:
                coilsAllowed = false;
                break;
        }

        if (coilsAllowed) {
            coilArray.push({
                        coil_type:        newCoilType,
                        coil_count:       0,
                        coil_turns:       0,
                        coil_layers:      0,
                        coil_duct:        0,
                        coil_duct_layers: 0,
                        coil_done: false
            });
        }

        this.setState(() => {
            return {
                coilArray: coilArray,
                coilsAllowed: coilsAllowed,
                remaining_turns_ht: remaining_turns_ht,
                remainingNHCOIL: remainingNHCOIL
            };
        });




    };

    onSubmitNHCOIL = (event) => {
        event.preventDefault();

        let coilsAllowed = this.state.coilsAllowed;

        let remainingNHCOIL = this.state.NHCOIL;

        if (this.state.NHCOIL === 1) {
            coilsAllowed = false;
            this.state.coilArray[0].coil_count = 1;
            this.state.coilArray[0].coil_turns = this.state.turns_ht;
        }

        this.setState(() => {
            return {
                NHCOILSubmitDone: true,
                coilsAllowed: coilsAllowed,
                coilArray: this.state.coilArray
            };
        });
    };

    onSubmit = () => {
        let CLRHTY = this.state.CLRHTY;

        if (CLRHTY === 0) {
            CLRHTY = this.state.MCLRHTY;
        }

        this.props.onSubmit({
            ...this.state,
            CLRHTY: CLRHTY
        });
    };


    render() {

        console.log(this.state.coilArray);
        return (
            <div>
                <h2>HT Winding Type: Crossover</h2>
                <p>Remaining HT Turns: {this.state.remaining_turns_ht}</p>
                    <form onSubmit={this.onSubmitNHCOIL}>
                        <label>No. of coils per leg for HT winding
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.NHCOIL}
                                name="NHCOIL"
                            />
                        </label>
                        <button
                            disabled={this.state.NHCOILSubmitDone}
                        >
                            Submit
                        </button>
                    </form>
                    <div>
                    {this.state.NHCOILSubmitDone &&
                        <div>
                        <p>Type | No. of Coils | Turns/Coil | No of Layers |
                            Duct in mm | Duct Layer
                        </p>
                        {this.state.coilArray.map((coil, id) => {
                            return (
                                <form id={id} onSubmit={this.onSubmitCoil}>
                                    <span>{coil.coil_type}</span>
                                    <input
                                        type="text"
                                        onChange={this.onChangeNumCoil}
                                        value={coil.coil_count}
                                        onBlur={this.onBlurCoil}
                                        onKeyDown={this.onKeyDownCoil}
                                        id={id}
                                        name='coil_count'
                                    />
                                    <input
                                        type="text"
                                        onChange={this.onChangeNumCoil}
                                        onBlur={this.onBlurCoil}
                                        onKeyDown={this.onKeyDownCoil}
                                        value={coil.coil_turns}
                                        id={id}
                                        name='coil_turns'
                                    />
                                    <input
                                        type="text"
                                        onChange={this.onChangeNumCoil}
                                        onBlur={this.onBlurCoil}
                                        onKeyDown={this.onKeyDownCoil}
                                        value={coil.coil_layers}
                                        id={id}
                                        name='coil_layers'
                                    />
                                    <input
                                        type="text"
                                        onChange={this.onChangeNumCoil}
                                        onBlur={this.onBlurCoil}
                                        onKeyDown={this.onKeyDownCoil}
                                        value={coil.coil_duct}
                                        id={id}
                                        name='coil_duct'
                                    />
                                    <input
                                        type="text"
                                        onChange={this.onChangeNumCoil}
                                        onBlur={this.onBlurCoil}
                                        onKeyDown={this.onKeyDownCoil}
                                        value={coil.coil_duct_layers}
                                        id={id}
                                        name='coil_duct_layers'
                                    />
                                    <button disabled={coil.coil_done}>Submit</button>
                                </form>
                            );
                        })}
                    </div>
                    }
                </div>
                {(!this.state.coilsAllowed && this.state.coilArray.reduce((acc, coil) => {
                    return acc && coil.coil_done;
                })) &&
                    <button onClick={this.onSubmit}>
                        Done
                    </button>
                }
            </div>
        );
    }
}

// TODO: fix table + form + indices
