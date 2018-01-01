
const designListReducer = (state = [], action) => {
    switch (action.type) {
        
        // Add new design name to design list
        case 'ADD_NEW':
            const new_design_overview = {
                id:             action.spec.id,
                design_name:    action.spec.design_name,
                created_at:     action.spec.created_at
            };
            return [...state, new_design_overview];

        case 'LOAD_LIST':
            return action.list;

        default:
            return state;
    }
};

export default designListReducer;
