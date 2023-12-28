export const asynchHandler = (fn) => {
  return (req, res, next) =>
    fn(req, res, next).catch((e) => {
      console.log(e);
      res.status(400).json({
        success: false,
        title: "Failed",
        message: "Something went wrong",
        error: e,
      });
    });
};
