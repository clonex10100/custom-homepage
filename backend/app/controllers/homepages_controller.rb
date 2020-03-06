class HomepagesController < ApplicationController

  def authenticate
    homepage = Homepage.find_by(name: params[:name])
    if homepage
      render json: {id: homepage.id, name: homepage.name, jwt: JsonWebToken.encode({id: homepage.id}) }
    else
      render json: {error: 'homepage name or password incorrect'}, status: :unauthorized
    end
  end
end
