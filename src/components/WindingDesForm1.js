import React from 'react';

export default class WindingDesForm1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore
            ,HDIAC : props.specFromStore.HDIAC || 0
            ,LDIAC : props.specFromStore.LDIAC || 0
        };
    }
    componentDidMount() {
        this.evalCrossoverLT(); 
        this.evalCrossoverHT(); 
        this.evalWindingType();
    }

    evalWindingType = () => {
        if (!this.state.hv_winding || !this.state.lv_winding) {
            let lv_winding = this.state.lv_winding;
            let hv_winding = this.state.hv_winding;

            if (this.state.nominal_lt_voltage < 6000) {
                lv_winding = 'spiral';
            } else {
                lv_winding = 'crossover';

                if (this.state.kva > 800 && this.state.nominal_lt_voltage <= 12000) {
                    lv_winding = 'disc';
                }

                if (this.state.kva > 2000 && this.state.nominal_lt_voltage > 12000) {
                    lv_winding = 'disc';
                }
            }

            if (this.state.nominal_ht_voltage < 6000) {
                hv_winding = 'spiral'; //spiral?
            } else {
                hv_winding = 'crossover';

                if (this.state.kva > 1200 && this.state.nominal_ht_voltage <= 12000) {
                    hv_winding = 'disc';
                }

                if (this.state.kva > 2000 && this.state.nominal_ht_voltage > 12000) {
                    hv_winding = 'disc';
                }
            }

            this.setState(() => {
                return {
                    lv_winding: lv_winding,
                    hv_winding: hv_winding
                };
            });
        }
    };


    evalCrossoverLT = () => {
        if (this.state.lv_winding == 'crossover') {
            const LDIABM = Math.sqrt(this.state.lt_area_m * 4 / Math.PI);
            if (this.state.LDIAB == 0) {
                const LDIAB = LDIABM;
            }
            this.setState(() => {
                return {
                    LDIABM : LDIABM,
                    LDIAB : LDIAB
                };
            });
        }
    };

    evalCrossoverHT = () => {
        if (this.state.hv_winding == 'crossover') {
            const HDIABM = Math.sqrt(this.state.ht_area_m * 4 / Math.PI);
            let HDIAB = this.state.HDIAB;
            if (this.state.HDIAB == 0) {
                HDIAB = HDIABM;
            }
            this.setState(() => {
                return {
                    HDIABM : HDIABM,
                    HDIAB : HDIAB
                };
            });
        }
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

    evalDIAC = () => {
        let HDIAC = 0;
        let LDIAC = 0;
        if (this.state.hv_winding == 'crossover') {
            HDIAC = this.state.HDIAB + this.state.covering_ht;
        }
        if (this.state.lv_winding == 'crossover') {
            LDIAC = this.state.LDIAB + this.state.covering_lt;
        }

        return {
            LDIAC: LDIAC,
            HDIAC: HDIAC
        };
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            ...(this.state),
            ...(this.evalDIAC())
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>No. of LT Winding turns: {this.state.turns_lt}</p>
                    <p>LT: {this.state.lv_winding}</p>
                    {(this.state.lv_winding == 'spiral'
                        || this.state.lv_winding == 'helical')
                     &&
                        <div>
                            <label>No. of LT Winding Layers
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.NLTLYR}
                                    name="NLTLYR"
                                />
                            </label>
                            <p>Minimum LT conductor Area: {this.state.lt_area_m}</p>
                            <label>Set LT Conductor Area
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.lt_area}
                                    name="lt_area"
                                />
                            </label>
                        </div>
                    }
                    {this.state.lv_winding == 'crossover' &&
                        <div>
                            <p>Minimum Diameter of LT Winding Conductor (bare)
                                {this.state.LDIABM}
                            </p>
                            <label>Set conductor diameter
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.LDIAB}
                                    name="LDIAB"
                                />
                            </label>
                        </div>
                    }
                    {this.state.lv_winding == 'disc' &&
                        <div>
                            <p>Minimum LT conductor Area: {this.state.lt_area_m}</p>
                            <label>Set LT Conductor Area
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.lt_area}
                                    name="lt_area"
                                />
                            </label>
                            <label>Spacer thickness between LV Winding discs
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.DLVINS}
                                    name="DLVINS"
                                />
                            </label>
                        </div>
                    }
                    <div>
                    <p>No. of HT Winding turns: {this.state.turns_ht} TODO ASK Get?</p>
                    <p>HT: {this.state.hv_winding}</p>
                    </div>
                    {(this.state.hv_winding == 'spiral'
                        || this.state.lv_winding == 'helical')
                     &&
                        <div>
                            <label>No. of HT Winding Layers
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.NHTLYR}
                                    name="NHTLYR"
                                />
                            </label>
                            <p>Minimum HT conductor Area: {this.state.ht_area_m}</p>
                            <label>Set HT Conductor Area
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.ht_area}
                                    name="ht_area"
                                />
                            </label>
                        </div>
                    }
                    {this.state.hv_winding == 'crossover' &&
                        <div>
                            <p>Minimum Diameter of HT Winding Conductor (bare)
                                {this.state.HDIABM}
                            </p>
                            <label>Set conductor diameter
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.HDIAB}
                                    name="HDIAB"
                                />
                            </label>
                        </div>
                    }
                    {this.state.hv_winding == 'disc' &&
                        <div>
                            <p>Minimum HT conductor Area: {this.state.ht_area_m}</p>
                            <label>Set HT Conductor Area
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.ht_area}
                                    name="ht_area"
                                />
                            </label>
                            <label>Spacer thickness between HV Winding discs
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.DHVINS}
                                    name="DHVINS"
                                />
                            </label>
                            <label>Spacer thickness at break for tap
                                <input
                                    type="text"
                                    onChange={this.onInputChangeNumber}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.onKeyDown}
                                    value={this.state.DHVBRINS}
                                    name="DHVBRINS"
                                />
                            </label>
                        </div>
                    }
                    <div>
                        <label>No of Radial Spacers/Circle for HT
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.radial_spacer_count}
                                name="radial_spacer_count"
                            />
                        </label>
                        <label>Width of Radial Spacers for HT
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.SPACERW}
                                name="SPACERW"
                            />
                        </label>
                        <button>Check data & Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
