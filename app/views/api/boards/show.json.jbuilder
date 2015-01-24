json.extract! @board, :id, :title, :created_at, :updated_at

json.members @board.members do |member|
	json.id member.id
	json.email member.email
end

json.lists @board.lists do |list|
	json.extract! list, :title, :id, :ord, :created_at, :updated_at
end