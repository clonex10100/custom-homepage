class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  before_action :authenticate_homepage
  def authenticate_homepage
    puts 'authenticated'
    jwt = cookies.signed[:jwt]
    render(json: { error: "JWT Authentication Failed"}) && return unless !!jwt
    @homepage = Homepage.find(JsonWebToken.decode(jwt)['id'].to_i)
  end
end
