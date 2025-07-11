import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const MemberCard = ({member,id}: {member: {name:string},id:string}) => {
    const {attributes, listeners, setNodeRef, transform} = useSortable({
        id
    })
    const style = {
        transition: 'transform 0.2s ease-in-out',
        transform: CSS.Transform.toString(transform)
    }
  return (
    <div ref={setNodeRef} style={style} className='flex items-center justify-between border p-2 rounded-md' {...attributes} {...listeners}>
                            <div>
                                <p className="text-[16px]">{member.name}</p>
                            </div>
                        </div>
  )
}

export default MemberCard