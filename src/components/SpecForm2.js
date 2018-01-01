import React from 'react';

export default class SpecForm2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            MCLRLTY  : props.specFromStore ? props.specFromStore.MCLRLTY  : 0, 
            MCLRLTE  : props.specFromStore ? props.specFromStore.MCLRLTE  : 0,
            MCLRLTHT : props.specFromStore ? props.specFromStore.MCLRLTHT : 0,
            MCLRHTY  : props.specFromStore ? props.specFromStore.MCLRHTY  : 0,
            MCLRHTHT : props.specFromStore ? props.specFromStore.MCLRHTHT : 0,
            MCLRHTT  : props.specFromStore ? props.specFromStore.MCLRHTT  : 0,

            ACLRLTE  : props.specFromStore ? props.specFromStore.ACLRLTE  : 0,
            ACLRLTLT : props.specFromStore ? props.specFromStore.ACLRLTLT : 0,
            ACLRHTE  : props.specFromStore ? props.specFromStore.ACLRHTE  : 0,
            ACLRHTHT : props.specFromStore ? props.specFromStore.ACLRHTHT : 0
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
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>SET MINIMUM CLEARANCES IN OIL</p>
                    <label>LT to Yoke
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRLTY}
                            name="MCLRLTY"
                        />
                    </label>
                    <label>LT to Earth
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRLTE}
                            name="MCLRLTE"
                        />
                    </label>
                    <label>LT to HT
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRLTHT}
                            name="MCLRLTHT"
                        />
                    </label>
                    <label>HT to Yoke
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRHTY}
                            name="MCLRHTY"
                        />
                    </label>
                    <label>HT to HT
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRHTHT}
                            name="MCLRHTHT"
                        />
                    </label>
                    <label>HT to Tank
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.MCLRHTT}
                            name="MCLRHTT"
                        />
                    </label>
                    <p>SET MINIMUM CLEARANCES IN AIR</p>
                    <label>LT TO EARTH
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.ACLRLTE}
                            name="ACLRLTE"
                        />
                    </label>
                    <label>LT to LT
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.ACLRLTLT}
                            name="ACLRLTLT"
                        />
                    </label>
                    <label>HT to Earth
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.ACLRHTE}
                            name="ACLRHTE"
                        />
                    </label>
                    <label>HT to HT
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.ACLRHTHT}
                            name="ACLRHTHT"
                        />
                    </label>
                 <button>Check & Submit Data</button>
                </form>
            </div>
        );
    };
};

// SET MINIMUM CLEARANCES IN OIL
// MCLRLTY
// MCLRLTE
// MCLRLTHT
// MCLRHTY
// MCLRHTHT
// MCLRHTT

// SET MINIMUM CLEARANCES IN AIR
// ACLRLTE
// ACLRLTLT
// ACLRHTE
// ACLRHTHT
