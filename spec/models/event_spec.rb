require 'rails_helper'

RSpec.describe Event, type: :model do

  describe "イベントの新規作成機能" do

    describe "イベント登録成功（正常系）" do
    before do
      @event = build(:event)
    end
        it "titleが1文字以上なら登録できる" do
          @event.title = "a"
          expect(@event).to be_valid
        end
        it "end_timeが無くても登録できる" do
          @event.end_time = ""
          expect(@event).to be_valid
        end
        it "colorが無くても登録できる" do
          @event.color = ""
          expect(@event).to be_valid
        end
        it "contentが無くても登録できる" do
          @event.content = ""
          expect(@event).to be_valid
        end
      end
      
    describe "カレンダー登録失敗（異常系）" do
      before do
        @event = build(:event)
      end
      context "titleカラムに関するもの" do
        it "titleが空の場合は登録できない" do
          @event.title = ""
          @event.valid?
          expect(@event.errors.full_messages).to include("Titleを入力してください")
        end
        it "titleが21文字以上の場合は登録できない" do
          @event.title = "012345678901234567890"
          @event.valid?
          expect(@event.errors.full_messages).to include("Titleは20文字以内で入力してください")
        end
      end
        
      context "contentカラムに関するもの" do
        it "31文字以上の場合は登録できない" do
          @event.content = "0123456789012345678901234567890"
          @event.valid?
          expect(@event.errors.full_messages).to include("Contentは30文字以内で入力してください")
        end
      end
        
      context "start_timeカラムに関するもの" do
        it "start_timeが空の場合は登録できない" do
          @event.start_time = ""
          @event.valid?
          expect(@event.errors.full_messages).to include("Start timeを入力してください")
        end
      end
        
      context "end_timeカラムに関するもの" do
        it "end_timeがstart_time以前の日時では登録できない" do
          @event.start_time = "2020-11-10 10:00"
          @event.end_time = "2020-10-10 10:00"
          @event.valid?
          expect(@event.errors.full_messages).to include("End timeは開始日時より遅い日時を選択してください")
        end
      end
    end
  end
end
