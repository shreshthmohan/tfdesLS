import React from 'react';
import { connect } from 'react-redux';
import ChooseDesForm from './ChooseDesForm';
import { loadSpec } from '../actions/spec';

const ChooseDesIni = (props) => {
    return (
        <div>
            <ChooseDesForm
                storedDesigns={props.storedDesigns}
                loadedDesign={props.loadedDesign}
                customText='do initial core design for'
                onSubmit={(data) => {
                    if (data.toLoad === true) {
                        props.dispatch(loadSpec(data.id));
                    }
                    props.history.push('/pre_init_core_des');
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

export default connect(mapStateToProps)(ChooseDesIni);

