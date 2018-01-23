import roundFactor from './round_factor';
import roundFloat from './round_float';

export const evalDiscHV1 = (data) => {

  console.log('from evalDiscHV1');

  let {
    DHVTOT
    ,DHVTAP
    ,DHVNOR
    ,hv_leg
    ,turns_lt
    ,lv_leg
    ,NHTAP
    ,tapping_pc_max
    ,tapping_pc_min
    ,tap_step_size
    ,DHVTAPN

  } = data;
  // TODO test what happens when properties are added to a read-only object
  //TODO add DHV* to saved design object -- localStorage
  // Also NHTAP - 0
  
  DHVTOT = DHVTAP + DHVNOR;

  let X1 = hv_leg * turns_lt / lv_leg; 

  NHTAP = X1 * (tapping_pc_max - tapping_pc_min) / 100;

  if (tapping_pc_max > 0) {
    X1 = X1 * (1 + tapping_pc_max/100);
  }

  let X3 = 0;
  let X2;
  let NOTSTEP;

  if (tapping_pc_max - tapping_pc_min > 0) {

    X2 = hv_leg / lv_leg * turns_lt * tap_step_size / 100;
    NOTSTEP = Math.floor((tapping_pc_max - tapping_pc_min)
      / tap_step_size + 0.1);
    X3 = X2 * NOTSTEP;
  }

  let X11, X12, X13, X14, X21, X22, X23, X24, X31, X32, X33, X34;

  if (DHVTAP <= 0 || DHVNOR <= 0) {
    if (tapping_pc_max - tapping_pc_min > 0) {
      switch (true) {
        case tap_step_size > 4 :
          DHVTAP = NOTSTEP * 4;
          DHVTAPN = X2 / 4;
          break;
        case tap_step_size > 2 && tap_step_size <= 4 :
          DHVTAP = NOTSTEP * 2;
          DHVTAPN = X2 / 2;
          break;
        case tap_step_size > 0 && tap_step_size <= 2 :
          DHVTAP = NOTSTEP;
          DHVTAPN = X2;
          break;
      }
    } else {
      DHVTAP = 0;
    }

    X11 = 60 - DHVTAP;
    X12 = 64 - DHVTAP;
    X13 = 68 - DHVTAP;
    X14 = 72 - DHVTAP;
    X21 = (X1 - X3) / X11;
    X22 = (X1 - X3) / X12;
    X23 = (X1 - X3) / X13;
    X24 = (X1 - X3) / X14;
    X31 = X21 - Math.floor(X21);

    if (X31 < 0.001) {
      X31 = 0.9;
    }
    X32 = X22 - Math.floor(X22);
    if (X32 < 0.001) {
      X31 = 1;
    }
    X33 = X23 - Math.floor(X23);
    if (X33 < 0.001) {
      X31 = 1;
    }
    X34 = X24 - Math.floor(X24);
    if (X34 < 0.001) {
      X31 = 0.9;
    }
    if ((X31 > X32) && (X31 > X33)
      && (X31 > X34)) {

      DHVTOT = 60;

    } else {
      if ((X32 > X33) && (X32 > X34)) {
        DHVTOT = 64;
      } else {
        if (X33 > X34) {
          DHVTOT = 68;
        } else {
          DHVTOT = 72;
        }
      }
    }
  }


  return {
    ...data
    ,DHVTOT
    ,DHVTAP
    ,DHVNOR
    ,hv_leg
    ,turns_lt
    ,lv_leg
    ,NHTAP
    ,tapping_pc_max
    ,tapping_pc_min
    ,tap_step_size
    ,DHVTAPN
    ,X1
    ,X2
    ,X3
    ,X11
    ,X12
    ,X13
    ,X14
    ,X21
    ,X22
    ,X23
    ,X24
    ,X31
    ,X32
    ,X33
    ,X34
  };
};
// to display HV Discs after eval if 

export const evalDiscHV2 = (data) => {

  let {
    DHVNOR
    ,DHVTOT
    ,DHVTAP
    ,DHVTAPN
    ,TOTTAPN
    ,turns_ht
    ,DHVNORN
    ,HTWH
    ,DHVBRINS
    ,DHVINS
    ,covering_ht
    ,DHVCOND
    ,ht_area
    
  } = data;

  DHVNOR = DHVTOT - DHVTAP;

  let X21 = DHVTAPN * DHVTAP;

  let X22 = Math.floor(X21);

  if (X21 - X22 > 0.01) {
    X21 = X22 + 1;
  }

  TOTTAPN = X21;

  // Integer - Turns per tap disc
  let X23 = Math.floor(DHVTAPN);

  if (DHVTAPN - X23 > 0.01) {
    X23 = X23 + 1;
  }

  // Integer - Turns per Normal Disc
  let X25 = (turns_ht - TOTTAPN) / (DHVTOT - DHVTAP); 
  DHVNORN = X25;

  if (X25 - Math.floor(X25) > 0.001) {
    X25 = Math.floor(X25) + 1;
  }

  let X26 = Math.floor(DHVTAPN);

  if (DHVTAPN - X26 > 0.01) {
    X26 = X26 + 1;
  }

  let X31 = (HTWH - DHVBRINS * 2.8 / 3 + 2 * DHVINS * 2.8 / 3 + 1) / (DHVTOT - (1 - X23 / X25) * DHVTAP); 

  X31 = X31 - DHVINS * 2.8 / 3;

  let X32 = X31 - covering_ht;

  DHVCOND = 1;

  let X33 = (ht_area + 0.22) / X32; 

  if (X33 > 1.6 && X33 <= 2.4) {
    X33 = X33 + 0.13 / X32;
  } else {
    if (X33 > 2.4 && X33 <= 3.55) {
      X33 = X33 + 0.33 / X32;
    } else {
      if (X33 > 3.55) {
        X33 = X33 + 0.64 / X32;
      }
    }
  }

  // is X33 greater than 3
  // true / false
  let X33G3, X34;

  if (X33 > 3) {
    X34 = Math.floor(X33 / 3) + 1;
    X33G3 = true;
  } else {
    X33G3 = false;
  }



  console.log('going to print outout from evaldischv2');

  return {
    ...data
    ,DHVNOR
    ,DHVTOT
    ,DHVTAP
    ,DHVTAPN
    ,TOTTAPN
    ,turns_ht
    ,DHVNORN
    ,HTWH
    ,DHVBRINS
    ,DHVINS
    ,covering_ht
    ,DHVCOND
    ,ht_area
    ,X23
    ,X25
    ,X33
    ,X33G3
    ,X34
    ,X32
  };
};

export const evalDiscHV2A = (data) => {

  let {
    DHVCOND
    ,X34
    ,X33
    ,X32
    ,ht_area
  } = data;

  DHVCOND = X34;
  X33 = (ht_area / DHVCOND + 0.22) / X32;

  if (X33 > 1.6 && X33 <= 2.4) {
    X33 = X33 + 0.13 / X32;
  } else {
    if (X33 > 2.4 && X33 <= 3.55) {
      X33 = X33 + 0.33 / X32;
    } else {
      if (X33 > 3.55) {
        X33 = X33 + 0.64 / X32;
      }
    }
  }

  return {
    ...data
    ,DHVCOND
    ,X34
    ,X33
    ,X32
    ,ht_area
  };
};


export const evalDiscHV3 = (data) => {

  let {
    HTWH
    ,X32
    ,X33
    ,X23
    ,X25
    ,covering_ht
    ,DHVNOR
    ,DHVTAP
    ,DHVTAPN
    ,DHVTAPCTH
    ,DHVTAPCWD
    ,DHVINS
    ,DHVBRINS
    ,DHVTOT
    ,ht_area
    ,DHVNORCWD
    ,DHVNORCTH
    ,DHVNORN
    ,DHVCOND
    ,winding_conductor_ht
    ,DHVEDDY
    ,TAPEDDY
    ,LTGAP
    ,frequency
    ,B2

  } = data;

  let X35 = 0;
  let X36, X37, X38, X42, X43, X46;

  while (Math.abs(X35 - HTWH) >= 0.4) {
    X36 = X32 + covering_ht;
    X37 = X33 + covering_ht;

    if (X23 > 0) { // if tappings
      X38 = X37 * X25 / X23;
      X43 = X38 - covering_ht;
      X42 = X32 * X33 / X43;
      X46 = X42 + covering_ht;
    } else {
      X46 = 0;
    }

    X35 = DHVNOR * X36 
      + DHVTAP * X46 
      + DHVINS * 2.8 / 3 * (DHVTOT - 2) 
      + DHVBRINS * 2.8 / 3 - 1;

    X32 = X32 + (HTWH - X35) / DHVTOT;

    X33 = (ht_area / DHVCOND + 0.22) / X32; 

    if (X33 > 1.6 && X33 <= 2.4) {
      X33 = X33 + 0.13 / X32;
    } else {
      if (X33 > 2.4 && X33 <= 3.55) {
        X33 = X33 + 0.33 / X32;
      } else {
        if (X33 > 3.55) {
          X33 = X33 + 0.64 / X32;
        }
      }
    }
  }

  DHVNORCWD = roundFloat(Math.floor(X32 * 100 + 0.5) / 100, 2);
  DHVNORCTH = roundFloat(Math.floor(X33 * 100 + 0.5) / 100, 2);

  // If TAPP > 0
  if (X23 > 0) {
    DHVTAPCWD = roundFloat(Math.floor(X42 * 100  + 0.5) / 100, 2);
    DHVTAPCTH = roundFloat(Math.floor(X43 * 100  + 0.5) / 100, 2);
  } else {
    DHVTAPCWD = 0;
    DHVTAPCTH = 0;
  }

  const X = DHVNORCWD * DHVNORCTH - roundFactor(DHVNORCTH);

  const XXA = X * DHVCOND;
  
  B2 = (DHVNORCTH + covering_ht) * X25 * DHVCOND * 1.01;
  B2 = roundFloat(Math.floor(2 * B2 + 0.35) / 2, 1);

  let BETA = (DHVNORCWD * DHVNOR / 2 * 0.95 
    / (DHVNOR * (DHVNORCWD + 0.5 + DHVINS * 2.8 / 3) / 2)); 

  let XF = 3.92;

  if (winding_conductor_ht == 'aluminium') {
    XF = 3.92 * 2100 * 2100 / 3423 / 3423;
  }

  DHVEDDY = roundFloat((XF * (DHVNORCTH ** 4) * (DHVNORN ** 2)
    * (DHVCOND ** 2) * (frequency ** 2) * (BETA ** 2) / (10 ** 7)), 2); 

  if (X23 > 0) {
    BETA = (DHVTAPCWD * DHVTAP / 2 * 0.96 
    / (DHVTAP * (DHVTAPCWD + 0.5 + DHVINS * 2.8 / 3) / 2)); 
    XF = 3.92;
    if (winding_conductor_ht == 'aluminium') {
      XF = 3.92 * 2100 * 2100 / 3423 / 3423;
    }

    TAPEDDY = (XF * (DHVTAPCTH ** 4) * (DHVTAPN ** 2)
      * (DHVCOND ** 2) * (frequency ** 2) * (BETA ** 2) / (10 ** 7)); 
    
    LTGAP = DHVBRINS * 2.8 / 3 + DHVINS * (DHVTAP / 2 - 1)
      * 2.8 / 3 + X46 * (DHVTAP / 2);
  } else {
    TAPEDDY = 0;
    LTGAP = 0;
  }

  return {
    ...data
    ,XXA
    ,HTWH
    ,X32
    ,X33
    ,X23
    ,X25
    ,covering_ht
    ,DHVNOR
    ,DHVTAP
    ,DHVTAPN
    ,DHVTAPCTH
    ,DHVTAPCWD
    ,DHVINS
    ,DHVBRINS
    ,DHVTOT
    ,ht_area
    ,DHVNORCWD
    ,DHVNORCTH
    ,DHVCOND
    ,winding_conductor_ht
    ,DHVEDDY
    ,TAPEDDY
    ,LTGAP
    ,frequency
    ,B2
  };

};
