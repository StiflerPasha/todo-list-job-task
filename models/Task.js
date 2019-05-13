const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	 title: {
			type: String,
			required: true
	 },
	 isDone: {
			type: Boolean,
			default: false
	 },
	 date: {
			type: Date,
			default: Date.now
	 }
});

module.exports = mongoose.model('Tasks', TaskSchema);