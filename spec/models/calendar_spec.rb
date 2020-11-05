require 'rails_helper'

RSpec.describe Calendar, type: :model do

  describe "カレンダーの新規作成機能" do
    
    describe "カレンダー登録成功（正常系）"
    before do
      @calendar = build(:calendar)
    end
      context "nameカラムに関するもの" do
        it "nameが1文字以上なら登録できる" do
          @calendar.name = "a"
          expect(@calendar).to be_valid
        end
        it "nameが12文字以内なら登録できる" do
          @calendar.name = "abcdefghijkl"
          expect(@calendar).to be_valid
        end
      end
      
    describe "カレンダー登録失敗（異常系）" do
      context "nameカラムに関するもの" do
        it "nameが空の場合は登録できない" do
          @calendar.name = ""
          @calendar.valid?
          expect(@calendar.errors.full_messages).to include("Nameを入力してください")
        end
        
        it "nameの文字数が12文字より長い場合は登録できない" do
          @calendar.name = "abcdefghijklm"
          @calendar.valid?
          expect(@calendar.errors.full_messages).to include("Nameは12文字以内で入力してください")
        end
      end
    end
  end



  # describe "カレンダーの編集機能" do
  # end

  # describe "カレンダーの削除機能" do
  # end
  
end
