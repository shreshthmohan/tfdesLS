import React from 'react';
import { connect } from 'react-redux';
import SpecForm5A from './SpecForm5A';
import { startSaveSpec } from '../actions/spec';

const SpecPrep5A = (props) => {
    return (
        <div>
            <h1>Specification - Part 5A</h1>
            <SpecForm5A 
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    console.log('about to dispatch');
                    props.dispatch(startSaveSpec(specFromForm)).then(() => {
                        console.log('redirecting to /');
                        props.history.push('/');
                    });
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
