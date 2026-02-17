# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 255
  MIN_PASSWORD_LENGTH = 6
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  MAX_EMAIL_LENGTH = 255

  has_many :assigned_tasks, foreign_key: :assigned_user_id, class_name: "Task"
  has_many :created_tasks, foreign_key: :task_owner_id, class_name: "Task"
  has_secure_password
  has_secure_token :authentication_token
  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_destroy :assign_task_to_task_owner
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end

    def assign_task_to_task_owner
      tasks_whose_owner_is_not_current_user = assigned_tasks.where.not(task_owner_id: id)
      tasks_whose_owner_is_not_current_user.find_each do |task|
        task.update!(assigned_user_id: task.task_owner_id)
      end
    end
end
