# frozen_string_literal: true

require "test_helper"
class UserNotificationsJobTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_task_mailer_jobs_are_getting_processed
    assert_difference -> { @user.user_notifications.count }, 1 do
      UserNotificationsJob.perform_async(@user.id)
    end
  end
end
