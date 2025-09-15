import React from 'react'
import {PenSquareIcon} from 'lucide-react'
import {Trash2Icon} from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'


const NoteCard = ({note}) => {
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-neon">
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content text-opacity-70 liness'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content text-opacity-60'>
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="h-4 w-4" />
                    <button className='btn btn-ghost btn-xs text-error'>
                        <Trash2Icon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard