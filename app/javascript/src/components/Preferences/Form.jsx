import React from "react";

import classnames from "classnames";
import { Button } from "components/commons";

const Form = ({
  notificationDeliveryHour,
  setNotificationDeliveryHour,
  shouldReceiveEmail,
  setShouldReceiveEmail,
  loading,
  updatePreference,
  updateEmailNotification,
}) => {
  const onHandleDeliveryHourChange = event => {
    const regex = /^[0-9\b]*$/;
    const deliveryHour = event.target.value;
    if (!regex.test(deliveryHour)) return null;

    return setNotificationDeliveryHour(deliveryHour);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (shouldReceiveEmail) return updatePreference();

    return null;
  };

  const handleEmailNotificationChange = e => {
    setShouldReceiveEmail(e.target.checked);

    return updateEmailNotification(e.target.checked);
  };

  return (
    <form className="mb-4 w-full" onSubmit={handleSubmit}>
      <div className="mx-auto mb-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-800 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl">
        <div className="space-y-2 p-6">
          <div className="flex flex-grow-0 items-center justify-start">
            <input
              checked={shouldReceiveEmail}
              id="shouldReceiveEmail"
              type="checkbox"
              onChange={handleEmailNotificationChange}
            />
            <label className="ml-2 text-xl font-semibold">
              Pending tasks in email
            </label>
          </div>
          <p className="text-sm leading-normal">
            Send me a daily email of the pending tasks assigned to me. No email
            will be sent if there are no pending tasks.
          </p>
          <div className="flex items-center gap-2">
            <label className="text-base font-semibold">
              Delivery Time (Hours)
            </label>
            <input
              disabled={!shouldReceiveEmail}
              max={23}
              min={0}
              type="number"
              value={notificationDeliveryHour}
              className={classnames(
                "focus:shadow-outline-blue block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5",
                {
                  "cursor-not-allowed": !shouldReceiveEmail,
                }
              )}
              onChange={onHandleDeliveryHourChange}
            />
            <span className="block font-semibold">(UTC)</span>
          </div>
        </div>
      </div>
      <Button
        buttonText="Schedule Email"
        loading={loading}
        type="submit"
        className={classnames({
          "cursor-not-allowed bg-opacity-60": !shouldReceiveEmail,
        })}
      />
    </form>
  );
};

export default Form;
