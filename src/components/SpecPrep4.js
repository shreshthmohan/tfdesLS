import React from 'react';
import { connect } from 'react-redux';
import SpecForm4 from './SpecForm4';
import { editSpec } from '../actions/spec';
// eval winding params
import evalWindingParams from '../evaluators/winding_init';

const SpecPrep4 = (props) => {
    return (
        <div>
            <h1>Specification - Part 4</h1>
            <SpecForm4
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpec({
                        ...specFromForm,
                        ...(evalWindingParams(specFromForm))
                    }));
                    props.history.push('/spec_prep4a');
                }}
            />
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        spec      : state.loadedDesign
    };
};

export default connect(mapStateToProps)(SpecPrep4);
