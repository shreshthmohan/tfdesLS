import React from 'react';
import { connect } from 'react-redux';
import evalLTTurns from '../evaluators/lt_turns';
import evalHTTurns from '../evaluators/ht_turns';
import PreInitCoreDesForm from './PreInitCoreDesForm';
import { editSpecAfterSave } from '../actions/spec';

const PreInitCoreDes = (props) => {
    return (
        <div>
            <h1>Pre Initial Core Design (Will calculate LT and HT Turns)</h1>
            <PreInitCoreDesForm
                specFromStore={props.spec}
                evalLTTurns={evalLTTurns}
                evalHTTurns={evalHTTurns}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm));
                    props.history.push('/init_core_des');
                }}
            />
        </div>
    );
}; 

const mapStateToProps = (state, props) => {
    return {
        spec: state.loadedDesign
    };
};

export default connect(mapStateToProps)(PreInitCoreDes);

// HTTURNS eval is not dependent on eval LTTURNS
// But INICORE is

