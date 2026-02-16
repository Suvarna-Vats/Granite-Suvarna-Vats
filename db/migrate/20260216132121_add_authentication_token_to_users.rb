# frozen_string_literal: true

class AddAuthenticationTokenToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :authentication_token, :string
  end
end
