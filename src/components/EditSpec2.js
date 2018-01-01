import React from 'react';
import { connect } from 'react-redux';
import SpecForm2 from './SpecForm2';
import { editSpecAfterSave } from '../actions/spec';

const EditSpec2 = (props) => {
    return (
        <div>
            <h1>Editing Specifications - Part 2</h1>
            <SpecForm2
                specFromStore={props.spec}
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

export default connect(mapStateToProps)(EditSpec2);
