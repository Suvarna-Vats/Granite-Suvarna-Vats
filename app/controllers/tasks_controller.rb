# frozen_string_literal: true

class TasksController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error

  before_action :load_task, only: %i[ show update destroy ]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    tasks = policy_scope(Task)
    tasks_with_assigned_user = tasks.as_json(include: { assigned_user: { only: %i[id name email] } })
    render_json({ tasks: tasks_with_assigned_user })
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
    render_notice(t("successfully_updated", entity: "Task"))
  end

  def destroy
    authorize @task
    @task.destroy!
    render_notice(t("successfully_deleted", entity: "Task"))
  end

  private

    def load_task
      @task = Task.find_by!(slug: params[:slug])
    end

    def task_params
      params.require(:task).permit(:title, :assigned_user_id)
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end
end
