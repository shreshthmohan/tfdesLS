import React from 'react';
import { connect } from 'react-redux';
import SpecForm2 from './SpecForm2';
import { editSpec } from '../actions/spec';

const SpecPrep2 = (props) => {
    return (
        <div>
            <h1>Specification - Part 2</h1>
            <SpecForm2
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpec(specFromForm));
                    props.history.push('/spec_prep3');
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

export default connect(mapStateToProps)(SpecPrep2);
