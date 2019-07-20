const router = require("express").Router();
const messagesController = require("../../controllers/messagesController");

// Matches with "/api/messages"
router
  .route("/")
  .get(messagesController.findAll)
  .post(messagesController.create)
  .delete(messagesController.remove);

// Matches with "/api/messages/:id"
router
  .route("/:id")
  .get(messagesController.findOne)
  .put(messagesController.update);

module.exports = router;