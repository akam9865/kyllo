require 'test_helper'

class BoardsControllerTest < ActionController::TestCase
  test "should get Lists" do
    get :Lists
    assert_response :success
  end

end
