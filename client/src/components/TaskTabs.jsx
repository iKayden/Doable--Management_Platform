import "./TaskList.css";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useApplicationState } from "../hooks/useApplicationData";
import { useParams, Link } from "react-router-dom";
import { getUsersByProjectId } from "../api/user";

export default function TaskTabs() {
  const { id } = useParams(); //Current Project ID(from URL)
  const { projects } = useApplicationState();
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    getUsersByProjectId(id).then((users) => {
      setProjectUsers(users);
    });
  }, [id]);

  console.log(projectUsers);

  const users = projectUsers.map((user) => {
    return (
      <>
        <Link
          to="#"
          onClick={(e) => {
            window.location.href = `mailto:${user.email}`;
            e.preventDefault();
          }}
        >
          <img
            key={user.id}
            src={user.avatar}
            alt={user.name}
            className={"task-list__assigned-users__avatars"}
          />
        </Link>{" "}
        {user.name}
      </>
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
      <Tab
        tabClassName="tasklist_tabs"
        eventKey="details"
        title="Project Details"
      >
        <p>
          <h4 className="task-list__projectName">
            {/* After we got current project name, we display its name. If refresh page, error of undefined could show up because context doesn't have it for now. ? tells web page it could be undefined, so it won't has error */}
            You are currently working on: <b>{currentProject?.name}</b>
          </h4>
        </p>
        <p>
          <b>Description:</b> {currentProject.description}
        </p>
        <div id="task-list__dates">
          <p>
            <b>
              Start Date: {new Date(currentProject.start_date).toDateString()}{" "}
            </b>
          </p>
          <p>

            <b>
              Deadline:{" "}
              {new Date(currentProject.expected_end_date).toDateString()}{" "}
            </b>
          </p>
        </div>
      </Tab>
      <Tab tabClassName="tasklist_tabs" eventKey="members" title="Members">
        <div className="task-list__avatars-wrapper">{users}</div>
      </Tab>
      <Tab tabClassName="tasklist_tabs" eventKey="files" title="Files"></Tab>
      <Tab eventKey="secret" title="Secrets" disabled></Tab>
    </Tabs>
  );
}
