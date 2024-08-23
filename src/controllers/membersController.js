const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const db = require('../db/queries');
const validateMembership = require('../validators/membershipValidators');
const { determineMembership } = require('../utils/membershipUtils');

exports.memberMembershipGet = (req, res) => {
  res.render('./views/membership', {
    title: 'Members Only | Change Membership',
    errors: [],
  });
};

exports.memberMembershipPost = [
  validateMembership,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('./views/membership', {
        title: 'Members Only | Change Membership',
        errors: errors.array(),
      });
    }

    const membershipStatus = determineMembership(req.body.passcode);

    await db.updateUser({ membershipStatus }, { req });

    res.redirect('/');
  }),
];
