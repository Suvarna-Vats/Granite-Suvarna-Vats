# frozen_string_literal: true

class TodoNotificationService
  attr_reader :users_to_notify

  def initialize
    @users_to_notify = get_users_to_notify
  end

  def process
    notify_users
  end

  private

    def get_users_to_notify
      users = get_users_with_pending_tasks
      users_with_pending_notifications(users)
    end

    def notify_users
      users_to_notify.find_each do |user|
        UserNotificationsJob.perform_async(user.id)
      end
    end

    def get_users_with_pending_tasks
      User.includes(:assigned_tasks, :preference).where(
        tasks: { progress: "pending" },
        preferences: {
          should_receive_email: true,
          notification_delivery_hour: hours_till_now
        }
      )
    end

    def users_with_pending_notifications(users)
      notified_user_ids = UserNotification
        .where(last_notification_sent_date: Time.zone.today)
        .pluck(:user_id)
      users.where.not(id: notified_user_ids)
    end

    def hours_till_now
      current_hour = Time.now.utc.hour
      (0..current_hour)
    end
end
