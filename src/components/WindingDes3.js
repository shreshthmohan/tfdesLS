import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
import WindingDesForm3 from './WindingDesForm3';

const WindingDes3 = (props) => {
    return (
        <div>
            <h1 className="text-center tfdes-title">
                Winding Design - Step 3
            </h1>
            <WindingDesForm3
                specFromStore={props.spec}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm))
                    props.history.push('/winding_des3a');
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

export default connect(mapStateToProps)(WindingDes3);