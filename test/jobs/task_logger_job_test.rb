# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class TaskLoggerJobTest < ActiveSupport::TestCase
  def setup
    @task = create(:task)
  end

  def test_logger_runs_once_after_creating_a_task
    Sidekiq::Testing.fake! do
      assert_difference -> { TaskLoggerJob.jobs.size }, 1 do
        TaskLoggerJob.perform_async(@task.id)
      end
    end
  end

  def test_log_count_increments_on_running_task_logger
    assert_difference "Log.count", 1 do
      TaskLoggerJob.new.perform(@task.id)
    end
  end
end
