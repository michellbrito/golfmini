const router = require("express").Router();
const locationRoutes = require("./locations");
const seedRoutes = require("./seeds");

router.use("/locations", locationRoutes);
router.use("/seeds", seedRoutes);

module.exports = router;
