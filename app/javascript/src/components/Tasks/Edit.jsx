import React, { useState, useEffect } from "react";

import tasksApi from "apis/tasks";
import { Container, PageLoader, PageTitle } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: { title },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: {
          task: { title },
        },
      } = await tasksApi.show(slug);
      setTitle(title);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Edit task" />
        <Form
          handleSubmit={handleSubmit}
          loading={loading}
          setTitle={setTitle}
          title={title}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;
