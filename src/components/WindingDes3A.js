import React from 'react';
import { connect } from 'react-redux';
import { editSpecAfterSave } from '../actions/spec';
import WindingDesLVSpiral from './WindingDesLVSpiral';
import WindingDesLVCross from './WindingDesLVCross';
import evalCrossLV from '../evaluators/cross_lv';
import evalHelicalLV from '../evaluators/helical_lv'; 
import WindingDesLVHelical from './WindingDesLVHelical';
import { evalDiscLVTypes, evalDiscLVThinned } from '../evaluators/disc_lv';
//import WindingDesLVDisc from './WindingDesLVDisc';
// Cross

const WindingDes3A = (props) => {
  if (props.spec.lv_winding == 'spiral' || props.spec.lv_winding == 'helical') {
    props.spec.WHLTE = 0;
  }
  return (
    <div>
      <h1 className="text-center tfdes-title">
        Winding Design - Step 3A
      </h1>
      {props.spec.lv_winding == 'spiral' &&
        <WindingDesLVSpiral
          onSubmit={() => {
            props.history.push('/winding_des3b'); 

          }}
        />
      }
      {props.spec.lv_winding == 'crossover' &&
        <WindingDesLVCross
          specFromStore={props.spec}
          evalCrossLV={evalCrossLV}
          onSubmit={(specFromForm) => {
            props.dispatch(editSpecAfterSave(specFromForm));
            if(specFromForm.change_cross_lt) {
              props.history.push('/refresh/winding_des3a');
            } else {
              props.history.push('/winding_des3b');
            }
          }}
        />
      }
      {props.spec.lv_winding == 'helical' &&
        <WindingDesLVHelical
          specFromStore={props.spec}
          evalHelicalLV={evalHelicalLV}
          onSubmit={(specFromForm) => {
            const result = evalHelicalLV(specFromForm); 
            props.dispatch(editSpecAfterSave({
              ...specFromForm,
              ...result
            }));
            props.history.push('/winding_des3b');
          }}
        />
      }
      {props.spec.lv_winding == 'disc' &&
        <WindingDesLVDisc
          specFromStore={props.spec}
          evalDiscLVTypes={evalDiscLVTypes}
          evalDiscLVThinned={evalDiscLVThinned}
          onSubmit={(specFromForm) => {
            props.dispatch(editSpecAfterSave(specFromForm));
            props.history.push('winding_lv_disc_final');
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