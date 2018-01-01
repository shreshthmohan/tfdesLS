
// actions are 'dispatch'ed
// modify how storedDesigns is being updated
// because we are giving a name and creation data via EDIT_SPEC
// But then we should only store design in localstorage upon specprep5a
// not at createspec/specprep1
const specReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_SPEC' :
            return action.spec;

        case 'EDIT_SPEC' :
            return { ...state, ...action.spec};

        case 'SAVE_SPEC' : 
            return { ...state, ...action.spec};

        case 'LOAD_SPEC' :
            return action.spec;

        default:
            return state;
    }
};

export default specReducer;
