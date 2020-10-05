class RiskMatrix < ApplicationRecord
  has_many :fmeas
  validates :scale, presence: true
  validates :scale, numericality: { only_integer: true, greater_than: 0, less_than: 11 }
end
