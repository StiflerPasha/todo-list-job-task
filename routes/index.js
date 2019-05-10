const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
const dbUrl = `mongodb://Pasha:pasha11071992@cluster0-shard-00-00-yzddj.gcp.mongodb.net:27017,cluster0-shard-00-01-yzddj.gcp.mongodb.net:27017,cluster0-shard-00-02-yzddj.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

const db = mongojs(dbUrl);

// Get All Tasks
router.get("/tasks", (req, res, next) => {
	 db.tasks.find((err, tasks) => {
			if (err) {
				 res.send(err);
			}

			const data = [];
			Object.keys(tasks).forEach((key) => {
				 let val = tasks[key];
				 data.push([val.title, val._id, val.isDone]);
			});
			res.send(data);
	 });
});

//Save Task
router.post("/task", (req, res, next) => {
	 let task = req.body;
	 if (!task.title) {
			res.status(400);
			res.json({
				 error: "Bad Data"
			});
			console.log('WTF');
	 } else {
			db.tasks.save(task, (err, task) => {
				 if (err) {
						res.send(err);
				 }
				 res.json(task);
			});
	 }
});

// Delete Task
router.delete("/task/:id", (req, res, next) => {
	 db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
			if (err) {
				 res.send(err);
			}
			res.json(task);
	 });
});

// Update Task
router.put("/task/:id", (req, res, next) => {
	 let task = req.body;
	 let updTask = {};

	 updTask.title = task.title;
	 updTask.isDone = task.isDone;

	 if (!updTask) {
			res.status(400);
			res.json({
				 error: "Bad Data"
			});
	 } else {
			db.tasks.update(
				{_id: mongojs.ObjectId(req.params.id)}, updTask, {}, (err, task) => {
					 if (err) {
							res.send(err);
					 }
					 res.json(task);
				}
			);
	 }
});

module.exports = router;
