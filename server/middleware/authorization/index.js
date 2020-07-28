const isAdmin = () => {
  return async (req, res, next) => {
    if (!req.user.admin)
      return res.status(401).json({ error: 'Access denied' });
    next();
  };
};

module.exports = isAdmin;
