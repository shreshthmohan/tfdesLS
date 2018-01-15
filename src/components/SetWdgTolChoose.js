// Choose the Winding Type

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setWindingTol } from '../actions/wdg_tol';
// action to save to localStorage and store

class SetWdgTolChoose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...(props.CONDSP),
      LEND1: props.CONDSP
        ? (props.CONDSP.LEND1 ? props.CONDSP.LEND1 : 2)
        : 2,
      LEND2: props.CONDSP
        ? (props.CONDSP.LEND2 ? props.CONDSP.LEND2 : 2.5)
        : 2.5,
      LEND3: props.CONDSP
        ? (props.CONDSP.LEND3 ? props.CONDSP.LEND3 : 3)
        : 3,
      MAXDEPAL: props.CONDSP
        ? (props.CONDSP.MAXDEPAL ? props.CONDSP.MAXDEPAL : 5.6)
        : 5.6,
      MAXWDAL: props.CONDSP
        ? (props.CONDSP.MAXWDAL ? props.CONDSP.MAXWDAL : 15)
        : 15,
      MAXDEPCU : props.CONDSP
        ? (props.CONDSP.MAXDEPCU ? props.CONDSP.MAXDEPCU : 4.5)
        : 4.5,
      MAXWDCU : props.CONDSP
        ? (props.CONDSP.MAXWDCU ? props.CONDSP.MAXWDCU : 15)
        : 15,
      winding_type: 'spiral'
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
    this.props.history.push('/set_wdg_tol_tight');

  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <p>Select Winding Type
          </p>
          <input
            type="radio"
            name="winding_type"
            onChange={this.onInputChange}
            key="spiral"
            value="spiral"
            checked={this.state.winding_type == 'spiral'}
          />
          <label>Spiral</label>
          <input
            type="radio"
            name="winding_type"
            onChange={this.onInputChange}
            key="crossover"
            value="crossover"
            checked={this.state.winding_type == 'crossover'}
          />
          <label>Cross-over</label>
          <input
            type="radio"
            name="winding_type"
            onChange={this.onInputChange}
            key="spiral_crossover"
            value="spiral_crossover"
            checked={this.state.winding_type == 'spiral_crossover'}
          />
          <label>Both spiral and cross-over</label>
          <button>Next</button>
        </form>
        <Link to="/">Exit</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  return {
    CONDSP: state.CONDSP || {}
  };
}

export default connect(mapStateToProps)(SetWdgTolChoose);