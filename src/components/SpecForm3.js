import React from 'react';

export default class SpecForm3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore
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
    };
    onInputChangeConservator = (event) => {
        const value = event.target.value === "true" ? true : false;
        const GAPAIR = value ? 0 : 110;
        this.setState(() => {
            return {
                conservator : value,
                GAPAIR      : GAPAIR
            };
        });
    };
    evalStiffenerCount = () => {
        if (this.state.radiator_type === 'corrugated') {
                return 0; 
        } else {
            return this.state.stiffener_count;
        }
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            ...this.state,
            stiffener_count: this.evalStiffenerCount()
        });
    };

    // use onInputChangeConservator when editing specs
    // else use onInputChangeBool
    render() {
        return (
            <div>
              <form onSubmit={this.onSubmit}>
                  <p>Tank Specification</p>
                  {this.props.edit === 'yes' ?
                    <label>Conservator e
                      <select
                           onChange={this.onInputChangeConservator}
                           value={this.state.conservator}
                           name="conservator"
                      >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                      </select>
                    </label>
                  :
                    <label>Conservator
                      <select
                           onChange={this.onInputChangeBool}
                           value={this.state.conservator}
                           name="conservator"
                      >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                      </select>
                    </label>
                  }
                  {this.state.conservator && 
                      <label>Explosion Vent
                        <select
                             onChange={this.onInputChangeBool}
                             value={this.state.explosion_vent}
                             name="explosion_vent"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                      </label>
                  }
                  <label>Rollers to be provided
                    <select
                         onChange={this.onInputChangeBool}
                         value={this.state.roller}
                         name="roller"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                  </label>
                  <label>Tank Shape
                    <select
                         onChange={this.onInputChange}
                         value={this.state.tank_shape}
                         name="tank_shape"
                    >
                        <option value="rectangular">Rectangular</option>
                        <option value="oval">Oval</option>
                    </select>
                  </label>
                  <p>Set thickness of tank sheets in mm</p>
                  <label>Main body
                    <input
                         onChange={this.onInputChangeNumber}
                         onBlur={this.onBlur}
                         onKeyDown={this.onKeyDown}
                         value={this.state.tank_body}
                         name="tank_body"
                    />
                  </label>
                  <label>Top cover
                    <input
                         onChange={this.onInputChangeNumber}
                         onBlur={this.onBlur}
                         onKeyDown={this.onKeyDown}
                         value={this.state.tank_top}
                         name="tank_top"
                    />
                  </label>
                  <label>Bottom sheet
                    <input
                         onChange={this.onInputChangeNumber}
                         onBlur={this.onBlur}
                         onKeyDown={this.onKeyDown}
                         value={this.state.tank_bottom}
                         name="tank_bottom"
                    />
                  </label>
                  <label>Radiator Type
                    <select
                         onChange={this.onInputChange}
                         value={this.state.radiator_type}
                         name="radiator_type"
                    >
                        <option value="pressed">Pressed</option>
                        <option value="elliptical">Elliptical tube</option>
                        <option value="corrugated">Corrugated</option>
                    </select>
                  </label>
                  {this.state.radiator_type === 'corrugated' &&
                      <label>Thickness of corrugated wall sheet
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.corrugated_sheet_thickness}
                             name="corrugated_sheet_thickness"
                        />
                      </label>
                  }
                  <label>Number of stiffeners to be provided
                    <input
                         onChange={this.onInputChangeNumber}
                         onBlur={this.onBlur}
                         onKeyDown={this.onKeyDown}
                         value={this.state.stiffener_count}
                         name="stiffener_count"
                    />
                  </label>
                  {((this.state.kva && this.state.short_circuit_test)
                      ||
                      (this.state.kva > 500)) &&
                      <div>
                      <label>Clamp Ring Material
                        <select
                             onChange={this.onInputChange}
                             value={this.state.clamp_ring_material}
                             name="clamp_ring_material"
                        >
                            <option value="mild_steel">Mild Steel</option>
                            <option value="perma">Perma</option>
                            <option value="fibre">Fibre</option>
                        </select>
                      </label>
                      <label>Clamp Ring Thickness
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.clamp_ring_thickness}
                             name="clamp_ring_thickness"
                        />
                      </label>
                      <label>Clamp Ring Press Screw Diameter (0 if not provided)
                        <input
                             onChange={this.onInputChangeNumber}
                             onBlur={this.onBlur}
                             onKeyDown={this.onKeyDown}
                             value={this.state.clamp_ring_press_screw_dia}
                             name="clamp_ring_press_screw_dia"
                        />
                      </label>
                      </div>
                  }
                  <label>Number of radial spaces/Circle-HT
                    <input
                         onChange={this.onInputChangeNumber}
                         onBlur={this.onBlur}
                         onKeyDown={this.onKeyDown}
                         value={this.state.radial_spacer_count}
                         name="radial_spacer_count"
                    />
                  </label>
                  <button>Check & Submit Data</button>
              </form>
            </div>
        );
    };
};

// TODO set stiffener count to 0 when submitting data if corrugated wall sheet ...

