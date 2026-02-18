import React from "react";

import { Button } from "components/commons";

const Comments = ({
  comments,
  loading,
  setNewComment,
  newComment,
  handleSubmit,
}) => (
  <>
    <form className="mx-auto mb-4 w-full space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">
          Comment
        </label>
        <textarea
          className="block w-full flex-1 resize-none rounded-md border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-gray-400 focus:ring-gray-400 sm:text-sm"
          placeholder="Ask a question or post an update"
          rows={3}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
      </div>
      <Button buttonText="Comment" loading={loading} type="submit" />
    </form>
    {comments.length > 0 && (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Comments</h2>
        <div className="flex flex-col gap-y-2">
          {comments.map((comment, index) => (
            <div
              className="flex justify-between rounded border border-gray-300 bg-gray-100 px-4 py-3 text-base leading-5"
              key={comment.id}
            >
              <p className="text-gray-800" key={index}>
                {comment.content}
              </p>
              <p className="text-gray-600">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default Comments;
