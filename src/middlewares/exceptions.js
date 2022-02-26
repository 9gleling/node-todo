import Format from 'response-format';

export const notFoundException = (req, res, next) => {
  const err = new Error('notFound');
  err.name = 'notFound';

  next(err);
};

export const exceptions = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const errorMap = new Map([
    ['badRequest', Format.badRequest],
    ['unAuthorized', Format.unAuthorized],
    ['notFound', Format.notFound],
  ]);
  let responseFormat;
  const error = errorMap.get(err.name);

  if (error) responseFormat = error(message);
  else responseFormat = Format.create(400, true, message);

  res.status(status).send(responseFormat);

  next();
};
