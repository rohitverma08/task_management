const Task = require("../../models/task");
const { responseData } = require("../../helpers/responseData");

module.exports = {
  create: async (req, res) => {
    try {
      const request = req.body;
      var task = new Task();
      task.title = request.title;
      task.description = request.description;
      task.task_date = new Date(request.task_date);
      task.task_assign_to = request.task_assign_to;
      task.task_priority = request.task_priority;
      task.task_duration = request.task_duration;
      task.save(async function (err, result) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422, req));
          }
        } else {
          return res.json(responseData("TASK_CREATE", {}, 200, req));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422, req));
    }
  },
  update: async (req, res) => {
    try {
      var request = req.body;
      Task.findOne({ _id: request.id }, async function (err, result) {
        if (err || !result) {
          return res
            .status(422)
            .json(responseData("DATA_NOT_FOUND", {}, 422, req));
        } else {
          try {
            await Task.findOneAndUpdate({ _id: request.id }, { task_status: request.task_status });
            return res.json(responseData("TASK_UPDATED", {}, 200, req));
          } catch (err) {
            for (prop in err.errors) {
              var str = err.errors[prop].message;
              return res.status(422).json(responseData(str, {}, 422, req));
            }
          }
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  index: async (req, res) => {
    try {

      let { task_status, task_date, duration, task_priority, start_date, end_date } = req.query;
      whereStatement = {}
      if (task_status == undefined || task_status == '') {
        whereStatement.task_status = 'pending'
      } else {
        whereStatement.task_status = task_status
      }

      if (!(task_date == undefined || task_date === '')) {
        whereStatement.task_date = task_date
      }

      if (!(task_priority == undefined || task_priority === '')) {
        whereStatement.task_priority = task_priority
      }

      if (!((start_date == undefined || start_date === '') && (end_date == undefined || end_date === ''))) {
        whereStatement.task_date = { task_date: { $lte: start_date } }, { task_date: { $gte: end_date } }
      }

      /* if (duration != undefined || duration != '') {
        whereStatement.duration = duration
      } */
      Task.find(whereStatement, async function (err, result) {
        if (err || !result) {
          return res
            .status(422)
            .json(responseData("DATA_NOT_FOUND", {}, 422, req));
        } else {
          return res.json(responseData("DATA_RECEIVED", result, 200, req));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422, req));
    }
  },
};
