import React from 'react';

export default class WindingDesLVCross extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore
      ,change_cross_lt: false 
      ,submitInit: false
      ,lt_coil_count: 1  // NLCOIL
      ,TLASTLY: props.specFromStore.TLASTLY
        ? props.specFromStore.LASTLY
        : 0
      ,TPLCrossLV: props.specFromStore.TPLCrossLV
        ? props.specFromStore.TPLCrossLV
        : 0
    }
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

  onSubmitInit = (event) => {
    event.preventDefault();

    const resultCrossLV = this.props.evalCrossLV(this.state);

    this.setState(() => {
      return {
        ...resultCrossLV,
        submitInit: true
      };
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  // evaluate upon onSubmitInit
  // then render results
  // send results out + retry value
  // outside: dispatch
  // outside: redirect or refresh based on retry 

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitInit}>
        {this.state.TLASTLY > 0 &&
          <div>
            <p>Number of LV coils/limb: {this.state.lt_coil_count}</p>
            <p>% last layer: {this.state.TLASTLY * 100 / this.state.TPLCrossLV}</p>
          </div>
        }
        <label>
          Number of LV coils/limb
        </label>
        <input
          type="text"
          onChange={this.onInputChangeNumber}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          value={this.state.lt_coil_count}
          name="lt_coil_count"
        />
        <label>
          Duct in LV coils
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
        {this.state.lt_coil_count > 1 && 
          <div>
            <label>
              Total clearance between LV coils
            </label>
            <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.TCLRLTC}
                name="TCLRLTC"
            />
          </div>
        }
        <label>
          Clearance LT to Yoke
        </label>
        <input
            type="text"
            onChange={this.onInputChangeNumber}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.CLRLTY}
            name="CLRLTY"
        />
        <button>Submit</button>
        </form>
        {this.state.submitInit &&
          <div>
            <div>
              <h4>LV Cross-Over Winding Coil Details</h4>
              <p>Number of LV coils/limb: {this.state.lt_coil_count}</p>
              <p>% last layer: {this.state.TLASTLY * 100 / this.state.TPLCrossLV}</p>
              <p>Number of layers: {this.state.NLTLYR}</p>
              <p>Axial length: {this.state.axial_length_cross_lv}</p>
              <p>B1: {this.state.B1}</p>
              <p>Total clearance between coils: {this.state.TCLRLTC}</p>
            </div>
            <form onSubmit={this.onSubmit}>
              <label>Want further changes in LT winding?
              </label>
              <select
                onChange={this.onInputChangeBool}
                value={this.state.change_cross_lt}
                name="change_cross_lt"
                className='form-control'
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <button>Continue</button>
            </form>
          </div>
        }
      </div>
    );

  }
}