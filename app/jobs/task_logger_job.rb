# frozen_string_literal: true

class TaskLoggerJob
  include Sidekiq::Job

  def perform(task_id)
    task = Task.find(task_id)
    message = LoggerMessageBuilderService.new(task).process!

    log = Log.create!(task_id: task.id, message: message)
    puts log.message
  end
end
