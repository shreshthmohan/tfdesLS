import React from 'react';
import { connect } from 'react-redux';
import ChooseDesForm from './ChooseDesForm';
import { startLoadSpec } from '../actions/spec';

const ChooseDesEdit = (props) => {
    return (
        <div>
            <ChooseDesForm
                storedDesigns={props.storedDesigns}
                loadedDesign={props.loadedDesign}
                customText='edit'
                onSubmit={(data) => {
                    if (data.toLoad === true) {
                        props.dispatch(startLoadSpec(data.id));
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

