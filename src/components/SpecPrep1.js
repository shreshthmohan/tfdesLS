import React from 'react';
import { connect } from 'react-redux'
import SpecForm1 from './SpecForm1';
import { createSpec } from '../actions/spec';
import evalClearances from '../evaluators/clearances';
import evalTankSpecs from '../evaluators/tank';
import evalCurrentFlux from '../evaluators/current_flux';
import uuid from 'uuid/v1';

// evalClearances evaluates clearance values based on 
// values in Spec values passed in by user via the form

const SpecPrep1 = (props) => {

    let spec;
    // if store returns an empty object, we pass null
    // else the passed object.
    // because we want to persist input values
    // and use defaults provided in form, if passed
    // object is empty
    if (Object.keys(props.spec).length === 0
        && props.spec.constructor === Object) {
        spec = null;
    } else {
        spec = props.spec;
    }
    return (
        <div>
            <h1 className="text-center tsdef-title">Specification - Part 1</h1>
            <SpecForm1
                specFromStore={spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(createSpec({
                            ...specFromForm,
                            ...(evalClearances(specFromForm)),
                            ...(evalTankSpecs(specFromForm)),
                            ...(evalCurrentFlux(specFromForm)),
                            id: specFromForm.id ? specFromForm.id : uuid()
                    }));
                    props.history.push('/spec_prep2');
                }}
            />
        </div>
    );
};
// Right now using browser back doesn't fully work
// when and if we update our values, they get lost because we're
// setting defaults using evaluators

const mapStateToProps = (state, props) => {
    return {
        spec: state.loadedDesign
    };
};

export default connect(mapStateToProps)(SpecPrep1); 
