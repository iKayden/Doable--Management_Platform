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


export default function TaskList() {
  // Faking data
  const [text, setText] = useState("");
  const [state, setState] = useState();

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

  useEffect(() => {
    console.log("TASKS from TASKLIST", tasks);
    const toDo = tasks.filter((task) => {
      return task.status === "TO-DO"
    }).map(({id, name}) => {
      return {id: String(id), name}
    })
    const inProgress = tasks.filter((task) => {
      return task.status === "IN-PROGRESS"
    }).map(({id, name}) => {
      return {id: String(id), name}
    })
    const completed = tasks.filter((task) => {
      return task.status === "COMPLETED"
    }).map(({id, name}) => {
      return {id: String(id), name}
    })
    setState({
      "TO-DO": {
        title: "To-Do",
        items: toDo
      },
      "IN-PROGRESS": {
        title: "In-Progress",
        items: inProgress
      },
      "COMPLETED": {
        title: "Complete",
        items: completed
      }
    })
  }, [tasks])

  const taskList = tasks.map((task) => {
    return (
      <TaskListItem
        key={task.id}
        task={task}
      />
    );
  });

  const handleDragEnd = ({ destination, source }) => {

    if (!destination) return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    //creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState(prev => {
      prev = { ...prev };
      //remove from prev item array
      prev[source.droppableId].items.splice(source.index, 1);
      // adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

      return prev;
    });
  };

  // const addItem = () => {
  //   setState(prev => {
  //     return {
  //       ...prev,
  //       "TO-DO": {
  //         title: "title",
  //         items: [
  //           {
  //             id: ????,
  //             name: text
  //           },
  //           ...prev["TO-DO"].items
  //         ]
  //       }
  //     };
  //   });
  //   setText("");
  // };


  return (
    <>
      {/* <div className="d-block">
        <input type={"text"} value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          className="d-inline"
          onClick={addItem}
        >
          Add
        </Button>
      </div> */}
      <div className="dnd-wrapper-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"dnd-column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`draggable-item ${snapshot.isDragging && "dragging"}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
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
};
