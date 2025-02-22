// complaintShowcase.jsx
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Send,
  Trash,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function ComplaintShowcase({ complaint }) {
  const [votes, setVotes] = useState(0); // Initialize votes to 0
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
useEffect(() => {
  console.log(complaint?.voteCount);
})
 

  function formatSocialMediaDate(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    } else if (now.getFullYear() === date.getFullYear()) {
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  }

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleUpvote = async () => {
    try {
      const id = localStorage.getItem("id");
      console.log(id);
      setVotes((prev) => prev + 1);
      
      const res =await axios.patch(
        `http://localhost:5000/complaint/toggleUpvote/${complaint._id}/${id}`
      );
      console.log(res);
      toast.success("Upvoted");
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = () => {
    setVotes((prev) => Math.max(0, prev - 1)); // Decrement votes, but not below 0
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments((prev) => [...prev, commentText]);
      setCommentText("");
    }
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-2 rounded-2xl m-2 flex items-center left-center p-4 px-24">
      <div className="max-w-2xl w-full">
        <div className="text-[#D7DADC]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-sm font-medium text-blue-500">
                anonymous/
              </span>
              <span className="text-xs text-[#666668]"></span>
              <span className="text-xs text-[#666668]">
                raised at {formatSocialMediaDate(complaint.createdAt)}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-slate-950 mb-2 font-bold">{complaint.title}</p>
            <p className="text-slate-700 text-sm">{complaint.description}</p>
          </div>

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
              <Trash className="h-4 w-4 " />
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
  );
}

ComplaintShowcase.propTypes = {
  complaint: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Added _id validation
    user: PropTypes.string.isRequired,
    postedBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired, // Added createdAt validation
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    upVote: PropTypes.arrayOf(PropTypes.string).isRequired, // Corrected prop type
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ComplaintShowcase;