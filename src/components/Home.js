import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Power Transformer Design</h1>
            <li>
                <NavLink to="/spec_prep1">Specification Preparation</NavLink>
            </li>
            <li>
                <NavLink to="/choose_des_edit">Edit Specifications</NavLink>
            </li>
            <li>
                <NavLink to="/choose_des_ini">Initial Core Design</NavLink>
            </li>
            <li>
                <NavLink to="/choose_des_wind">Winding Design</NavLink>
            </li>
        </div>
    );
};

export default Home;
