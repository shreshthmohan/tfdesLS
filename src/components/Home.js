import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="text-center tfdes-title">Power Transformer Design</h1>
      <div className="narrow-container">
        <ul className="home-menu list-group">
          <NavLink className="text-center list-group-item" to="/spec_prep1">Specification Preparation</NavLink>
          <NavLink className="text-center list-group-item" to="/choose_des_edit">Edit Specifications</NavLink>
          <NavLink className="text-center list-group-item" to="/choose_des_ini">Initial Core Design</NavLink>
          <NavLink className="text-center list-group-item" to="/choose_des_wind">Winding Design</NavLink>
        </ul>
        <br />
        <ul className="home-menu list-group">
          <NavLink className="text-center list-group-item" to="/set_wdg_tol_choose">Set Winding Tolerances</NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Home;
