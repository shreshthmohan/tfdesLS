import React from 'react';
import { connect } from 'react-redux';
import SpecForm3 from './SpecForm3';
import { editSpecBeforeSave } from '../actions/spec';

const SpecPrep3 = (props) => {
    return (
        <div>
            <h1>Specification - Part 3</h1>
            <SpecForm3
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecBeforeSave(specFromForm));
                    props.history.push('/spec_prep4');
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

export default connect(mapStateToProps)(SpecPrep3);
