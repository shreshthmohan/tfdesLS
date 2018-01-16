
const evalLTTurns = (spec) => {

    let params = {};
    let factor = 0;
    let x = 0;


   // turns_lt = TURNLT
// PARAMETER KVA,NOMHTV,SCTEST,LVLEG,CTYPE,COSTFACT,TURNLT
    switch (true) {
        case spec.winding_conductor_ht === 'aluminium' : 
            factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 4.5);
            if (spec.kva < 63) {
                if (factor < 1.1) {
                    x = 0.316;
                } else if (factor < 1.4 ) { // factor >= 1.1 taken care of 
                    // implicitly
                    x = 0.308;
                } else {
                    x = 0.3;
                }
                params.turns_lt = spec.lv_leg / (x * Math.sqrt(spec.kva));
                params.turns_lt = 2 * Math.floor(params.turns_lt / 2 + 0.5);
            }
            if (spec.kva >= 63 && spec.kva < 100) {
                if (factor < 1.1) {
                    x = 0.34;
                } else if (factor < 1.4 ) { // factor >= 1.1 taken care of 
                    // implicitly
                    x = 0.325;
                } else {
                    x = 0.315;
                }
                params.turns_lt = Math.floor(spec.lv_leg / 
                    (x * Math.sqrt(spec.kva))  + 0.5);
            }
            if (spec.kva >= 100 && spec.kva < 200) {
                if (factor < 1.1) {
                    x = 0.35;
                } else if (factor < 1.4 ) { // factor >= 1.1 taken care of 
                    // implicitly
                    x = 0.33;
                } else {
                    x = 0.315;
                }
                params.turns_lt = Math.floor(spec.lv_leg / 
                    (x * Math.sqrt(spec.kva))  + 0.5);
            }
            if (spec.kva >= 200) {
                if (factor < 1.1) {
                    x = 0.34;
                } else if (factor < 1.4 ) { // factor >= 1.1 taken care of 
                    // implicitly
                    x = 0.32;
                } else {
                    x = 0.305;
                }
                params.turns_lt = Math.floor(spec.lv_leg / 
                    (x * Math.sqrt(spec.kva))  + 0.5);
            }
            break;

        case spec.winding_conductor_ht == 'copper' && spec.nominal_ht_voltage < 13000 :
            if (spec.kva <= 200) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 4.5);
                if (factor < 0.7) {
                    x = 0.38;
                } else if (factor < 0.9 ) {
                    x = 0.36;
                } else {
                    x = 0.35;
                }
            }
            if (spec.kva > 200 && spec.kva <= 500) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 4.65);
                if (factor < 0.7) {
                    x = 0.39;
                } else if (factor < 0.9 ) {
                    x = 0.37;
                } else {
                    x = 0.35;
                }
            }
            if (spec.kva > 500) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 5);
                if (factor < 0.7) {
                    x = 0.42;
                    console.log('expeced case - x:' + x);
                } else if (factor < 0.9 ) {
                    x = 0.39;
                } else {
                    x = 0.37;
                }
            }
            params.turns_lt = Math.floor(spec.lv_leg / 
                (x * Math.sqrt(spec.kva))  + 0.5);
            console.log('expected case: lt turns:' + params.turns_lt);
            if (spec.kva > 250 && spec.short_circuit_test === true) {
                params.turns_lt = params.turns_lt - 1;
            }
            break;

        case spec.nominal_ht_voltage >= 13000 :
            if (spec.kva < 200) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 4.75);
                if (factor < 0.7) {
                    x = 0.38;
                } else if (factor < 0.9 ) {
                    x = 0.365;
                } else {
                    x = 0.347;
                }
            }
            if (spec.kva >= 200 && spec.kva <= 500) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 5);
                if (factor < 0.7) {
                    x = 0.42;
                } else if (factor < 0.9 ) {
                    x = 0.38;
                } else {
                    x = 0.36;
                }
            } 
            if (spec.kva > 500 && spec.kva <= 1600) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 5.5);
                if (factor < 0.7) {
                    x = 0.44;
                } else if (factor < 0.9 ) {
                    x = 0.42;
                } else {
                    x = 0.395;
                }
            } 
            if (spec.kva > 1600 && spec.kva < 5000) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 6.25);
            } else if (spec.kva >= 5000) {
                factor = spec.cost_factor * Math.sqrt(spec.impedance_pc / 7.5);
            } 
            if (spec.kva > 1600) {
                if (factor < 0.7) {
                    x = 0.44;
                } else if (factor < 0.9 ) {
                    x = 0.42;
                } else {
                    x = 0.4;
                }
            }
            params.turns_lt = Math.floor(spec.lv_leg / 
                (x * Math.sqrt(spec.kva))  + 0.5);

            if (spec.kva > 250 && spec.short_circuit_test === true) {
                params.turns_lt = params.turns_lt - 1;
            }
            break;

        default:
            params.turns_lt = 0;
            params.turns_lt_error = 'something is wrong';
            break;
    }

    if (spec.ht_connections === 'zigzag') {
        params.turns_lt = params.turns_lt * 2 / Math.sqrt(3);
    }

    return params;

};

export default evalLTTurns;
