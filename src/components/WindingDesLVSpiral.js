
import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
// TODO import spiral1 & 2
import { evalSpiral2 } from '../evaluators/eval_spiral';
import  WindingDesLVSpiral2  from "./WindingDesLVSpiral2";

const WindingDesLVSpiral = (props) => {
  return (
    <div>
      {props.spec.lt_coil_count == 2 ?
        <WindingDesLVSpiral2
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            const data = evalSpiral2(specFromForm);
            props.dispatch(editSpecAfterSave({...specFromForm, ...data}));
            // history.push
          }}
        />
        :
        <div> Spiral 1</div>
        
      }
    </div>
  );

};

const mapStateToProps = (state, props) => {
  return {
    spec: state.loadedDesign
  };
};

export default connect(mapStateToProps)(WindingDesLVSpiral);
/*
<WindingDesLVSpiral1
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            props.dispatch(editSpecAfterSave(specFromForm));
            props.onSubmit();
          }}
        /> */