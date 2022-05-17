/* eslint-disable no-useless-escape */
const validateForm = ({ fullName, userName, email, password, cf_password }) => {
  const err = {};

  if (!fullName) {
    err.fullName = 'Please add your full name.';
  } else if (fullName.length > 25) {
    err.fullName = 'Full name can be up to 25 characters long.';
  }

  if (!userName) {
    err.userName = 'Please add your user name.';
  } else if (userName.replace(/ /g, '').length > 25) {
    err.userName = 'User name can be up to 25 characters long only.';
  }

  if (!email) {
    err.email = 'Please add your email.';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect.';
  }

  if (!password) {
    err.password = 'Please add your password.';
  } else if (password.length < 6) {
    err.password = 'Password must be at least 6 characters.';
  }

  if (password !== cf_password) {
    err.cf_password = 'Confirm password did not match.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default validateForm;
