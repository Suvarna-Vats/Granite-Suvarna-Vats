class TasksController < ApplicationController
  def index
    @tasks = Task.all
    respond_with(@tasks)
  end
end
