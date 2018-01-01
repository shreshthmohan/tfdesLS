import React from 'react';
import { connect } from 'react-redux';
import WindingDesForm2Cross from './WindingDesForm2Cross';
import WindingDesForm2Disc from './WindingDesForm2Disc';
import { editSpecAfterSave } from '../actions/spec';

const WindingDes2 = (props) => {
    return (
        <div>
            <h1>Winding Design - Step 2</h1>
            {props.spec.hv_winding == 'crossover' && 
                <WindingDesForm2Cross
                    specFromStore={props.spec}
                    onSubmit={(specFromForm) => {
                        props.dispatch(editSpecAfterSave(specFromForm));
                        props.history.push('/winding_des2a');
                    }}
                />
            }
            {props.spec.hv_winding == 'disc' &&
                <WindingDesForm2Disc
                    specFromStore={props.spec}
                    onSubmit={(specFromForm) => {
                        if (specFromForm.retryDisc === true) {
                            props.history.push('/winding_des2');
                        } else {
                            props.dispatch(editSpecAfterSave(specFromForm));
                            props.history.push('/');
                        }
                    }}
                />
            }
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        spec: state.loadedDesign
    };
};

export default connect(mapStateToProps)(WindingDes2);
