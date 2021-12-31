const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  const id = res.locals.id;
  res.cookie('ssid', id, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, // cookie should last one hour
  });
  return next();
};

module.exports = cookieController;
