import React from 'react';

export default class PreInitCoreDesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore,
      change_flux_density : false

    };

  }

  componentDidMount() {
    // evalLTTurns returns an object, not just a single value 
    let turns_lt = {};
    if (this.state.turns_lt === 0) {
      turns_lt = this.props.evalLTTurns(this.props.specFromStore);
    }

    const turns_ht = this.props.evalHTTurns(
    {
      ...this.props.specFromStore,
      ...turns_lt
    });

    this.setState(() => {
      return {...turns_lt, ...turns_ht};
    });
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
    this.props.onSubmit({
      ...this.state
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p>KVA: {this.state.kva}</p>
          <p>Nominal HT Voltage: {this.state.nominal_ht_voltage}</p>
          <label>
            LT turns per limb
          </label>
          <input
            onChange={this.onInputChangeNumber}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.turns_lt}
            className='form-control'
            name="turns_lt"
          />
          <label>Change Flux Density?
            <select
               onChange={this.onInputChangeBool}
               value={this.state.change_flux_density}
               name="change_flux_density"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          {this.state.change_flux_density &&
          <label>Flux Density
            <input
               onChange={this.onInputChangeNumber}
               value={this.state.flux_density_design}
               name="flux_density_design"
            />
          </label>
          }
          <button>Done</button>
        </form>
      </div>
    );
  }
};
