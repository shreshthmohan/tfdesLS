/**********************************************/
/* NOTE this file is currently not being used */
/**********************************************/
const filtersreducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return action.text;
    default: 
      return state;
  }
};

export default filtersreducer;
