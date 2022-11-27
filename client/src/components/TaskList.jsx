import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { editTask, getTasksForProject } from "../api/task";
import TaskListItem from "./TaskListItem";
import Button from 'react-bootstrap/Button';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { OPEN_ADD_TASK, SET_TASKS } from '../reducer/data_reducer';
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";
import Column from "./Column";
import { useState } from "react";
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./TaskList.css";


// Fake data items
const item = {
  id: "randomish",
  name: "Clean the house"
};


export default function TaskList() {
  // Faking data
  const [state, setState] = useState({
    "TO-DO": {
      title: "Todo",
      items: []
    },
    "IN-PROGRESS": {
      title: "In progress",
      items: []
    },
    "COMPLETED": {
      title: "Complete",
      items: []
    }
  });

  const { tasks, taskToEdit, taskToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();


  const { id } = useParams();


  useEffect(() => {
    getTasksForProject(id)
      .then((data) => {
        dispatch({
          type: SET_TASKS,
          tasks: data,
        });
      });
  }, [id]);

  const taskList = tasks.map((task) => {
    return (
      <TaskListItem
        key={task.id}
        task={task}
      />
    );
  });



  return (
    <>
      <div className="dnd-wrapper-container">
        <DragDropContext onDragEnd={e => console.log(e)}>
          {_.map(state, (data, key) => {
            return (
              <div className="dnd-column">
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="droppable-col"
                      >

                      </div>
                    );
                  }}
                </Droppable>
              </div>

            );
          })}

        </DragDropContext>
      </div>

      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
            <th scope="col">Assigned User</th>
            <th scope="col">Project ID</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>

      {taskToEdit && <EditTaskForm taskToEdit={taskToEdit} />}
      {taskToAdd && <TaskForm taskToAdd={taskToAdd} />}
      <Button onClick={() => dispatch({
        type: OPEN_ADD_TASK
      })}>Add New Task</Button>
    </>
  );
}
