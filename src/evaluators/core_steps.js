// equivalent to COWD.PRG
const evalCoreSteps = (spec) => {

    let params = {};

    params.core_steps = [];

    let area = 0;
    let h = 0;
    let ich = spec.MINWDCH;
    let wd = spec.MAXWD;
    let i = 0;
    let x = 0;

    while (wd >= spec.CDIA) {
        wd = wd - ich;
    }

    while (i < spec.CSTEP1 && wd >= spec.MINWD && i < spec.MSTEP) {
        i = i + 1;
        x = 0.5 * Math.sqrt((spec.CDIA + wd) * (spec.CDIA - wd));
        x = x - h;
        x = 0.01 * Math.floor(100 * x);
        h = h + x;
        area = area + x * wd;
        params.core_steps.push({
            id: i,
            width: wd,
            x: x,
            h: h,
            step: 1
        });
        wd = wd - ich;
    }

    let CSTEP1 = i; // should we return this value? TODO
    ich = ich + spec.MINWDCH;
    if (CSTEP1 > 0) {
        wd = wd - spec.MINWDCH;
    }

    while ((i < CSTEP1 + spec.CSTEP2) && wd >= spec.MINWD && i < spec.MSTEP) {
        i = i + 1;
        x = 0.5 * Math.sqrt((spec.CDIA + wd) * (spec.CDIA - wd));
        x = x - h;
        x = 0.01 * Math.floor(100 * x);
        h = h + x;
        area = area + x * wd;
        params.core_steps.push({
            id: i,
            width: wd,
            x: x,
            h: h,
            step: 2
        });
        wd = wd - ich;
    }

    const CSTEP2 = i - CSTEP1;
    
    ich = ich + spec.MINWDCH;

    if (CSTEP1 > 0 || CSTEP2 > 0) {
        wd = wd - spec.MINWDCH;
    }
    
    while ((i < CSTEP1 + CSTEP2 + spec.CSTEP3) && wd >= spec.MINWD && i < spec.MSTEP) {
        i = i + 1;
        x = 0.5 * Math.sqrt((spec.CDIA + wd) * (spec.CDIA - wd));
        x = x - h;
        x = 0.01 * Math.floor(100 * x);
        h = h + x;
        area = area + x * wd;
        params.core_steps.push({
            id: i,
            width: wd,
            x: x,
            h: h,
            step: 3
        });
        wd = wd - ich;
    }

    const CSTEP3 = i - CSTEP1 - CSTEP2;

    ich = ich + spec.MINWDCH;

    if (CSTEP1 > 0 || CSTEP2 > 0 || CSTEP3 > 0) {
        wd = wd - spec.MINWDCH;
    }

    while ((i < CSTEP1 + CSTEP2 + CSTEP3 + spec.CSTEP4) && wd >= spec.MINWD &&
        i < spec.MSTEP) {

        i = i + 1;
        x = 0.5 * Math.sqrt((spec.CDIA + wd) * (spec.CDIA - wd));
        x = x - h;
        x = 0.01 * Math.floor(100 * x);
        h = h + x;
        area = area + x * wd;
        params.core_steps.push({
            id: i,
            width: wd,
            x: x,
            h: h,
            step: 4
        });
        wd = wd - ich;
    }

    const CSTEP4 = i - CSTEP1 - CSTEP2 - CSTEP3;

    params.CSTEP1 = CSTEP1;
    params.CSTEP2 = CSTEP2;
    params.CSTEP3 = CSTEP3;
    params.CSTEP4 = CSTEP4;

    params.WD = wd + spec.MINWDCH;

    params.SPF = 8 * area / (Math.PI * spec.CDIA * spec.CDIA);

    params.NSTEP = i;
    params.CH = h;

    return params;
};

export default evalCoreSteps;
