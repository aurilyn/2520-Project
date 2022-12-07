let database = require("../database");
let controller = require("../controller/userController")

let remindersController = {
  list: (req, res) => {
    if (!("passport" in req.session)) {
      res.render("auth/login")
      return
    }
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    res.render("reminder/index", { reminders: database[username].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  test: (req, res) => {
    res.render("auth/login");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    let searchResult = database[username].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[username].reminders });
    }
  },

  create: (req, res) => {
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    let reminder = {
      id: database[username].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[username].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    let reminderToFind = req.params.id;
    let searchResult = database[username].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    let searchResult = database[username].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    if (req.body.completed === "true") {
      searchResult.completed = true;
    } else if (req.body.completed === "false") {
      searchResult.completed = false;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let counter = 0
    let session_id = req.session.passport.user
    let user = controller.getUserById(session_id)
    let user_email = user.email.split("@")
    let username = user_email[0]
    for (item of database[username].reminders){
      if (item.id == reminderToFind) {
        database[username].reminders.splice(counter, 1)
        counter ++
      }
    }
    res.redirect("../index");
  },
};

  

module.exports = remindersController;
