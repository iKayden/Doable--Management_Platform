import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button } from "react-bootstrap";
import {
  useApplicationState,
  useApplicationDispatch,
} from "../hooks/useApplicationData";
import { OPEN_ADD_TASK } from "../reducer/data_reducer";
import { useParams} from "react-router-dom";
import { getUsersByProjectId } from "../api/user";

export default function TaskTabs() {
  const { id } = useParams(); //Current Project ID(from URL)
  const { projects } = useApplicationState();
  const [projectUsers, setProjectUsers] = useState([]);
  const dispatch = useApplicationDispatch();

  console.log("projects", projects);

  useEffect(() => {
    getUsersByProjectId(id).then((users) => {
      setProjectUsers(users);
    });
  }, [id]);

  const userAvatars = projectUsers.map((user) => {
    return (
      <img
        key={user.id}
        src={user.avatar}
        alt={user.name}
        className={"task-list__assigned-users__avatars"}
      />
    );
  });

  //Gets the project object of this task.
  const getCurrentProjectId = (objectArr, projId) => {
    return objectArr.find((project) => String(project.id) === String(projId));
  };
  // we already have 'projects' from useApplicationState and 'id' from useParams
  const currentProject = getCurrentProjectId(projects, id);


  return (
    <Tabs
      defaultActiveKey="details"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="details" title="Project Details">
        <h3 className="task-list__projectName">
          {/* After we got current project name, we display its name. If refresh page, error of undefined could show up because context doesn't have it for now. ? tells web page it could be undefined, so it won't has error */}
          Current Project: {currentProject?.name}
        </h3>
          Start Date: { currentProject.start_date }
          <div>Deadline: { currentProject.expected_end_date }</div>
      </Tab>
      <Tab eventKey="members" title="Members">
        <div className="task-list__project-users">
          Assigned Members:
          <div className="task-list__avatars-wrapper">{userAvatars}</div>
        </div>
        
      </Tab>
      <Tab eventKey="files" title="Files">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="secret" title="Secret" disabled>
        {/* <Sonnet /> */}
      </Tab>
                      {/* New Task Button */}
                      <Button
            variant="primary"
            className="add-new-task__button"
            onClick={() =>
              dispatch({
                type: OPEN_ADD_TASK,
              })
            }
          >
            <i className="fa-solid fa-plus"></i> New Task{" "}
          </Button>
    </Tabs>
  );
}
