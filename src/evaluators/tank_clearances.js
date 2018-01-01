
const evalTankClearances = (spec) => {
    
    let params = {};

    params.GAPTL   = 0; 
    params.GAPTWLT = 0; 
    params.GAPTWHT = 0; 
    params.GAPCTOP = 0; 
    params.GAPAIR  = 0; 

    switch (true) {
        case spec.kva <= 40 : 
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 25) {
                    params.GAPTL = 25;
                }

                if (spec.MCLRHTT <= 25) {
                    params.GAPTWLT = 25;
                    params.GAPTWHT = 40;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 15;
                }

                if (spec.tank_type === 'sealed' || spec.conservator === false) {
                    params.GAPCTOP = 25;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 30;
                }
            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 40) {
                    params.GAPTL = 40;
                }

                if (spec.MCLRHTT <= 40) {
                    params.GAPTWLT = 40;
                    params.GAPTWHT = 60;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 20;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 40;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 50) {
                    params.GAPTL = 50;
                }

                if (spec.MCLRHTT <= 50) {
                    params.GAPTWLT = 50;
                    params.GAPTWHT = 80;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 60;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        case spec.kva > 40 && spec.kva < 100 : 
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 25) {
                    params.GAPTL = 25;
                }

                if (spec.MCLRHTT <= 30) {
                    params.GAPTWLT = 30;
                    params.GAPTWHT = 40;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 10;
                }

                if (spec.tank_type === 'sealed' || spec.conservator === false) {
                    params.GAPCTOP = 25;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 40;
                }
            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 40) {
                    params.GAPTL = 40;
                }

                if (spec.MCLRHTT <= 40) {
                    params.GAPTWLT = 40;
                    params.GAPTWHT = 60;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 20;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 40;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 55) {
                    params.GAPTL = 55;
                }

                if (spec.MCLRHTT <= 55) {
                    params.GAPTWLT = 55;
                    params.GAPTWHT = 80;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 25;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 60;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        case spec.kva >= 100 && spec.kva < 150 :
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 30) {
                    params.GAPTL = 30;
                }

                if (spec.MCLRHTT <= 30) {
                    params.GAPTWLT = 35;
                    params.GAPTWHT = 40;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 5;
                    params.GAPTWHT = spec.MCLRHTT + 10;
                }

                if (spec.tank_type === 'sealed') {
                    params.GAPCTOP = 30;
                    params.GAPAIR  = 100; 
                } else {
                    params.GAPCTOP = 40;
                }
            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 45) {
                    params.GAPTL = 45;
                }

                if (spec.MCLRHTT <= 45) {
                    params.GAPTWLT = 50;
                    params.GAPTWHT = 70;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 5;
                    params.GAPTWHT = spec.MCLRHTT + 25;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 50;
                    params.GAPAIR  = 100; 
                } else {
                    if (spec.tap_step_size == 0) {
                        params.GAPCTOP = 55;
                    } else {
                        params.GAPCTOP = 50;
                    }
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 55) {
                    params.GAPTL = 55;
                }

                if (spec.MCLRHTT <= 55) {
                    params.GAPTWLT = 55;
                    params.GAPTWHT = 80;
                } else {
                    params.GAPTWLT = spec.MCLRHTT;
                    params.GAPTWHT = spec.MCLRHTT + 25;
                }

                if (spec.conservator === false) {
                    params.GAPCTOP = 60;
                    params.GAPAIR  = 100; 
                } else {
                    if (spec.tap_step_size == 0) {
                        params.GAPCTOP = 65; // ASK
                        // Why is the gap more when there's to tapping switch?
                    } else {
                        params.GAPCTOP = 60;
                    }
                }
            }
            break;

        case spec.kva >= 150 && spec.kva < 250 :
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 30) {
                    params.GAPTL = 30;
                }

                if (spec.MCLRHTT <= 30) {
                    params.GAPTWLT = 45;
                    params.GAPTWHT = 40;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 15;
                    params.GAPTWHT = spec.MCLRHTT + 10;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 45;
                } else {
                    params.GAPCTOP = 40;
                }

            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 45) {
                    params.GAPTL = 45;
                }

                if (spec.MCLRHTT <= 45) {
                    params.GAPTWLT = 60;
                    params.GAPTWHT = 75;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 15;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 60;
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 55) {
                    params.GAPTL = 55;
                }

                if (spec.MCLRHTT <= 55) {
                    params.GAPTWLT = 65;
                    params.GAPTWHT = 85;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 10;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 65; // ASK
                    // Why is the gap more when there's to tapping switch?
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        case spec.kva >= 250 && spec.kva < 400 :
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 35) {
                    params.GAPTL = 35;
                }

                if (spec.MCLRHTT <= 35) {
                    params.GAPTWLT = 55;
                    params.GAPTWHT = 50;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 20;
                    params.GAPTWHT = spec.MCLRHTT + 15;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 45;
                } else {
                    params.GAPCTOP = 40;
                }

            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 50) {
                    params.GAPTL = 50;
                }

                if (spec.MCLRHTT <= 50) {
                    params.GAPTWLT = 65;
                    params.GAPTWHT = 75;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 15;
                    params.GAPTWHT = spec.MCLRHTT + 25;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 60;
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 55) {
                    params.GAPTL = 57; // ASK Sure? Have always equated it to 
                    // compared value
                }

                if (spec.MCLRHTT <= 55) {
                    params.GAPTWLT = 65;
                    params.GAPTWHT = 85;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 10;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 65; // ASK
                    // Why is the gap more when there's to tapping switch?
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        case spec.kva >= 400 && spec.kva <= 630 :
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 35) {
                    params.GAPTL = 35;
                }

                if (spec.MCLRHTT <= 35) {
                    params.GAPTWLT = 60;
                    params.GAPTWHT = 55;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 25;
                    params.GAPTWHT = spec.MCLRHTT + 20;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 45;
                } else {
                    params.GAPCTOP = 40;
                }

            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 50) {
                    params.GAPTL = 50;
                }

                if (spec.MCLRHTT <= 50) {
                    params.GAPTWLT = 70;
                    params.GAPTWHT = 80;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 20;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 60;
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 60) {
                    params.GAPTL = 60; // ASK Sure? Have always equated it to 
                    // compared value
                }

                if (spec.MCLRHTT <= 60) {
                    params.GAPTWLT = 70;
                    params.GAPTWHT = 85;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 10;
                    params.GAPTWHT = spec.MCLRHTT + 25;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 65; // ASK
                    // Why is the gap more when there's no tapping switch?
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        case spec.kva > 630 :
            let temp = 0;
            if (spec.nominal_ht_voltage < 13000) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 35) {
                    params.GAPTL = 35;
                }

                if (spec.MCLRHTT <= 35) {
                    if (spec.short_circuit_test === true || spec.kva > 1000) {
                        params.GAPTWLT = 60;
                        params.GAPTWHT = 55;
                        temp = 5;
                    } else {
                        params.GAPTWLT = 65;
                        params.GAPTWHT = 55;
                        temp = 0;
                    }
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 30 + 2 * temp;
                    params.GAPTWHT = spec.MCLRHTT + 20 + temp;
                }

                params.GAPCTOP = 45;

            }

            if (spec.nominal_ht_voltage >= 13000
                &&
                spec.nominal_ht_voltage < 25000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 50) {
                    params.GAPTL = 50;
                }

                if (spec.MCLRHTT <= 50) {
                    params.GAPTWLT = 75;
                    params.GAPTWHT = 80;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 25;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 60;
                } else {
                    params.GAPCTOP = 50;
                }
            }

            if (spec.nominal_ht_voltage >= 25000
                &&
                spec.nominal_ht_voltage < 40000
            ) {
                params.GAPTL = spec.MCLRHTT;

                if (params.GAPTL < 60) {
                    params.GAPTL = 60;
                }

                if (spec.MCLRHTT <= 60) {
                    params.GAPTWLT = 80;
                    params.GAPTWHT = 90;
                } else {
                    params.GAPTWLT = spec.MCLRHTT + 20;
                    params.GAPTWHT = spec.MCLRHTT + 30;
                }

                if (spec.tap_step_size == 0) {
                    params.GAPCTOP = 65; // ASK
                    // Why is the gap more when there's to tapping switch?
                } else {
                    params.GAPCTOP = 60;
                }
            }
            break;

        default:
            params.tank_clearance_error = 'HT voltage too high';
            break;
    }

    return params;

};

export default evalTankClearances;
