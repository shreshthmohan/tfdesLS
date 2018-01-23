import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Home from '../components/Home.js';

import ChooseDesEdit from '../components/ChooseDesEdit.js';
import PreEdit    from '../components/PreEdit.js';
import EditSpec1  from '../components/EditSpec1.js';
import EditSpec2  from '../components/EditSpec2.js';
import EditSpec3  from '../components/EditSpec3.js';
import EditSpec4  from '../components/EditSpec4.js';
import EditSpec4A  from '../components/EditSpec4A.js';
import EditSpec5  from '../components/EditSpec5.js';

import SpecPrep1  from '../components/SpecPrep1.js';
import SpecPrep2  from '../components/SpecPrep2.js';
import SpecPrep3  from '../components/SpecPrep3.js';
import SpecPrep4  from '../components/SpecPrep4.js';
import SpecPrep4A from '../components/SpecPrep4A.js';
import SpecPrep5  from '../components/SpecPrep5.js';
import SpecPrep5A from '../components/SpecPrep5A.js';

import ChooseDesIni from '../components/ChooseDesIni.js';
import PreInitCoreDes from '../components/PreInitCoreDes.js';
import InitCoreDes from '../components/InitCoreDes.js';

import ChooseDesWind from '../components/ChooseDesWind.js';
import WindingDes1 from '../components/WindingDes1.js';
import WindingDes2 from '../components/WindingDes2.js';
import WindingDes2A from '../components/WindingDes2A.js';
import WindingDes3 from '../components/WindingDes3.js';
import WindingDes3A from '../components/WindingDes3A.js';
import SetWdgTolChoose from "../components/SetWdgTolChoose.js";
import SetWdgTolTight from "../components/SetWdgTolTight.js";
import SetWdgTolFinal from "../components/SetWdgTolFinal.js";
import WindingDesLVSpiral from '../components/WindingDesLVSpiral';

import SetWindingType from '../components/SetWindingType';

import Header from '../components/Header.js';

const history = createHistory();

const AppRouter = () => {
    const Refresh = ({ path = '/' }) => (
        <Route
            path={path}
            component={({ history, location, match }) => {
                history.replace({
                    ...location,
                    pathname:location.pathname.substring(match.path.length)
                });
                return null;
            }}
        />
    );
    return (
        <Router history={history}>
            <div>
            <Header />
            <Switch>
                <Route path='/index.html' component={Home} />
                <Route path='/' component={Home} exact={true} />

                <Route path='/spec_prep1' component={SpecPrep1} />
                <Route path='/spec_prep2' component={SpecPrep2} />
                <Route path='/spec_prep3' component={SpecPrep3} />
                <Route path='/spec_prep4' component={SpecPrep4} />
                <Route path='/spec_prep4a' component={SpecPrep4A} />
                <Route path='/spec_prep5' component={SpecPrep5} />
                <Route path='/spec_prep5a' component={SpecPrep5A} />

                <Route path='/choose_des_edit' component={ChooseDesEdit} />
                <Route path='/pre_edit' component={PreEdit} />
                <Route path='/edit_spec1' component={EditSpec1} />
                <Route path='/edit_spec2' component={EditSpec2} />
                <Route path='/edit_spec3' component={EditSpec3} />
                <Route path='/edit_spec4' component={EditSpec4} />
                <Route path='/edit_spec4a' component={EditSpec4A} />
                <Route path='/edit_spec5' component={EditSpec5} />

                <Route path='/choose_des_ini' component={ChooseDesIni} />
                <Route path='/pre_init_core_des' component={PreInitCoreDes} />
                <Route path='/init_core_des' component={InitCoreDes} />

                <Route path='/choose_des_wind' component={ChooseDesWind} />
                <Route path='/winding_des1' component={WindingDes1} />
                <Route path='/winding_des2' component={WindingDes2} />
                <Route path='/winding_des2a' component={WindingDes2A} />
                <Route path='/winding_des3' component={WindingDes3} />
                <Route path='/winding_des3a' component={WindingDes3A} />
                <Route path='/set_wdg_tol_choose' component={SetWdgTolChoose} />
                <Route path='/set_wdg_tol_tight' component={SetWdgTolTight} />
                <Route path='/set_wdg_tol_final' component={SetWdgTolFinal} />
                <Route path='/set_winding_type' component={SetWindingType} />
                <Refresh path='/refresh' />

            </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;

