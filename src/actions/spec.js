import database from '../firebase/firebase';

export const createSpec = (data) => {

    return {
        type: 'CREATE_SPEC',
        spec: data
    };
};

// Edit spec before save to localStorage
// Just going to update the redux store, not adding data to localStorage
export const editSpec = (data) => {
    return {
        type: 'EDIT_SPEC',
        spec: data
    };

};
// ****************** NOTE ******************* //
// In the localStorage based software, design spec is not
// being saved in the last step of spec prep
// TODO fix

// Editing spec after the design has been saved to localStorage
//export const editSpecAfterSave = (data) => {
//
//    const design = JSON.parse(localStorage.getItem(data.id));
//
//    localStorage.setItem(data.id, JSON.stringify(data));
//    if (!!design) {
//        localStorage.setItem(data.id, JSON.stringify({
//            ...design, ...data
//        }));
//    }
//
//    return {
//        type: 'EDIT_SPEC',
//        spec: data
//    };
//}; 

// Async action creator which saves edits to firebase RTDB
// updates value in firebase RTDB when it already exists there
// 1. get design from firebase RTDB
// 2. attach updated properties to it.
// 3. set updated value in firebase RTDB
export const editSpecAfterSave = (data) => {
    return (dispatch) => {
        console.log('id of design being edited', data.id);
        database.ref('designs/' + data.id).once('value').then((snapshot) => {
            const updatedDesign = { ...snapshot.val(), ...data};
            database.ref('designs/' + data.id).set(updatedDesign).then(() => {
                dispatch(editSpec(data));
            });
        });
    };
};


// saving design 
export const saveSpec = (data) => {

    return {
        type: 'SAVE_SPEC',
        spec: data
    };
};

// no need to export, won't be called anywhere else
const addNew = (data) => {

    return {
        type: 'ADD_NEW',
        spec: data
    };
};

// works only because of redux-thunk
// firebase
export const startSaveSpec = (data) => {
    return (dispatch) => {

        
        // TODO: though this will work okay, there might be 
        // issues when the internet connectivity is patchy
        return database.ref('designs/' + data.id).set(data).then(() => {
            console.log('got design from firebase');
            return database.ref('designList').push({
                id: data.id,
                design_name: data.design_name,
                created_at: data.created_at
            }).then(() => {
                console.log('pushed updated design to firebase');
                dispatch(saveSpec(data));
                dispatch(addNew(data));
                console.log('store updated');
            })
        });

    };
};

// TODO split specReducer into two:
// design reducer & list of designs reducer
// because we need another async call to firebase RTDB in order to
// save storedDesigns to it
// OR nest the ref() call inside above then statement
// but nesting will complicate error handling
// need to alert user when save to firebase RTDB save is unsuccessful
// "Unable to save, please check your internet connection"


// load Design
export const loadSpec = (data) => {

    return {
        type: 'LOAD_SPEC',
        spec: data
    };
};

export const startLoadSpec = (id) => {

    return (dispatch) => {
        database.ref('designs/' + id).once('value').then((snapshot) => {
            dispatch(loadSpec(snapshot.val()));
        });
    };

};

export const loadDesignList = (data) => {
    return {
        type: 'LOAD_LIST',
        list: data
    };
};

// load the list of all designs stored in firebase RTDB
export const startLoadDesignList = () => {
    return (dispatch) => {
        return database.ref('designList').once('value').then((snapshot) => {
            const designList = [];
            snapshot.forEach((childSnapshot) => {
                designList.push(childSnapshot.val());
            });

            dispatch(loadDesignList(designList));
        });
    };
};
