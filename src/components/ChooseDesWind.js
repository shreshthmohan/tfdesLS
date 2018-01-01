import React from 'react';
import { connect } from 'react-redux';
import ChooseDesForm from './ChooseDesForm';
import { loadSpec } from '../actions/spec';

const ChooseDesWind = (props) => {
    return (
        <div>
            <ChooseDesForm
                storedDesigns={props.storedDesigns}
                loadedDesign={props.loadedDesign}
                customText='do winding design for'
                onSubmit={(data) => {
                    if (data.toLoad === true) {
                        props.dispatch(loadSpec(data.id));
                    }
                    props.history.push('/winding_des1');
                }}
            />
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return {
        storedDesigns: state.storedDesigns,
        loadedDesign: state.loadedDesign || 'no loaded design'
    };
};

export default connect(mapStateToProps)(ChooseDesWind);

