import React from "react";
import { useState } from "react";
import "./AddTask.css";

function AddTask() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [InProcess, setInProcess] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [eidtRecord, setEidtRecord] = useState({
    isEdit: false,
    index: null,
  });
  const [temp, setTemp] = useState([]);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const addRecord = () => {
    if (message !== "") {
      if (eidtRecord.isEdit && temp.length !== 0) {
        data[eidtRecord.index] = message;
        temp.length = 0;
        setEidtRecord((state) => {
          return { ...state, isEdit: false };
        });
        setMessage("");
      }
      if (!eidtRecord.isEdit) {
        setData((previousData) => [...previousData, message]);
        setMessage("");
      }
    }
  };
  const removeProduct = (index) => {
    console.log(index);
    setData([...data.slice(0, index), ...data.slice(index + 1, data.length)]);
  };
  const removeBookMark = (index) => {
    setCompleted([
      ...completed.slice(0, index),
      ...completed.slice(index + 1, data.length),
    ]);
  };

  const moveTaskToProcess = (index) => {
    if (InProcess.indexOf(data[index]) === -1) {
      setInProcess([...InProcess, data[index]]);
      setData([...data.slice(0, index), ...data.slice(index + 1, data.length)]);
    }
  };

  const backToTaskAssign = (index) => {
    setData([...data, InProcess[index]]);
    setInProcess([
      ...InProcess.slice(0, index),
      ...InProcess.slice(index + 1, data.length),
    ]);
  };

  const toCompleted = (index) => {
    let comp = completed[index];
    let dat = data[index];
    if (comp === dat) return;
    if (completed.indexOf(InProcess[index]) === -1) {
      setCompleted([...completed, InProcess[index]]);
      setInProcess([
        ...InProcess.slice(0, index),
        ...InProcess.slice(index + 1, data.length),
      ]);
    }
    if (completed.indexOf(data[index]) === -1) {
      setCompleted([...completed, data[index]]);
    }
  };
  const editTask = (index) => {
    setMessage(data[index]);
    setEidtRecord((state) => {
      return { ...state, isEdit: true, index };
    });
    setTemp([...temp, data[index]]);
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="input-group my-3 addTask">
            <input
              type="text"
              id="inputID"
              name="message"
              onChange={(e) => handleChange(e)}
              value={message}
              className="form-control"
              placeholder="Add Task"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="addIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
                onClick={addRecord}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-center">Active</h3>
            {data.map((element, index) => {
              return (
                <div className="row d-flex justify-content-center" key={index}>
                  <div className="input-group d-flex justify-content-between my-3 taskAssign">
                    <div className="taskDiv">
                      <h5>{element}</h5>
                    </div>
                    <div className="iconsDiv">
                      <span className="delIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "0.5rem" }}
                          width="20"
                          height="20"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          onClick={() => removeProduct(index)}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "0.5rem" }}
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          onClick={() => editTask(index)}
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          viewBox="0 0 512 512"
                          width="20"
                          height="20"
                          style={{ marginRight: "0.5rem" }}
                          onClick={() => moveTaskToProcess(index)}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 384 512"
                          onClick={() => toCompleted(index)}
                        >
                          {" "}
                          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-center">In Active</h3>
            {InProcess.map((element, index) => {
              return (
                <div className="row d-flex justify-content-center" key={index}>
                  <div className="input-group d-flex justify-content-between my-3 taskAssign">
                    <div className="taskDiv">
                      <h5>{element}</h5>
                    </div>
                    <div className="iconsDiv">
                      <span className="delIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          viewBox="0 0 512 512"
                          width="20"
                          height="20"
                          style={{ marginRight: "0.5rem" }}
                          onClick={() => backToTaskAssign(index)}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                        </svg>
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 384 512"
                          onClick={() => toCompleted(index)}
                        >
                          {" "}
                          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                        </svg> */}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-center">Bookmark</h3>
            {completed.map((element, index) => {
              return (
                <div className="row d-flex justify-content-center" key={index}>
                  <div className="input-group d-flex justify-content-between my-3 taskAssign">
                    <div className="taskDiv">
                      <h5>{element}</h5>
                    </div>
                    <div className="iconsDiv">
                      <span className="delIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          width="20"
                          height="20"
                          fill="currentColor"
                          style={{ marginRight: "0.5rem" }}
                          onClick={() => removeBookMark(index)}
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;
