// complaintShowcase.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Send,
  Trash,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function ComplaintShowcase({ complaint, onLocalUpvote }) {
  const [votes, setVotes] = useState(complaint.voteCount || 0); // Initialize with voteCount or 0
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);


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

  


  const handleUpvote = async () => {
    // If onLocalUpvote is provided, use it for local data
    if (onLocalUpvote) {
      onLocalUpvote();
      setVotes(votes + 1);
      return;
    }
    
    // Otherwise proceed with API call for backend data
    try {
      const id = localStorage.getItem("id");
      
      const res = await axios.patch(
        `http://localhost:5000/complaint/toggleUpvote/${complaint._id}/${id}`
      );
      
      if (res.data && res.data.complaint) {
        // Update votes with the new vote count from the response
        setVotes(res.data.complaint.voteCount || 0);
        toast.success(res.data.message || "Vote updated");
      }
    } catch (error) {
      console.error("Error upvoting:", error);
      toast.error("Failed to update vote");
    }
  };

  const handleDownvote = () => {
    // This would need to be implemented with backend integration
    // Similar to handleUpvote but using the downvote endpoint
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
              className="flex items-center gap-1 text-[#666668] hover:text-[#D7DADC] hover:bg-[#272729] px-2 py-1 rounded"
            >
              <MessageSquare size={16} />
              <span className="text-xs font-medium">Comment</span>
            </button>
            <button className="flex items-center hover:text-slate-300 text-[#666668] hover:bg-[#272729] px-2 py-1 rounded">
              <Trash className="h-4 w-4 " />
            </button>
          </div>

          {isCommentOpen && (
            <div className="mt-4  rounded-3xl border-[#343536] ">
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <div className="rounded-xl flex border-2 border-[#343536] rounded-2xlp-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="flex-1 border-gray-100 m-1 text-[#D7DADC] rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4fbcff]"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="bg-black text-white px-4 py-2 my-1 mr-1 rounded text-sm font-medium hover:bg-[#4fbcff]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={16} />
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
    _id: PropTypes.string.isRequired,
    user: PropTypes.string,
    postedBy: PropTypes.string,
    createdAt: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,
    voteCount: PropTypes.number,
    description: PropTypes.string.isRequired,
    upvote: PropTypes.arrayOf(PropTypes.string),  // Changed from upVote to upvote
    comments: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onLocalUpvote: PropTypes.func,
};

export default ComplaintShowcase;