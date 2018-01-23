import React from 'react';

export default class SpecForm1 extends React.Component {
    constructor(props) {
        // do whatever React.Component will do with passed in props
        super(props);

        this.state = {
            id : props.specFromStore ? props.specFromStore.id : '',
            kva: props.specFromStore ? props.specFromStore.kva : 0,
            frequency : props.specFromStore ? props.specFromStore.frequency : 50,
            nominal_ht_voltage : props.specFromStore ? props.specFromStore.nominal_ht_voltage : 0,
            nominal_lt_voltage : props.specFromStore ? props.specFromStore.nominal_lt_voltage : 0,
            tapping_pc_min : props.specFromStore ? props.specFromStore.tapping_pc_min : 0,
            tapping_pc_max : props.specFromStore ? props.specFromStore.tapping_pc_max : 0,
            tap_step_size : props.specFromStore ? props.specFromStore.tap_step_size : 2.5,
            tapping_switch_type : props.specFromStore ? props.specFromStore.tapping_switch_type : 'circular',
            door : props.specFromStore ? props.specFromStore.door : 'outdoor',
            winding_conductor_ht : props.specFromStore ? props.specFromStore.winding_conductor_ht : 'copper',
            winding_conductor_lt : props.specFromStore ? props.specFromStore.winding_conductor_lt : 'copper',
            ht_connections : props.specFromStore ? props.specFromStore.ht_connections : 'delta',
            lt_connections : props.specFromStore ? props.specFromStore.lt_connections : 'star',
            fe_loss : props.specFromStore ? props.specFromStore.fe_loss : 0,
            cu_loss : props.specFromStore ? props.specFromStore.cu_loss : 0,
            loss_tolerance : props.specFromStore ? props.specFromStore.loss_tolerance : false,
            impedance_pc : props.specFromStore ? props.specFromStore.impedance_pc : 0,
            impedance_tolerance: props.specFromStore ? props.specFromStore.impedance_tolerance : 10, 
            max_top_oil_temp_rise : props.specFromStore ? props.specFromStore.max_top_oil_temp_rise : 50,
            winding_temp_rise : props.specFromStore ? props.specFromStore.winding_temp_rise : 55,
            cable_end_box_ht : props.specFromStore ? props.specFromStore.cable_end_box_ht : false,
            cable_end_box_lt : props.specFromStore ? props.specFromStore.cable_end_box_lt : false,
            short_circuit_test : props.specFromStore ? props.specFromStore.short_circuit_test : false,
            impulse_test : props.specFromStore ? props.specFromStore.impulse_test : false,
            tank_type : props.specFromStore ? props.specFromStore.tank_type : 'conventional',
            error: '',
            HTGAP: 0,
            LTDUCT: 0,
            DLVEDDY: 0,
            LEND: 0,
            HTND: 1,
            HTNW: 1,
            DLVTOT: 0,
            DLVNORN: 0
            ,DHVNOR: 0
            ,DHVNORN: 0
            ,DLVMID: 0
            ,DLVMIDN: 0
            ,DHVTAP: 0
            ,DHVTAPN: 0
            ,NHTAP: 0
            ,TOTTAPN: 0
            ,DHVCOND: 1
            ,DHVNORCWD: 0
            ,DHVNORCTH: 0
            ,DHVTAPCWD: 0
            ,DHVTAPCTH: 0
            ,DHVEDDY: 0
            ,TAPEDDY: 0
            ,LTGAP: 0
            
        };
    }

    // syntax used within setState is 'ES6 computed property name'
    onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };
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

    evalTapStep = () => {
        const tap_sum = parseFloat(this.state.tapping_pc_max) - parseFloat(this.state.tapping_pc_min);
        return (tap_sum == 0 ? 0 : parseFloat(this.state.tap_step_size));
    };
    evalLTKRAFT = () => {
       return (this.state.kva < 8 ? 3 : 5);
    };
    // in editing clearnaces are not being recalculated,
    // so eval clearances should not be here
    onSubmit = (event) => {
        event.preventDefault();
        // because we are writing this inside of class
        // 'this' points to instance not class
        this.props.onSubmit(
            {
                ...(this.state),
                tap_step_size : this.evalTapStep(),
                LTKRAFT : this.evalLTKRAFT(),
            }
        );
    };
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="sub-container margin-lr-30 rounded">
            <div className='form-row'>
              <div className='form-group col-md-3'>
                <label>KVA
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.kva}
                  className='form-control'
                  name="kva"
                />
              </div>
              <div className='form-group col-md-3'>
                <label>Frequency
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.frequency}
                  className='form-control'
                  name="frequency"
                />
              </div>
              <div className='form-group col-md-3'>
                <label>Nominal HT Voltage
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.nominal_ht_voltage}
                  className='form-control'
                  name="nominal_ht_voltage"
                />
              </div>
              <div className='form-group col-md-3'>
                <label>Nominal LT Voltage
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.nominal_lt_voltage}
                  className='form-control'
                  name="nominal_lt_voltage"
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-3'>
                <label>Tapping % Minimum
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.tapping_pc_min}
                  className='form-control'
                  name="tapping_pc_min"
                />
              </div>
              <div className='form-group col-md-3'> 
                <label>Tapping % Maximum
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.tapping_pc_max}
                  className='form-control'
                  name="tapping_pc_max"
                />
              </div>
              <div className='form-group col-md-3'>
                <label>Tapping Step Size
                </label>
                  <input
                    onChange={this.onInputChangeNumber}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    value={this.state.tap_step_size}
                    className='form-control'
                    name="tap_step_size"
                  />
              </div>
              <div className='form-group col-md-3'>
                <label>Tapping Switch Type
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.tapping_switch_type}
                  name="tapping_switch_type"
                  className='form-control'
                >
                  <option value="circular">Circular</option>
                  <option value="linear">Linear</option>
                  <option value="oltc">OLTC</option>
                </select>
              </div>
            </div>
            <div className='form-row'>
              
              <div className='form-group col-md-3'>
                <label>Winding Conductor HT
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.winding_conductor_ht}
                  name="winding_conductor_ht"
                  className='form-control'
                >
                  <option value="copper">Copper</option>
                  <option value="aluminium">Aluminium</option>
                </select>
              </div>
              <div className='form-group col-md-3'>
                <label>Winding Conductor LT
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.winding_conductor_lt}
                  name="winding_conductor_lt"
                  className='form-control'
                >
                  <option value="copper">Copper</option>
                  <option value="aluminium">Aluminium</option>
                </select>
              </div>
              <div className='form-group col-md-3'>
                <label>LT Connections
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.lt_connections}
                  name="lt_connections"
                  className='form-control'
                >
                  <option value="delta">Delta</option>
                  <option value="star">Star</option>
                </select>
              </div>
              <div className='form-group col-md-3'>
                <label>HT Connections
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.ht_connections}
                  name="ht_connections"
                  className='form-control'
                >
                  <option value="delta">Delta</option>
                  <option value="star">Star</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Indoor / Outdoor
                </label>
                <select
                  onChange={this.onInputChange}
                  value={this.state.door}
                  name="door"
                  className='form-control'
                >
                  <option value="outdoor">Outdoor</option>
                  <option value="indoor">Indoor</option>
                </select>
              </div>
              <div className="form-group col-md-3">  
                <label>No Load Loss
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.fe_loss}
                  name="fe_loss"
                  className='form-control'
                />
              </div>
              <div className="form-group col-md-3">  
                <label>Load Loss
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.cu_loss}
                  name="cu_loss"
                  className='form-control'
                 />
              </div>
              <div className="form-group col-md-3">  
                <label>Tolernace over Losses as per IS-2026
                </label>
                  <select
                    onChange={this.onInputChangeBool}
                    value={this.state.loss_tolerance}
                    name="loss_tolerance"
                    className='form-control'
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>% Impedance
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.impedance_pc}
                  className="form-control"
                  name="impedance_pc"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Tolerance over Impedance
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.impedance_tolerance}
                  name="impedance_tolerance"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Max. Top Oil Temperature Rise
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.max_top_oil_temp_rise}
                  name="max_top_oil_temp_rise"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Winding Temperature Rise
                </label>
                <input
                  onChange={this.onInputChangeNumber}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  value={this.state.winding_temp_rise}
                  name="winding_temp_rise"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Cable End Box LT
                </label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.cable_end_box_lt}
                  name="cable_end_box_lt"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>Cable End Box HT
                </label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.cable_end_box_ht}
                  name="cable_end_box_ht"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>Short Circuit Test
                </label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.short_circuit_test}
                  name="short_circuit_test"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>Impulse Test
                </label>
                <select
                  onChange={this.onInputChangeBool}
                  value={this.state.impulse_test}
                  name="impulse_test"
                  className="form-control"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              {this.state.winding_conductor_ht === 'aluminium' && (
                <div className="form-group col-md-3">
                  <label> Sealed / Conventional
                  </label>
                    <select
                      onChange={this.onInputChange}
                      value={this.state.tank_type}
                      name="tank_type"
                      className="form-control"
                    >
                      <option value="sealed">Sealed</option>
                      <option value="conventional">Conventional</option>
                    </select>
                </div>
              )}
            </div>
              <button className='btn btn-primary'>Check & Submit Data</button>
            </div>
          </form>
        </div>
      );   
    }
}

// all parameters specification part 1 
//kva
//frequency
//nominal_ht_voltage
//nominal_lt_voltage
//tapping_pc_min
//tapping_pc_max
//tap_step_size
//tapping_switch_type
//door
//winding_conductor_ht
//winding_conductor_lt
//ht_connections
//lt_connections
//fe_loss
//cu_loss
//loss_tolerance
//impedance_pc
//impedance_tolerance
//max_top_oil_temp_rise
//winding_temp_rise
//cable_end_box_ht
//cable_end_box_lt
//short_circuit_test
//impulse_test
//
//total 24 params
//
//
//
//                kva:                    this.state.kva,
//                frequency:              this.state.frequency,
//                nominal_ht_voltage :    this.state.nominal_ht_voltage,
//                nominal_lt_voltage :    this.state.nominal_lt_voltage,
//                tapping_pc_min :        this.state.tapping_pc_min,
//                tapping_pc_max :        this.state.tapping_pc_max,
//                tap_step_size :         (
//                    this.state.tapping_pc_min == 0 && this.state.tapping_pc_max == 0 ? (
//                        0
//                    ) : (
//                        this.state.tap_step_size)
//                ),
//                tapping_switch_type :   this.state.tapping_switch_type,
//                door :                  this.state.door,
//                winding_conductor_ht :  this.state.winding_conductor_ht,
//                winding_conductor_lt :  this.state.winding_conductor_lt,
//                ht_connections :        this.state.ht_connections,
//                lt_connections :        this.state.lt_connections,
//                fe_loss :               this.state.fe_loss,
//                cu_loss :               this.state.cu_loss,
//                loss_tolerance :        this.state.loss_tolerance,
//                impedance_pc :          this.state.impedance_pc,
//                impedance_tolerance :   this.state.impedance_tolerance,
//                max_top_oil_temp_rise : this.state.max_top_oil_temp_rise,
//                winding_temp_rise :     this.state.winding_temp_rise,
//                cable_end_box_ht :      this.state.cable_end_box_ht,
//                cable_end_box_lt :      this.state.cable_end_box_lt,
//                short_circuit_test :    this.state.short_circuit_test,
//                impulse_test :          this.state.impulse_test,
//                tank_type :             this.state.tank_type
