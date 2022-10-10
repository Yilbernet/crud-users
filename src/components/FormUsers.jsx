import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/FormUsers.css';

const defaultValues = {
   email: '',
   password: '',
   first_name: '',
   last_name: '',
   birthday: '',
}

const FormUsers = ({createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormIsClose}) => {

   const [typeDate, setTypeDate] = useState("text");

   const {handleSubmit, register, reset} = useForm();

   useEffect(() => {
      if(updateInfo){
         reset(updateInfo);
      }
   }, [updateInfo])

   const submit = (data) => {
      if(updateInfo){
         // actualizar usuario //
         updateUserById(updateInfo.id, data);
      }
      else {
         // crear usuario //
         createNewUser(data);
      }
      reset(defaultValues);
      setFormIsClose(true);
      setTypeDate("text");
   }

   const handleCloseForm = () => {
      setFormIsClose(true);
      setUpdateInfo();
      reset(defaultValues);
      setTypeDate("text");
   }

  return (
    <article>
      <form className='form' onSubmit={handleSubmit(submit)}>
         <i onClick={handleCloseForm} className="form__x fa-solid fa-xmark"></i>
         <h2 className='form__title'>{(updateInfo)?('Edit User'):('New User')}</h2>
         <div className='form__div'>
            <label className='form__label' htmlFor="email">Email</label>
            <input className='form__input' placeholder='Enter your email'
               type="email" onFocus={()=>setTypeDate("text")} id='email'
               {...register('email')} />
         </div>
         <div className='form__div'>
            <label className='form__label' htmlFor="password">Password</label>
            <input className='form__input' placeholder='Enter your password'
               type="password" onFocus={()=>setTypeDate("text")} id='password'
               {...register('password')} />
         </div>
         <div className='form__div'>
            <label className='form__label' htmlFor="firstName">FirstName</label>
            <input className='form__input' placeholder='Enter your first name'
               type="text" onFocus={()=>setTypeDate("text")} id='firstName'
               {...register('first_name')} />
         </div>
         <div className='form__div'>
            <label className='form__label' htmlFor="lastName">LastName</label>
            <input className='form__input' placeholder='Enter your last name'
               type="text" onFocus={()=>setTypeDate("text")} id='lastName'
               {...register('last_name')} />
         </div>
         <div className='form__div'>
            <label className='form__label' htmlFor="birthday">Birthday</label>
            <input className='form__input' placeholder='Enter your birthday'
               type={typeDate} onFocus={()=>setTypeDate("date")} id='birthday'
               {...register('birthday')} />
         </div>
         <button className='form__btn'>{(updateInfo)?('Update'):('Create')}</button>
      </form>
    </article>
  )
}

export default FormUsers;