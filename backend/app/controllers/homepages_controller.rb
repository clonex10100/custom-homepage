class HomepagesController < ApplicationController
  skip_before_action :authenticate_homepage, except: [:show]

  def create
    homepage = Homepage.new(homepage_params)
    if homepage.save
      render json: {id: homepage.id, name: homepage.name, jwt: JsonWebToken.encode({id: homepage.id}) }
    else
      if homepage.errors.keys.include?(:name);
        error = "Homepage Name is taken";
      else
        error = "Passwords did not match"
      end
      render json: {error: error}, status: :unauthorized
    end
  end

  def show
    render json: {id: @homepage.id, name: @homepage.name}
  end

  def authenticate
    homepage = Homepage.find_by(name: params[:name])
    if homepage && homepage.authenticate(params[:password])
      render json: {id: homepage.id, name: homepage.name, jwt: JsonWebToken.encode({id: homepage.id}) }
    else
      render json: {error: 'homepage name or password incorrect'}, status: :unauthorized
    end
  end

  private
  def homepage_params
    params.require(:homepage).permit(:name, :password, :password_confirmation)
  end
end
