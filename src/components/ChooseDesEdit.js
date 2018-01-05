// TODO how to use class based component without having
// to create two files, eg SpecPrep* and SpecForm*
import React from 'react';
import { connect } from 'react-redux';
import ChooseDesForm from './ChooseDesForm';
import { loadSpec } from '../actions/spec';

const ChooseDesEdit = (props) => {
    return (
        <div>
            <ChooseDesForm
                storedDesigns={props.storedDesigns}
                loadedDesign={props.loadedDesign}
                customText='edit'
                onSubmit={(data) => {
                    if (data.toLoad === true) {
                        props.dispatch(loadSpec(data.id));
                    }
                    props.history.push('/pre_edit');
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

export default connect(mapStateToProps)(ChooseDesEdit);

