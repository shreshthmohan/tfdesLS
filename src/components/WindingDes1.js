import React from 'react';
import { connect } from 'react-redux';
import WindingDesForm1 from './WindingDesForm1';
import { editSpecAfterSave } from '../actions/spec';

const WindingDes1 = (props) => {
    return (
        <div>
            <h1>Winding Design - Step 1</h1>
            <WindingDesForm1
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm));
                    props.history.push('/winding_des2');
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

export default connect(mapStateToProps)(WindingDes1);
