# frozen_string_literal: true

class AddStatusToTasks < ActiveRecord::Migration[8.0]
  def change
    add_column :tasks, :status, :string, default: "unstarred", null: false
  end
end
