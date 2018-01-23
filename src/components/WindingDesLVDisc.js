import React from 'react';

export default class WindingDesLVDisc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.specFromStore
      ,discLVTypesDone: false
      ,discLVThinnedDone: false
    };
  }

  componentDidMount() {
    this.evalDiscArr();
  }

  evalDiscArr = () => {
    const {
      WHLT
      ,LTGAP
      ,turns_lt
    } = this.state;

    let X1 = (WHLT - LTGAP) / 17.3;
    X1 = 2 * Math.floor(X1 / 2);
    let X2 = X1;
    let X1L = X1 + 16;
    let X10 = 1.0;
    let X3, X4, X5;
    const lv_disc_arr = [];
    let el;
    while (X1 <= X1L) {
      X3 = turns_lt / X1;
      X4 = Math.floor(X3);
      X5 = Math.abs(X3 - X4 - 0.8);
      if (X10 >= X5) {
        X10 = X5
        X2 = X1
      }
      el = {
        discs: X1,
        turns_per_disc: X3
      };
      lv_disc_arr.push(el);
      X1 = X1 + 2;
    }

    //X2 = Math.floor(X2 / 2) * 2; TODO

    this.setState(() => {
      return {
        lv_disc_arr
        ,X2
      };
    })
  };

  onSubmitDiscTot = (event) => {
    event.preventDefault();

    // evalDiscLVTypes
    const typeResult = this.props.evalDiscLVTypes(this.state);

    this.setState(() => {
      return {
        ...typeResult,
        discLVTypesDone: true
      }
    });

  };

  onSubmitThinned = (event) => {
    event.preventDefault();

    const thinnedResult = this.props.evalDiscLVThinned(this.state);

    this.setState(() => {
    return {
      ...thinnedResult,
      discLVThinnedDone: true
    }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div>
        <h3>Disc LV</h3>
        {this.state.discLVTypesDone === false &&
          <form onSubmit={this.onSubmitDiscTot}>
            <p>Selection No. of LV discs</p>
            <p>Discs | Turns/Disc</p>
            {this.state.lv_disc_arr.map((coil, id) => {
              return (
                <p key={id}>{coil.discs} | {coil.turns_per_disc}</p>
              );
            })}
            <label>Total LV discs</label>
            <input
              onChange={this.onInputChangeNumber}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              value={this.state.X2}
              name="X2"
              className="form-control"
            />
            <button>Submit</button>
          </form>
        }
        {this.state.discLVTypesDone === true &&
          <form onSubmit={this.onSubmitThinned}>
            <p>Select no. of thinned discs</p>
            <p>Type | No. | Turns/Disc</p>
            <p>Normal | {this.state.DLVNOR} | {this.state.DLVNORN}</p>
            <p>Thinned | {this.state.DLVMID} | {this.state.DLVMIDN}</p>
            <label>Number of thinned discs
            </label>
            <input
              type="text"
              onChange={this.onInputChangeNumber}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              value={this.state.DLVMID}
              name="DLVMID"
              className="form-control"
            />
            <label>Total number of turns in thinned discs
            </label>
            <input
              type="text"
              onChange={this.onInputChangeNumber}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              value={this.state.DLVMIDTN}
              name="DLVMID"
              className="form-control"
            />
            <button>Submit</button>
          </form>
        }
        {this.state.discLVThinnedDone === true &&
          <form onSubmit={this.onSubmit}>
            <p>Choose no. of parallel conductors for LV disc</p>
            <p>No of // cond. | Thickness | Width | % Eddy | B1</p>
            <p>{this.state.LTND} | {this.state.LTDEP} | {this.state.LTWD} | {this.state.DLVEDDY} | {this.state.B1}</p>
            <label>Your choice for no. of // LV conductors
            </label>
            <input
              type="text"
              onChange={this.onInputChangeNumber}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
              value={this.state.LTND}
              name="LTND"
              className="form-control"
            />
            <button>Submit</button>
          </form>
        }
      </div>
    );
  }
}



