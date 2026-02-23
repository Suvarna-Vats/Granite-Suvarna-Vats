# frozen_string_literal: true

require "test_helper"

class LoggerMessageBuilderServiceTest < ActiveSupport::TestCase
  def setup
    @task_owner = create(:user, name: "Oliver Smith", id: 1)
    @assigned_user = create(:user, name: "Alice Jones", id: 2)
    @task_title_1 = "Check Assignments"
    @task_title_2 = "Prepare Report"
    @self_assigned_task = create(:task, title: @task_title_1, task_owner_id: 1, assigned_user_id: 1)
    @other_assigned_task = create(:task, title: @task_title_2, task_owner_id: 1, assigned_user_id: 2)
  end

  def test_should_return_self_assigned_message
    service = LoggerMessageBuilderService.new(@self_assigned_task)
    message = service.process!

    expected_message = "A task titled '#{@task_title_1}' was created and self-assigned to #{@task_owner.name}."
    assert_equal expected_message, message
  end

  def test_should_return_other_assigned_message
    service = LoggerMessageBuilderService.new(@other_assigned_task)
    message = service.process!

    expected_message = "A task titled '#{@task_title_2}' was created by #{@task_owner.name} and is assigned to #{@assigned_user.name}."
    assert_equal expected_message, message
  end
end
