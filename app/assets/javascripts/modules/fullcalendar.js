// このファイルのみjqueryで記述

$(function () {

  function eventCalendar() {

    // 読み込まれたページのurlを取得
    // const url = location.href;
    const url = "/calendars/:id"
    return $('#calendar').fullCalendar({
      locale: 'ja',
      events: url + ".json",

      // セルクリック時の予定登録アクション
      dayClick: function (start, end, jsEvent, view) {
        //クリックした日付情報を取得
        const year = moment(start).year();
        const month = moment(start).month()+1; //1月が0のため+1する
        const day = moment(start).date();
        const dayClickUrl = url + "/events/new"
        //イベント登録のためnewアクションを発火
        $.ajax({
          type: 'GET',
          url: dayClickUrl,
        }).done(function (res) {
          //イベント登録用のhtmlを作成
          $('body').html(res);
          //イベント登録フォームの日付をクリックした日付とする
          $('#event_start_time_1i').val(year);
          $('#event_start_time_2i').val(month);
          $('#event_start_time_3i').val(day);
          //イベント登録フォームのモーダル表示
          // $('#modal').modal();
          // 成功処理
        }).fail(function (result) {
          console.log(dayClickUrl);
          // 失敗処理
          alert('エラーが発生しました。運営に問い合わせてください。')
        });
      },
      // 月曜日からの表示に変更
      // firstDay : 1,
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
    // $('#calendar').fullCalendar('delete'); // In case delete doesn't work.
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

  // カレンダーの表示、削除、アイコン設定
  function setCalendar () {
    $(document).on('turbolinks:load', eventCalendar);
    // $(document).on('turbolinks:load', removeStyle);
    $(document).on('turbolinks:load', appendIcon);
    $(document).on('turbolinks:before-cache', clearCalendar);
  }
  
  setCalendar();

});