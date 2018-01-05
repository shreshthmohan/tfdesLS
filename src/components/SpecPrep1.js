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
    return (
        <div>
            <h1 className="text-center tsdef-title">Specification - Part 1</h1>
            <SpecForm1
                onSubmit={(specFromForm) => {
                    props.dispatch(createSpec({
                            ...specFromForm,
                            ...(evalClearances(specFromForm)),
                            ...(evalTankSpecs(specFromForm)),
                            ...(evalCurrentFlux(specFromForm)),
                            id: uuid()
                    }));
                    props.history.push('/spec_prep2');
                }}
            />
        </div>
    );
};

export default connect()(SpecPrep1); 
