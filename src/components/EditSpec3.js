
import React from 'react';
import { connect } from 'react-redux';
import SpecForm3 from './SpecForm3';
import { editSpecAfterSave } from '../actions/spec';

const EditSpec3 = (props) => {
    return (
        <div>
            <h1>Editing Specifications - Part 3</h1>
            <SpecForm3
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

export default connect(mapStateToProps)(EditSpec3);
