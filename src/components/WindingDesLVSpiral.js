
import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
// TODO import spiral1 & 2
import { evalSpiral1, evalSpiral2 } from '../evaluators/spiral_lv';
import  WindingDesLVSpiral2  from "./WindingDesLVSpiral2";
import  WindingDesLVSpiral1  from "./WindingDesLVSpiral1";

const WindingDesLVSpiral = (props) => {
  return (
    <div>
      {props.spec.lt_coil_count == 2 ?
        <WindingDesLVSpiral2
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            const data = evalSpiral2(specFromForm);
            props.dispatch(editSpecAfterSave({...specFromForm, ...data}));
            props.history.push('/winding_des3b');
          }}
        />
        :
        <WindingDesLVSpiral1
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            const data = evalSpiral1(specFromForm);
            props.dispatch(editSpecAfterSave({...specFromForm, ...data}));
            props.history.push('/winding_des3b');
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

export default connect(mapStateToProps)(WindingDesLVSpiral);
/*
<WindingDesLVSpiral1
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            props.dispatch(editSpecAfterSave(specFromForm));
            props.onSubmit();
          }}
        /> */