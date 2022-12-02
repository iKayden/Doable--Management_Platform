import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useParams } from 'react-router-dom';
import { deleteTask, getTasksForProject, updateTask } from '../api/task';
import TaskListItem from './TaskListItem';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import {
  OPEN_ADD_TASK,
  OPEN_EDIT_TASK,
  SET_TASKS,
  SET_USERS,
} from '../reducer/data_reducer';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';
import { getUsers, getUsersByProjectId } from '../api/user';

export default function TaskList() {
  const [state, setState] = useState();
  const [itemId, setItemId] = useState();
  const { users, tasks, taskToEdit, taskToAdd, projects } =
    useApplicationState();
  const dispatch = useApplicationDispatch();
  const { id } = useParams(); //Current Project ID(from URL)
  const [projectUsers, setProjectUsers] = useState([]);
  const [modalTask, setModalTask] = useState({
    name: '',
    status: '',
    assigned_user_id: '',
    deadline: '',
    description: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // getting users
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getTasksForProject(id).then((data) => {
      dispatch({
        type: SET_TASKS,
        tasks: data,
      });
    });
  }, [id]);

  useEffect(() => {
    getUsersByProjectId(id).then((users) => {
      setProjectUsers(users);
    });
  }, [id]);

  //Gets the project object of this task.
  const getCurrentProjectId = (objectArr, projId) => {
    return objectArr.find((project) => String(project.id) === String(projId));
  };
  // we already have 'projects' from useApplicationState and 'id' from useParams
  const currentProject = getCurrentProjectId(projects, id);
  // const usersOfThisProject =
  // console.log("currentProject", currentProject);

  // Filters to reassign status of the draggable item in DB for DnD
  useEffect(() => {
    const toDo = tasks
      .filter((task) => {
        return task.status === 'TO-DO';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    const inProgress = tasks
      .filter((task) => {
        return task.status === 'IN-PROGRESS';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    const completed = tasks
      .filter((task) => {
        return task.status === 'COMPLETED';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    setState({
      'TO-DO': {
        title: 'To-Do',
        items: toDo,
      },
      'IN-PROGRESS': {
        title: 'In-Progress',
        items: inProgress,
      },
      COMPLETED: {
        title: 'Complete',
        items: completed,
      },
    });
  }, [tasks]);

  const userAvatars = projectUsers
    // .filter(user => user === )
    .map((user) => {
      return (
        <img
          key={user.id}
          src={user.avatar}
          alt={user.name}
          className={'task-list__assigned-users__avatars'}
        />
      );
    });

  const taskList = tasks.map((task) => {
    return <TaskListItem key={`TaskListItem${task.id}`} task={task} />;
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    //creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    const draggedTask = tasks.find((task) => task.id == itemId);
    draggedTask.status = destination.droppableId;

    //for changing the number of completed tasks
    if (source.droppableId === 'COMPLETED') {
      draggedTask.taskStatusChange = -1;
    } else if (destination.droppableId === 'COMPLETED') {
      draggedTask.taskStatusChange = 1;
    } else draggedTask.taskStatusChange = 0;

    updateTask(dispatch, draggedTask);

    setState((prev) => {
      prev = { ...prev };
      //remove from prev item array
      prev[source.droppableId].items.splice(source.index, 1);
      // adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskListItem task={modalTask} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="task-list__projectName">
        {/* After we got current project name, we display its name. If refresh page, error of undefined could show up because context doesn't have it for now. ? tells web page it could be undefined, so it won't has error */}
        Project: {currentProject?.name}
        <Button
          variant="primary"
          size="lg"
          className="add-new-task__button"
          onClick={() =>
            dispatch({
              type: OPEN_ADD_TASK,
            })
          }
        >
          <i className="fa-solid fa-plus"></i> New Task{' '}
        </Button>
      </h1>
      <div className="task-list__project-users">
        Assigned Employees:
        <div className="task-list__avatars-wrapper">{userAvatars}</div>
      </div>
      <div className="dnd-wrapper-container">
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={(e) => setItemId(e.draggableId)}
        >
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={'dnd-column'}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={'droppable-col'}
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
                                    className={`draggable-item ${
                                      snapshot.isDragging && 'dragging'
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => {
                                      setModalTask(el);
                                      handleShow();
                                    }}
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
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({
                                              type: OPEN_EDIT_TASK,
                                              task: el,
                                            });
                                          }}
                                        ></i>
                                        {/* Delete Button */}
                                        <i
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTask(
                                              dispatch,
                                              el.id,
                                              el.status
                                            );
                                          }}
                                          className="fa-solid fa-trash-can"
                                        ></i>
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
}
