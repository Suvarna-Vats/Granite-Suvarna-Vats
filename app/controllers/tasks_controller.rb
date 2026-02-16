# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :load_task, only: %i[ show update destroy ]

  def index
    tasks = Task.all.as_json(include: { assigned_user: { only: %i[ id name ] } })
    render_json({ tasks: })
  end

  def show
    render
  end

  def create
    task = Task.new(task_params)
    task.save!
    render_notice(t("successfully_created", entity: "Task"))
  end

  def update
    @task.update!(task_params)
    render_notice(t("successfully_updated", entity: "Task"))
  end

  def destroy
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
end
