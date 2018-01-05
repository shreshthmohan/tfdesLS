// TODO how to use class based component without having
// to create two files, eg SpecPrep* and SpecForm*
import React from 'react';
import { connect } from 'react-redux';
import ChooseDesForm from './ChooseDesForm';
import { loadSpec } from '../actions/spec';
import getFilteredDesigns from '../selectors/designs';
import DesFilter from './DesFilter';

const ChooseDesEdit = (props) => {
    return (
        <div>
            <DesFilter />
            <ChooseDesForm
                storedDesigns={props.storedDesigns}
                loadedDesign={props.loadedDesign}
                designCount={props.designCount}
                filter={props.filter}
                dispatch={props.dispatch}
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
        storedDesigns: getFilteredDesigns(state.storedDesigns, state.filter),
        designCount: state.storedDesigns.length,
        loadedDesign: state.loadedDesign || 'no loaded design',
        filter: state.filter
    };
};

export default connect(mapStateToProps)(ChooseDesEdit);

