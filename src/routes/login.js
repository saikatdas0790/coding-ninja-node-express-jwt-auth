export const post = async (req, res, next) => {
  res.end(JSON.stringify({ message: "great success" }));
};
