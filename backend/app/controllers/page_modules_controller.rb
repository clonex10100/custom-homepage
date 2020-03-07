class PageModulesController < ApplicationController
  def index
    homepage = Homepage.find(params[:homepage_id])
    modules = homepage.page_modules
    render json: PageModuleSerializer.json(modules)
  end
end
