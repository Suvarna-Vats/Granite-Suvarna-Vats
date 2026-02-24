# frozen_string_literal: true

if Rails.env.test?
  require "sidekiq/testing"
  Sidekiq::Testing.inline!
end

Sidekiq.configure_server do |config|
  config.redis = { url: Secvault.secrets.redis_url, size: 9 }
  unless Rails.env.test? || Rails.env.production?
    schedule_file = "config/scheduled_jobs.yml"

    if File.exist?(schedule_file)
      Sidekiq::Cron::Job.load_from_hash! YAML.load_file(schedule_file, aliases: true)[Rails.env]
    end
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: Secvault.secrets.redis_url, size: 1 }
end
