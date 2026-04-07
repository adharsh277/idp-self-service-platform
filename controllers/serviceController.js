function createService(req, res) {
  const { serviceName, environment } = req.body || {};

  if (
    typeof serviceName !== 'string' ||
    typeof environment !== 'string' ||
    serviceName.trim() === '' ||
    environment.trim() === ''
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'serviceName and environment are required',
    });
  }

  return res.json({
    status: 'success',
    message: `Service ${serviceName} will be created in ${environment}`,
  });
}

module.exports = {
  createService,
};