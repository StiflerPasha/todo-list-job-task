const express = require("express");
const router = express.Router();
const Task = require('../models/Task');


//GET ALL TASKS
router.get("/tasks", async (req, res, next) => {
	 try {
			const tasks = await Task.find();

			const data = [];
			Object.keys(tasks).forEach((key) => {
				 let val = tasks[key];
				 data.push([val.title, val._id, val.isDone]);
			});

			res.json(data);
	 } catch (err) {
			res.json({message: err})
	 }
});

//SUBMIT A TASK
router.post('/task', async (req, res, next) => {
	 const task = new Task({
			title: req.body.title
	 });
	 try {
			const saveTask = await task.save();
			res.json(saveTask)
	 } catch (err) {
			res.json({message: err})
	 }
});

//DELETE A TASK
router.delete('/task/:id', async (req, res, next) => {
	 try {
			const removedTask = await Task.deleteOne({_id: req.params.id});
			res.json(removedTask);
	 } catch (err) {
			res.json({message: err})
	 }
});

//UPDATE A TASK
router.patch('/task/:id', async (req, res, next) => {
	 let task = req.body;
	 let updTask = {};
	 updTask.title = task.title;
	 updTask.isDone = task.isDone;

	 try {
			const updatedTask = await Task.updateOne(
				{_id: req.params.id},
				{$set: updTask}
				);
			res.json(updatedTask);
	 } catch (err) {
			res.json({message: err})
	 }
});




/*// Get All Tasks
router.get("/tasks", (req, res, next) => {
	 db.tasks.find((err, tasks) => {
			if (err) {
				 res.send(err, 'Hello');
			}

			const data = [];
			Object.keys(tasks).forEach((key) => {
				 let val = tasks[key];
				 data.push([val.title, val._id, val.isDone]);
			});
			res.send(data);
	 });
});*/

/*// Save Task
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
});*/

/*// Delete Task
router.delete("/task/:id", (req, res, next) => {
	 db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
			if (err) {
				 res.send(err);
			}
			res.json(task);
	 });
});*/

/*// Update Task
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
});*/


module.exports = router;
