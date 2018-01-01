import React from 'react';
import { evalDiscHV1, evalDiscHV2, evalDiscHV2A, evalDiscHV3 } from '../evaluators/disc_hv';

export default class WindingDesForm2Disc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            evalDiscHV1Done: false,
            evalDiscHV2Done: false,
            evalDiscHV2ADone: false,
            evalDiscHV3Done: false

        }
    };

    componentDidMount() {
        const discHV1Result = evalDiscHV1(this.state);

        console.log('component did mount');

        this.setState(() => {
            return {
                ...discHV1Result,
                evalDiscHV1Done: true
            }
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
    onSubmitDiscHVParams = (event) => {

        event.preventDefault();

        const discHV2Result = evalDiscHV2(this.state);

        console.log('discHV2 done');

        let discHV3Result = {};
        let evalDiscHV3Done = this.state.evalDiscHV3Done;

        if (discHV2Result.E2_X33HT <= 3) {
            discHV3Result = evalDiscHV3({...this.state, ...discHV2Result});
            evalDiscHV3Done = true;
        }

        this.setState(() => {
            return {
                ...discHV2Result,
                evalDiscHV2Done: true,
                ...discHV3Result,
                evalDiscHV3Done: evalDiscHV3Done
                // TODO HV3Done?
            };
        });
    };

    onSubmitParallelCond = (event) => {

        event.preventDefault();

        const discHV2AResult = evalDiscHV2A(this.state);
        const discHV3Result = evalDiscHV3({...this.state, ...discHV2AResult});

        this.setState(() => {
            return {
                ...discHV2Result,
                evalDiscHV2ADone: true,
                ...discHV3Result,
                evalDiscHV3Done: true
            };
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit({...this.state, retryDisc: false});
    };

    retryDisc = (event) => {
        event.preventDefault();

        this.props.onSubmit({retryDisc: true});
    }; 

    render() {
        return (
            <div>
                {this.state.evalDiscHV1Done &&
                    <div>
                        <table>
                            <tr>
                                <th>HV Discs (Total)</th>
                                <th>Turns/Disc</th>
                            </tr>
                            <tr>
                                <td>60</td>
                                <td>{this.state.X21HT}</td>
                            </tr>
                            <tr>
                                <td>64</td>
                                <td>{this.state.X22HT}</td>
                            </tr>
                            <tr>
                                <td>68</td>
                                <td>{this.state.X23HT}</td>
                            </tr>
                            <tr>
                                <td>72</td>
                                <td>{this.state.X24HT}</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <th>HV Tap Discs</th>
                                <th>Turns/Disc</th>
                            </tr>
                            <tr>
                                <td>{this.state.DHVTAP}</td>
                                <td>{this.state.DHVTAPN}</td>
                            </tr>
                        </table>
                    </div>
                }
                <form onSubmit={this.onSubmitDiscHVParams}>
                    <p>Give Disc HV Parameters</p>
                    <label>Total HV Turns
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.turns_ht}
                            name="turns_ht"
                        />
                    </label>
                    <span> {this.state.X1HT} </span>
                    <label>Total No. of Discs:
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.DHVTOT}
                            name="DHVTOT"
                        />
                    </label>
                    <label>Turns/Disc for Main Discs:
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.DHVNORN}
                            name="DHVNORN"
                        />
                    </label>
                    <label>No. of Tap Discs
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.DHVTAP}
                            name="DHVTAP"
                        />
                    </label>
                    <label>Turns per Tap Disc
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.DHVTAPN}
                            name="DHVTAPN"
                        />
                    </label>
                    <label>Winding Height (shrunk)
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            value={this.state.HTWH}
                            name="HTWH"
                        />
                    </label>
                    <button>Submit</button>
                </form>
                {this.state.evalDiscHV2Done && <p>E2_X33HT: {this.state.E2_X33HT}</p>}
                {(this.state.evalDiscHV2Done && this.state.E2_X33HT > 3) &&
                    <form onSubmit={this.onSubmitParallelCond}>
                        <p>Width of Conductor: {this.state.E2_X34HT} > 3.0</p>
                        <p>Give No of '//' conductors</p>
                        <label>No of '//' conductors
                            <input
                                type="text"
                                onChange={this.onInputChangeNumber}
                                onBlur={this.onBlur}
                                onKeyDown={this.onKeyDown}
                                value={this.state.E2_X34HT}
                                name="E2_X34HT"
                            />
                        </label>
                        <button>Submit</button>
                    </form>
                }
                {this.state.evalDiscHV3Done && 
                    <div>
                        <h2>HV Disc Summary</h2>
                        <p>Total HV Turns: {this.state.turns_ht}</p>
                        <p>
                            Total HV Cross-section: {this.state.XXA} 
                             ({this.state.ht_area})
                        </p>
                        <p>
                            Conductor Size: {this.state.DHVNORCWD} X 
                             {this.state.DHVNORCTH} X {this.state.DHVCOND}
                        </p>
                        <p>B2: {this.state.B2}</p>
                        <p>Winding Height: {this.state.HTWH}</p>
                        {(this.state.E2_X23HT > 0) &&
                            <div>
                                <p>
                                    {this.state.DHVTAPCWD} X
                                    {this.state.DHVTAPCTH} X
                                    {this.state.DHVCOND}
                                </p>
                                <p>Covering: {this.state.covering_ht}</p>
                            </div>
                        }

                        <table>
                            <tr>
                                <th>No of Discs</th>
                                <th>Turns/Disc</th>
                                <th>Remark</th>
                                <th>%Eddy Loss</th>
                            </tr>
                            <tr>
                                <td>{this.state.DHVNOR}</td>
                                <td>{this.state.DHVNORN}</td>
                                <td>Main Discs</td>
                                <td>{this.state.DHVEDDY}</td>
                            </tr>
                            {(this.state.E2_X23HT > 0) &&
                                <tr>
                                    <td>{this.state.DHVTAP}</td>
                                    <td>{this.state.DHVTAPN}</td>
                                    <td>Tap Discs</td>
                                    <td>{this.state.TAPEDDY}</td>
                                </tr>
                            }
                        </table>
                        <p>Total No of Discs: {this.state.DHVTOT}</p>
                        <h3>Is this acceptable HV winding?</h3>
                        <button onClick={this.onSubmit}>Yes</button>
                        <button onClick={this.retryDisc}>No</button>
                    </div>
                }
            </div>
        );
    };

};
