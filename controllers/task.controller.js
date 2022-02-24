const task_service = require("../services/task/task.service");

module.exports = {
    create: async (req, res) => {
        try {
            await task_service.create(req, res);
        } catch (err) {
            var msg = err.message || "SOMETHING_WENT_WRONG";
            return res.status(422).json(responseData(msg, {}, 422, req));
        }
    },
    update: async (req, res) => {
        try {
            await task_service.update(req, res);
        } catch (err) {
            var msg = err.message || "SOMETHING_WENT_WRONG";
            return res.status(422).json(responseData(msg, {}, 422, req));
        }
    },
    Index: async (req, res) => {
        try {
            await task_service.index(req, res);
        } catch (err) {
            var msg = err.message || "SOMETHING_WENT_WRONG!";
            return res.status(422).json(responseData(msg, {}, 422, req));
        }
    },
};
