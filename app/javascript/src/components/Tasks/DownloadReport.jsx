import React, { useState, useEffect } from "react";

import tasksApi from "apis/tasks";
import { Container, PageTitle, Toastr } from "components/commons";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const generatePdf = async () => {
    try {
      await tasksApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const { data } = await tasksApi.download();
      saveAs({ blob: data, fileName: "granite_task_report.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Download report" />
        <h1>{message}</h1>
      </div>
    </Container>
  );
};

export default DownloadReport;
