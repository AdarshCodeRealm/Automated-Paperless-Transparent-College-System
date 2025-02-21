// complaintShowcase.jsx
import PropTypes from "prop-types"
import { useState } from "react"
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Send,
  Trash,
} from "lucide-react"

function ComplaintShowcase({ complaint }) {
  const [votes, setVotes] = useState(complaint?.votes ?? 0) // Safe initialization
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(complaint?.comments || []) // Safe initialization

  const handleDelete = () => {
    // Implement delete logic here
  }

  const handleUpvote = () => {
    setVotes((prev) => prev + 1)
  }

  const handleDownvote = () => {
    setVotes((prev) => prev - 1)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      setComments((prev) => [...prev, commentText])
      setCommentText("")
    }
  }

  if (!complaint) {
    // Very important: Handle the undefined complaint case!
    return <div>Loading...</div> // Or return null, or a placeholder
  }
  return (
    <div className="border-2 rounded-2xl m-2 flex items-center left-center p-4 px-24">
      <div className="max-w-2xl w-full">
        <div className="text-[#D7DADC]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-sm font-medium text-blue-500">
                u/{complaint.user}
              </span>
              <span className="text-xs text-[#666668]">•</span>
              <span className="text-xs text-[#666668]">
                Posted by {complaint.postedBy} / {complaint.timeAgo}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-slate-950 mb-2 font-bold">{complaint.title}</p>
            <p className="text-slate-700 text-sm">{complaint.content}</p>
          </div>

          {/* ... (rest of your ComplaintShowcase JSX - buttons, comments, etc.) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={handleUpvote}
                className="flex items-center text-[#666668] hover:bg-[#272729] p-1 rounded transition-colors"
              >
                <ArrowBigUp size={20} className="hover:text-orange-500" />
              </button>
              <span className="text-xs font-medium px-1">{votes}</span>
              <button
                onClick={handleDownvote}
                className="flex items-center text-[#666668] hover:bg-[#272729] p-1 rounded transition-colors"
              >
                <ArrowBigDown size={20} className="hover:text-blue-500" />
              </button>
            </div>
            <button
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              className="flex items-center gap-1 text-[#666668] hover:bg-[#272729] px-2 py-1 rounded"
            >
              <MessageSquare size={16} />
              <span className="text-xs font-medium">Comment</span>
            </button>
            <button className="flex items-center text-[#666668] hover:bg-[#272729] px-2 py-1 rounded">
              <Trash className="h-4 w-4 " /> {/* Trash icon with margin */}
            </button>
          </div>

          {isCommentOpen && (
            <div className="mt-4 border-t border-[#343536] pt-4">
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="flex-1 bg-[#272729] text-[#D7DADC] rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4fbcff]"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="bg-[#4fbcff] text-black px-4 py-2 rounded text-sm font-medium hover:bg-[#4fbcff]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={14} />
                    Comment
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-[#272729] rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-[#4fbcff]">
                        u/anonymous_user
                      </span>
                      <span className="text-xs text-[#666668]">•</span>
                      <span className="text-xs text-[#666668]">Just now</span>
                    </div>
                    <p className="text-sm text-[#D7DADC]">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
ComplaintShowcase.propTypes = {
  complaint: PropTypes.shape({
    // <-- Correct: Validate a single complaint object
    user: PropTypes.string.isRequired,
    postedBy: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}
export default ComplaintShowcase
