import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

const DesFilter = (props) => {
    const onFilterChange = (event) => {
      props.dispatch(setTextFilter(event.target.value));
    };
    return (
        <div>
                <input
                  value={props.filter}
                  onChange={onFilterChange}
                  />
        </div>
    );

};

const mapStateToProps = (state, props) => {
    return {
        filter: state.filter
    };
};

export default connect(mapStateToProps)(DesFilter);