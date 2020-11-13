// このファイルはjqueryで記述

$(function () {

  function eventCalendar() {

    // 読み込まれたページのurlを取得
    // const url = location.href;
    const url = "/calendars/:id"
    return $('#calendar').fullCalendar({
      locale: 'ja',
      events: url + ".json",
      eventClick: eventClick,
      // セルクリック時の予定登録アクション
      dayClick: dayClick,
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

  // イベントクリック時のアクション
  const eventClick = function ( event, jsEvent, view ) {
    jsEvent.preventDefault();
    console.log(event);
    console.log(jsEvent);
    console.log(view);

    // function buildEventShow (event) {
    //   const html =
    //   `
    //   <div id="maskShow"></div>
    //   <div id="eventShow">
    //     <div class="eventShow">
    //       <div class="close__btn">
    //         <button id="event__close--show">
    //           <i class="fas fa-window-close"></i>
    //         </button>
    //       </div>
    //       <h3>予定の編集</h3> 
    //     </div>
    //     <div class="event__contents">
    //       <div class="date">
    //         <div class="start__day">
    //           ${event.}
    //         </div>
    //         <div class="start__hour">
    //         </div>
    //       <div class="form__connect">
    //         →
    //       </div>
    //       </div>
    //     <div class="formField__day">
    //     <input type="date" name="event[end_day]" id="event_end_day">
    //     </div>
    //     </div>
    //     <div class="formField">
    //     <div class="formField__time">
    //     <input type="time" name="event[start_hour]" id="event_start_hour">
    //     </div>
    //     <div class="form__connect">
    //     ∼
    //     </div>
    //     <div class="formField__time">
    //     <input type="time" name="event[end_hour]" id="event_end_hour">
    //     </div>
    //     </div>
    //     <div class="formField__noFlex">
    //     <div class="formField__content">
    //     <div class="formField__label">
    //     <label for="event_content">【内容】</label>
    //     </div>
    //     <div class="formField__input">
    //     <textarea name="event[content]" id="event_content"></textarea>
    //     </div>
    //     </div>
    //     </div>
    //     <div class="formSubmit">
    //     <input type="submit" name="commit" value="登録" class="event__submit" data-disable-with="登録">
    //     </div>
    //     </form></div>
    //     </div>
    //   `
    // }
    
    // buildEventShow(event);

  }

  const dayClick = function (start, end, jsEvent, view) {
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
        // $('#event_start_time_1i').val(year);
        // $('#event_start_time_2i').val(month);
        // $('#event_start_time_3i').val(day);
        //イベント登録フォームのモーダル表示
        // $('#modal').modal();
        // 成功処理
      }).fail(function (result) {
        // console.log(dayClickUrl);
        // 失敗処理
        alert('エラーが発生しました。運営に問い合わせてください。')
      });
    };

});