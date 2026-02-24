# frozen_string_literal: true

module ApiResponders
  extend ActiveSupport::Concern

  private

    def render_error(message, status = :unprocessable_entity, context = {})
      is_exception = message.kind_of?(StandardError)
      error_message = is_exception ? message.record&.errors_to_sentence : message
      render status:, json: { error: error_message }.merge(context)
    end

    def render_notice(message, status = :ok, context = {})
      render status:, json: { notice: message }.merge(context)
    end

    def render_json(json = {}, status = :ok)
      render status:, json:
    end
end
