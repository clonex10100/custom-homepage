Rails.application.routes.draw do
  resource :homepage, only: [:show] do
    resources :page_modules, only: [:index, :create, :update] do
      resource :content, only: [:show, :create, :update]
      resources :bookmarks, only: [:create, :destroy]
    end
    post '/authenticate', to: 'homepages#authenticate'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
