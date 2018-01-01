import React from 'react';
import { Link } from 'react-router-dom';

const PreEdit = () => {
    return (
        <div>
            <h1>Which part do you want to edit?</h1>
            <Link to="/edit_spec1"><h3>Part 1 - Main specifications</h3></Link>
            <Link to="/edit_spec2"><h3>Part 2 - Clearances in Oil & Air</h3></Link>
            <Link to="/edit_spec3"><h3>Part 3 - Tank Specification</h3></Link>
            <Link to="/edit_spec4"><h3>Part 4 - Current Density, Flux ...</h3></Link>
            <Link to="/edit_spec5"><h3>Part 5 - Cost parameters</h3></Link>
            <Link to="/"><h2>Go Home</h2></Link>
        </div>
    );
};

export default PreEdit;
