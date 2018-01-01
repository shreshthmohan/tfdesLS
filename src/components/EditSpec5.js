import React from 'react';
import { connect } from 'react-redux';
import SpecForm5 from './SpecForm5';
import { editSpecAfterSave } from '../actions/spec';
import updateSpec from '../evaluators/update_spec';
import evalTankClearances from '../evaluators/tank_clearances';

const EditSpec5 = (props) => {
    return (
        <div>
            <h1>Editing Specifications - Part 5</h1>
            <SpecForm5
                specFromStore={props.spec}
                edit='yes'
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave({
                        ...specFromForm,
                        ...updateSpec(specFromForm),
                        ...evalTankClearances(specFromForm)

                    }))
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

export default connect(mapStateToProps)(EditSpec5);
