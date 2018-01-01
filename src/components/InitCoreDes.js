import React from 'react';
import { connect } from 'react-redux';
import InitCoreDesForm from './InitCoreDesForm';
import { editSpecAfterSave } from '../actions/spec';
import evalCoreSteps from '../evaluators/core_steps';
import evalInitCore from '../evaluators/init_core';
import evalCoreDia from '../evaluators/core_dia';

const InitCoreDes = (props) => {
    return (
        <div>
            <h1>Initial Core Design</h1>
            <InitCoreDesForm
                specFromStore = {props.spec}
                evalCoreSteps = {evalCoreSteps}
                evalInitCore = {evalInitCore}
                evalCoreDia= {evalCoreDia}
                onSubmit={(specFromForm) => {
                    props.dispatch(editSpecAfterSave(specFromForm));
                    props.history.push('/');
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

export default connect(mapStateToProps)(InitCoreDes);
