Rails.application.routes.draw do
  #resources :bookmarks
  resources :bookmark_modules, only: [:index]
  resources :bookmarks, only: [:create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
