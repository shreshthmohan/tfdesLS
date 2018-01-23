import React from 'react';

export default class WindingDesForm3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore,
      WHLT: props.specFromStore.WHLT ? props.specFromStore.WHLT : 0
    };
  }

  componentDidMount() {
    const addToState = {};
    if (this.state.hv_winding == 'disc' && this.state.lv_winding == 'disc') {
      addToState.CLRLTY = this.state.FINCLRHTY;
      addToState.WHLT = this.state.HTWH;
    }

    this.setState(() => {
      return {
        ...addToState
      };
    });

  }

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

    let addToState = {};

    if (this.state.hv_winding == 'disc' && this.state.lv_winding == 'disc') {
      addToState.WD3X = 1; // winding design 3's X
    } else {
      if (this.state.clamp_ring_material == 'mild_steel' && this.state.clamp_ring_thickness > 0) {
        addToState.WHLT = this.state.WH - this.state.CLRLTY * 2
          - this.state.clamp_ring_thickness - 3;
      } else {
        addToState.WHLT = this.state.WH - this.state.CLRLTY * 2;
      }
    }

    addToState.B1 = 0;
    addToState.LTWD = 0;
    addToState.LTDEP = 0;
    addToState.LTNW = 1;
    addToState.LTND = 1;

    this.props.onSubmit({
      ...this.state,
      ...addToState
    });



  }

  render() {
    return (
      <div>
        <h3 className="text-center">Set LT Winding Clearances</h3>
        <form onSubmit={this.onSubmit}>
          <p>Min. Clr. LT to Yoke: {this.state.MCLRLTY}</p>
          {this.state.hv_winding == 'disc' && this.state.lv_winding == 'disc' &&
            <div>
              <p>HT to Yoke: {this.state.FINCLRHTY}</p>
              <p>HT Winding Height: {this.state.HTWH}</p>
              <div className="alert alert-danger">TODO CLRLTY=FINCLRHTY</div>
              <div className="alert alert-danger">TODO WHLT=HTWH</div>
              <label>Set LT Winding Height for Design</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.WHLT}
                name="WHLT"
              />
            </div>
          }
          {(this.state.hv_winding != 'disc' || this.state.lv_winding != 'disc') &&
            <div>
              <label>Set for Design</label>
              <input
                type="text"
                onChange={this.onInputChangeNumber}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                value={this.state.CLRLTY}
                name="CLRLTY"
              />
            </div>
          }
          <p>Min. Clr. LT to Earth {this.state.MCLRLTE}</p>
          <label>Set for Design</label>
          <input
            type="text"
            onChange={this.onInputChangeNumber}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.CLRLTE}
            name="CLRLTE"
          />
          <button>Submit</button>
        </form>
      </div>
    );

  }


}