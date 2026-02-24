# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/task_mailer
class TaskMailerPreview < ActionMailer::Preview
  def pending_tasks_email
    TaskMailer.with(preview: true).pending_tasks_email(User.first.id)
  end
end
