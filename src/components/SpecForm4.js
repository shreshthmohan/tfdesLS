import React from 'react';

export default class SpecForm4 extends React.Component {
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
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };
  render() {
    return (
      <div className="margin-tb-30 border-gray-300 container bg-light rounded padding-tb-std">
        <h3 className="text-center">Design Considerations</h3>
        <form onSubmit={this.onSubmit}>
          <div className="sub-container rounded">
            <h4 className="text-center">Maximum Current Density for Windings</h4>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>For LT</label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.max_current_density_lt}
                  name="max_current_density_lt"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>For HT
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.max_current_density_ht}
                  name="max_current_density_ht"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Conductor Rad Size
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.rod_size}
                  name="rod_size"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="sub-container rounded">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Max Over-Fluxing allowed in %
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.max_over_flux}
                  name="max_over_flux"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Max Flux Density
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.max_flux_density}
                  name="max_flux_density"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary">Check & Submit Data</button>
        </form>
      </div>
    );
  };
};
