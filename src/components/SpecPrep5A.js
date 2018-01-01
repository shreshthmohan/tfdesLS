import React from 'react';
import { connect } from 'react-redux';
import SpecForm5A from './SpecForm5A';
import { saveSpec } from '../actions/spec';

const SpecPrep5A = (props) => {
    return (
        <div>
            <h1>Specification - Part 5A</h1>
            <SpecForm5A 
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(saveSpec(specFromForm));
                    props.history.push('/');
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

export default connect(mapStateToProps)(SpecPrep5A);
