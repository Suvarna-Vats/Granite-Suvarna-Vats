# frozen_string_literal: true

class AddNotificationSettingsToPreferences < ActiveRecord::Migration[8.0]
  def change
    add_column :preferences, :notification_delivery_hour, :integer
    add_column :preferences, :should_receive_email, :boolean, default: true, null: false
    add_reference :preferences, :user, foreign_key: true
  end
end
