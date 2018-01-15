// Calculate and choose Winding Tolerances

import React from 'react';
import { connect } from 'react-redux';
import { setWindingTol } from '../actions/wdg_tol';
import roundFloat from '../evaluators/round_float';

class SetWdgTolFinal extends React.Component {
  constructor(props) {
    super(props);

    // if CU/ALSPC3 values are not set, setting defaults
    this.state = {
      ...props.CONDSP
      ,prev_ALSPC3: props.CONDSP
        ? (props.CONDSP.ALSPC3 ? roundFloat(100 - 100 * props.CONDSP.ALSPC3, 2) : 1)
        : 1
      ,prev_CUSPC3: props.CONDSP
        ? (props.CONDSP.CUSPC3 ? roundFloat(100 - 100 * props.CONDSP.CUSPC3, 2) : 2)
        : 2
      ,prev_CAXLTOL: props.CONDSP
        ? (props.CONDSP.CAXLTOL ? roundFloat(100 * props.CONDSP.CAXLTOL - 100, 2) : 1.2)
        : 1.2
      ,ALSPC3 : props.CONDSP
        ? (props.CONDSP.ALSPC3 ? roundFloat(100 - 100 * props.CONDSP.ALSPC3, 2) : 1)
        : 1
      ,CUSPC3 : props.CONDSP
        ? (props.CONDSP.CUSPC3 ? roundFloat(100 - 100 * props.CONDSP.CUSPC3, 2) : 2)
        : 2
      ,CAXLTOL : props.CONDSP
        ? (props.CONDSP.CAXLTOL ? roundFloat(100 * props.CONDSP.CAXLTOL - 100, 2) : 1.2)
        : 1.2
    }
  }
  // TODO print this todo in render
  // What to do when CONDSP is empty
  // Ask user to input tolerances
  // OR
  // Use some defaults
  // If defaults, then what defaults?

  componentDidMount() {
    const tol = this.evalWdgTol(this.state);
    this.setState(() => {
      return { ...tol };
    })
  }

  evalWdgTol  = (data) => {
    const {winding_type, tolerance_level} = data;
    const ret = {};
    if (winding_type == 'spiral' || winding_type== 'spiral_crossover') {
      switch (tolerance_level) {
        case 'normal':
          ret.ALSPC3 = 1.75;
          ret.CUSPC3 = 3;
          break;
        case 'tight':
          ret.ALSPC3 = 1.4;
          ret.CUSPC3 = 2.5;
          break;
        case 'very_tight':
          ret.ALSPC3 = 1.4;
          ret.CUSPC3 = 2.5;
          break;
        default:
          ret.tol_level_error = 'tolerance level does not exist or is invalid';
      
      }
    }
    if (winding_type == 'crossover' || winding_type== 'spiral_crossover') {
      switch (tolerance_level) {
        case 'normal':
          ret.CAXLTOL = 2;
          break;
        case 'tight':
          ret.CAXLTOL = 1.6;
          break;
        case 'very_tight':
          ret.CAXLTOL = 1.2; // print this
          // 1 + 1.2/100 : save this
          break;
        default:
          ret.tol_level_error = 'tolerance level does not exist or is invalid';
      }
    }
    return ret;

  };
  // TODO 1-alspc3/100 before storing
  // TODO .... CAXLTOL
  onInputChangeNumber = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (!value || value.match(/^(-)?\d{0,}(\.\d{0,})?$/)) {

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

  evalBeforeDispatch = (data) => {
    const {
      winding_type
      ,tolerance_level
      ,ALSPC3
      ,CUSPC3
      ,CAXLTOL} = data;

    const ret = {};

    ret.ALSPC3 = roundFloat(1 - ALSPC3 / 100, 4);
    ret.CUSPC3 = roundFloat(1 - CUSPC3 / 100, 4);
    ret.CAXLTOL = roundFloat(1 + CAXLTOL / 100, 4);

    return {...data, ...ret};
  }

  onSubmit = (event) => {
    event.preventDefault();

    const data = this.evalBeforeDispatch(this.state);

    this.props.dispatch(setWindingTol(data));
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {(this.state.winding_type == 'spiral' || this.state.winding_type == 'spiral_crossover') &&
            <div>
              <p>Spiral Winding - {this.state.tolerance_level.replace('_',' ')}</p>
              <label>Maximum depth of Aluminium strip
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MAXDEPAL}
                className='form-control'
                name="MAXDEPAL"
              />
              <label>Maximum width of Aluminium strip
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MAXWDAL}
                className='form-control'
                name="MAXWDAL"
              />
              <label>Maximum depth of Copper strip
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MAXDEPCU}
                className='form-control'
                name="MAXDEPCU"
              />
              <label>Maximum width of Copper strip
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MAXWDCU}
                className='form-control'
                name="MAXWDCU"
              />
              <label>% increase in length for Aluminium winding
              </label>
              <p>Prev: {this.state.prev_ALSPC3}</p>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.ALSPC3}
                className='form-control'
                name="ALSPC3"
              />
              <label>% increase in length for Copper winding
              </label>
              <p>Prev: {this.state.prev_CUSPC3}</p>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.CUSPC3}
                className='form-control'
                name="CUSPC3"
              />
              <p>Increase in winding length due to end leveling for each end</p>
              <label>For total conductor area {'< 100'} (mm2?)
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.LEND1}
                className='form-control'
                name="LEND1"
              />
              <label>For total conductor area {'< 400'} (mm2?)
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.LEND2}
                className='form-control'
                name="LEND2"
              />
              <label>For total conductor area {'> 400'} (mm2?)
              </label>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.LEND3}
                className='form-control'
                name="LEND3"
              />
            </div>
          }
          {(this.state.winding_type == 'crossover' || this.state.winding_type== 'spiral_crossover') && 
            <div>
              <p>Cross-over Winding - {this.state.tolerance_level.replace('_',' ')}</p>
              <label>% increase in axial length of coils
              </label>
              <p>Prev: {this.state.prev_CAXLTOL}</p>
              <input
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.CAXLTOL}
                className='form-control'
                name="CAXLTOL"
              />
            </div>
          }
          <button>Submit</button>
        </form>
        <div className="alert alert-danger">TODO Ask. Why is ALSPC3 being saved as 1 - ALSPC3/100
        instead on 1 + ALSPC3/100?! See SETWDTOL and SPIRAL*</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  return {
    CONDSP: state.CONDSP || {}
  };
}

export default connect(mapStateToProps)(SetWdgTolFinal);
  
  