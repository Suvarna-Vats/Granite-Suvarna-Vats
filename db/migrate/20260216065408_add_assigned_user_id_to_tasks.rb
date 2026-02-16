  # frozen_string_literal: true

  class AddAssignedUserIdToTasks < ActiveRecord::Migration[8.0]
    def change
      add_column :tasks, :assigned_user_id, :integer
    end
  end
