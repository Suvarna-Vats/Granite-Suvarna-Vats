# frozen_string_literal: true

class TasksController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error

  before_action :load_task, only: %i[ show update destroy ]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :ensure_authorized_update_to_restricted_attrs, only: :update

  def index
    tasks = policy_scope(Task)

    @pending_tasks = tasks.includes(:assigned_user).of_status(:pending)
    @completed_tasks = tasks.of_status(:completed)
  end

  def show
    authorize @task
    @comments = @task.comments.order("created_at DESC")
    render
  end

  def create
    task = current_user.created_tasks.new(task_params)
    authorize task
    task.save!
    render_notice(t("successfully_created", entity: "Task"))
  end

  def update
    authorize @task
    @task.update!(task_params)
    render_notice(t("successfully_updated", entity: "Task")) unless params.key?(:quiet)
  end

  def destroy
    authorize @task
    @task.destroy!
    render_notice(t("successfully_deleted", entity: "Task")) unless params.key?(:quiet)
  end

  private

    def load_task
      @task = Task.find_by!(slug: params[:slug])
    end

    def task_params
      params.require(:task).permit(:title, :assigned_user_id, :progress, :status)
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end

    def ensure_authorized_update_to_restricted_attrs
      is_editing_restricted_params = Task::RESTRICTED_ATTRIBUTES.any? { |attr| task_params.key?(attr) }

      is_not_owner = @task.task_owner_id != @current_user.id
      if is_editing_restricted_params && is_not_owner
        handle_authorization_error
      end
    end
end
