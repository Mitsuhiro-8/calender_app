// このファイルのみjqueryで記述

$(function () {

  function eventCalendar() {

    // 読み込まれたページのurlを取得
    const url = location.href;

    return $('#calendar').fullCalendar({
      locale: 'ja',
      events: url + ".json",

      // 月曜日からの表示 => 0 //日曜日に変更
      firstDay : 1,
      
      weekMode: 'fixed',

      //カレンダー上部を年月で表示させる
      titleFormat: 'YYYY年 M月',
      
      //曜日を日本語表示
      dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
      //ボタンのレイアウト
      header: {
          left: 'today prev,next',
          center: 'title',
          right: 'month agendaWeek agendaDay'
      },
      //終了時刻がないイベントの表示間隔
      defaultTimedEventDuration: '03:00:00',
      buttonText: {
          prevYear: '前年',
          nextYear: '翌年',
          today: '今日',
          month: '月',
          week: '週',
          day: '日'
      },
      //イベントの時間表示を２４時間に
      timeFormat: "HH:mm"
      });
  };

  function clearCalendar() {
    $('#calendar').fullCalendar('delete'); // In case delete doesn't work.
    $('#calendar').html('');
  };

  // カレンダーのデフォルトスタイルを削除
  // function removeStyle () {
  //   $('#calendar *').removeAttr('style');
  // }

  // FontAwesomeのアイコンを追加
  function appendIcon () {
    $('.fc-prev-button').append("<i class='fas fa-caret-square-left'></i>");
    $('.fc-next-button').append("<i class='fas fa-caret-square-right'></i>");
  }



  $(document).on('turbolinks:load', eventCalendar);
  // $(document).on('turbolinks:load', removeStyle);
  $(document).on('turbolinks:load', appendIcon);
  $(document).on('turbolinks:before-cache', clearCalendar);

});