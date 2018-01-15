export const setWindingTol = (data) => {

  const CONDSP = localStorage.getItem('CONDSP');

  if(!CONDSP) {
    localStorage.setItem('CONDSP', JSON.stringify(data));
  } else {
    localStorage.setItem('CONDSP', JSON.stringify(
      {...(JSON.parse(CONDSP)),
       ...data
      }
    ));
  }

  return {
    type: 'SET_WDG_TOL',
    CONDSP: data
  };

};
