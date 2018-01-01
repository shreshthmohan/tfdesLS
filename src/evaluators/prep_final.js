import evalTankClearances from './tank_clearances';

const evalPrepFinal = (spec) => {

    let params = {};

    params.cost_lt_ht_average = (spec.cost_lt + spec.cost_ht) / 2;

    if (params.cost_lt_ht_average != 0 && spec.cost_crgo != 0) {
        params.cost_factor = spec.cost_crgo / params.cost_lt_ht_average;
    } else {
        if (spec.winding_conductor_ht === 'aluminium') {
            params.cost_factor = 1.2;
        } else {
            params.cost_factor = 0.7;
        }
    }

    // final params 
    //
    params.CAXLTOL = 1.02;

    params.DLVINS = 3;
    params.DHVINS = 3;
    params.DHVBRINS = 18;

    params.DHVNORN = 0;

    params.LDIABM = 0.00;
    params.LDIAB  = 0.00;
    params.LDIAC  = 0.00;
    params.turns_ht = 0;
    params.turns_lt = 0;
    params.NLTLYR = 2;
    params.NHTLYR = 2;

    params.HTWH = 0;

    params.HDIAC = spec.HDIAB + spec.covering_ht;

    switch (true) {
        case spec.nominal_ht_voltage < 12000 :
            if (spec.kva <= 400) {
                params.NHCOIL = 4;
            }
            if (spec.kva > 400 && spec.kva <= 630) {
                params.NHCOIL = 6;
            }
            if (spec.kva > 630) {
                params.NHCOIL = 8;
            }
            break;

        case spec.nominal_ht_voltage >= 12000  && spec.nominal_ht_voltage < 24000 :
            if (spec.kva <= 63) {
                params.NHCOIL = 6;
            }
            if (spec.kva > 63 && spec.kva <= 400) {
                params.NHCOIL = 8;
            }
            if (spec.kva > 400) {
                params.NHCOIL = 10;
            }
            break;
        case spec.nominal_ht_voltage >= 24000  && spec.nominal_ht_voltage <= 36000 :
            if (spec.kva <= 63) {
                params.NHCOIL = 8;
            }
            if (spec.kva > 63 && spec.kva <= 400) {
                params.NHCOIL = 10;
            }
            if (spec.kva > 400) {
                params.NHCOIL = 12;
            }
            break;
        default : 
            params.NHCOIL = 1;
            break;
    }

    params.COILT    = 'a';
    params.ACOIL    = 0;
    params.BCOIL    = 0;
    params.CCOIL    = 0;
    params.DCOIL    = 0;
    params.ECOIL    = 0;
    params.FCOIL    = 0;
    params.ACTURN   = 0;
    params.BCTURN   = 0;
    params.CCTURN   = 0;
    params.DCTURN   = 0;
    params.ECTURN   = 0;
    params.FCTURN   = 0;
    params.ACLYR    = 0;
    params.BCLYR    = 0;
    params.CCLYR    = 0;
    params.DCLYR    = 0;
    params.ECLYR    = 0;
    params.FCLYR    = 0;
    params.ADUC     = 0;
    params.BDUC     = 0;
    params.CDUC     = 0;
    params.DDUC     = 0;
    params.EDUC     = 0;
    params.FDUC     = 0;
    params.ADUCLYR  = 0;
    params.BDUCLYR  = 0;
    params.CDUCLYR  = 0;
    params.DDUCLYR  = 0;
    params.EDUCLYR  = 0;
    params.FDUCLYR  = 0;
    params.NOCTYPE  = 0;
    params.TURNHT   = 0;
    params.LEFTHT   = params.TURNHT;
    params.TCLRHTC  = 0.0;
    params.TCLRLTC  = 0.0;
    params.CLRHTY   = spec.MCLRHTY;
    params.HTLYRINS = 4;
    params.AB2      = 0.00;
    params.ACAXL    = 0.00;

    params.B2       = params.AB2;
    params.CLRLTY   = spec.MCLRLTY;
    params.CLRLTE   = spec.MCLRLTE;
    params.B1       = 0.00;
    params.LTWD     = 0;
    params.LTDEP    = 0;
    params.LTNW     = 1;
    params.LTND     = 1;
    params.WHLTE    = 0.0;
    params.IDLT     = 0.00;
    params.CLRLTHT  = spec.MCLRLTHT;
    params.CLRHTHT  = spec.MCLRHTHT;
    params.ODLT     = 0.00;
    params.IDHT     = 0.00;
    params.ODHT     = 0.00;
    params.CL       = 0.0;
    params.WTLTB    = 0.0;
    params.LTLOSS   = 0;
    params.WTLTC    = 0.0;
    params.WTHTC    = 0.00;
    params.TCULOSS  = spec.fe_loss + spec.cu_loss;
    params.TFELOSS  = spec.fe_loss;
    params.SPFELOSS = 1.21;
    params.PERWT    = 0.000;
    params.HTLOSS   = 0;
    params.WTHTB    = 0.0;
    params.AKR1     = 1.0;
    params.AKQ      = 1.0;
    params.XSC      = 0.0000;
    params.DSTEP    = 1;
    params.EDSTEP   = 0;
    params.STF      = 0; //0.97; ASK
    params.SPF      = 0; //0.9; ASK
    params.MSTEP    = 0;
    params.NSTEP    = 0;
    params.MAXWD    = 0;
    params.MINWD    = 0;
    params.CDIA     = 0.000;
    params.MINWDCH  = 5;
    params.CSTEP1   = 0;
    params.CSTEP2   = 0;
    params.CSTEP3   = 0;
    params.CSTEP4   = 0;
    params.CH       = 0.000;
    params.LAMTYPE  = '1';

    if (spec.kva > 2000) {
        params.LAMTYPE='H';
    }
    if (spec.kva < 10) {
        params.LAMTYPE='P';
    }

    
    params.YOKETYPE     = '1';
    params.COREWT       = 0.00;
    params.GAPTL        = 0;
    params.GAPTWLT      = 0;
    params.GAPTWHT      = 0;
    params.GAPCTOP      = 0;
    params.GAPAIR       = 0;
    params.LNTANK       = 0;
    params.WDTANK       = 0;
    params.HTANK        = 0;
    params.CLMPWT       = 0.00;
    params.CHNWD        = 0;
    params.CHNDE        = 0;
    params.CHNL         = 0;
    params.CHL          = 0;
    params.CHNINSTH     = 0;
    params.CHNINSTH     = 0;
    params.ENDPHTH      = 0;
    params.PHASETH      = 0;
    params.WRAPTH       = 0;
    params.LTHTCYTH     = 0;
    params.SPACERW      = 0;
    params.DTIE         = 0.0;
    params.DSTUD        = 0.0;
    params.NST          = 0;
    params.NTIE         = 0;
    params.FT           = 0;
    params.FOOTINSTH    = 0;
    params.FW           = 0;
    params.NFP          = 2;
    params.FLITCH       = false;
    params.FLITCHWD     = 0.00;
    params.FLITCHTH     = 0.00;

    params.RWT          = 0.0;
    params.EXPWT        = 0.0;
    params.CONWT        = 0.0;
    params.OILH         = 0;
    params.LKPAD        = 0;
    params.POSTAP       = 0;
    params.LTCTR        = 0;
    params.HTCTR        = 0;
    params.NORAD        = 0;
    params.NOSEC        = 0;
    params.MLFIN        = 0;
    params.NOTUBE       = 0;
    params.TOPCR        = 0;
    params.PIPE         = 0;
    params.BOTT         = 0;
    params.RADWD        = ''; // TODO? false
    params.RADHV        = 0;
    params.RADLV        = 0;
    params.RADSD        = 0;
    params.RADSD2       = 0;
    params.RADWT        = 0.0;
    params.RADOIL       = 0.0;
    params.RADRAD       = 250;
    params.RADCORE      = 0;
    params.RADCORR      = 1.0;

    params.DHVTAP=0
    params.DHVTAPN=0
    params.DHVTAPCWD=0.00
    params.DHVTAPCTH=0.00

    params.NHTAP = 0;

    if (spec.kva > 1500) {
        params.FLITCH = true;
    }

    // passing all spec value and evaluated values
    const tank_clr = evalTankClearances({...spec, ...params});

    // combining results from evalTankClearances
    return {...params, ...tank_clr};
};

export default evalPrepFinal;
