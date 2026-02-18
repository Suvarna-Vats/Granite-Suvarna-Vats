import React, { useEffect, useState } from "react";

import commentsApi from "apis/comments";
import tasksApi from "apis/tasks";
import Comments from "components/Comments";
import { Button, Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [task, setTask] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const history = useHistory();

  const updateTask = () => {
    history.push(`/tasks/${task.slug}/edit`);
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: { task },
      } = await tasksApi.show(slug);
      setTask(task);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const addComment = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await commentsApi.create({
        content: newComment,
        task_id: task.id,
      });
      fetchTaskDetails();
      setNewComment("");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-semibold">{task?.title}</h2>
            <div className="flex items-center gap-x-6">
              <p className="text-base text-gray-700">
                <span className="font-semibold">Assigned to: </span>
                {task?.assigned_user?.name}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-semibold">Created by: </span>
                {task?.task_owner?.name}
              </p>
            </div>
          </div>
          <Button
            buttonText="Edit"
            icon="edit-line"
            size="small"
            style="secondary"
            onClick={updateTask}
          />
        </div>
        <Comments
          comments={task?.comments}
          handleSubmit={addComment}
          loading={loading}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </div>
    </Container>
  );
};

export default Show;
