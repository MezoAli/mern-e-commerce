export const getAllProducts = async (req, res) => {
  res.status(200).json({
    message: "All Products",
  });
};
