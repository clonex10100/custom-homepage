class PageModulesController < ApplicationController
  def index
    homepage = Homepage.find(params[:homepage_id])
    modules = homepage.page_modules.order('sort_priority asc')
    render json: PageModuleSerializer.json(modules)
  end

  def create
    homepage = Homepage.find(params[:homepage_id])
    mod = homepage.page_modules.build(page_module_params)
    mod.content = case params[:page_module][:type]
      when 'BookmarkContainer'
        BookmarkContainer.new
      when 'Note'
        Note.new
    end
    mod.save
    render json: PageModuleSerializer.json(mod)
  end

  def update
    homepage = Homepage.find(params[:homepage_id])
    mod = homepage.page_modules.find(params[:id])
    if mod.update(page_module_params)
      render json: PageModuleSerializer.json(mod)
    else
      render json: PageModuleSerializer.json(mod), status: :failed
    end
  end

  private
  def page_module_params
    params.require(:page_module).permit(:name, :sort_priority)
  end
end
