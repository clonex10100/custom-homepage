class ApplicationController < ActionController::API
  before_action :authenticate_homepage, except: [:authenticate]
  def authenticate_homepage
    puts 'authenticated'
    jwt = request.authorization
    render json: { error: "JWT Authentication Failed"}, status: :unauthorized unless jwt 
    @homepage = Homepage.find(JsonWebToken.decode(jwt)['id'].to_i)
  end
end
