import React from 'react';
import { connect } from 'react-redux';
import SpecForm4A from './SpecForm4A';
import { editSpecBeforeSave } from '../actions/spec';
import evalCostParams from '../evaluators/cost';

const SpecPrep4A = (props) => {
    return (
        <div>
            <h1 className="text-center tsdef-title">Specification - Part 4 - Continued</h1>
            <SpecForm4A
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecBeforeSave({
                        ...specFromForm,
                        ...(evalCostParams(specFromForm))
                    }));
                    props.history.push('/spec_prep5');
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

export default connect(mapStateToProps)(SpecPrep4A);
