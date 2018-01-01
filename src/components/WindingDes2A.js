import React from 'react';
import { connect } from 'react-redux';
import WindingDesForm2CrossA from './WindingDesForm2CrossA';
import { editSpecAfterSave } from '../actions/spec';
import evalCrossHT from '../evaluators/cross';

const WindingDes2A = (props) => {
    return (
        <div>
            <h1>Winding Design - Step 2 - Cont: Set clearance for HT Coils</h1>
            <WindingDesForm2CrossA
                specFromStore={props.spec}
                evalCrossHT={evalCrossHT}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm))
                    props.history.push('/winding_des3');
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

export default connect(mapStateToProps)(WindingDes2A);
