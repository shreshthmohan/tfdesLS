import React from 'react';

export default class WindingDesLVSpiral2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore,
      WHLTE  : 0,
      LTGAPBOOL: false
    };


  }

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

  onKeyDown(event) {
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

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);

  }

  render() {
    const Fragment = React.Fragment;
    return(
      <div>
        <h4>Spiral 2</h4>
        <form onSubmit={this.onSubmit}>
          {this.state.NLTLYR > 1 &&
            <div>
              <label>
                LT Duct Size in mm
              </label>
              <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.LTDUCT}
                  name="LTDUCT"
              />
              <label>
                LT inter-layer Kraft Paper in mil
              </label>
              <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.LTKRAFT}
                  name="LTKRAFT"
              />
            </div>
          }
          {this.state.LTGAP > 0 &&
            <div>
              <p>Thinning of LT Winding (LT Gap: {this.state.LTGAP})</p>
              <select
                onChange={this.onInputChangeBool}
                value={this.state.loss_tolerance}
                name="LTGAPBOOL"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          }
          <label>
            Clearance between LT Coils
          </label>
          <input
            type="text"
            onChange={this.onInputChangeNumber}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.lt_coil_clearance}
            name="lt_coil_clearance"
          />
          {this.state.LTGAPBOOL &&
            <div>
              <label>
                Set Thinning of LT Winding, i.e. LT Gap
              </label>
              <input
                  type="text"
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.LTGAP}
                  name="LTGAP"
              />
            </div>
          }
          <button>Submit</button>
        </form>
      </div>
    );
  }


}