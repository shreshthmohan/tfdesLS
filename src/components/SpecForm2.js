import React from 'react';

export default class SpecForm2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            MCLRLTY  : props.specFromStore ? props.specFromStore.MCLRLTY  : 0, 
            MCLRLTE  : props.specFromStore ? props.specFromStore.MCLRLTE  : 0,
            MCLRLTHT : props.specFromStore ? props.specFromStore.MCLRLTHT : 0,
            MCLRHTY  : props.specFromStore ? props.specFromStore.MCLRHTY  : 0,
            MCLRHTHT : props.specFromStore ? props.specFromStore.MCLRHTHT : 0,
            MCLRHTT  : props.specFromStore ? props.specFromStore.MCLRHTT  : 0,

            ACLRLTE  : props.specFromStore ? props.specFromStore.ACLRLTE  : 0,
            ACLRLTLT : props.specFromStore ? props.specFromStore.ACLRLTLT : 0,
            ACLRHTE  : props.specFromStore ? props.specFromStore.ACLRHTE  : 0,
            ACLRHTHT : props.specFromStore ? props.specFromStore.ACLRHTHT : 0
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
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
          <div className="container bg-light rounded padding-tb-std">
        <div className="">
          <div className="oil-clr sub-container rounded">
          <h3 className="text-center">Set Minimum Clearances in Oil</h3>
          <div className="form-row">
            <div className="form-group col-md-4 col-xs-6"> 
              <label>LT to Yoke</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRLTY}
                name="MCLRLTY"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-4 col-xs-6">
              <label>LT to Earth</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRLTE}
                name="MCLRLTE"
                className="form-control"
              />
            </div>  
            <div className="form-group col-md-4 col-xs-6"> 
              <label>LT to HT</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRLTHT}
                name="MCLRLTHT"
                className="form-control"
              />
            </div>  
          </div>
          <div className="form-row">
            <div className="form-group col-md-4 col-xs-6"> 
              <label>HT to Yoke</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRHTY}
                name="MCLRHTY"
                className="form-control"
              />
            </div>  
            <div className="form-group col-md-4 col-xs-6"> 
              <label>HT to HT</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRHTHT}
                name="MCLRHTHT"
                className="form-control"
              />
            </div>  
            <div className="form-group col-md-4 col-xs-6"> 
              <label>HT to Tank</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.MCLRHTT}
                name="MCLRHTT"
                className="form-control"
              />
            </div>  
            
        </div>
        </div>
        <div className="air-clr sub-container rounded">
          <h3 className='text-center rounded'>Set Minimum Clearances in Air</h3>
          <div className="form-row">
            <div className="form-group col-md-3 col-xs-6">
              <label>LT TO Earth</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.ACLRLTE}
                name="ACLRLTE"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3 col-xs-6"> 
              <label>LT to LT</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.ACLRLTLT}
                name="ACLRLTLT"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3 col-xs-6"> 
              <label>HT to Earth</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.ACLRHTE}
                name="ACLRHTE"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3 col-xs-6"> 
              <label>HT to HT</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.ACLRHTHT}
                name="ACLRHTHT"
                className="form-control"
              />
            </div>
          </div>
        </div>
         <button className="btn btn-primary">Check & Submit Data</button>
        </div>
        </div>
        
       
        </form>
      
    );
  };
};

// SET MINIMUM CLEARANCES IN OIL
// MCLRLTY
// MCLRLTE
// MCLRLTHT
// MCLRHTY
// MCLRHTHT
// MCLRHTT

// SET MINIMUM CLEARANCES IN AIR
// ACLRLTE
// ACLRLTLT
// ACLRHTE
// ACLRHTHT
