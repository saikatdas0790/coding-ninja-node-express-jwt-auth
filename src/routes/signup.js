export const post = async (req, res, next) => {
  console.log(req.body);
  res.end(JSON.stringify({ message: "great success" }));
};
