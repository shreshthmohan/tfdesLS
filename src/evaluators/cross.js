const evalCrossHT = (spec) => { // get spec and index

    let params = {};


    const newCoilArray = spec.coilArray.map((coil) => {
        // turnsPerLayer = TPL
        const turnsPerLayer = coil.coil_turns / coil.coil_layers+ 1; 
        console.log('Turns per layer:'+  turnsPerLayer);

        // CAXL in CROSS.PRG
        let axialLength = (turnsPerLayer * spec.HDIAC * spec.CAXLTOL) + 0.7;

        if (axialLength > 100) {

            axialLength = (turnsPerLayer * spec.HDIAC * spec.CAXLTOL) + 0.25;

            if (spec.HDIAC < 1.3) {
                axialLength = axialLength + 0.75;
            }
        }

        axialLength = Math.floor(axialLength * 2 + 0.75) / 2;

        let A = 0;

        switch (true) {
            case spec.HDIAC > 1 && spec.HDIAC < 1.53 : 
                A = 0.075 * spec.HTLYRINS / 4;
                break;
            case spec.HDIAC >= 1.53 && spec.HDIAC < 2.2 : 
                A = (spec.HTLYRINS - 2) / 40;
                break;
            case spec.HDIAC >= 2.2 :
                A = (spec.HTLYRINS - 4) / 40;
                break;
            default : 
                A = spec.HTLYRINS / 40;
                break;
        }

        let B2 = (coil.coil_layers * (spec.HDIAC + A) + coil.coil_duct);
        B2 = Math.floor(B2 * 4 + 0.8) / 4;

        return {
            ...coil,
            coil_B2: B2,
            coil_axial_length: axialLength
        }
    });

    console.log(newCoilArray);


    params.HTWH = newCoilArray.reduce((acc, coil) => {
        return acc + coil.coil_axial_length * coil.coil_count;
    }, 0);

    params.HTWH = params.HTWH + spec.TCLRHTC;


    params.B2 = newCoilArray.reduce((acc, coil) => {
        return acc >= coil.coil_B2 ? acc : coil.coil_B2;
    }, 0);

    let B2_sum = 0;

    B2_sum = newCoilArray.reduce((acc, coil) => {
        return acc + coil.coil_B2 * coil.coil_count;
    }, 0);


    params.WH = params.HTWH + 2 * spec.CLRHTY;

    if (spec.clamp_ring_thickness > 0
        && spec.clamp_ring_material == 'mild_steel')
    {
        params.WH = WH + 3 + spec.clamp_ring_thickness;
    }

    params.WH = Math.floor(params.WH / 5 + 0.7) * 5;

    params.B2_avg = B2_sum / spec.NHCOIL;
    // TODO error when NHCOIL != sum of coil_count in arrayCoil
   
    if (spec.clamp_ring_thickness > 0
        && spec.clamp_ring_material == 'mild_steel')
    {
        params.FINCLRHTY = (params.WH - params.HTWH - spec.clamp_ring_thickness -3)
            / 2;
    } else {
        params.FINCLRHTY = (params.WH - params.HTWH) / 2;
    }

    params.coilArray = newCoilArray;

    console.log('params from evalCrossHT:')
    console.log(params);

    return params;
}; 

export default evalCrossHT;
