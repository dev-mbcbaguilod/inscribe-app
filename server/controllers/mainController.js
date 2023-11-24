/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  const locals = {
    title: "Inscribe.",
    description: "Capture your ideas instantly, whenever inspiration strikes.",
  }
  res.render('index', {
    locals,
    layout: '../views/layouts/front-page'
  });
}