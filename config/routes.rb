Trello::Application.routes.draw do
  root "static_pages#root"
  
  resources :users
  resource :session
  
  
  namespace :api, defaults: { format: :json }  do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :destroy]
    resources :cards, only: [:create, :update, :destroy, :show]
    resources :items, only: [:create, :update, :destroy]
    resources :squares
    resources :users
  end
end