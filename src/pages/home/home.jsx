import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input } from "antd";
import axios from "axios";

const URL = "https://to-dos-api.softclub.tj";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [desc, setDesc] = useState("");
  const [desc2, setDesc2] = useState("");
  const [file, setFile] = useState([]);
  const [id2, setId2] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/to-dos`);
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const addTodo = async () => {
    try {
      let formData = new FormData();
      formData.append("Name", name);
      formData.append("Description", desc);
      for (let i = 0; i < file.length; i++) {
        formData.append("Images", file[i]);
      }
      await axios.post(`${URL}/api/to-dos`, formData);
      setName("");
      setDesc("");
      setFile([]);
      setIsModalOpen(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${URL}/api/to-dos?id=${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImg = async (imgId) => {
    try {
      await axios.delete(`${URL}/api/to-dos/images/${imgId}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const addImg = async (todoId, files) => {
    try {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("Images", files[i]);
      }
      await axios.post(`${URL}/api/to-dos/${todoId}/images`, formData);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (todo) => {
    setId2(todo.id);
    setName2(todo.name);
    setDesc2(todo.description);
    setIsEditModalOpen(true);
  };

  const editTodo = async () => {
    try {
      await axios.put(`${URL}/api/to-dos`, {
        id: id2,
        name: name2,
        description: desc2,
      });
      setIsEditModalOpen(false);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Todo
      </Button>

      <Modal
        title="Add Todo"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={addTodo}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input type="file" multiple onChange={handleFileChange} />
      </Modal>

      <Modal
        title="Edit Todo"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={editTodo}
      >
        <Input
          placeholder="Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Description"
          value={desc2}
          onChange={(e) => setDesc2(e.target.value)}
        />
      </Modal>

      {data.map((todo) => (
        <div key={todo.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.isCompleted ? "Active" : "Inactive"}</p>

          {todo.images.map((img) => (
            <div key={img.id} style={{ marginBottom: 10 }}>
              <img
                src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                width="200"
                alt=""
                style={{ display: "block", marginBottom: 5 }}
              />
              <Input
                type="file"
                multiple
                style={{ width: "200px", marginBottom: 5 }}
                onChange={(e) => addImg(todo.id, e.target.files)}
              />
              <Button danger onClick={() => deleteImg(img.id)}>
                Delete Image
              </Button>
            </div>
          ))}

          <div style={{ marginTop: 10 }}>
            <Button danger onClick={() => deleteTodo(todo.id)} style={{ marginRight: 5 }}>
              Delete
            </Button>
            <Link to={`/about/${todo.id}`}>
              <Button style={{ marginRight: 5 }}>Info</Button>
            </Link>
            <Button onClick={() => openEditModal(todo)}>Edit</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
