# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :load_task, only: %i[ show update ]

  def index
    tasks = Task.all
    render status: :ok, json: { tasks: }
  end

  def show
    render_json({ task: @task })
  end

  def create
    task = Task.new(task_params)
    task.save!
    render_notice(t("successfully_created"))
  end

  def update
    @task.update!(task_params)
    render_notice(t("successfully_updated"))
  end

  private

    def load_task
      @task = Task.find_by!(slug: params[:slug])
    end

    def task_params
      params.require(:task).permit(:title)
    end
end
