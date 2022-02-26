import Format from 'response-format';

export const successWrapper = (handler) => async (req, res, next) => {
  try {
    const { message, data } = await handler(req, res, next);

    res.json(Format.success(message, data));
  } catch (err) {
    next(err);
  }
};
export default successWrapper;
