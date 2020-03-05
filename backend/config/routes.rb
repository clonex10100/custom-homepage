Rails.application.routes.draw do
  resources :homepages, only: [:show, :create] do
    resources :bookmark_modules, only: [:index, :create, :update]
    resources :note_modules, only: [:index, :create]
  end
  resources :bookmarks, only: [:create, :destroy]

  post '/homepages/authenticate', to: 'homepages#authenticate'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
