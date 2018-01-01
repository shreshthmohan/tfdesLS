
const updateSpec = (spec) => {
    const params = {};

    params.kva_leg = spec.kva / 3;

    if (spec.ht_connections == 'delta' || spec.ht_connections == 'zigzag') {
        params.hv_leg = spec.nominal_ht_voltage / Math.sqrt(3);
    } else {
        params.hv_leg = spec.nominal_ht_voltage;
    }

    if (spec.lt_connections == 'delta') {
        params.lv_leg = spec.nominal_lt_voltage;
    } else {
        params.lv_leg = spec.nominal_lt_voltage / Math.sqrt(3);;
    }

    params.lt_current = params.kva_leg * 1000 / params.lv_leg;
    params.ht_current = params.kva_leg * 1000 / params.hv_leg;

    params.lt_area_m = params.lt_current / spec.max_current_density_lt;
    params.ht_area_m = params.ht_current / spec.max_current_density_ht;

    params.HDIABM = Math.sqrt(4 * params.ht_area_m / Math.PI);

    return params;
};

export default updateSpec;
