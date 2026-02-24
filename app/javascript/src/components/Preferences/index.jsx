import React, { useState, useEffect } from "react";

import preferencesApi from "apis/preferences";
import { Container, PageLoader, PageTitle } from "components/commons";
import { getFromLocalStorage } from "utils/storage";

import Form from "./Form";

const Preferences = () => {
  const [notificationDeliveryHour, setNotificationDeliveryHour] = useState("");
  const [shouldReceiveEmail, setShouldReceiveEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState("");
  const userId = getFromLocalStorage("authUserId");

  const updatePreference = async () => {
    setLoading(true);
    try {
      await preferencesApi.update({
        payload: {
          notification_delivery_hour: notificationDeliveryHour,
          should_receive_email: shouldReceiveEmail,
        },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmailNotification = async emailNotificationStatus => {
    setLoading(true);
    try {
      await preferencesApi.mail({
        payload: {
          should_receive_email: emailNotificationStatus,
        },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferenceDetails = async () => {
    try {
      const {
        data: {
          preference: { notification_delivery_hour, should_receive_email, id },
        },
      } = await preferencesApi.show();
      setNotificationDeliveryHour(notification_delivery_hour);
      setShouldReceiveEmail(should_receive_email);
      setPreferenceId(id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferenceDetails();
  }, []);

  if (pageLoading || !userId || !preferenceId) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Preferences" />
        <Form
          loading={loading}
          notificationDeliveryHour={notificationDeliveryHour}
          setNotificationDeliveryHour={setNotificationDeliveryHour}
          setShouldReceiveEmail={setShouldReceiveEmail}
          shouldReceiveEmail={shouldReceiveEmail}
          updateEmailNotification={updateEmailNotification}
          updatePreference={updatePreference}
        />
      </div>
    </Container>
  );
};

export default Preferences;
