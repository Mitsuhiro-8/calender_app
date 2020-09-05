# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# calender_app DB設計

## users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :calenders
- has_many :comments
- has_many :plans

## groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :group_users
- has_many :users, trough: :group_users
- has_many :calenders

## group_users
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## calenders
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :plans
- has_many :comments
- belongs_to :user
- belongs_to :group

## plans
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|content|text|
|start_time|time|null: false|
|end_time|time|
|start_day|date|null: false|
|end_day|date|
|user_id|integer|null: false, foreign_key|
|calender_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :calender

## comments
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|calender_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :calender