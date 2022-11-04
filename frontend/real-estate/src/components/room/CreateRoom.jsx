import React, { useState, useEffect } from 'react'
import './createRoom.css'

function CreateRoom({ updateRooms }) {

  const [newRoom, setNewRoom] = useState({
    name: '',
    number: '',
    occupant: '',
  })

  const [error, setError] = useState({
    isError: false,
    message: '',
  })

  const handleOnChange = (e) => {
    if (e.target.name === 'number' && !isNaN(e.target.value) && e.target.value > 0) {
      setNewRoom({ ...newRoom, [e.target.name]: parseInt(e.target.value) })
    } else {
      setNewRoom({
        ...newRoom,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleOnSubmit = async () => {

    const url = 'https://y7au2afiy2.execute-api.us-east-2.amazonaws.com/dev'

    const request = await fetch(`${url}/api/rooms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
      })

    const response = await request.json()

    if (request.status === 500) {
      setError({
        isError: true,
        message: 'An error occurred while creating the room, ensure that the room number is unique an is an integer'
      })
    } else if (request.status === 200) {
      updateRooms(response)
      setNewRoom({
        name: '',
        number: '',
        occupant: '',
      })

      setError({
        isError: false,
        message: ''
      })

    } else {
      setError({
        isError: true,
        message: response.message
      })
    }

  }

  useEffect(() => {
    if (newRoom.name === '' || newRoom.number === '') {
      setError({
        isError: true,
        message: 'Please enter a room name and number'
      })
    } else if (isNaN(newRoom.number)) {
      setError({
        isError: true,
        message: 'Please enter a valid room number'
      })
    } else {
      setError({
        isError: false,
        message: ''
      })
    }

  }, [newRoom])


  return (
    <div>
      <div className='create'>

        <input className="create__item-input" name='name' onChange={(e) => handleOnChange(e, 1)} type="text" placeholder='Room name' value={newRoom.name}/>

        <input className="create__item-input" name='number' onChange={(e) => handleOnChange(e, 1)} type="text" placeholder='Room number' value={newRoom.number}/>

        <input className="create__item-input" name='occupant' onChange={(e) => handleOnChange(e, 1)} type="text" placeholder='Occupant' value={newRoom.occupant}/>

        <button className='create__button' disabled={error.isError} onClick={() => handleOnSubmit()}> + Create room</button>
      </div>

      {error.isError && <p className='create__error'>{error.message}</p>}

    </div>
  )
}

export default CreateRoom