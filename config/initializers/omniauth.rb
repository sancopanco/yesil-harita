Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "176820222509186", "d5952ab13e2c638328fc869735764065"
end