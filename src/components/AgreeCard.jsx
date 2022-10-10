import React from 'react';
import '../styles/AgreeCard.css';

const AgreeCard = ({setAgreeIsClose, fail, updateInfo, setUpdateInfo, deleteId, setDeleteId}) => {

   const agreeBtn = () => {
      setAgreeIsClose(true);
      setUpdateInfo();
      setDeleteId();
   }

  return (
    <article className='agree'>
      <h2 className='agree__title'>Confirmation Message</h2>
      <p className='agree__p'>
         {
         (deleteId)?
            ((fail)?
               ('this user could not be delete'):
               ('this user was successfully delete')):
            ((updateInfo)?
               ((fail)?
                  ('this user could not be update'):
                  ('this user was successfully update')):
               ((fail)?
                  ('this user could not be created'):
                  ('this user was successfully created')))
         }
      </p>
      <button className='agree__btn' onClick={agreeBtn}>Agree</button>
    </article>
  )
}

export default AgreeCard;