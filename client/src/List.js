import React, {Component} from "react";
import {getList, addTaskToList, deleteTaskFromList, updateItem} from "./ListFunctions";

class List extends Component {
	 state = {
			id: "",
			term: "",
			items: []
	 };

	 componentDidMount() {
			this.getAll();
	 }

	 getAll = () => {
			getList().then(data => {
				 this.setState({
							term: "",
							items: [...data]
					 }
				 );
			});
	 };

	 onChange = event => {
			this.setState({term: event.target.value,});
	 };

	 onSubmit = event => {
			event.preventDefault();
			addTaskToList(this.state.term).then(() => {
				 this.getAll();
			});
	 };

	 onDelete = (val) => {
			deleteTaskFromList(val);

			let data = [...this.state.items];
			data.forEach((item, index) => {
				 if (item[1] === val) {
						data.splice(index, 1);
				 }
			});
			this.setState({items: [...data]});
	 };

	 onUpdate = (title, id, done) => {
			updateItem(title, id, !done).then(() => {
				 this.getAll();
			});
	 };

	 render() {
			return (
				<div>
					 <form onSubmit={this.onSubmit.bind(this)}>
							<TaskInput value={this.state.term || ""}
												 onChange={this.onChange.bind(this)}
												 onSubmit={this.onSubmit.bind(this)}/>

							<TaskList items={this.state.items}
												onDelete={this.onDelete.bind(this)}
												onUpdate={this.onUpdate.bind(this)}/>
					 </form>

				</div>
			);
	 }
}

export const TaskInput = ({value, onChange, onSubmit}) => {
	 return (
		 <div className="input-group mb-5 d-flex justify-content-center">
				<div className="input-group-prepend">
					 <input
						 type="text"
						 className="form-control is-valid"
						 id="exampleInputEmail1"
						 value={value}
						 onChange={onChange}
						 placeholder="Enter the task..."
						 aria-label="ToDo task"
						 aria-describedby="button-addon2"
						 autoComplete='off'
					 />
					 <div className="input-group-append">
							<button
								className="btn btn-outline-info ml-3"
								type="submit"
								id="button-addon2"
								onClick={onSubmit}
							>Add_Task
							</button>
					 </div>

				</div>
		 </div>
	 );
};

export const TaskList = ({items, onDelete, onUpdate}) => {
	 return (
		 <table className="table">
				<tbody>
				{items.map((item, index) => (
					<tr key={index}>
						 <td>
								<button type='check-box'
									className="btn btn-outline-secondary btn-sm"
									onClick={() => onUpdate(item[0], item[1], item[2])}
								>Done
								</button>
						 </td>
						 <td className="text-left"
								 style={item[2] ? {textDecoration: 'line-through'} : {'': ''}}>

								{item[0]}
						 </td>
						 <td className="text-right ">
								<button
									className="btn btn-danger"
									onClick={() => onDelete(item[1])}
								>Delete
								</button>
						 </td>
					</tr>
				))}
				</tbody>
		 </table>
	 )
};

export default List;
