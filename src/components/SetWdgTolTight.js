// Choose Manufacturing Tolerance

import React from 'react';
import { connect } from 'react-redux';
import { setWindingTol } from '../actions/wdg_tol';

class SetWdgTolTight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.CONDSP,
      tolerance_level: 'very_tight'
    };
  }
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

    // dispatch
    // push to choose level
    this.props.dispatch(setWindingTol(this.state));
    this.props.history.push('/set_wdg_tol_final');

  };

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <p>Level of Manufacturing Tolerance</p>
          <input
            type="radio"
            name="tolerance_level"
            onChange={this.onInputChange}
            key="normal"
            value="normal"
            checked={this.state.tolerance_level == 'normal'}
          />
          <label>Normal (Suitable for semi-skilled work)</label>
          <input
            type="radio"
            name="tolerance_level"
            onChange={this.onInputChange}
            key="tight"
            value="tight"
            checked={this.state.tolerance_level == 'tight'}
          />
          <label>Tight (Suitable for skilled work)</label>
          <input
            type="radio"
            name="tolerance_level"
            onChange={this.onInputChange}
            key="very_tight"
            value="very_tight"
            checked={this.state.tolerance_level == 'very_tight'}
          />
          <label>Very Tight (Suitable for skilled work with special care)</label>
          <button>Next</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {

  return {
    CONDSP: state.CONDSP || {}
  };
}

export default connect(mapStateToProps)(SetWdgTolTight);