import React from 'react';
import { connect } from 'react-redux';
import SpecForm4 from './SpecForm4';
import { editSpecAfterSave } from '../actions/spec';

const EditSpec4 = (props) => {
    return (
        <div>
            <h1>Editing Specifications - Part 4</h1>
            <SpecForm4
                specFromStore={props.spec}
                edit='yes'
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm))
                    props.history.push('/edit_spec4a');
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

export default connect(mapStateToProps)(EditSpec4);
