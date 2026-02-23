# frozen_string_literal: true

class LoggerMessageBuilderService
  attr_reader :task

  def initialize(task)
    @task = task
  end

  def process!
    build_message
  end

  private

    def build_message
      if self_assigned?
        "A task titled '#{task.title}' was created and self-assigned to #{task_owner.name}."
      else
        "A task titled '#{task.title}' was created by #{task_owner.name} and is assigned to #{assigned_user.name}."
      end
    end

    def self_assigned?
      task.task_owner_id == task.assigned_user_id
    end

    def task_owner
      task_owner = User.find(task.task_owner_id)
    end

    def assigned_user
      assigned_user = User.find(task.assigned_user_id)
    end
end
