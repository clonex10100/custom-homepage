class PageModuleSerializer
  def self.json(page_module)
    options = {
      only: [:id, :name, :content_type]
    }
    page_module.to_json(options)
  end
end
