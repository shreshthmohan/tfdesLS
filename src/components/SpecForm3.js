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
          <div className="container bg-light rounded padding-tb-std">
            <h3 className="text-center padding-top-10">Tank Specification</h3>
            <div className="sub-container rounded">
            <div className="form-row">
              <div className="form-group col-md-3"> 
                {this.props.edit === 'yes' ?
                  <div>
                    <label>Conservator</label>
                      <select
                        onChange={this.onInputChangeConservator}
                        value={this.state.conservator}
                        name="conservator"
                        className="form-control"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                :
                  <div>
                    <label>Conservator</label>
                      <select
                        onChange={this.onInputChangeBool}
                        value={this.state.conservator}
                        name="conservator"
                        className="form-control"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                  </div>
                }
              </div>
            {this.state.conservator && 
              <div className="form-group col-md-3">
                <label>Explosion Vent</label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.explosion_vent}
                  name="explosion_vent"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            }
            <div className="form-group col-md-3">
              <label>Rollers to be provided</label>
              <select
                onChange={this.onInputChangeBool}
                value={this.state.roller}
                name="roller"
                className="form-control"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              
            </div>
            <div className="form-group col-md-3">
              <label>Tank Shape</label>
              <select
                onChange={this.onInputChange}
                value={this.state.tank_shape}
                name="tank_shape"
                className="form-control"
              >
                <option value="rectangular">Rectangular</option>
                <option value="oval">Oval</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sub-container rounded">
          <h4 className="text-center">Set thickness of tank sheets in mm</h4>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Main body</label>
              <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.tank_body}
                  name="tank_body"
                  className="form-control"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Top cover</label>
              <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.tank_top}
                  name="tank_top"
                  className="form-control"
              />
              
            </div>
            <div className="form-group col-md-4">
              <label>Bottom sheet</label>
              <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.tank_bottom}
                  name="tank_bottom"
                  className="form-control"
              />
              
            </div>
          </div>
        </div>
          <div className="sub-container rounded">
            <div className="form-row">
              <div className="form-group col-md-3">
                <label className="col-form-label-sm">Radiator Type</label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.radiator_type}
                  name="radiator_type"
                  className="form-control"
                >
                  <option value="pressed">Pressed</option>
                  <option value="elliptical">Elliptical tube</option>
                  <option value="corrugated">Corrugated</option>
                </select>
              </div>
              {this.state.radiator_type === 'corrugated' &&
                <div className="form-group col-md-3">
                  <label className="col-form-label-sm">Thickness of corrugated wall sheet</label>
                  <input
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.corrugated_sheet_thickness}
                    name="corrugated_sheet_thickness"
                    className="form-control"
                  />
                </div>
              }
              <div className="form-group col-md-3">
                <label className="col-form-label-sm">Number of stiffeners to be provided</label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.stiffener_count}
                  name="stiffener_count"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label className="col-form-label-sm">Number of radial spacers/Circle-HT</label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.radial_spacer_count}
                  name="radial_spacer_count"
                  className="form-control"
                />
              </div>
            </div>
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
            
            </div>
            <div className="alert alert-danger">TODO Ask. There is a mistake in
            DBASE code. You are calculating RADSPNO before KVA is input by user
            So your value is always 6
            Confirm if my understanding is correct
            </div>
            <button className="btn btn-primary">Check & Submit Data</button>
            </div>
        </form>
        
      </div>
    );
  };
};

// TODO set stiffener count to 0 when submitting data if corrugated wall sheet ...

