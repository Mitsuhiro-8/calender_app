//= require jquery
//= require jquery_ujs
//= require_tree ./modules
//= require moment 
//= require fullcalendar
//= require fullcalendar/locale-all


$(function () {

          //events: '/events.json', 以下に追加
          $('#calendar').fullCalendar({
              // events: '/events.json',
              //カレンダー上部を年月で表示させる
              titleFormat: 'YYYY年 M月',
              //曜日を日本語表示
              dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
              //ボタンのレイアウト
              header: {
                  left: 'today prev,next',
                  center: 'title',
                  right: ''
              },
              //終了時刻がないイベントの表示間隔
              defaultTimedEventDuration: '03:00:00',
              buttonText: {
                  prev: '前月',
                  next: '翌月',
                  prevYear: '前年',
                  nextYear: '翌年',
                  today: '今日',
                  month: '月',
                  week: '週',
                  day: '日'
              },
              //イベントの時間表示を２４時間に
              timeFormat: "HH:mm",
              //イベントの色を変える
              eventColor: '#63ceef',
              //イベントの文字色を変える
              eventTextColor: '#000000',
          });
  });