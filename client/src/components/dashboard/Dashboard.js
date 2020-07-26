import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getBookings } from '../../actions/booking';
import Bookings from '../bookings/Bookings';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
  getBookings,
  booking: { bookings },
}) => {
  useEffect(
    () => {
      getCurrentProfile();
      getBookings();
    },
    [getCurrentProfile],
    [getBookings]
  );

  return (
    <Fragment>
      <Fade>
        <div className='Dashboard-Body'>
          <div className='Dashboard-Form'>
            <h1 className='dbhead'>User Dashboard</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Welcome {user && user.name}
            </p>

            <div className='Account-and-Profile'>
              <div className='Account-information'>
                <h2>Account information</h2>
                <p>
                  <i className='fas' /> First Name: {user && user.name}
                </p>
              </div>

              {profile !== null ? (
                <Fragment>
                  <div className='Profile-information'>
                    <h2>Profile information</h2>
                    <p>
                      <i className='profdash' /> DOB: {profile && profile.dob}
                    </p>
                    <p>
                      <i className='profdash' /> Address:{' '}
                      {profile && profile.address1}
                    </p>
                    <p>
                      <i className='profdash' /> Phone Number:{' '}
                      {profile && profile.number}
                    </p>

                    <DashboardActions />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className='Profile-information'>
                    <h2>Profile information</h2>
                    <p>
                      You have not yet setup a profile, please add some info
                    </p>
                    <Link to='/create-profile'>
                      <Button variant='success'>Create Profile</Button>
                    </Link>
                  </div>
                </Fragment>
              )}
            </div>

            {bookings !== null ? (
              <Fragment>
                <div className='Booking-information'>
                  <h2>Booking information</h2>
                  <div className='bookings'>
                    <Bookings />
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className='Booking-information'>
                  <p>You have not have any Appointments, please set one</p>
                  <Link to='/appointment'>
                    <Button variant='success'>Create Appointment</Button>
                  </Link>
                </div>
              </Fragment>
            )}

            <div className='Delete-My-Account'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getBookings: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  booking: state.booking,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getBookings,
})(Dashboard);
