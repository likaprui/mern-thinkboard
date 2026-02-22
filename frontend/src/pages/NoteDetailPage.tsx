import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react"
import type { Note } from "../types/note"

const NoteDetailPage = () => {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  // ✅ Fetch Note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        toast.success("Note loaded")
      } catch (error) {
        toast.error("Failed to fetch note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  // ✅ Delete Note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?"))
      return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete note")
    }
  }

  // ✅ Save Note
  const handleSave = async () => {
    if (!note) return

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title and content")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      toast.error("Error saving note")
    } finally {
      setSaving(false)
    }
  }

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    )
  }

  // ✅ Safety Guard (TypeScript fix)
  if (!note) return null

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5 mr-2" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5 mr-2" />
              Delete Note
            </button>
          </div>

          {/* CARD */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">

              {/* TITLE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>

              {/* CONTENT */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>

                <textarea
                  placeholder="Write note content..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              {/* SAVE BUTTON */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage