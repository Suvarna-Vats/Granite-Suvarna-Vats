# frozen_string_literal: true

class UserNotification < ApplicationRecord
  belongs_to :user

  validates :last_notification_sent_date, presence: true
  validate :last_notification_sent_date_is_valid_date
  validate :last_notification_sent_date_cannot_be_in_the_past

  private

    def last_notification_sent_date_is_valid_date
      if last_notification_sent_date.present?
        Date.parse(last_notification_sent_date.to_s)
      end
    rescue ArgumentError
      errors.add(:last_notification_sent_date, "must be a valid date")
    end

    def last_notification_sent_date_cannot_be_in_the_past
      if last_notification_sent_date.present? &&
          last_notification_sent_date < Time.zone.today
        errors.add(:last_notification_sent_date, "can't be in the past")
      end
    end
end
