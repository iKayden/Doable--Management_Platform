import { useState } from "react";
import { createProject } from "../api/project";
import { useApplicationDispatch } from "../hooks/useApplicationData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CLOSE_ADD_PROJ } from "../reducer/data_reducer";
import { Form } from "react-bootstrap";

export default function ProjectForm() {
  const dispatch = useApplicationDispatch();
  const [project, setProject] = useState({ name: "", description: "", expected_end_date: "" });

  return (
    <Modal.Dialog>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch({
            type: CLOSE_ADD_PROJ,
          });
        }}
      >
        <Modal.Title>Add a New Project</Modal.Title>
      </Modal.Header>

      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          createProject(dispatch, project);
        }}
      >
        <Modal.Body>
          <input
            type="text"
            name="name"
            placeholder="Enter Project Name"
            value={project.name}
            onChange={(event) =>
              setProject((prev) => ({ ...prev, name: event.target.value }))
            }
          />

          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Project Description"
              value={project.description}
              onChange={(event) =>
                setProject((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </div>

          <Form.Group controlId="dob">
            <Form.Label>Expected Completion Date</Form.Label>
            <Form.Control
              type="date"
              name="expected_end_date"
              placeholder="Expected End Date"
              value={project.expected_end_date}
              onChange={(event) =>
                setProject((prev) => ({
                  ...prev,
                  expected_end_date: event.target.value,
                }))
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch({
                type: CLOSE_ADD_PROJ,
              });
            }}
          >
            Close
          </Button>
          {/* disable is used to disable submit button if name is missing. */}
          <Button
            variant="primary"
            type="submit"
            disabled={project.name === ""}
          >
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Dialog>
  );
}
