import axios from 'axios';
import { useEffect, useState } from 'react';
import AgreeCard from './components/AgreeCard';
import DeleteCard from './components/DeleteCard';
import FormUsers from './components/FormUsers';
import UserCard from './components/UserCard';

const baseURL = 'https://users-crud1.herokuapp.com';

function App() {

  const [users, setUsers] = useState();
  // esto para pasar informacion desde UserCard hasta FormUser //
  const [updateInfo, setUpdateInfo] = useState();
  // esto para los letreros de las confirmaciones //
  const [formIsClose, setFormIsClose] = useState(true);
  const [agreeIsClose, setAgreeIsClose] = useState(true);
  const [deleteIsClose, setDeleteIsClose] = useState(true);
  const [fail, setFail] = useState(false);
  // esto para pasar informacion desde UserCard hasta DeleteCard //
  const [deleteId, setDeleteId] = useState();

  // Para hacer el get de todos los users //
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`;
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // Para crear un nuevo usuario //
  const createNewUser = (data) => {
    const URL = `${baseURL}/users/`;
    axios.post(URL, data)
      .then(res => (
        getAllUsers(),
        setFail(false),
        setAgreeIsClose(false),
        console.log(res.data)))
      .catch(err => (
        setFail(true),
        setAgreeIsClose(false),
        console.log(err)));
  }

  // Para eliminar un usuario especifico //
  const deleteUserById = (id) => {
    const URL = `${baseURL}/users/${id}/`;
    axios.delete(URL)
      .then(res => (
        getAllUsers(),
        setFail(false),
        setAgreeIsClose(false),
        console.log(res.data)))
      .catch(err => (
        setFail(true),
        setAgreeIsClose(false),
        console.log(err)));
        setDeleteIsClose(true);
  }

  // para confirmar la eliminacion de un usuario //
  useEffect(() => {
    if(deleteId){
      setDeleteIsClose(false);
    }else{
      setDeleteIsClose(true);
    }
  }, [deleteId])

  // Para actualizar un usuario en especifico //
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`;
    axios.patch(URL, data)
      .then(res => (
        getAllUsers(),
        setFail(false),
        setAgreeIsClose(false),
        console.log(res.data)))
      .catch(err => (
        setFail(true),
        setAgreeIsClose(false),
        console.log(err)));
  }

  // esto para abrir el formulario //
  const handleOpenForm = () => {
    setFormIsClose(false);
  }

  return (
    <div className="App">
      <div className='App-container'>
      <h1 className='App__title'>Crud-Users</h1>
      <button onClick={handleOpenForm} className='App__btn'>Create a New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable__form'}`}>
        <FormUsers
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
        />
      </div>
      <div className={`agree-container ${agreeIsClose && 'disable__agree'}`}>
        <AgreeCard
          setAgreeIsClose={setAgreeIsClose}
          fail={fail}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />
      </div>
      <div className={`delete-container ${deleteIsClose && 'disable__delete'}`}>
        <DeleteCard
          deleteUserById={deleteUserById}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />
      </div>
      <div className='users-container'>
      {
        users?.map(user => (
          <UserCard
            key={user.id}
            user={user}
            setUpdateInfo={setUpdateInfo}
            setFormIsClose={setFormIsClose}
            setDeleteId={setDeleteId}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App;
