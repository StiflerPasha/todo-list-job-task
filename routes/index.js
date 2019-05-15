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


module.exports = router;
