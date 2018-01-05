const specReducerDefaultState = {
    storedDesigns: [],
    loadedDesign: {}
};

// actions are 'dispatch'ed
// modify how storedDesigns is being updated
// because we are giving a name and creation data via EDIT_SPEC
// But then we should only store design in localstorage upon specprep5a
// not at createspec/specprep1
const specReducer = (state = specReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                storedDesigns :     state.storedDesigns, 
                loadedDesign : state.loadedDesign,
                filter: action.text
            };
        case 'CREATE_SPEC' :
            return {
                storedDesigns :     state.storedDesigns, 
                loadedDesign:       action.spec
            };

        case 'EDIT_SPEC' :

            return {
                storedDesigns:      state.storedDesigns,
                loadedDesign:       { ...state.loadedDesign, ...action.spec}
            };

        case 'SAVE_SPEC' : 

            const new_design_overview = {
                id:             action.spec.id,
                design_name:    action.spec.design_name,
                created_at:     action.spec.created_at
            };

            return {
                storedDesigns:      [ ...state.storedDesigns, new_design_overview],
                loadedDesign:       { ...state.loadedDesign, ...action.spec}
            };

        case 'LOAD_SPEC' :
            return {
                storedDesigns:      state.storedDesigns,
                loadedDesign:       action.spec
            };
        default:
            return state;
    }
};

export default specReducer;
