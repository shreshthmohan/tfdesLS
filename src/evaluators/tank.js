const evalTankSpecs = (spec) => {
    let tank_specs = {};

    tank_specs.conservator = true;
    tank_specs.roller = true;
    if (spec.tank_type === 'sealed') {
        tank_specs.conservator = false;
        tank_specs.roller = false;
    }

    tank_specs.tank_body = 4.0;
    tank_specs.tank_top = 6.0;
    tank_specs.tank_bottom = 6.0;

    if (spec.kva <= 315) {
        tank_specs.tank_body = 3.1;
        tank_specs.tank_top = 5.0;
        tank_specs.tank_bottom = 5.0;
    } else if (spec.kva >= 1000) {
        tank_specs.tank_body = 5.0;
        tank_specs.tank_top = 10.0;
        tank_specs.tank_bottom = 8.0;
    }

    tank_specs.radiator_type = 'pressed';

    switch (true) {
        case spec.kva <= 100 :
            tank_specs.stiffener_count = 1;
            break;
        case spec.kva > 100 && spec.kva <= 1000 :
            tank_specs.stiffener_count = 2;
            break;
        case spec.kva > 1000 :
            tank_specs.stiffener_count = 3;
            break;
    
        default:
            tank_specs.stiffener_count = 1;
            break;
    }

    if (spec.kva < 2000) {
        tank_specs.clamp_ring_material = 'perma';
    } else {
        tank_specs.clamp_ring_material = 'mild_steel';
    }
    tank_specs.clamp_ring_press_screw_dia = 0;

    switch (true) {
        case spec.kva > 300 && spec.kva <= 400 :
            tank_specs.clamp_ring_thickness = 8.0;
            break;
        case spec.kva > 400 && spec.kva <= 750 :
            tank_specs.clamp_ring_thickness = 10.0;
            break;
        case spec.kva > 750 && spec.kva <= 1000 :
            tank_specs.clamp_ring_thickness = 11.0;
            break;
        case spec.kva > 1000 && spec.kva <= 1500 :
            tank_specs.clamp_ring_thickness = 20.0;
            break;
        case spec.kva > 1500 && spec.kva <= 2100 :
            tank_specs.clamp_ring_thickness = 25.0;
            break;
        case spec.kva > 2100 && spec.kva <= 3200 :
            tank_specs.clamp_ring_press_screw_dia = 20.0;    
            tank_specs.clamp_ring_thickness = 30.0;
            break;
        case spec.kva > 3200 && spec.kva <= 6300 :
            tank_specs.clamp_ring_press_screw_dia = 38.0;    
            tank_specs.clamp_ring_thickness = 50.0;
            break;
        default:
            tank_specs.clamp_ring_press_screw_dia = 0;
            tank_specs.clamp_ring_thickness = 0;
            break;
    }

    switch (true) {
        case spec.kva < 150:

            tank_specs.radial_spacer_count = 6;
            break;

        case spec.kva >= 150 && spec.kva <= 250:

            tank_specs.radial_spacer_count = 8;
            break;

        case spec.kva >= 250 && spec.kva <= 630:

            tank_specs.radial_spacer_count = 10;
            break;

        case spec.kva > 630:

            tank_specs.radial_spacer_count = 12;
            break;

        default:

            tank_specs.radial_spacer_count = 12;
            break;
    }

    tank_specs.tank_shape = 'rectangular';
    tank_specs.corrugated_sheet_thickness = 1.2;

    if (tank_specs.conservator === true) {
        tank_specs.explosion_vent = true;
    } else {
        tank_specs.explosion_vent = false;
    }

    return tank_specs;
};

export default evalTankSpecs;
