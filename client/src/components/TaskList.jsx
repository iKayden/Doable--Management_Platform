import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, getTasksForProject, updateTask } from "../api/task";
import TaskListItem from "./TaskListItem";
import Button from 'react-bootstrap/Button';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { OPEN_ADD_TASK, OPEN_EDIT_TASK, SET_TASKS } from '../reducer/data_reducer';
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";
import { useState } from "react";
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./TaskList.css";


export default function TaskList() {
  const [state, setState] = useState();
  const [itemId, setItemId] = useState();
  const { tasks, taskToEdit, taskToAdd, projects } = useApplicationState();
  const dispatch = useApplicationDispatch();
  const { id } = useParams(); //Current Project ID(from URL)

  useEffect(() => {
    getTasksForProject(id)
      .then((data) => {
        dispatch({
          type: SET_TASKS,
          tasks: data,
        });
      });
  }, [id]);

  //Gets the project object of this task.
  const getCurrentProjectId = (objectArr, projId) => {
    return objectArr.find((project) => String(project.id) === String(projId));
  };
  // we already have 'projects' from useApplicationState and 'id' from useParams
  const currentProject = getCurrentProjectId(projects, id);

  // Filters to reassign status of the draggable item in DB for DnD
  useEffect(() => {
    const toDo = tasks.filter((task) => {
      return task.status === "TO-DO";
    }).map(({ id, ...task }) => {
      return { id: String(id), ...task };
    });
    const inProgress = tasks.filter((task) => {
      return task.status === "IN-PROGRESS";
    }).map(({ id, ...task }) => {
      return { id: String(id), ...task };
    });
    const completed = tasks.filter((task) => {
      return task.status === "COMPLETED";
    }).map(({ id, ...task }) => {
      return { id: String(id), ...task };
    });
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
    });
  }, [tasks]);

  const taskList = tasks.map((task) => {
    return (
      <TaskListItem
        key={`TaskListItem${task.id}`}
        task={task}
      />
    );
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    //creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    const draggedTask = tasks.find((task) => task.id == itemId);
    draggedTask.status = destination.droppableId;
    updateTask(dispatch, draggedTask);

    setState(prev => {
      prev = { ...prev };
      //remove from prev item array
      prev[source.droppableId].items.splice(source.index, 1);
      // adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

      return prev;
    });
  };

  return (
    <>
      <h1
        className="task-list__projectName">
        {/* After we got current project name, we display its name */}
        Project: {currentProject.name}
        <Button
          variant="primary"
          size="lg"
          className="add-new-task__button"
          onClick={() => dispatch({
            type: OPEN_ADD_TASK
          })}><i className="fa-solid fa-plus"></i> New Task </Button>
      </h1>
      <div className="dnd-wrapper-container">
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={(e) => setItemId(e.draggableId)}>
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
                                    <div className="draggable-item__inside">
                                      {/* Task name goes here */}
                                      <div className="draggable-item__text">
                                        {el.name}
                                      </div>
                                      <div className="draggable-item__icons">
                                        {/* Edit Button */}
                                        <i
                                          className="fa-solid fa-pen-to-square"
                                          onClick={() => {
                                            dispatch({
                                              type: OPEN_EDIT_TASK,
                                              task: el
                                            });
                                          }}
                                        ></i>
                                        {/* Delete Button */}
                                        <i
                                          onClick={() => {
                                            deleteTask(dispatch, el.id);
                                          }}
                                          className="fa-solid fa-trash-can"></i>
                                      </div>
                                    </div>
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
      {/* Logic for modal pop ups */}
      {taskToEdit && <EditTaskForm taskToEdit={taskToEdit} />}
      {taskToAdd && <TaskForm taskToAdd={taskToAdd} />}

    </>
  );
};
