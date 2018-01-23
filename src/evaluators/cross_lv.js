
import roundFloat from './round_float';

const evalCrossLV = (data) => {
    let {
      WHLT
      ,WH
      ,lt_coil_count // NLCOIL
      ,CLRLTY
      ,TCLRLTC
      ,TPLCrossLV // TPL
      ,LDIAC
      ,turns_lt // TURNLT
      ,NLTLYR
      ,TLASTLY
      ,WHLTE
      ,LTKRAFT
      ,B1
      ,LTDUCT
      ,CAXLTOL
    } = data;

    WHLT = roundFloat(WH  - 2 * CLRLTY, 2);
    let A = (WHLT - TCLRLTC) / lt_coil_count;
    A = roundFloat(Math.floor(A * 4) / 4, 2);
    if (A > 100) {
      TPLCrossLV = (A / CAXLTOL - 0.5) / LDIAC - 1;
    } else {
      TPLCrossLV = (A / CAXLTOL - 0.75) / LDIAC - 1;
    }
    if (LDIAC < 1) {
      TPLCrossLV = TPLCrossLV - 1;
      if (LDIAC < 0.5) {
        TPLCrossLV = TPLCrossLV - 1;
      }
    }
    const LTCOILT = Math.floor(turns_lt / lt_coil_count + 0.5);
    NLTLYR = Math.floor(LTCOILT / TPLCrossLV);
    TLASTLY = LTCOILT - NLTLYR * TPLCrossLV;
    if (TLASTLY > 0) {
      NLTLYR = NLTLYR + 1;
    } else {
      TLASTLY = TPLCrossLV;
    }

    WHLTE = WHLT - LDIAC;
    let X = roundFloat(LTKRAFT / 40, 2);
    if (LDIAC > 1.5) {
      X = roundFloat(0.5 * LTKRAFT / 40, 2);
    }
    if (LDIAC > 2.2) {
      X = roundFloat((LTKRAFT - 4) / 40, 2);
    }
    B1 = NLTLYR * (LDIAC + X) + LTDUCT;
    X = roundFloat(Math.floor(B1 * 4) / 4, 2);
    if (B1 - X > 0) {
      if (B1 - X > 0.05) {
        B1 = X + 0.25;
      }
    }

    return {
      WHLT
      ,WH
      ,lt_coil_count 
      ,CLRLTY
      ,TCLRLTC
      ,TPLCrossLV 
      ,LDIAC
      ,turns_lt 
      ,NLTLYR
      ,TLASTLY
      ,WHLTE
      ,LTKRAFT
      ,B1
      ,LTDUCT
      ,axial_length_cross_lv: A
    };

};

export default evalCrossLV;