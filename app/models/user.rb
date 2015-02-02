class User < ActiveRecord::Base
  validates :firstname, presence: true
  validates :password, length: { minimum: 4, allow_nil: true }

  
  has_many :boards
  has_many :board_memberships
  has_many :card_assignments
  has_many :squares
  
  attr_reader :password
  after_initialize :ensure_session_token
  
  def self.find_by_credentials(user_params)
    user = User.find_by_firstname(user_params[:email])
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
  
  def set_initials
    self.initials = self.firstname[0].upcase + self.lastname[0].upcase
  end
  
  protected
  
  def ensure_session_token 
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
