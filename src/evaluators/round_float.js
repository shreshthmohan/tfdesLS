// round off 'num' to 'digits' digits after decimal point
const roundFloat = (num, digits) => {
    let out = parseFloat(num).toFixed(digits);
    out = parseFloat(out);
    return out;
};

export default roundFloat;