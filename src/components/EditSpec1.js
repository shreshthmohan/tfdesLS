import React from 'react';
import { connect } from 'react-redux';
import SpecForm1 from './SpecForm1';
import { editSpecAfterSave } from '../actions/spec';


// ASK TODO: do we want to recalculate params upon editing?
// Hint: look at PRG source

const EditSpec1 = (props) => {
    console.log('id of design being passed to edit form 1 ' + props.spec.id);
    return (
        <div>  
            <h1>Editing Specifications - Part 1</h1>
            <SpecForm1
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    console.log('id of design being returned from form ' + specFromForm.id);
                    console.log('kva of design being returned from form ' + specFromForm.kva);
                    props.dispatch(editSpecAfterSave(specFromForm));
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

export default connect(mapStateToProps)(EditSpec1); 
