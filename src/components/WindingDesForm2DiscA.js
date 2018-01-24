import React from 'react';

export default class WindingDesForm2Disc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore
      ,WHDone: false
    };
  }

  componentDidMount() {

    this.evalNDNW();
    
  }

  evalNDNW = () => {
    const HTND = this.state.DHVCOND;
    const HTNW = 1;

    this.setState(() => {
      return {
        HTND
        ,HTNW
      };
    });
  };

  evalWH = (data) => {

    const {
      HTWH
      ,CLRHTY
      ,clamp_ring_thickness //CRINGTH
      ,clamp_ring_material //CRINGMAT
    } = data;

    let WH;

    WH = HTWH + 2 * CLRHTY;

    if (clamp_ring_thickness > 0 && clamp_ring_material == 'mild_steel') {
      WH = WH + 3 + clamp_ring_thickness;
    }

    WH = Math.floor(WH / 5 + 0.7) * 5;

    let FINCLRHTY;

    if (clamp_ring_thickness > 0 && clamp_ring_material == 'mild_steel') {
      FINCLRHTY = (WH - HTWH - clamp_ring_thickness - 3) / 2;
    } else {
      FINCLRHTY = (WH - HTWH) / 2;
    }

    return {
      WH
      ,FINCLRHTY
    };
  };

  onSubmitClr = (event) => {
    event.preventDefault();

    const resultWH = this.evalWH(this.state); 

    this.setState(() => {
      return {
        ...resultWH
        ,WHDone: true
      };
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);

  };

  render() {
    return (
      <div>
        <p>Winding Height: {this.state.HTWH}</p>
        <p>Min. Clr. between HT winding and Yoke: {this.state.MCLRHTY}</p>
        <form onSubmit={this.onSubmitClr}>
          <label>Set for design
          </label>
          <input
            type="text"
            onChange={this.onInputChangeNumber}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.CLRHTY}
            name="CLRHTY"
          />
          <button>Submit</button>
        </form>
        {this.state.WHDone === true &&
          <div>  
            <p>Calculated window height: {this.state.WH}</p>
            <p>Final HT winding to Yoke clearance: {this.state.FINCLRHTY}</p>
            <p>HT winding design over - End of step 2</p>
            <button onClick={this.onSubmit}>Done</button>
          </div>  
        }
      </div>
    );
  }
}