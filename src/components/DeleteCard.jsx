import React from 'react';
import '../styles/DeleteCard.css';

const DeleteCard = ({deleteUserById, deleteId, setDeleteId}) => {
  return (
   <article className='delete'>
   <h2 className='delete__title'>Confirmation Message</h2>
   <p className='delete__p'>Are you sure you want<br />to delete this user?</p>
   <div className='delete__buttons'>
   <button className='delete__btn' onClick={()=>setDeleteId()} >Cancel</button>
   <button className='delete__btn' onClick={()=>deleteUserById(deleteId)} >Accept</button>
   </div>
 </article>
  )
}

export default DeleteCard;