import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import './listRooms.css'

function ListRooms() {

  const [rooms, setRooms] = useState([])
  const [initialRooms, setInitialRooms] = useState([])

  const handleOnChange = (e, roomId) => {
    const room = rooms.filter(x => x.id === roomId)[0]
    const initialRoom = initialRooms.filter(x => x.id === roomId)[0]

    console.log(room.occupant !== initialRoom.occupant)
    console.log(room.occupant, initialRoom.occupant)

    room.modified = room.occupant !== initialRoom.occupant
    room.occupant = e.target.value

    setRooms([...rooms.filter(x => x.id !== roomId), room].sort((a, b) => a.number - b.number))
  }

  useEffect(() => {

    const fetchItems = async () => {

      const data = await fetch('https://y7au2afiy2.execute-api.us-east-2.amazonaws.com/dev/api/rooms')
      const items = await data.json()
      setRooms(items.sort((a, b) => a.number - b.number))
      setInitialRooms(items.sort((a, b) => a.number - b.number))
    }
    
    fetchItems()
  }, [])

  return (
    <div className='container'>
      <Header />

      <div className="container__list">
        <div className="container__list-title">
          <h1>Name</h1>
          <h1>Number</h1>
          <h1>Occupant</h1>
        </div>
        {rooms.map(room => (

          <div key={room.id} className="container__list-item">
            <p>{room.name}</p>
            <p>{room.number}</p>
            <input onChange={(e) => handleOnChange(e, room.id)} type="text" value={room.occupant}/>
            {room.modified && <button>Save</button>}
          </div>
        ))}
      </div>

    </div>
  )
}

export default ListRooms