import React from 'react';
import { connect } from 'react-redux';
import SpecForm4A from './SpecForm4A';
import { editSpecAfterSave } from '../actions/spec';

const EditSpec4A = (props) => {
    return (
        <div>
            <h1>Editing Specifications - Part 4A</h1>
            <SpecForm4A
                specFromStore={props.spec}
                edit='yes'
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm))
                    props.history.push('/pre_edit');
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

export default connect(mapStateToProps)(EditSpec4A);
