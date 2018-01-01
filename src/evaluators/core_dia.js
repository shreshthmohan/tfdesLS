
const evalCoreDia = (spec) => {
    let params = {};

    params.CDIA = spec.lv_leg /
        (4.44 * spec.frequency * spec.turns_lt * spec.flux_density_design);

    if (spec.lt_connections === 'zigzag') {
        params.CDIA = 2 * params.CDIA / Math.sqrt(3);
    }

    params.CDIA = 1000 *
        Math.sqrt(4 * params.CDIA / (Math.PI * spec.STF * spec.SPF));

    return params;

};

export default evalCoreDia;
