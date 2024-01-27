import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [filterTerm]);

  const fetchData = () => {
    const apiUrl = filterTerm
      ? `http://localhost:7000/api/getTask?task_name=${filterTerm}`
      : 'http://localhost:7000/api/getTask';

    axios
      .get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:7000/api/deleteTask/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        // If deletion is successful, fetch the updated data
        fetchData();
        alert('Task deleted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editTask = (taskId) => {
    navigate(`/editTask/${taskId}`);
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/createNew');
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-5">
        TASK LIST

      </h1>
      <div className="flex mb-2 bg-white p-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
        <label htmlFor="filterTerm" className="text-lg font-bold">
          Filter by Task Name:
        </label>
        <input
          style={{ width: "300px" }}
          type="text"
          id="filterTerm"
          name="filterTerm"
          className="border border-black p-2 ml-5"
          value={filterTerm}
          placeholder='Enter task name'
          onChange={(e) => setFilterTerm(e.target.value)}
        />
      </div>
      <div style={{width:'100%'}}>
      <button
          type="button"
          onClick={handleAddClick}
          style={{ zIndex: 9999,position: 'fixed', right: '30px', buttom: '20px' }}
          className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" /> ADD
        </button>
      </div>

      {tasks.map((task) => (
        <div className=" my-5" style={{ width: "750px" }} key={task._id}>
          {/* <div style={{ width: '200px' }}></div> */}
          <div
            className=" p-8 bg-white items-right rounded-lg shadow-lg"
          >
            <h1 className="text-xl font-bold">Task: {task.task_name}</h1>
            <p>Description: {task.description}</p>
            <p>
              {task.due_date ? task.due_date.slice(0, 10) : 'No due date'}
            </p>
            <p
              style={{
                color:
                  task.priority === 'high'
                    ? 'maroon'
                    : task.priority === 'medium'
                      ? 'blue'
                      : 'green',
              }}
            >
              {task.priority.toUpperCase()}
              <div className='mt-2' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    editTask(task._id);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteTask(task._id);
                  }}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                </button>
              </div>
            </p>
          </div>

        </div>
      ))}

      
    </div>
  );
};

export default ViewTask;
