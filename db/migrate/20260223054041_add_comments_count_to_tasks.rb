# frozen_string_literal: true

class AddCommentsCountToTasks < ActiveRecord::Migration[8.0]
  def change
    add_column :tasks, :comments_count, :integer
  end
end
