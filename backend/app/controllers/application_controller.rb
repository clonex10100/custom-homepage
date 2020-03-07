class ApplicationController < ActionController::API
  #before_action :authenticate_homepage, except: [:authenticate]
  def authenticate_homepage
    jwt = request.authorization
    puts request.authorization
    puts JsonWebToken.decode(jwt)
    render json: { error: "JWT Authentication Failed"}, status: :unauthorized unless jwt && JsonWebToken.decode(jwt)[:id] == params[:id]
  end
end
