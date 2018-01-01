import React from 'react';

export default class InitCoreDesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.specFromStore,
            core_steps_success : false
        };
    }

    componentDidMount() {

        let init_core_results = this.props.evalInitCore(this.state);

        this.setState(() => {
            return init_core_results;
        });
    }

    loopCoreSteps = (event) => {
        event.preventDefault();
        let jx = 0;
        let SPFO = 0;
        let local_state = { ...this.state };
        let flag = true;
        let core_steps_success = false;
        local_state.core_steps_error = '';
        while (flag) {
            const core_dia_results = this.props.evalCoreDia(local_state);
            jx = jx + 1;
            SPFO = local_state.SPF;

            local_state = { ...local_state, ...core_dia_results};

            const core_steps_results = this.props.evalCoreSteps(local_state);

            local_state = { ...local_state, ...core_steps_results };

            if (Math.abs(SPFO - local_state.SPF) < 0.0002) {
                flag = false;
            }

            if (jx > 10) {
                local_state.core_steps_error = 'Not converging; select some other combination of steps';
                flag = false; // exiting while loop here
                // will call loopCoreSteps again when user submits new values
            }
        }

        if (local_state.core_steps_error === '') {
            local_state.core_steps_success = true;
            core_steps_success = true;
        }

        console.log(local_state);

        if (core_steps_success === true) {
            this.setState(() => {
                return {
                    ...local_state,
                    core_steps_success: core_steps_success
                };
            });
        }

    }

    onInputChangeNumber = (event) => {
        const name = event.target.name;
        const value = parseFloat(event.target.value) || '';
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    renderCoreSteps = () => {
        if (this.state.core_steps && this.state.core_steps_success) {
            return () => {
                return this.state.core_steps.map((step) => {
                    return (<p key={step.id}>{step.id} {step.width} {step.x} {step.h} {step.step}</p>);
                });
            };
        } else {
            return () => {
                return <p>Core Steps not calculated yet</p>
            };
        }
    }; 

    onSubmit = (event) => {
        event.preventDefault();
        // how do I know/ensure setState has executed
        // so that I know I am pasing the latest value to redux store?
        // Okay, I know the state has been updated when relevant stuff has showed
        // up on the browser
        // Given that I am able to click on the submit button, it is clear that
        // the latest state is being shown
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <div>
                <span>KVA: {this.state.kva}</span>
                <span>Frquency: {this.state.frequency}</span>
                <span>LVLEG : {this.state.lv_leg}</span>
                <span>Flux Density for Design: {this.state.flux_density_design}</span>
                <span>Turns LT: {this.state.turns_lt}</span>
                <p>Initial Core Design</p>
                <p>Approx Core Dia: {this.state.CDIA}</p>
                <h2>Set/Adjust following core parameters</h2>
                <form onSubmit={this.loopCoreSteps}>
                    <label>Stack Factor
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.STF}
                            name="STF"
                        />
                    </label>
                    <label>Maximum Steps
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.MSTEP}
                            name="MSTEP"
                        />
                    </label>
                    <label>Maximum Stack Width
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.MAXWD}
                            name="MAXWD"
                        />
                    </label>
                    <label>Minimum Stack Width 
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.MINWD}
                            name="MINWD"
                        />
                    </label>
                    <label>Mimimum Change in Stack Width
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.MINWDCH}
                            name="MINWDCH"
                        />
                    </label>
                    <label>Step 1
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.CSTEP1}
                            name="CSTEP1"
                        />
                    </label>
                    <label>Step 2
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.CSTEP2}
                            name="CSTEP2"
                        />
                    </label>
                    <label>Step 3
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.CSTEP3}
                            name="CSTEP3"
                        />
                    </label>
                    <label>Step 4
                        <input
                            type="text"
                            onChange={this.onInputChangeNumber}
                            value={this.state.CSTEP4}
                            name="CSTEP4"
                        />
                    </label>
                    <button>Check data & Submit</button>
                    <p>{this.state.core_steps_error}</p>
                </form>
                {this.renderCoreSteps()()}
                <form onSubmit={this.onSubmit}>
                    {this.state.core_steps_success &&
                        <div>
                            <p>Space Factor: {this.state.SPF}</p>
                            <button>Done!</button>
                        </div>
                    }
                </form>
            </div>
        );

    }
};
