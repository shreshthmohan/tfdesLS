import roundFloat from './round_float';

export const evalDiscLVTypes = (data) => {

  let {
    DLVTOT
    ,X2
    ,turns_lt // TURNLT
    ,DLVNORN
    ,radial_spacer_count // RADSPNO
    ,DLVMID
    ,DLVMIDN

  } = data;

  DLVTOT = Math.floor(X2 / 2) * 2;
  const X4 = roundFloat(turns_lt / DLVTOT, 4);
  DLVNORN = X4;
  const X5 = Math.floor(X4);
  const X6 = DLVTOT * (X5 + 1 - 1 / radial_spacer_count);
  let X7 = X6 - turns_lt;
  DLVNORN = X5 + 1 - 1 / radial_spacer_count;

  if (X7 <= -1 / radial_spacer_count) {
    DLVTOT = Math.floor(X4 + 0.2);
    X7 = DLVNORN * DLVTOT - turns_lt;
    if (X7 == 0) {
      DLVMID = 0;
    } else {
      if (X7 < DLVNORN / 2) {
        DLVMID = 2;
        DLVMIDN = roundFloat(DLVNORN - X7 / 2, 4);
      } else {
        DLVMID = 4;
        DLVMIDN = roundFloat(DLVNORN - X7 / 4, 4);
      }
    }
  }
  if(Math.abs(X7) < 1 / radial_spacer_count) {
    DLVMID = 0;
  }
  if (X7 >= 1 / radial_spacer_count) {
    DLVNORN = (turns_lt + X7) / DLVTOT;
    if (X7 <= DLVNORN) {
      DLVMID = 2;
      DLVMIDN = roundFloat(DLVNORN - X7 / 2, 4);
    } else {
      DLVMID = 4;
      DLVMIDN = roundFloat(DLVNORN - X7 / 4, 4);
    }
  }

  let DLVNOR = DLVTOT - DLVMID;
  let DLVMIDTN = DLVMID * DLVMIDN;
  DLVNORN = (turns_lt - DLVMIDTN) / DLVNOR;

  return {
    DLVTOT
    ,X2
    ,turns_lt
    ,DLVNORN
    ,radial_spacer_count
    ,DLVMID
    ,DLVMIDN
    ,DLVMIDTN
    ,DLVNOR
  };
};

export const evalDiscLVThinned = (data) => {
  let {
    DLVNOR
    ,DLVTOT
    ,DLVMID
    ,DLVNORN
    ,turns_lt // TURNLT
    ,DLVMIDTN
    ,DLVMIDN
    ,LTWD
    ,WHLT
    ,LTGAP
    ,DLVINS
    ,covering_lt
    ,LTDEP
    ,lt_area
    ,LTND
    ,DLVEDDY
    ,B1

  } = data;
  DLVNOR = DLVTOT - DLVMID;
  DLVNORN = roundFloat((TURNLT - DLVMIDTN) / DLVNOR, 4);
  DLVMIDN = roundFloat(DLVMIDTN / DLVMID, 4);

  // CALCULATION OF CONDUCTOR WIDTH
  const A = DLVTOT - (DLVNORN * DLVMID - DLVMIDTN) / DLVNORN;
  LTWD = (WHLT - LTGAP + DLVINS ) / A - DLVINS * 2.8 / 3.0 - COVLT;
  LTWD = roundFloat(Math.floor(20 * LTWD) / 20, 2);
  //  NUMBER OF PARALLEL CONDUNCTORS
  LTDEP = LTAREA / LTWD;
  LTND = 1;
  let X10, X11;

  if (LTDEP > 4) {
    X10 = LTDEP / 3;
    X11= X10 - Math.floor(X10);
    if ( X11 < 0.05) {
      LTND = Math.floor(X10);
      LTDEP = LTDEP / LTND;
    } else {
      LTND = Math.floor(X10) + 1;
      LTDEP = LTDEP / LTND;
    }
    switch (true) {
      case LTDEP<= 1.6 :
        LTDEP = LTDEP + 0.22 / LTWD;
        LTDEP = roundFloat(Math.floor(100 * LTDEP + 0.5) / 100, 2);
        break;

      case LTDEP > 1.6 && LTDEP <= 2.4 :
        LTDEP = LTDEP + 0.36 / LTWD;
        LTDEP = roundFloat(Math.floor(100 * LTDEP + 0.5) / 100, 2);
        break;

      case LTDEP > 2.4 && LTDEP <= 3.55 :
        LTDEP = LTDEP + 0.55 / LTWD;
        LTDEP = roundFloat(Math.floor(100 * LTDEP + 0.5) / 100, 2);
        break;

      default:
        LTDEP = LTDEP + 0.86 / LTWD;
        LTDEP = roundFloat(Math.floor(100 * LTDEP + 0.5) / 100, 2);
    }
  }

  // SELECT NUMBER OF parallel COND.
  // CAL. EDDY CURRENT LOSS
  let XF = 3.92;
  let X1;
  if (winding_conductor_ht === 'aluminium') {
    X1 = 2100/3423;
    XF = 3.92 * X1 * X1;
  }
  const BETA = LTWD * DLVTOT * 0.95 / WHLT;
  DLVEDDY = XF * (LTDEP ** 4) * (DLVNORN ** 2) * (LTND ** 2) * (BETA ** 2);
  DLVEDDY = roundFloat(DLVEDDY * (FREQ ** 2) / 10000000, 2);
  let LTNDOLD = LTND;
  X1 = Math.floor(DLVNORN);
  if (X1 < DLVNORN) {
    X1 = X1 + 1;
  }
  B1 = 1.01 * X1 * LTND * (LTDEP + covering_lt);
  B1 = roundFloat(Math.floor(2 * (B1 + 0.35)) / 2, 1);

  return {
    DLVNOR
    ,DLVTOT
    ,DLVMID
    ,DLVNORN
    ,turns_lt
    ,DLVMIDTN
    ,DLVMIDN
    ,LTWD
    ,WHLT
    ,LTGAP
    ,DLVINS
    ,covering_lt
    ,LTDEP
    ,lt_area
    ,LTND
    ,LTNDOLD
    ,DLVEDDY
    ,B1
  };
};
