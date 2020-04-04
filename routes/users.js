const router = require("express-promise-router")();
const UsersController = require("../controllers/users");

router.route("/oauth/google").post(UsersController.googleOAuth);
router.route("/:id/event").get(UsersController.getEventTypesForUser);
router.route("/:id/schedule").get(UsersController.getScheduleForUser);
router.route("/:id/schedule").post(UsersController.createScheduleForUser);
router.route("/:id/event").post(UsersController.createNewEvent);

module.exports = router;
