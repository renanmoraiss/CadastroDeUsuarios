import "./styles.css";
import TrashButton from "../../assets/trash_Home.svg";
import api from "../../services/api";
import {useEffect} from "react";
import {useState} from "react";
import {useRef} from "react";

function Home() {
  const [dataUsers, set_dataUsers] = useState([])

  const input_name = useRef()
  const input_age = useRef()
  const input_email = useRef()

  async function getDataUsers() {
    const dataUsersFromAPI = await api.get("/users")
    set_dataUsers(dataUsersFromAPI.data)
  }

  async function createUserWithData() {
    await api.post("/users", {
      name: input_name.current.value,
      age: input_age.current.value,
      email: input_email.current.value
    })
    getDataUsers()
  }

  async function deleteUserWithData(user_id) {
    await api.delete(`/users/${user_id}`)
    getDataUsers()
  }

  useEffect(() => {
    getDataUsers()
  }, [])

  return (
    <div className="container">
      <h1 className="title">Create Account</h1>
      <p className="description">use your email for registration:</p>
      <form className="inputs">
        <input className="input_name" name="name" type="text" placeholder="Name" ref={input_name}/>
        <input className="input_age" name="age" type="number" placeholder="Age" ref={input_age}/>
        <input className="input_email" name="email" type="email" placeholder="Email" ref={input_email}/>
        <button type="button" className="register_button" onClick={createUserWithData}>Register</button>
      </form>

      {dataUsers.map((user) => (
        <div className="dataUsers" key={user.id}>
          <div className="data">
            <p className="placeholder_input">ID: <span>{user.id}</span></p>
            <p className="placeholder_input">Name: <span>{user.name}</span></p>
            <p className="placeholder_input">Age: <span>{user.age}</span></p>
            <p className="placeholder_input">Email: <span>{user.email}</span></p>
          </div>
          <div className="trash">
            <button className="delete_button" onClick={() => deleteUserWithData(user.id)}>
              <img src={TrashButton} className="image_trash"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
