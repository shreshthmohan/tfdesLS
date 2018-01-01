
const evalCurrentFlux = (spec) => {
    let current_flux = {};

    current_flux.rod_size = 11;

    if (spec.winding_conductor_ht == 'aluminium') {
        current_flux.max_current_density_ht = 1.6;
        current_flux.max_current_density_lt = 1.7;
    } else {

        if (spec.winding_conductor_lt === 'aluminium') {
            current_flux.max_current_density_lt = 1.7;
        } else {
            current_flux.max_current_density_lt = 3.5;
        }

        current_flux.max_current_density_ht = 3.2;
    }

    current_flux.max_over_flux = 12.5;
    current_flux.max_flux_density = 1.7;
    current_flux.flux_density_design = current_flux.max_flux_density;
    current_flux.ht_insulation_material = 'dpc';
    current_flux.insulation_thickness_lt = 0.35;
    current_flux.insulation_thickness_lt = 0.25;
    current_flux.ht_conductor_std_swg = 's';

    switch (true) {
        case spec.kva <= 100 :
            current_flux.dir_loss = spec.cu_loss - spec.kva;
            current_flux.stray_loss = 100 * spec.kva / spec.cu_loss;
            if (spec.winding_conductor_lt === 'aluminium') {
                current_flux.stray_loss = current_flux.stray_loss * 1.3;
                current_flux.dir_loss = spec.cu_loss - 1.3 * spec.kva;
            }
            break;

        case spec.kva > 100 && spec.kva <= 250 :
            if (spec.winding_conductor_lt === 'aluminium') {
                current_flux.stray_loss = 10;
                if (spec.kva < 200) {
                    current_flux.stray_loss = 9;
                }
            } else {
                current_flux.stray_loss = 8;
            }
            current_flux.dir_loss = spec.cu_loss / (1 + current_flux.stray_loss / 100);
            break;

        case spec.kva > 250 && spec.kva <= 325 :
            current_flux.stray_loss = 10;
            if (spec.winding_conductor_lt === 'aluminium') {
                current_flux.stray_loss = 12;
            }
            current_flux.dir_loss = spec.cu_loss / (1 + current_flux.stray_loss / 100);
            break;

        case spec.kva > 325 && spec.kva <= 500 :
            current_flux.dir_loss = spec.cu_loss / 1.15;
            current_flux.stray_loss = 14;
            break;

        case spec.kva > 500 && spec.kva <= 725 :
            current_flux.dir_loss = spec.cu_loss / 1.15;
            current_flux.stray_loss = 15;
            break;

        case spec.kva > 725 && spec.kva <= 1000 :

            current_flux.dir_loss = spec.cu_loss / 1.18;
            current_flux.stray_loss = 18;
            break;

        case spec.kva >= 1000 :
            if (spec.nominal_lt_voltage < 1100) {
                current_flux.dir_loss = spec.cu_loss / 1.2;
                current_flux.stray_loss = 20;
            } else {
                current_flux.dir_loss = spec.cu_loss / 1.1;
                current_flux.stray_loss = 10;
            }
            break;

        default :
            current_flux.dir_loss = spec.cu_loss - spec.kva;
            current_flux.stray_loss = 100 * spec.kva / spec.cu_loss;
            break;
    }

    current_flux.impedance_low = (1 - spec.impedance_tolerance / 100) * spec.impedance_pc;
    current_flux.impedance_high = (1 + spec.impedance_tolerance / 100) * spec.impedance_pc;

    return current_flux;
};

export default evalCurrentFlux;
