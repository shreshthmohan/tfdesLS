export const createSpec = (data) => {

    // Add CONDSP to newly created design spec
    let CONDSP = localStorage.getItem('CONDSP');
    CONDSP = CONDSP ? JSON.parse(CONDSP) : {};

    return {
        type: 'CREATE_SPEC',
        spec: {...data, ...CONDSP}
    };
};

// Edit spec before save to localStorage
// Just going to update the redux store, not adding data to localStorage
export const editSpecBeforeSave = (data) => {
    return {
        type: 'EDIT_SPEC',
        spec: data
    };

};

// Editing spec after the design has been saved to localStorage
export const editSpecAfterSave = (data) => {

    const design = JSON.parse(localStorage.getItem(data.id));

    localStorage.setItem(data.id, JSON.stringify(data));
    localStorage.setItem('latestDesign', data.id);
    if (!!design) {
        localStorage.setItem(data.id, JSON.stringify({
            ...design, ...data
        }));
    }

    return {
        type: 'EDIT_SPEC',
        spec: data
    };
}; 

// saving design to localStorage
export const saveSpec = (data) => {

    // Storing named design to localStorage
    localStorage.setItem(data.id, JSON.stringify(data));
    localStorage.setItem('latestDesign', data.id);

    // Getting array of stored designs from localStorage
    const storedDesigns = localStorage.getItem('storedDesigns');

    // If stored designs array doesn't exist, create it and seed it with 
    // the design being saved
    // Else append new design to existing array
    if (!storedDesigns) {
        localStorage.setItem('storedDesigns', JSON.stringify(
            [
                {
                    id : data.id,
                    design_name: data.design_name,
                    created_at: data.created_at
                }
            ]
        ));
    } else {
        localStorage.setItem('storedDesigns', JSON.stringify(
            [
                ...(JSON.parse(storedDesigns)),
                {
                    id : data.id,
                    design_name: data.design_name,
                    created_at: data.created_at
                }
            ]
        ));
    }

    return {
        type: 'SAVE_SPEC',
        spec: data
    };
};

// load Design
export const loadSpec = (id) => {

    const data = JSON.parse(localStorage.getItem(id));
    localStorage.setItem('latestDesign', id);

    return {
        type: 'LOAD_SPEC',
        spec: data
    };
}
