const roundFactor = (x) => {

    let y = 0;

    switch (true) {
        case (x <= 1.6) :
            y = 0.215;
            break;
        case (x > 1.6 && x <= 2.4) :
            y = 0.363;
            break;
        case (x > 2.4 && x <= 3.55) :
            y = 0.55;
            break;
        default :
            y = 0.86;
            break;
    }

    return y;
};

export default roundFactor;
