require('dotenv').config();

const determineMembership = (passcode) => {
  if (passcode === process.env.GUEST_PASSCODE) {
    return 'guest';
  } else if (passcode === process.env.MEMBER_PASSCODE) {
    return 'member';
  } else if (passcode === process.env.ADMIN_PASSCODE) {
    return 'admin';
  } else {
    return null;
  }
};

module.exports = {
  determineMembership,
};
