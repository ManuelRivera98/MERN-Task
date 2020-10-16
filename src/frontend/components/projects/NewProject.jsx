import React, { useState, useContext } from 'react';

// Context
import projectContext from '../../context/projects/context';

const NewProject = () => {
  const [project, setProject] = useState({
    name: '',
  });
  const { name } = project;

  // Consume context's projects
  const projectState = useContext(projectContext);
  const {
    showForm, error, showFormFn, addProjectFn, showErrorFn,
  } = projectState;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === '') return showErrorFn(true);
    addProjectFn(project);
    showErrorFn(false);

    // Reset values project
    return setProject({
      name: '',
    });
  };

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primary"
        onClick={() => showFormFn(!showForm)}
      >
        New Project
      </button>

      {showForm && (
        <form
          className="form-new-project"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={name}
            className="input-text"
            placeholder="Project's name"
            onChange={handleChange}
          />

          <input
            type="submit"
            value="Add project"
            className="btn btn-primary btn-block"
          />
        </form>
      )}
      { error && <p className="message error">Project name is required</p>}
    </>
  );
};

export default NewProject;
