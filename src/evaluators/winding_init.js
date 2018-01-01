
const evalWindingParams = (spec) => {
    let winding_params = {};

    winding_params.kva_leg = spec.kva / 3;

    if (spec.ht_connections === 'star') {
        winding_params.hv_leg = spec.nominal_ht_voltage / Math.sqrt(3);
    } else {
        winding_params.hv_leg = spec.nominal_ht_voltage;
    }
    console.log('hv_leg:' + winding_params.hv_leg)

    if (spec.lt_connections === 'star') {
        winding_params.lv_leg = spec.nominal_lt_voltage / Math.sqrt(3);
    } else {
        winding_params.lv_leg = spec.nominal_lt_voltage;
    }
    console.log('hv_leg:' + winding_params.hv_leg)

    winding_params.lt_current = winding_params.kva_leg * 1000 / winding_params.lv_leg;
    winding_params.ht_current = winding_params.kva_leg * 1000 / winding_params.hv_leg;

    winding_params.lt_area_m = winding_params.lt_current / spec.max_current_density_lt;

    // TODO: ASK
    // What's LTKRAFT
    switch (true) {
        case winding_params.lt_area_m <= 90 && spec.winding_conductor_ht === 'aluminium':
            winding_params.LTKRAFT = 5;
            break;
        case winding_params.lt_area_m <= 50 && spec.winding_conductor_ht === 'copper':
            winding_params.LTKRAFT = 5;
            break;
        case winding_params.lt_area_m > 90 && winding_params.lt_area_m <= 400 && spec.winding_conductor_ht === 'aluminium':
            winding_params.LTKRAFT = 7;
            break;
        case winding_params.lt_area_m > 50 && winding_params.lt_area_m <= 300 && spec.winding_conductor_ht === 'copper':
            winding_params.LTKRAFT = 7;
            break;
        default: 
            winding_params.LTKRAFT = 8;
            break;
    }

    winding_params.ht_area_m = winding_params.ht_current / spec.max_current_density_ht;

    winding_params.lt_area = winding_params.lt_area_m;
    winding_params.ht_area = winding_params.ht_area_m;

    winding_params.HDIAB = Math.sqrt(4 * winding_params.ht_area_m / Math.PI);

    winding_params.HDIAB = Math.floor(winding_params.HDIAB * 100 + 1) / 100;

    winding_params.HDIABM = winding_params.HDIAB;

    if (spec.nominal_lt_voltage < 6000) {
        winding_params.lv_winding = 'spiral';
    } else {
        winding_params.lv_winding = 'crossover';

        if (spec.kva > 800 && spec.nominal_lt_voltage <= 12000) {
            winding_params.lv_winding = 'disc';
        }

        if (spec.kva > 2000 && spec.nominal_lt_voltage > 12000) {
            winding_params.lv_winding = 'disc';
        }
    }

    if (spec.nominal_ht_voltage < 6000) {
        winding_params.hv_winding = 'spiral'; //spiral?
    } else {
        winding_params.hv_winding = 'crossover';

        if (spec.kva > 1200 && spec.nominal_ht_voltage <= 12000) {
            winding_params.hv_winding = 'disc';
        }

        if (spec.kva > 2000 && spec.nominal_ht_voltage > 12000) {
            winding_params.hv_winding = 'disc';
        }
    }

    // Covering / Insulation
    winding_params.covering_ht = 0.25;
    winding_params.covering_lt = 0.35;

    if (spec.winding_conductor_ht === 'aluminium') {

        switch (true) {
            case winding_params.HDIAB < 1.4 :
                winding_params.covering_ht = 0.2;
                break;
            case winding_params.HDIAB >= 1.4 && winding_params.HDIAB < 2.0 :
                winding_params.covering_ht = 0.23;
                break;
            case winding_params.HDIAB >= 2.0 && winding_params.HDIAB < 2.35 :
                winding_params.covering_ht = 0.25;
                break;
            case winding_params.HDIAB >= 2.35 && winding_params.HDIAB < 2.7 :
                winding_params.covering_ht = 0.28;
                break;
            case winding_params.HDIAB >= 2.7 && winding_params.HDIAB < 3.4 :
                winding_params.covering_ht = 0.3;
                break;
            default : 
                winding_params.covering_ht = 0.35;
                break;
        }
    } else { // ht winding is copper 
        switch (true) {
            case winding_params.HDIAB < 1 :
                winding_params.covering_ht = 0.2;
                break;
            case winding_params.HDIAB >= 1 && winding_params.HDIAB < 1.4 :
                winding_params.covering_ht = 0.23;
                break;
            case winding_params.HDIAB >= 1.4 && winding_params.HDIAB < 2.2 :
                winding_params.covering_ht = 0.25;
                break;
            case winding_params.HDIAB >= 2.2 && winding_params.HDIAB < 2.6 :
                winding_params.covering_ht = 0.28;
                break;
            case winding_params.HDIAB >= 2.6 && winding_params.HDIAB < 3.2 :
                winding_params.covering_ht = 0.3;
                break;
            default : 
                winding_params.covering_ht = 0.35;
                break;
        }
    }

    if (spec.nominal_ht_voltage > 18000) {
        winding_params.covering_ht = winding_params.covering_ht * 1.15;
        winding_params.covering_ht = Math.floor(winding_params.covering_ht * 100 + 0.6) / 100;
    }
    // continue from line number 569 of PTFSPEC

    switch (true) {
        case winding_params.lt_current < 100 :
            winding_params.covering_lt = 0.3;
            break;
        case winding_params.lt_current >= 100 && winding_params <= 400 :
            winding_params.covering_lt = 0.35;
            break;
        default :
            winding_params.covering_lt = 0.4;
            break;
    }

    if (spec.nominal_lt_voltage > 3300) {
        winding_params.covering_lt = 0.5;
    }

    if (winding_params.hv_winding === 'disc') {
        winding_params.covering_ht = 0.5;

        if (spec.kva > 6300) {

            winding_params.covering_ht = 0.75;

        }
    }

    if (winding_params.lv_winding === 'disc') {
        winding_params.covering_lt = 0.5;

        if (spec.kva > 8000) {

            winding_params.covering_ht = 0.6;

        }
    }

    return winding_params;

};

export default evalWindingParams;
