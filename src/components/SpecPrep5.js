import React from 'react';
import { connect } from 'react-redux';
import SpecForm5 from './SpecForm5';
import { editSpec } from '../actions/spec';
import evalPrepFinal from '../evaluators/prep_final';

const SpecPrep5 = (props) => {
    return (
        <div>
            <h1>Specification - Part 5</h1>
            <SpecForm5
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpec({
                        ...specFromForm,
                        ...(evalPrepFinal(specFromForm))
                    }));
                    props.history.push('/spec_prep5a');
                }}
            />
        </div>
    );
};

// TODO eval

const mapStateToProps = (state, props) => {
    return {
        spec      : state.loadedDesign
    };
};

export default connect(mapStateToProps)(SpecPrep5);
