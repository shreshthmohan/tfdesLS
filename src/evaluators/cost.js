
const evalCostParams = (spec) => {
    let cost = {}; 

    cost.cost_cu_lt               = spec.cost_cu_lt    || 400;
    cost.cost_cu_ht               = spec.cost_cu_ht    || 400;
    cost.cost_al_lt               = spec.cost_al_lt    || 155;
    cost.cost_al_ht               = spec.cost_al_ht    || 155;
    cost.cost_crgo                = spec.cost_crgo     || 200;
    cost.cost_oil                 = spec.cost_oil      || 55;
    cost.cost_steel               = spec.cost_steel    || 45;
    cost.cost_radiator            = spec.cost_radiator || 55;
    cost.cost_radiator_elleptical = spec.cost_radiator_elleptical || 55;

    // TODO restore existing cost data
    
    if (spec.winding_conductor_ht === 'aluminium') {
        cost.cost_lt = cost.cost_al_lt; // might need to change this based on TODO
                                           // above
        cost.cost_ht = cost.cost_al_ht;
    } else {
        cost.cost_lt = cost.cost_cu_lt;
        cost.cost_ht = cost.cost_cu_ht;
    }

    if (spec.radiator_type === 'elleptical') {
        cost.cost_radiator = cost.cost_radiator_elleptical; // this might change too
                                                            // according to 1st TODO
    }
    console.log('cost params');

    return cost;
};

export default evalCostParams;
