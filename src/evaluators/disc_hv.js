import roundFactor from './round_factor';

export const evalDiscHV1 = (spec) => {

    const params = {};
    // TODO test what happens when properties are added to a read-only object
    //TODO add DHV* to saved design object -- localStorage
    // Also NHTAP - 0
    
    params.DHVTOT = spec.DHVTAP + spec.DHVNOR;

    params.X1HT = spec.hv_leg * spec.turns_lt / spec.lv_leg; 

    params.NHTAP = params.X1HT * (spec.tapping_pc_max - spec.tapping_pc_min) / 100;

    if (spec.tapping_pc_max > 0) {
        params.X1HT = params.X1HT * (1 + spec.tapping_pc_max/100);
    }

    let X3 = 0;

    let X2 = 0;

    if (spec.tapping_pc_max - spec.tapping_pc_min > 0) {

        X2 = spec.hv_leg / spec.lv_leg * spec.turns_lt * spec.tap_step_size / 100;
        params.NOTSTEP = Math.floor((spec.tapping_pc_max - spec.tapping_pc_min)
            / spec.tap_step_size + 0.1);
        X3 = X2 * params.NOTSTEP;
    }

    params.DHVTAP = spec.DHVTAP || 0;
    params.DHVTAPN = spec.DHVTAPN || 0;

    if (spec.DHVTAP <= 0 || spec.DHVNOR <= 0) {
        if (spec.tapping_pc_max - spec.tapping_pc_min > 0) {
            switch (true) {
                case spec.tap_step_size > 4 :
                    params.DHVTAP = params.NOTSTEP * 4;
                    params.DHVTAPN = X2 / 4;
                    break;
                case spec.tap_step_size > 2 && spec.tap_step_size <= 4 :
                    params.DHVTAP = params.NOTSTEP * 2;
                    params.DHVTAPN = X2 / 2;
                    break;
                case spec.tap_step_size > 0 && spec.tap_step_size <= 2 :
                    params.DHVTAP = params.NOTSTEP;
                    params.DHVTAPN = X2;
                    break;
                default :
                    break;
            }
        } else {
            params.DHVTAP = 0;
            params.DHVTAPN = 0;
        }

        params.X11HT = 60 - params.DHVTAP;
        params.X12HT = 64 - params.DHVTAP;
        params.X13HT = 68 - params.DHVTAP;
        params.X14HT = 72 - params.DHVTAP;
        params.X21HT = (params.X1HT - X3) / params.X11HT;
        params.X22HT = (params.X1HT - X3) / params.X12HT;
        params.X23HT = (params.X1HT - X3) / params.X13HT;
        params.X24HT = (params.X1HT - X3) / params.X14HT;
        params.X31HT = params.X21HT - Math.floor(params.X21HT);

        if (params.X31HT < 0.001) {
            params.X31HT = 0.9;
        }
        params.X32HT = params.X22HT - Math.floor(params.X22HT);
        if (params.X32HT < 0.001) {
            params.X31HT = 1;
        }
        params.X33HT = params.X23HT - Math.floor(params.X23HT);
        if (params.X33HT < 0.001) {
            params.X31HT = 1;
        }
        params.X34HT = params.X24HT - Math.floor(params.X24HT);
        if (params.X34HT < 0.001) {
            params.X31HT = 0.9;
        }
        if ((params.X31HT > params.X32HT) && (params.X31HT > params.X33HT)
            && (params.X31HT > params.X34HT)) {

            params.DHVTOT = 60;

        } else {
            if ((params.X32HT > params.X33HT) && (params.X32HT > params.X34HT)) {
                params.DHVTOT = 64;
            } else {
                if (params.X33HT > params.X34HT) {
                    params.DHVTOT = 68;
                } else {
                    params.DHVTOT = 72;
                }
            }
        }
    }

    console.log('going to print outout from evaldischv1');
    console.log(params);

    return params;
};
// to display HV Discs after eval if 

export const evalDiscHV2 = (spec) => {

    const params = {};

    params.DHVNOR = spec.DHVTOT - spec.DHVTAP;

    params.E2_X21HT = spec.DHVTAPN * spec.DHVTAP;

    params.E2_X22HT = Math.floor(params.E2_X21HT);

    if (params.E2_X21HT - params.E2_X22HT > 0.01) {
        params.E2_X21HT = params.E2_X22HT + 1;
    }

    params.TOTTAPN = params.E2_X21HT;

    // Integer - Turns per tap disc
    params.E2_X23HT = Math.floor(spec.DHVTAPN);

    if (spec.DHVTAPN - params.E2_X23HT > 0.01) {
        params.E2_X23HT = params.E2_X23HT + 1;
    }

    // Integer - Turns per Normal Disc
    
    params.E2_X25HT = (spec.turns_ht - params.TOTTAPN) / (spec.DHVTOT - spec.DHVTAP); 
    params.DHVNORN = params.E2_X25HT;

    if (params.E2_X25HT - Math.floor(params.E2_X25HT) > 0.001) {
        params.E2_X25HT = Math.floor(params.E2_X25HT) + 1;
    }

    params.E2_X26HT = Math.floor(spec.DHVTAPN);

    if (spec.DHVTAPN - params.E2_X25HT > 0.01) {
        params.E2_X26HT = params.E2_X26HT + 1;
    }

    params.E2_X31HT = (spec.HTWH - spec.DHVBRINS * 2.8 / 3 + 2 * spec.DHVINS * 2.8
        / 3 + 1) / (spec.DHVTOT - (1 - params.E2_X23HT / params.E2_X25HT) * spec.DHVTAP); 


    params.E2_X31HT = spec.X32HT - spec.DHVINS * 2.8 / 3;

    params.E2_X32HT = params.E2_X31HT - spec.covering_ht;

    params.DHVCOND = 1;

    params.E2_X33HT = (spec.ht_area + 0.22) / params.E2_X32HT; 

    if (params.E2_X33HT > 1.6 && params.E2_X33HT <= 2.4) {
        params.E2_X33HT = params.E2_X33HT + 0.13 / params.E2_X32HT;
    } else {
        if (params.E2_X33HT > 2.4 && params.E2_X33HT <= 3.55) {
            params.E2_X33HT = params.E2_X33HT + 0.33 / params.E2_X32HT;
        } else {
            if (params.E2_X33HT > 3.55) {
                params.E2_X33HT = params.E2_X33HT + 0.64 / params.E2_X32HT;
            }
        }
    }

    if (params.E2_X33HT > 3) {
        params.E2_X34HT = Math.floor(params.E2_X33HT / 3) + 1;
    }

    console.log('going to print outout from evaldischv2');
    console.log(params);

    return params;
};

export const evalDiscHV2A = (spec) => {

    let params = {};
    params.DHVCOND = spec.E2_X34HT;
    params.E2_X33HT = (spec.ht_area / params.DHVCOND + 0.22) / spec.E2_X32HT;

    if (params.E2_X33HT > 1.6 && params.E2_X33HT <= 2.4) {
        params.E2_X33HT = params.E2_X33HT + 0.13 / params.E2_X33HT;
    } else {
        if (params.E2_X33HT > 2.4 && params.E2_X33HT <= 3.55) {
            params.E2_X33HT = params.E2_X33HT + 0.33 / params.E2_X33HT;
        } else {
            if (params.E2_X33HT > 3.55) {
                params.E2_X33HT = params.E2_X33HT + 0.64 / params.E2_X33HT;
            }
        }
    }

    return params;
};


export const evalDiscHV3 = (spec) => {
    let params = {};

    params.E3_X35HT = 0;

    params.E3_X32HT = spec.E2_X32HT;
    params.E3_X33HT = spec.E2_X33HT;

    while (params.E3_X35HT - spec.HTWH >= 0.4) {
        params.E3_X36HT = params.E3_X32HT + spec.convering_ht;
        params.E3_X37HT = params.E3_X33HT + spec.convering_ht;

        if (spec.E2_X23HT > 0) { // if tappings
            params.E3_X38HT = params.E3_X37HT * spec.E2_X25HT / spec.E2_X23HT;
            params.E3_X43HT = params.E3_X38HT * spec.covering_ht;
            params.E3_X42HT = params.E3_X32HT * params.E3_X33HT / params.E3_X43HT;
            params.E3_X46HT = params.E3_X42HT + spec.covering_ht;
        } else {
            params.E3_X46HT = 0;
        }

        params.E3_X35HT = spec.DHVNOR * params.E3_X36HT 
            + spec.DHVTAP * params.E3_X46HT 
            + spec.DHVINS * 2.8 / 3 * (spec.DHVTOT - 2) 
            + spec.DHVBRINS * 2.8 / 3 - 1;

        params.E3_X32HT = params.E2_X32HT +
            (spec.HTWH - params.E3_X35HT) / spec.DHVTOT;

        params.E3_X33HT = (spec.ht_area / spec.DHVCOND + 0.22) / params.E3_X32HT; 

        if (params.E3_X33HT > 1.6 && params.E3_X33HT <= 2.4) {
            params.E3_X33HT = params.E3_X33HT + 0.13 / params.E3_X32HT;
        } else {
            if (params.E3_X33HT > 2.4 && params.E3_X33HT <= 3.55) {
                params.E3_X33HT = params.E3_X33HT + 0.33 / params.E3_X32HT;
            } else {
                if (params.E3_X33HT > 3.55) {
                    params.E3_X33HT = params.E3_X33HT + 0.64 / params.E3_X32HT;
                }
            }
        }
    } 

    params.DHVNORCWD = Math.floor(params.E3_X32HT * 100 + 0.5) / 100;
    params.DHVNORCTH = Math.floor(params.E3_X33HT * 100 + 0.5) / 100;

    // If TAPP > 0
    if (spec.E2_X23HT > 0) {
        params.DHVTAPCWD = Math.floor(params.E3_X42HT * 100  + 0.5) / 100;
        params.DHVTAPCTH = Math.floor(params.E3_X43HT * 100  + 0.5) / 100;
    } else {
        params.DHVTAPCWD = 0;
        params.DHVTAPCTH = 0;
    }

    const x = params.DHVNORCWD * params.DHVNORCTH - roundFactor(params.DHVNORCTH);

    params.XXA = x * spec.DHVCOND;
    
    params.B2 = (params.DHVNORCTH + spec.covering_ht) * spec.E2_X25HT * spec.DHVCOND
        * 1.01;
    params.B2 = Math.floor(2 * params.B2 + 0.35) / 2;

    let BETA = (params.DHVNORCWD * params.DHVNOR / 2 * 0.95 
        / (spec.DHVNOR * (params.DHVNORCWD + 0.5 + spec.DHVINS * 2.8 / 3) / 2)); 

    let XF = 3.92;

    if (spec.winding_conductor_ht == 'aluminium') {
        XF = 3.92 * 2100 * 2100 / 3423 / 3423;
    }

    params.DHVEDDY = (XF * (params.DHVNORCTH ^ 4) * (spec.DHVNORN ^ 2)
        * (spec.DHVCOND ^ 2) * (spec.frequency ^ 2) * (BETA ^ 2) / (10 ^ 7)); 

    if (spec.E2_X23HT > 0) {
        BETA = (params.DHVTAPCWD * params.DHVTAP / 2 * 0.96 
        / (spec.DHVTAP * (params.DHVTAPCWD + 0.5 + spec.DHVINS * 2.8 / 3) / 2)); 
        XF = 3.92;
        if (spec.winding_conductor_ht == 'aluminium') {
            XF = 3.92 * 2100 * 2100 / 3423 / 3423;
        }

        params.TAPEDDY = (XF * (params.DHVTAPCTH ^ 4) * (spec.DHVTAPN ^ 2)
            * (spec.DHVCOND ^ 2) * (spec.frequency ^ 2) * (BETA ^ 2) / (10 ^ 7)); 
        
        params.LTGAP = spec.DHVBRINS * 2.8 / 3 + spec.DHVINS * (spec.DHVTAP /2 - 1)
            * 2.8 / 3 + params.E3_X46HT * (spec.DHVTAP / 2);
    } else {
        params.TAPEDDY = 0;
        params.LTGAP = 0;
    }

    return params;

};
