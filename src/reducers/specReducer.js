const specReducerDefaultState = {
    storedDesigns: [],
    loadedDesign: {}
};

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
                loadedDesign:       { ...state.loadedDesign, ...action.spec},
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
        case 'SET_WDG_TOL' : 
            return {
                storedDesigns :     state.storedDesigns, 
                loadedDesign : state.loadedDesign,
                CONDSP : {...state.CONDSP, ...action.CONDSP}

            };
        default:
            return state;
    }
};

export default specReducer;
