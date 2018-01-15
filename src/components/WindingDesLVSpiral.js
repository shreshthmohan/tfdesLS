
import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
// TODO import spiral1 & 2
import  WindingDesLVSpiral2  from "./WindingDesLVSpiral2";

const WindingDesLVSpiral = (props) => {
  return (
    <div>
      {props.spec.lt_coil_count == 2 ?
        <WindingDesLVSpiral2
          specFromStore={props.spec}
          onSubmit={(specFromForm) => {
            props.dispatch(editSpecAfterSave(specFromForm));
            props.onSubmit();
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