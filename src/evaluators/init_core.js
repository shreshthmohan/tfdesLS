import evalCoreDia from './core_dia';

const evalInitCore = (spec) => {
    let params = {};

    let x = 0;

    params.MSTEP = spec.MSTEP;
    params.MINWDCH = spec.MINWDCH;

    switch (true) {
        case spec.kva < 63:
            if (spec.MSTEP === 0) {
                params.MSTEP = 8;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.934;
            }
            if (spec.STF === 0) {
                params.STF = 0.96;
            }
            x = 1;
            break;

        case spec.kva >= 63 && spec.kva < 100 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 9;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.94;
            }
            if (spec.STF === 0) {
                params.STF = 0.96;
            }
            x = 1.5;
            break;

        case spec.kva >= 100 && spec.kva < 200 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 10;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.942;
            }
            if (spec.STF === 0) {
                params.STF = 0.96;
            }
            x = 2;
            break;

        case spec.kva >= 200 && spec.kva < 300 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 12;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.951;
            }
            if (spec.STF === 0) {
                params.STF = 0.97;
            }
            x = 2;
            break;
            
        case spec.kva >= 300 && spec.kva < 500 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 13;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.955;
            }
            if (spec.STF === 0) {
                params.STF = 0.97;
            }
            x = 2;
            break;
            
        case spec.kva >= 500 && spec.kva < 1000 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 14;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.955;
            }
            if (spec.STF === 0) {
                params.STF = 0.97;
            }
            x = 2.5;
            break;

        case spec.kva >= 1000 && spec.kva < 2000 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 15;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.956;
            }
            if (spec.STF === 0) {
                params.STF = 0.97;
            }
            x = 3.0;
            break;

        case spec.kva >=  2000 :
            if (spec.MSTEP === 0) {
                params.MSTEP = 16;
            }
            if (spec.SPF === 0) {
                params.SPF = 0.956;
            }
            if (spec.STF === 0) {
                params.STF = 0.97;
            }
            x = 4.0;
            break;

        default :
            break;
    }

    const core_dia = evalCoreDia({...spec, ...params});

    params = {...params, ...core_dia};

    let temp = 5 * Math.floor((params.CDIA - x) / 5);

    params.MAXWD = spec.MAXWD;
    params.MINWD = spec.MINWD;

    if (temp !== spec.MAXWD) {
        params.MAXWD = temp;
        params.MINWD = 5 * Math.floor(params.MAXWD / (3 * 5));

        if (params.MINWD < 25) {
            params.MINWD = 25;
        }
    }

    if (spec.kva < 3000) {
        params.MINWDCH = 5;
    } else {
        params.MINWDCH = 10;
    }

    x = params.MAXWD - params.MINWD;

    let y = (params.MSTEP - 1) * params.MINWDCH;

    params.CSTEP1 = spec.CSTEP1;
    params.CSTEP2 = spec.CSTEP2;
    params.CSTEP3 = spec.CSTEP3;
    params.CSTEP4 = spec.CSTEP4;

    if (y >= x) {
        params.CSTEP1 = params.MSTEP;
        params.CSTEP2 = 0;
        params.CSTEP3 = 0;
        params.CSTEP4 = 0;
    } else {
        params.CSTEP2 = Math.floor((x - y) / params.MINWDCH);
        if (params.CSTEP2 <= params.MSTEP) {
            params.CSTEP1 = params.MSTEP - params.CSTEP2;
            params.CSTEP3 = 0;
            params.CSTEP4 = 0;
        } else {
            params.CSTEP1 = 0;
            y = (params.MSTEP - 1) * 2 * params.MINWDCH;
            params.CSTEP3 = Math.floor((x - y) / params.MINWDCH);
            if (params.CSTEP3 <= params.MSTEP) {
                params.CSTEP2 = params.MSTEP - params.CSTEP3;
                params.CSTEP4 = 0;
            } else {
                params.CSTEP2 = 0;
                y = (params.MSTEP - 1) * 3 * params.MINWDCH;
                params.CSTEP4 = Math.floor((x - y) / params.MINWDCH);
                params.CSTEP3 = params.MSTEP - params.CSTEP4;
            }
        }
    } 

    return params;
};

export default evalInitCore;
