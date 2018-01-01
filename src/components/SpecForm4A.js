import React from 'react';

export default class SpecForm4A extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore
            ,lt_coil_count          : props.specFromStore.lt_coil_count || 1
            ,lt_coil_clearance      : props.specFromStore.lt_coil_clearance || 5
            ,lt_transpose           : props.specFromStore.lt_transpose || true
        };
    };
    onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };
    onInputChangeBool = (event) => {
        const name = event.target.name;
        const value = event.target.value === "true" ? true : false;
        this.setState(() => {
            return {
                [name]: value
            };
        });
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
    evalStrayLoss = () => {
        let stray = parseFloat(this.state.stray_loss);
        if (this.state.lt_area_m > 65 && !this.state.lt_transpose) {
            stray = stray * 1.1;
        } 
        const cu_loss = parseFloat(this.state.cu_loss);
        stray = cu_loss - cu_loss / (1 + stray / 100);
        return stray;
        
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            ...this.state,
            stray_loss: this.evalStrayLoss()
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>HT Winding Type: {this.state.hv_winding}</p>
                    <p>LT Winding Type: {this.state.lv_winding}</p>
                    {this.state.lv_winding === 'spiral' && 
                        <div>
                            <label>No. of LT Coil(1/2)
                                <input
                                     onChange={this.onInputChangeNumber}
                                     onBlur={this.onBlur}
                                     onKeyDown={this.onKeyDown}
                                     value={this.state.lt_coil_count}
                                     name="lt_coil_count"
                                />
                            </label>
                            <label>Clearance between LT coils
                                <input
                                     onChange={this.onInputChangeNumber}
                                     onBlur={this.onBlur}
                                     onKeyDown={this.onKeyDown}
                                     value={this.state.lt_coil_clearance}
                                     name="lt_coil_clearance"
                                />
                            </label>
                        </div>
                    }
                    <label>Transposition in LT
                      <select
                           onChange={this.onInputChangeBool}
                           value={this.state.lt_transpose}
                           name="lt_transpose"
                      >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                      </select>
                    </label>
                    <p>Set Covering over Conductors in mm</p>
                    <label>HT Winding Conductor Insulation
                        <select
                             onChange={this.onInputChange}
                             value={this.state.ht_insulation_material}
                             name="ht_insulation_material"
                        >
                            <option value="dpc">DPC</option>
                            <option value="tpc">TPC</option>
                            <option value="se">SE</option>
                        </select>
                    </label>
                    <label>LT Conductor
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.covering_lt}
                             name="covering_lt"
                        />
                    </label>
                    <label>HT Conductor
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.covering_ht}
                             name="covering_ht"
                        />
                    </label>
                    {this.state.hv_winding === 'crossover' &&
                        <label>HT Conductor Standard SWG 
                            <select
                                 onChange={this.onInputChange}
                                 value={this.state.ht_conductor_std_swg}
                                 name="ht_conductor_std_swg"
                            >
                                <option value="s">S</option>
                                <option value="n">N</option>
                            </select>
                        </label>
                        
                    }
                    <label>Set I2R Loss for design
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.dir_loss}
                             name="dir_loss"
                        />
                    </label>
                    <label>Flux Density for Design
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.flux_density_design}
                             name="flux_density_design"
                        />
                    </label>
                    <p>% Impedance Limit for Design</p>
                    <label>Low 
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.impedance_low}
                             name="impedance_low"
                        />
                    </label>
                    <label>High
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                             value={this.state.impedance_high}
                             name="impedance_high"
                        />
                    </label>
                    <button>Check Data & Submit</button>
                </form>
            </div>
        );
    };
};
