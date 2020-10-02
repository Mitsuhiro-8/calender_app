Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'
  }
  root "calendars#index"
  resources :label_colors, only: [:index, :new, :create, :edit, :update], path: 'color'
  resources :users, only: [:index, :edit, :update]
  resources :calendars do
    resources :events
    resources :comments
  end
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
