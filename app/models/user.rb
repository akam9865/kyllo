class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, uniqueness: true
  
  has_many :boards
  has_many :board_memberships
  has_many :card_assignments
  
  attr_reader :password
  after_initialize :ensure_session_token
  
  
  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password    
  end
  
  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
  
  protected
  
  def ensure_session_token 
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end