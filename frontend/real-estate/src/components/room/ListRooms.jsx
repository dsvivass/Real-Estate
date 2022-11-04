import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import './listRooms.css'
import CreateRoom from './CreateRoom'

function ListRooms() {

  const url = 'https://y7au2afiy2.execute-api.us-east-2.amazonaws.com/dev'
  const [rooms, setRooms] = useState([])

  const handleOnChange = (e, roomId) => {
    const room = rooms.filter(x => x.id === roomId)[0]

    room.modified = true
    room.occupant = e.target.value

    setRooms([...rooms.filter(x => x.id !== roomId), room].sort((a, b) => b.number - a.number))
  }

  const handleUpdateOccupant = async (roomId) => {

    const room = rooms.filter(x => x.id === roomId)[0]

    const request = await fetch(`${url}/api/rooms/${roomId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
      })

    const response = await request.json()
    setRooms([...rooms.filter(x => x.id !== roomId), response].sort((a, b) => b.number - a.number))
  }

  const handleOnDelete = async (roomId) => {

    await fetch(`${url}/api/rooms/${roomId}`,
      {
        method: 'DELETE',
      })

    setRooms([...rooms.filter(x => x.id !== roomId)].sort((a, b) => b.number - a.number))
  }

  const updateRooms = (newRoom) => {
    setRooms([...rooms, newRoom].sort((a, b) => b.number - a.number))
  }

  useEffect(() => {

    const fetchItems = async () => {

      const data = await fetch(`${url}/api/rooms`)
      const items = await data.json()
      setRooms(items.sort((a, b) => b.number - a.number))
    }

    fetchItems()
  }, [])

  return (
    <div className='container'>
      <Header />

      <CreateRoom updateRooms={updateRooms} />

      <div className="container__list">
        <div className="container__list-title">
          <h2>Name</h2>
          <h2>Number</h2>
          <h2>Occupant</h2>
        </div>
        {rooms.map(room => (

          <div key={room.id} className="container__list-item">
            <p className="container__list-item-name" >{room.name}</p>
            <p className="container__list-item-number" >{room.number}</p>

            <div className="container__list-item-input-container">

              <input className="container__list-item-input" onChange={(e) => handleOnChange(e, room.id)} type="text" value={room.occupant} placeholder="Enter an occupant"/>
              {room.modified && <button className="container__list-item-update" onClick={() => handleUpdateOccupant(room.id)}>Save</button>}

            </div>

            <button className="container__list-item-delete" onClick={() => handleOnDelete(room.id)}>X</button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default ListRooms