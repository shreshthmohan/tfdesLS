import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';

// Choose design TODO

class SetWindingType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.spec
    };
  }

  componentDidMount() {
    this.evalWindingType();
  }
  evalWindingType = () => {
    let { lv_winding, hv_winding } = this.state;
    if (!this.state.hv_winding || !this.state.lv_winding) {
      lv_winding = this.state.lv_winding ? this.state.lv_winding : '';
      hv_winding = this.state.hv_winding ? this.state.hv_winding : '';

      if (this.state.nominal_lt_voltage < 6000) {
        lv_winding = 'spiral';
      } else {
        lv_winding = 'crossover';

        if (this.state.kva > 800 && this.state.nominal_lt_voltage <= 12000) {
          lv_winding = 'disc';
        }

        if (this.state.kva > 2000 && this.state.nominal_lt_voltage > 12000) {
          lv_winding = 'disc';
        }
      }

      if (this.state.nominal_ht_voltage < 6000) {
        hv_winding = 'spiral'; //spiral?
      } else {
        hv_winding = 'crossover';

        if (this.state.kva > 1200 && this.state.nominal_ht_voltage <= 12000) {
          hv_winding = 'disc';
        }

        if (this.state.kva > 2000 && this.state.nominal_ht_voltage > 12000) {
          hv_winding = 'disc';
        }
      }
      const prev_hv_winding = hv_winding;

      this.setState(() => {
        return {
          lv_winding: lv_winding,
          hv_winding: hv_winding,
          prev_hv_winding: prev_hv_winding
        };
      });
    }
  };

  evalWdgAfterSubmit = () => {
    let { HTND, HTNW, NLTLYR, NHTLYR, lt_coil_count } = this.state;

    if (this.state.hv_winding === 'spiral'
      && this.state.prev_hv_winding !== 'spiral') 
    {
      HTND = 1;
      HTNW = 1;
    }
    if (this.state.hv_winding === 'helical'
      && this.state.prev_hv_winding !== 'helical') 
    {
      HTND = 1;
      HTNW = 1;
    }
    if (this.state.lv_winding === 'helical') {
      NLTLYR = 1;
    }
    if (this.state.hv_winding === 'helical') {
      NHTLYR = 1;
    }
    if (this.state.lv_winding === 'spiral') {
      lt_coil_count = 1;
    }

    return {
      HTND
      ,HTNW
      ,NLTLYR
      ,NHTLYR
      ,lt_coil_count
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
  onSubmit = (event) => {
    event.preventDefault();

    const evalAfter = this.evalWdgAfterSubmit();
    
    this.props.dispatch(this.props.editSpecAfterSave({
      ...this.state,
      ...evalAfter}));

    this.props.history.push('/');
      

  };


  render() {
    return (
      <div>
        <h3>Set Winding Type</h3>
        <form onSubmit={this.onSubmit}>
          <label>LV winding type
          </label>
          <select
            onChange={this.onInputChange}
            value={this.state.lv_winding}
            name="lv_winding"
            className='form-control'
          >
            <option value="crossover">Cross-over</option>
            <option value="spiral">Spiral</option>
            <option value="disc">Disc</option>
            <option value="helical">Helical</option>
          </select>
          <label>HV winding type
          </label>
          <select
            onChange={this.onInputChange}
            value={this.state.hv_winding}
            name="hv_winding"
            className='form-control'
          >
            <option value="crossover">Cross-over</option>
            <option value="spiral">Spiral</option>
            <option value="disc">Disc</option>
            <option value="helical">Helical</option>
          </select>
          <button>Submit</button>
        </form>
        <div className="alert alert-danger">Looks like an obvious mistake. But look at line 77 in WINDSET.PRG</div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    spec: state.loadedDesign,
    editSpecAfterSave: editSpecAfterSave
  };
};

export default connect(mapStateToProps)(SetWindingType);
