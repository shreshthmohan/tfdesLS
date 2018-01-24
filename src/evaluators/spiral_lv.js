import roundFactor from './round_factor';
import roundFloat from './round_float';

export const evalSpiral2 = (data) => {
  let {
    LTGAPBOOL
    ,winding_conductor_ht
    ,frequency
    ,ALSPC3
    ,CUSPC3
    ,turns_lt
    ,NLTLYR
    ,lt_coil_count
    ,lt_coil_clearance
    ,LEND
    ,LEND1
    ,LEND2
    ,LEND3
    ,lt_area
    ,lt_transpose
    ,kva
    ,LTGAP
    ,LTGAPCR
    ,covering_lt
    ,HTGAP
    ,rod_size
    ,LTKRAFT
    ,LTDUCT
    ,B1
    ,WHLTE
    ,WHLT
    ,LTWD
    ,LTND
    ,LTNW
    ,LTDEP
    ,DLVEDDY
    ,MAXDEPAL
    ,MAXDEPCU
    ,MAXWDAL
    ,MAXWDCU
  } = data;

  
  // LTAREA = lt_area

  let C3,C5,C6;

  if (LTGAPBOOL === false) {
    LTGAP = 0;
    LTGAPCR = 0;
  }

  if (winding_conductor_ht == 'aluminium') {
    C3 = ALSPC3;
    C5 = MAXDEPAL;
    C6 = MAXWDAL;
  } else {
    C3 = CUSPC3;
    C5 = MAXDEPCU;
    C6 = MAXWDCU;
  }
  const TPERLYR = turns_lt / NLTLYR / lt_coil_count;

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

  // lt_transpose = TRANSP

  const WHXX = ((WHLT - lt_coil_clearance) / 2 - 2 * LEND) * C3;
  let ND = 1;
  let NW = 1;
  let XXX = 1;
  let DEP = C5 - 1;
  let NWO = 0;
  let WDT = 0;
  let X = 0;
  let XX = 0;
  let I;
  let WD;
  let WDI;
  
  while (XXX == 1 || NWO != NW) {
    console.log('while executed');
    NWO = NW;
    if (DEP > C5) {
      if (lt_transpose === true) {
        if (kva < 200) {
          WDT = (WHXX - 0.5) / (TPERLYR + 1 + 1 / NW);
        } else {
          WDT = (WHXX -   1) / (TPERLYR + 1 + 1 / NW);
          if (kva > 315) {
            WDT = (WHXX - 2) / (TPERLYR + 1 + 1 / NW);
          }
        }
        if (LTGAPBOOL === true) {
          X = lt_coil_clearance + WDT + LEND * 2.0; 
          X = LTGAP - X;
          LTGAPCR = X;
          if (X > 0) {
            X = WDT - X / (TPERLYR + 1 + 1 / NW);
            XX = (WDT - X) / NW;
            WDT = X - (WDT - X) / NW / (TPERLYR + 1 + 1 / NW);
            LTGAPCR = LTGAPCR + XX;
          } else {
            HTGAP = -X;
          }
        }
      } else {
        WDT = WHXX / (TPERLYR + 1);
        if (LTGAPBOOL === true) {
          X = lt_coil_clearance + WDT + LEND * 2;
          X = LTGAP - X; 
          LTGAPCR = X;
          if (X > 0) {
            X = WDT - X / (TPERLYR + 1);
            XX = (WDT - X) / NW;
            WDT = X - (WDT - X) / NW / (TPERLYR + 1);
            LTGAPCR = LTGAPCR + XX;
          } else {
            HTGAP = -X;
          }
        }
      }
      XXX = 0;
    } else {
      WDT = WHXX / (TPERLYR + 1);
      if (LTGAPBOOL === true) {
        X = lt_coil_clearance + WDT + LEND * 2;
        X = LTGAP - X;
        LTGAPCR = X;
        if (X > 0) {
          X = WDT - X / (TPERLYR + 1);
          XX = (WDT - X) / NW;
          WDT = X - (WDT - X) / NW / (TPERLYR + 1);
          LTGAPCR = LTGAPCR + XX;
        } else {
          HTGAP = -X;
        }
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

  // RODSIZE = rod_size
  I = 1;
  while (DEP > C5) {
    DEP = 1 * lt_area / WD / NW / I;
    ND = I;
    I = I + 1;
  }

  while ((WD + DEP) * 0.6 > rod_size) {
    if (WD * NW / (NW + 1) > 8) {
      if (ND > 1 && lt_transpose === true) {
        X = 1 * (WDI - WDI * NW / (NW + 1)) / ((TPERLYR + 1) * NW + 1);
        WDI = (WDI * ND + X) / (ND + 1);
        WD = WDI - covering_lt;
        NW = NW + 1;
      } else {
        WDI = (WDI * ND) / (ND + 1);
        WD = WDI - covering_lt;
        NW = NW + 1;
      }

    }
    if ((WD + DEP) * 0.6 > rod_size) {
      if (DEP * ND / (ND + 1) > 1.55) {
        DEP = DEP * ND / (ND + 1);
        ND = ND + 1;
      }
    }
  }
  

  XXX = DEP / 0.99;
  XXX = roundFactor(XXX);
  DEP = (DEP * WD + XXX) / WD;
  DEP = roundFloat(Math.floor(DEP * 100 + 1) / 100, 2);
  const DEP1 = DEP + covering_lt;
  X = roundFloat(LTKRAFT / 40, 3);
  let Y;
  if (NLTLYR > 1) {
    if (NLTLYR == 2 && LTDUCT != 0) {
      B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT;
    } else {
      if (LTDUCT > 0) {
        Y = Math.floor(LTDUCT / 3);
        if (Y > NLTLYR) {
          Y = NLTLYR;
        }
        B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT + X * (NLTLYR - Y);
      } else {
        B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT + X * (NLTLYR - 1);
      }
    }
  } else {
    B1 = (DEP1 + 0.05) * ND;
  }

  B1 = roundFloat(Math.floor(B1 * 4 + 1) / 4, 2);
  WHLTE = WHLT - LEND - WDI * NW;
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
  const BETA = LTWD * LTNW * 2 * TPERLYR * 0.95 / WHLTE;
  DLVEDDY = XF * (LTDEP ** 4) * (NLTLYR ** 2) * (LTND ** 2) * (BETA ** 2);
  DLVEDDY = roundFloat(DLVEDDY * (frequency ** 2) / (10 ** 7), 2);

  return {
    LTGAPBOOL
    ,winding_conductor_ht
    ,ALSPC3
    ,CUSPC3
    ,turns_lt
    ,NLTLYR
    ,lt_coil_count
    ,LEND
    ,lt_area
    ,lt_transpose
    ,kva
    ,LTGAP
    ,LTGAPCR
    ,covering_lt
    ,HTGAP
    ,rod_size
    ,LTKRAFT
    ,LTDUCT
    ,B1
    ,WHLTE
    ,WHLT
    ,LTWD
    ,LTND
    ,LTNW
    ,LTDEP
    ,DLVEDDY
  };
};

export const evalSpiral1 = (data) => {
  let {
    LTGAPBOOL
    ,winding_conductor_ht
    ,frequency
    ,ALSPC3
    ,CUSPC3
    ,turns_lt
    ,NLTLYR
    ,lt_coil_count
    ,lt_coil_clearance
    ,LEND
    ,LEND1
    ,LEND2
    ,LEND3
    ,lt_area
    ,lt_transpose
    ,kva
    ,LTGAP
    ,LTGAPCR
    ,covering_lt
    ,HTGAP
    ,rod_size
    ,LTKRAFT
    ,LTDUCT
    ,B1
    ,WHLTE
    ,WHLT
    ,LTWD
    ,LTND
    ,LTNW
    ,LTDEP
    ,DLVEDDY
    ,MAXDEPAL
    ,MAXDEPCU
    ,MAXWDAL
    ,MAXWDCU
  } = data;


  let C3,C5,C6;

  if (LTGAPBOOL === false) {
    LTGAP = 0;
    LTGAPCR = 0;
  }
  if (winding_conductor_ht == 'aluminium') {
    C3 = ALSPC3;
    C5 = MAXDEPAL;
    C6 = MAXWDAL;
  } else {
    C3 = CUSPC3;
    C5 = MAXDEPCU;
    C6 = MAXWDCU;
  }
  const TPERLYR = turns_lt / NLTLYR;


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


  console.log('WHLT:', WHLT);
  console.log('LEnd:', LEND);
  console.log('C3:', C3);
  const WHXX = (WHLT - 2 * LEND) * C3;
  let ND = 1;
  let NW = 1;
  let XXX = 1;
  let DEP = roundFloat(C5 - 1, 1);
  let NWO = 0;
  let WDT = 0;
  let X = 0;
  let XX = 0;
  let WDI;
  let I;
  let WD;


  console.log('WHXX:', WHXX);
  console.log('DEP:', DEP);

  while (XXX == 1 || NWO != NW) {
    NWO = NW;
    //console.log('NW:', NW);
    //console.log('NWO:', NWO);
    //console.log('DEP:', DEP);
    if (DEP > C5) {
      if (lt_transpose) {
        if (kva < 200) {
          WDT = (WHXX - 0.5) / (TPERLYR + 1 + 1 / NW);
        } else {
          WDT = (WHXX -   1) / (TPERLYR + 1 + 1 / NW);
          if (kva > 315) {
            WDT = (WHXX - 2) / (TPERLYR + 1 + 1 / NW);
          }
        }
        if (LTGAPBOOL === true) {
          X = WHXX - (TPERLYR + 1) * WDT;
          X = LTGAP - X;
          LTGAPCR = X;
          if (X > 0) {
            X = WDT - X / (TPERLYR + 1 + 1 / NW);
            XX = (WDT - X) / NW;
            WDT = X - (WDT - X) / NW / (TPERLYR + 1 + 1 / NW);
            LTGAPCR = LTGAPCR + XX;
          }
        }
      } else {
        WDT = WHXX / (TPERLYR + 1);
        if (LTGAPBOOL === true) {
          WDT = (WHXX - LTGAP) / (TPERLYR + 1);  
          LTGAPCR = LTGAP;
        }
      }
      XXX = 0;
    } else {
      WDT = WHXX / (TPERLYR + 1);
      if (LTGAPBOOL === true) {
        WDT = (WHXX - LTGAP) / (TPERLYR + 1);
        LTGAPCR = LTGAP;
      }
    }
    if (LTGAP > 0) {
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
    WD = roundFloat(Math.floor(100 * WD + 0.5) / 100, 2);
    console.log('lt_area:', lt_area);
    console.log('NW:', NW);
    console.log('ND:', ND);
    DEP = lt_area / WD / NW / ND;
    console.log('DEP:', DEP);
    break;
    if (DEP <= C5) {
      XXX = 0;
    }
  }

  // TODO ask, not converging 

  console.log('after while (XXX == 1 || NWO != NW) ');

  I = 1;
  while (DEP > C5) {
    DEP = 1 * lt_area / WD / NW / I;
    ND = I;
    I = I + 1;
  }

  while ((WD + DEP) * 0.6 > rod_size) {
    if (WD * NW / (NW + 1) > 8) {
      if (ND > 1 && lt_transpose === true) {
        X = (WDI - WDI * NW / (NW + 1)) / ((TPERLYR + 1) * NW + 1);
        WDI = (WDI * ND + X) / (ND + 1);
        WD = WDI - covering_lt;
        NW = NW + 1;
      } else {
        WDI = (WDI * ND) / (ND + 1);
        WD = WDI - covering_lt;
        NW = NW + 1;
      }

    }
    if ((WD + DEP) * 0.6 > rod_size) {
      if (DEP * ND / (ND + 1) > 1.55) {
        DEP = DEP * ND / (ND + 1);
        ND = ND + 1;
      }
    }
  } 

  XXX = DEP / 0.99;
  XXX = roundFactor(XXX);
  DEP = (DEP * WD + XXX) / WD;
  DEP = roundFloat(Math.floor(DEP * 100 + 1) / 100, 2);
  const DEP1 = DEP + covering_lt;
  X = roundFloat(LTKRAFT / 40, 3);
  let Y;
  if (NLTLYR > 1) {
    if (NLTLYR == 2 && LTDUCT != 0) {
      B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT;
    } else {
      if (LTDUCT > 0) {
        Y = Math.floor(LTDUCT / 3);
        if (Y > NLTLYR) {
          Y = NLTLYR;
        }
        B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT + X * (NLTLYR - Y);
      } else {
        B1 = (DEP1 + 0.05) * ND * NLTLYR + LTDUCT + X * (NLTLYR - 1);
      }
    }
  } else {
    B1 = (DEP1 + 0.05) * ND;
  }

  B1 = roundFloat(Math.floor(B1 * 4 + 1) / 4, 2);
  WHLTE = WHLT - LEND - WDI * NW;
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
  const BETA = LTWD * LTNW * 2 * TPERLYR * 0.95 / WHLTE;
  DLVEDDY = XF * (LTDEP ** 4) * (NLTLYR ** 2) * (LTND ** 2) * (BETA ** 2);
  DLVEDDY = roundFloat(DLVEDDY * (frequency ** 2) / (10 ** 7), 2);


  return {
    LTGAPBOOL
    ,winding_conductor_ht
    ,ALSPC3
    ,CUSPC3
    ,turns_lt
    ,NLTLYR
    ,lt_coil_count
    ,LEND
    ,lt_area
    ,lt_transpose
    ,kva
    ,LTGAP
    ,LTGAPCR
    ,covering_lt
    ,HTGAP
    ,rod_size
    ,LTKRAFT
    ,LTDUCT
    ,B1
    ,WHLTE
    ,WHLT
    ,LTWD
    ,LTND
    ,LTNW
    ,LTDEP
    ,DLVEDDY
  };

};