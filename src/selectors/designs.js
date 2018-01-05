
const getFilteredDesigns = (designs, textChunk = '') => {

  const filteredDesigns = designs.filter((design) => {
    return design.design_name.toLowerCase().includes(textChunk.toLowerCase());
  });

  return filteredDesigns;
};

export default getFilteredDesigns;
