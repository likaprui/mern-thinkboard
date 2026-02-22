import { Link } from "react-router"
import type { Note } from "../types/note"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import {formatDate} from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"


interface NoteCardProps {
  note: Note
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NoteCard = ({note,setNotes}:NoteCardProps) => {

  const handleDelete = async(e:any,id:any) =>{
    e.preventDefault()
    if(!window.confirm("Are you sure?")) return

    try{
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id !== id ))
      toast.success("note deleted successfully")
    }catch(error){
      console.log("Error in handleDelete", error)
      toast.error("Failed to delete note")
    }
  }
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition_all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="line-clamp-3 text-base-content/70">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4"/>
                <button onClick={(e)=>handleDelete(e,note._id)} className="btn btn-ghost btn-xs text-error">
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
        </div>

      </div>
    </Link>
  )
}

export default NoteCard
