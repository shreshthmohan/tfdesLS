const evalClearances = (spec) => {
    
    let clearances = {};
    
    switch (true) {
        case spec.nominal_ht_voltage < 1100 :
            clearances.ACLRHTHT=75.0;
            clearances.ACLRHTE=40.0;
            clearances.ACLRLTLT=75.0;
            clearances.ACLRLTE=40.0;
            clearances.MCLRLTY=8.0;
            clearances.MCLRLTE=2.5;
            clearances.MCLRLTHT=6.0;
            clearances.MCLRHTY=8.0;
            clearances.MCLRHTHT=6.0;
            clearances.MCLRHTT=25.0;
            break;
        case spec.nominal_ht_voltage >= 1100 && spec.nominal_ht_voltage <= 12000 :
            clearances.ACLRHTHT=255.0;
            clearances.ACLRHTE=140.0;
            clearances.ACLRLTLT=75.0;
            clearances.ACLRLTE=40.0;
            clearances.MCLRLTY=8.0;
            clearances.MCLRLTE=2.5;
            clearances.MCLRLTHT=10.0;
            clearances.MCLRHTY=20.0;
            clearances.MCLRHTHT=10.0;
            clearances.MCLRHTT=25.0;
            break;
        case spec.nominal_ht_voltage > 12000 && spec.nominal_ht_voltage <= 24000 :
            clearances.ACLRHTHT=330;
            clearances.ACLRHTE=230;
            clearances.ACLRLTLT=0.0;
            clearances.ACLRLTE=0.0;
            clearances.MCLRLTY=10.0;
            clearances.MCLRLTE=2.5;
            clearances.MCLRLTHT=14.0;
            clearances.MCLRHTY=40.0;
            clearances.MCLRHTHT=15.0;
            clearances.MCLRHTT=40.0;
            break;
        case spec.nominal_ht_voltage > 24000 :
            clearances.ACLRHTHT=350;
            clearances.ACLRHTE=320;
            clearances.ACLRLTLT=0.0;
            clearances.ACLRLTE=0.0;
            clearances.MCLRLTY=12.0;
            clearances.MCLRLTE=2.5;
            if (spec.nominal_lt_voltage > 2500) {
                clearances.MCLRLTE=9.5;
            }
            clearances.MCLRLTHT=20.0;
            clearances.MCLRHTY=55.0;
            clearances.MCLRHTHT=20.0;
            clearances.MCLRHTT=60.0;
        break; 
    }

    switch (true) {
        case spec.nominal_lt_voltage < 1100 :
            clearances.ACLRLTLT=75.0;
            clearances.ACLRLTE=40.0;
            if (spec.cable_end_box_lt) {
                clearances.ACLRLTLT=45;
                clearances.ACLRLTE=20;
            }
            clearances.MCLRLTY=8.0;
            clearances.MCLRLTE=2.5;
            if (spec.kva > 200) {
                clearances.MCLRLTY=11.0;
                clearances.MCLRLTE=3.0;
            }
            if (spec.kva > 500) {
                clearances.MCLRLTY=13.0;
                clearances.MCLRLTE=3.5;
            }
            break;
        case spec.nominal_lt_voltage >= 1100 && spec.nominal_lt_voltage <= 12000 :
            clearances.ACLRLTLT=255.0;
            clearances.ACLRLTE=140.0;
            clearances.MCLRLTY=20.0;
            clearances.MCLRLTE=9.5;
            break;
        case spec.nominal_lt_voltage > 12000 && spec.nominal_lt_voltage <= 24000 :
            clearances.ACLRLTLT=330.0;
            clearances.ACLRLTE=230.0;
            clearances.MCLRLTY=40.0;
            clearances.MCLRLTE=14.0;
            break;
        case spec.nominal_lt_voltage > 24000 : 
            clearances.ACLRLTLT=350.0;
            clearances.ACLRLTE=320.0;
            clearances.MCLRLTY=55.0;
            clearances.MCLRLTE=18.0;
            break;
    }

    clearances.MCLRHTC=0.0;
    clearances.MNOHTC=1;
    clearances.FINCLRHTY=0;
    clearances.FINCLRLTY=0;

    return clearances;
};

export default evalClearances;