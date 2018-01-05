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
      <div className="container border-gray-300 bg-light rounded padding-tb-std margin-tb-30">
        <form onSubmit={this.onSubmit}>
        <div className="sub-container rounded">
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-center">HT Winding Type</h5> 
              <h5 className="text-center text-capitalize">{this.state.hv_winding}</h5>
            </div>
            <div className="col-md-6">
              <h5 className="text-center">LT Winding Type</h5> 
              <h5 className="text-center text-capitalize">{this.state.lv_winding}</h5>
            </div>
          </div>
        </div>
        <div className="sub-container rounded">
          {this.state.lv_winding === 'spiral' && 
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>No. of LT Coil(1/2)
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.lt_coil_count}
                  name="lt_coil_count"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Clearance between LT coils
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.lt_coil_clearance}
                  name="lt_coil_clearance"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Transposition in LT</label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.lt_transpose}
                  name="lt_transpose"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          }
          {this.state.lv_winding != 'spiral' && 
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Transposition in LT</label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.lt_transpose}
                  name="lt_transpose"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          }
        </div>
        <div className="sub-container rounded">
          <h4 className="text-center">Set Covering over Conductors in mm</h4>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>LT Conductor
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.covering_lt}
                name="covering_lt"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>HT Conductor
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.covering_ht}
                name="covering_ht"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>HT Conductor Insulation</label>
              <select
                onChange={this.onInputChange}
                value={this.state.ht_insulation_material}
                name="ht_insulation_material"
                className="form-control"
              >
                <option value="dpc">Double Paper Covering</option>
                <option value="tpc">Triple Paper Covering</option>
                <option value="se">Super Enamel</option>
              </select>
            </div>
            {this.state.hv_winding === 'crossover' &&
              <div className="form-group col-md-3">
                <label>HT Conductor Standard SWG 
                </label>
                <select
                   onChange={this.onInputChange}
                   value={this.state.ht_conductor_std_swg}
                   name="ht_conductor_std_swg"
                >
                  <option value="s">Standard?</option>
                  <option value="n">Non-Standard?</option>
                </select>
              </div>
              }
            </div>
          </div>
        <div className="sub-container rounded">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Set <var>I</var><sup>2</sup><var>R</var> Loss for design
              </label>
              <input
                 onChange={this.onInputChangeNumber}
                 onBlur={this.onBlur}
                 onKeyDown={this.onKeyDown}
                 value={this.state.dir_loss}
                 name="dir_loss"
                 className="form-control"
              />
            </div>
          <div className="form-group col-md-3">
            <label>Flux Density for Design
            </label>
            <input
              onChange={this.onInputChangeNumber}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              value={this.state.flux_density_design}
              name="flux_density_design"
              className="form-control"
            />
          </div>
          <div className="form-group col-md-6 rounded gray-400 padding-top-10">
          <h5 className="text-center">% Impedance Limit for Design</h5>
          <div className="row">
          <div className="col-md-6">

          <div className="form-group row">
          <label className="col-md-4 text-center col-form-label">Low</label>
          <div className="col-md-8">
            <input
               onChange={this.onInputChangeNumber}
               onBlur={this.onBlur}
               onKeyDown={this.onKeyDown}
               value={this.state.impedance_low}
               name="impedance_low"
              className="form-control"
            />
            </div>
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group row">
          <label className="col-md-4 text-center col-form-label">High</label>
          <div className="col-md-8">
            <input
               onChange={this.onInputChangeNumber}
               onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
               value={this.state.impedance_high}
               name="impedance_high"
              className="form-control"
            />
          </div>
          </div>
        </div>
        </div>
      </div>
        </div>
        </div>
          <button className="btn btn-primary">Check Data & Submit</button>
        </form>
      </div>
    );
  };
};
