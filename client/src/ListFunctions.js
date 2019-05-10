import axios from "axios";

export const getList = () => {
	 return axios
		 .get("http://192.168.1.135:5000/api/tasks", {
				headers: {"Content-Type": "application/json"}
		 })
		 .then(res => res.data)
};

export const addTaskToList = term => {
	 return axios
		 .post(
			 "http://192.168.1.135:5000/api/task",
			 {
					title: term,
					isDone: false
			 },
			 {
					headers: {"Content-Type": "application/json"}
			 }
		 )
};

export const deleteTaskFromList = term => {
	 axios
		 .delete(`http://192.168.1.135:5000/api/task/${term}`, {
				headers: {"Content-Type": "application/json"}
		 })
		 .catch(error => console.log(error))
};

export const updateItem = (title, id, done) => {
	 return axios
		 .put(
			 `http://192.168.1.135:5000/api/task/${id}`,
			 {
					title: title,
					isDone: done
			 },
			 {
					headers: {"Content-Type": "application/json"}
			 }
		 )
};
