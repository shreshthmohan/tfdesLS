import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
import WindingDesLVSpiral from './WindingDesLVSpiral';
//import WindingDesLVHelical from './WindingDesLVHelical';
//import WindingDesLVDisc from './WindingDesLVDisc';

const WindingDes3A = (props) => {
  return (
    <div>
      <h1 className="text-center tfdes-title">
        Winding Design - Step 3A
      </h1>
      {props.spec.lv_winding == 'spiral' &&
        <WindingDesLVSpiral
          onSubmit={() => {
            props.history.push('/3b')
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

export default connect(mapStateToProps)(WindingDes3A);

/* 
      {props.spec.lv_winding == 'helical' &&
        <WindingDesLVHelical />
      }
      {props.spec.lv_winding == 'disc' &&
        <WindingDesLVDisc />
      }
      */