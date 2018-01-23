import roundFactor from './round_factor';
import roundFloat from './round_float';

const evalHelicalLV = (data) => {
  let {
    LTGAPBOOL
    ,LTGAP
    ,LTGAPCR
    ,ALSPC3
    ,MAXDEPAL
    ,MAXWDAL
    ,MAXDEPCU
    ,MAXWDCU
    ,winding_conductor_ht
    ,turns_lt
    ,lt_area
    ,LEND
    ,LEND1
    ,LEND2
    ,LEND3
    ,lt_transpose
    ,LTDUCT
    ,covering_lt
    ,LTWD
    ,LTNW
    ,LTND
    ,LTDEP
    ,frequency
    ,WHLT
    ,WHLTE
    ,LTKRAFT
    ,B1
    ,NLTLYR
    ,DLVEDDY
  } = data;

  if (LTGAPBOOL === false) {
    LTGAP = 0;
    LTGAPCR = 0;
  }

  let C3,C5,C6;
  if (winding_conductor_ht == 'aluminium') {
    C3 = ALSPC3;
    C5 = MAXDEPAL;
    C6 = MAXWDAL;
  } else {
    C3 = CUSPC3;
    C5 = MAXDEPCU;
    C6 = MAXWDCU;
  }

  const TPERLYR = turns_lt;

  switch (true) {
    case lt_area < 100 :
      LEND = LEND1;
      break;
    case lt_area >= 100 && lt_area < 400 :
      LEND = LEND2;
      break;
    case lt_area > 400 :
      LEND = LEND3;
      break;
    default:
      break;
  }

  const WHXX = roundFloat((WHLT - 2 * LEND) * 1.005, 2);

  let ND = 1;
  let NW = 1;
  let XXX = 1;
  let DEP = C5 - 1;
  let NWO = 0;
  let X = 0;
  let XX = 0;
  let WDT = 0;
  let I, WDI, WD;

  while (XXX == 1 || NWO != NW) {
    NWO = NW;
    if (DEP > C5) {
      if (lt_transpose === true) {
        if (kva < 200) {
          WDT = (WHXX - 0.5 - (NW * (TPERLYR + 3) - 1) * LTDUCT * 2.8 / 3) / (TPERLYR + 1 + 3 / NW);
          X = 0.5;
        } else {
          WDT = (WHXX -   1 - (NW * (TPERLYR + 3) - 1) * LTDUCT * 2.8 / 3) / (TPERLYR + 1 + 3 / NW);
          X = 1;
          if (kva > 315) {
            WDT = (WHXX -   2 - (NW * (TPERLYR + 3) - 1) * LTDUCT * 2.8 / 3) / (TPERLYR + 1 + 3 / NW);
            X = 2;
          }
        }
        if (LTGAPBOOL === true) {
          X = WDT / NW + X + LTDUCT * NW;
          X = LTGAP - X;
          LTGAPCR = X;
          if (X > 0) {
            X = WDT - X / (TPERLYR + 1 + 3 / NW);
            XX = (WDT - X) / NW;
            WDT = X - (WDT - X) / NW / (TPERLYR + 1 + 3 / NW);
            LTGAPCR = LTGAPCR + XX;
          }
        }
      } else {
        WDT = (WHXX - (NW * TPERLYR - 1) * LTDUCT * 2.8 /3) / (TPERLYR + 1);
        if (LTGAPBOOL === true) {
          WDT = (WHXX - LTGAP - (NW * TPERLYR - 1) * LTDUCT * 2.8 / 3) (TPERLYR + 1); 
          LTGAPCR = LTGAP;
        }
      }
      XXX = 0;
    } else {
      WDT = (WHXX - (NW * TPERLYR - 1) * LTDUCT * 2.8 /3) / (TPERLYR + 1);
      if (LTGAPBOOL === true) {
        WDT = (WHXX - LTGAP - (NW * TPERLYR - 1) * LTDUCT * 2.8 / 3) (TPERLYR + 1); 
        LTGAPCR = LTGAP;
      }
    }
    if (LTGAPCR > 0) {
      LTGAPCR = Math.floor(LTGAPCR);
    }
    WDI = WDT;
    I = 1;
    NW = 1;
    while (WDI > C6) {
      WDI = 1 * WDT / I;
      NW = I;
      I = I + 1;
    }
    WD = WDI - covering_lt;
    WD = Math.floor(100 * WD + 0.5) / 100;
    DEP = lt_area / WD / NW / ND;
    if (DEP <= C5) {
      XXX = 0;
    }
  }
  XXX = DEP / 0.99;
  XXX = roundFactor(XXX);
  DEP = (DEP * WD + XXX) / WD;
  DEP = roundFloat(Math.floor(DEP * 100 + 1) / 100, 2);
  const DEP1 = DEP + covering_lt;
  X = roundFloat(LTKRAFT / 40, 3);
  B1 = (DEP1 + 0.05) * ND;
  B1 = roundFloat(Math.floor(B1 * 4 + 1) / 4, 2);
  WHLTE = WHLT - LEND - WDI * NW - LTDUCT * (NW - 1);
  WHLTE = roundFloat(Math.floor(WHLTE * 100 + 0.5) / 100, 1);
  let XF = 3.92;
  if (winding_conductor_ht === 'alumimium') {
    const X1 = 2100 / 3423;
    XF = XF * X1 * X1;
  }
  LTWD = WD;
  LTNW = NW;
  LTND = ND;
  LTDEP = DEP;
  const BETA = LTWD * LTNW * TPERLYR * 0.95 / WHLTE;
  DLVEDDY = XF * (LTDEP ** 4) * (NLTLYR ** 2) * (LTND ** 2) * (BETA ** 2);
  DLVEDDY = roundFloat(DLVEDDY * (frequency ** 2) / (10 ** 7), 2);
 
  return {
    LTGAPBOOL
    ,LTGAP
    ,LTGAPCR
    ,ALSPC3
    ,MAXDEPAL
    ,MAXWDAL
    ,MAXDEPCU
    ,MAXWDCU
    ,winding_conductor_ht
    ,turns_lt
    ,lt_area
    ,LEND
    ,LEND1
    ,LEND2
    ,LEND3
    ,lt_transpose
    ,LTDUCT
    ,covering_lt
    ,LTWD
    ,LTNW
    ,LTND
    ,LTDEP
    ,frequency
    ,WHLT
    ,LTKRAFT
    ,B1
    ,NLTLYR
    ,DLVEDDY
  };

};

export default evalHelicalLV;