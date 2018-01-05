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
          <div className="border-gray-300 container bg-light rounded padding-tb-std margin-tb-30">
            <div className="sub-container rounded">
              <div className="form-row">
              {this.state.winding_conductor_lt === 'aluminium' &&
                <div className="form-group col-md-4">
                  <label>Aluminium (covered) LT per kg
                  </label>
                  <input
                    type="text"
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.cost_lt}
                    name="cost_lt"
                    className="form-control"
                  />
                </div>
              }
              {this.state.winding_conductor_lt === 'copper' &&
                <div className="form-group col-md-4">
                  <label>Copper (covered) LT per kg
                  </label>
                  <input
                    type="text"
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.cost_lt}
                    name="cost_lt"
                    className="form-control"
                  />
                </div>
              }
              {this.state.winding_conductor_ht === 'aluminium' &&
                <div className="form-group col-md-4">
                  <label>Aluminium (covered) HT per kg
                  </label>
                  <input
                    type="text"
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.cost_ht}
                    name="cost_ht"
                    className="form-control"
                  />
                </div>
              }
              {this.state.winding_conductor_ht === 'copper' &&
                <div className="form-group col-md-4">
                  <label>Copper (covered) HT per kg
                  </label>
                  <input
                    type="text"
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.cost_ht}
                    name="cost_ht"
                    className="form-control"
                  />
                </div>
              }
              <div className="form-group col-md-4">
                <label>CRGO per kg
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.cost_crgo}
                  name="cost_crgo"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Oil per litre
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.cost_oil}
                  name="cost_oil"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Steel per kg
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.cost_steel}
                  name="cost_steel"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Radiators per kg
                </label>
                <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.cost_radiator}
                  name="cost_radiator"
                  className="form-control"
                />
              </div>
              </div>
              </div>
              <button className="btn btn-primary">Check data & Submit</button>
          </div>
        </form>
      </div>
    );
  };
};
