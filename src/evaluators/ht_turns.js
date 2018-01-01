
const evalHTTurns = (spec) => {
    let params = {};

    params.turns_ht = spec.hv_leg * spec.turns_lt / spec.lv_leg;

    console.log('turns_ht:' + params.turns_ht);

    if (spec.lt_connections === 'zigzag') {
        params.turns_ht = params.turns_ht * Math.sqrt(3) / 2;
    }

    if (spec.ht_connections === 'zigzag') {
        params.turns_ht = params.turns_ht * 2 / Math.sqrt(3);
    }

    let x = params.turns_ht * spec.tap_step_size / 100;

    if (spec.tapping_pc_max > 0) {
        x = spec.tapping_pc_max * x / spec.tap_step_size;
    } else {
        x = 0;
    }

    params.turns_ht = Math.floor(params.turns_ht + x);

    return params;
};

export default evalHTTurns;
