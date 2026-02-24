# frozen_string_literal: true

require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @task = create(:task, assigned_user: @user, task_owner: @user)
  end

  def test_task_should_not_be_valid_without_user
    @task.assigned_user = nil
    assert_not @task.save
    assert_includes @task.errors.full_messages, "Assigned user must exist"
  end

  def test_task_title_should_not_exceed_maximum_length
    @task.title = "a" * (Task::MAX_TASK_TITLE_LENGTH + 1)
    assert_not @task.valid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[title title_1 title! -title- _title_ /title 1]

    valid_titles.each do |title|
      @task.title = title
      assert @task.valid?
    end
  end

  def test_validation_should_reject_invalid_title
    invalid_titles = %w[/ *** __ ~ ...]

    invalid_titles.each do |title|
      @task.title = title
      assert @task.invalid?
    end
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(0)
    end
  end

  def test_task_count_increases_on_saving
    assert_difference ["Task.count"] do
      create(:task)
    end
  end

  def test_task_count_decreases_on_deleting
    assert_difference ["Task.count"], -1 do
      @task.destroy
    end
  end

  def test_task_slug_is_parameterized_title
    title = @task.title
    @task.save!
    assert_equal title.parameterize, @task.slug
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-task"
    first_task = Task.create!(title:, assigned_user: @user, task_owner: @user)
    second_task = Task.create!(title:, assigned_user: @user, task_owner: @user)
    third_task = Task.create!(title:, assigned_user: @user, task_owner: @user)
    fourth_task = Task.create!(title:, assigned_user: @user, task_owner: @user)

    assert_equal "#{title.parameterize}-4", fourth_task.slug

    third_task.destroy

    expected_slug_suffix_for_new_task = fourth_task.slug.split("-").last.to_i + 1

    new_task = Task.create!(title:, assigned_user: @user, task_owner: @user)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_task}", new_task.slug
  end

  def test_existing_slug_prefixed_in_new_task_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_task = Task.create!(title: title_having_new_title_as_substring, assigned_user: @user, task_owner: @user)
    assert_equal title_having_new_title_as_substring.parameterize, existing_task.slug

    new_task = Task.create!(title: new_title, assigned_user: @user, task_owner: @user)
    assert_equal new_title.parameterize, new_task.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"

    existing_task = Task.create!(
      title: title_having_new_title_as_ending_substring, assigned_user: @user,
      task_owner: @user)
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_task.slug

    new_task = Task.create!(title: new_title, assigned_user: @user, task_owner: @user)
    assert_equal new_title.parameterize, new_task.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_task = Task.create!(title: title_with_numbered_substring, assigned_user: @user, task_owner: @user)
    assert_equal title_with_numbered_substring.parameterize, existing_task.slug

    substring_of_existing_slug = "buy"
    new_task = Task.create!(title: substring_of_existing_slug, assigned_user: @user, task_owner: @user)

    assert_equal substring_of_existing_slug.parameterize, new_task.slug
  end

  def test_creates_multiple_tasks_with_unique_slug
    tasks = create_list(:task, 10, assigned_user: @user, task_owner: @user)
    slugs = tasks.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
