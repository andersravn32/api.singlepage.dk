const jwt = require("jsonwebtoken");
const {compose, status} = require("../utilities/composer");
/* 
TODO:
- Handle authorization and append user object to request
- Handle route protection based on permissions
- Update status messages accordingly
*/

// auth or authQuery should always be the first middleware, never permission based middleware as they rely on the user object to function
const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    // Return correct status to end user
    return res.json(compose(status.AUTH.FAILED));
  }

  try {
    // Get accessToken from authorization header on request
    const accessToken = req.headers.authorization;
    // Decode JWT from headers
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (error, user) => {
        // token expired or other error occured, access token needs refresh
        if (error) {
          return res.json(compose(status.AUTH.FAILED))
        }

        // Remove issued at date and expiration date from user object
        delete user.iat;
        delete user.exp;

        // append user object to request for later use
        req.user = user;
        return next();
      }
    );
  } catch (error) {
    return res.json(compose(status.AUTH.FAILED))
  }
};

const authQuery = async (req, res, next) => {
  if (!req.query.token) {
    // Return correct status to end user
    return res.json(compose(status.AUTH.FAILED));
  }

  try {
    const accessToken = req.query.token;

    // Decode JWT from headers
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (error, user) => {
        // token expired or other error occured, access token needs refresh
        if (error) {
          return res.json(compose(status.AUTH.FAILED))
        }

        // Remove issued at date and expiration date from user object
        delete user.iat;
        delete user.exp;

        // append user object to request for later use
        req.user = user;
        return next();
      }
    );
  } catch (error) {
    return res.json(compose(status.AUTH.FAILED))
  }
};

// Checks user role for a permissionLevel matching the guest role
const guest = (req, res, next) => {
  // Higher level than 0, which is banned
  if (req.user.role.permissionLevel > 0) {
    return next();
  }
  return res.json(compose(status.USER.INSUFFICIENT_PERMISSIONS))
};

// Checks user role for a permissionLevel matching the member role
const member = (req, res, next) => {
  // Higher level than 0, which is guest role
  if (req.user.role.permissionLevel > 1) {
    return next();
  }
  return res.json(compose(status.USER.INSUFFICIENT_PERMISSIONS))
};

// Checks user role for a permissionLevel matching the moderator role
const moderator = (req, res, next) => {
  // Higher level than 0, which is member role
  if (req.user.role.permissionLevel > 2) {
    return next();
  }
  return res.json(compose(status.USER.INSUFFICIENT_PERMISSIONS))
};

// Checks user role for a permissionLevel matching the admin role
const admin = (req, res, next) => {
  // Higher level than 0, which is moderator role
  if (req.user.role.permissionLevel >= 3) {
    return next();
  }
  return res.json(compose(status.USER.INSUFFICIENT_PERMISSIONS))
};

module.exports = {
  auth,
  authQuery,

  guest,
  member,
  moderator,
  admin,
};