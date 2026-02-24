# frozen_string_literal: true

require "test_helper"

class TodoNotificationsJobTest < ActiveSupport::TestCase
  def setup
    @user = create(:task).assigned_user # assignee of the generated task
    default_mail_delivery_time = "#{Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR}:00 AM"
    travel_to DateTime.parse(default_mail_delivery_time)
  end

  def test_todo_notification_job_sends_email_to_users_with_pending_tasks
    assert_difference -> { @user.user_notifications.count }, 1 do
      TodoNotificationsJob.perform_async
    end
  end
end
