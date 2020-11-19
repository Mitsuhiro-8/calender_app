require 'rails_helper'

RSpec.describe User, type: :model do

  describe "ユーザーの新規作成機能" do
    
    describe "ユーザー登録成功（正常系）" do
      before do
        @user = build(:user)
      end
      it "name,email,password,password_confirmationが正常な値なら登録できる" do
        expect(@user).to be_valid
      end
      it "passwordが7文字以上なら登録できる" do
        user = build(:user, password: "1234567", password_confirmation: "1234567")
        expect(user).to be_valid
      end
    end
      
    describe "ユーザー登録失敗（異常系）" do
      before do
        @user = create(:user)
      end
      context "nameカラムに関するもの" do
        it "nameが空の場合は登録できない" do
          @user.name = ""
          @user.valid?
          expect(@user.errors.full_messages).to include("Nameを入力してください")
        end
        
        it "重複したnameが存在する場合登録できない" do
          another_user = build(:user, name: @user.name)
          another_user.valid?
          expect(another_user.errors.full_messages).to include("Nameはすでに存在します")
        end
      end

      context "emailカラムに関するもの" do
        it "emailが空の場合は登録できない" do
          @user.email = ""
          @user.valid?
          expect(@user.errors.full_messages).to include("Eメールを入力してください")
        end

        it "重複したemailが存在する場合登録できない" do
          another_user = build(:user, email: @user.email)
          another_user.valid?
          expect(another_user.errors.full_messages).to include("Eメールはすでに存在します")
        end
      end

      context "passwordカラムに関するもの" do
        it "passwordが6文字以下の場合は登録できない" do
          user = build(:user, password: "123456",password_confirmation: "123456")
          user.valid?
          expect(user.errors.full_messages).to include("パスワードは7文字以上で入力してください")
        end

        it "passwordが空では登録できない" do
          user = build(:user, password: nil, password_confirmation: nil)
          user.valid?
          expect(user.errors.full_messages).to include("パスワードを入力してください")
        end
        
        it "passwordが存在してもpassword_confirmationが空では登録できない" do
          user = build(:user, password_confirmation: "")
          user.valid?
          expect(user.errors.full_messages).to include("パスワード（確認用）とパスワードの入力が一致しません")
        end
      end
    end
  end

end
