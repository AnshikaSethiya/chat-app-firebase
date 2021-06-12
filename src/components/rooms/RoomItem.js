import React from 'react'
import Timeago from 'timeago-react'

const RoomItem = ({ room }) => {

    const { createdAt, name } = room

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-disappear">{name}</h2>
                <Timeago 
                datetime={new Date(createdAt)} className="font-normal text-black-45"/>
            </div>

            <div className="d-flex align-items-center text-black-70">
                <span>No messages yet..</span>
            </div>
        </div>

    )
}

export default RoomItem
