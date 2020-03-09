Rails.application.routes.draw do
  resources :homepages, only: [:show, :create] do
    resources :page_modules, only: [:index, :create, :update] do
      resource :content, only: [:show, :create, :update]
      resources :bookmarks, only: [:create, :destroy]
    end
  end

  post '/homepages/authenticate', to: 'homepages#authenticate'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
