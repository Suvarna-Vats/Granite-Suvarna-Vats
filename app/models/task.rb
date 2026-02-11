# frozen_string_literal: true

class Task < ApplicationRecord
  MAX_TASK_TITLE_LENGTH = 125
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  validates :title,
    presence: true,
    length: { maximum: MAX_TASK_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
end
