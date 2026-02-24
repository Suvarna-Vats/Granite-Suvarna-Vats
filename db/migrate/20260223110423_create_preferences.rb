# frozen_string_literal: true

class CreatePreferences < ActiveRecord::Migration[8.0]
  def change
    create_table :preferences do |t|
      t.timestamps
    end
  end
end
