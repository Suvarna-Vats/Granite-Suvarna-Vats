# frozen_string_literal: true

class TaskLoggerJob
  include Sidekiq::Job

  def perform(task_id)
    task = Task.find(task_id)
    message = "A task was created with the following title: #{task.title}"

    log = Log.create!(task_id: task.id, message:)
    puts log.message
  end
end
