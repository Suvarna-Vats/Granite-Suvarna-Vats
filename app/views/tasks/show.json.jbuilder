# frozen_string_literal: true

json.task do
  json.extract! @task,
    :id,
    :slug,
    :title

  json.assigned_user do
    json.extract! @task.assigned_user,
      :id,
      :name
  end

  json.task_owner do
    json.extract! @task.task_owner,
      :name
  end

  json.comments @comments do |comment|
    json.extract! comment,
      :id,
      :content,
      :created_at
  end
end
