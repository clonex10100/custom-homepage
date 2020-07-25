Rails.application.routes.draw do
  get root to: redirect('/frontend/index.html')
  resource :homepage, only: [:create, :show] do
    resources :page_modules, only: [:index, :create, :update, :destroy] do
      resource :content, only: [:show, :create, :update]
      resources :bookmarks, only: [:create, :destroy]
    end
    post '/login', to: 'homepages#login'
    post '/logout', to: 'homepages#logout'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
