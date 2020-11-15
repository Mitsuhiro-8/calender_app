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
      // dayClick: dayClick,
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

    // 日にち、時間両方を入力できるinputタグを作成
  function buildDayTimeForm () {
    let form =
    ` <div class="formField__day">
    <input type="datetime-local" name="event[start_time]" id="event_start_time">
    </div>
    <div class="form__connect"> ∼ </div>
    <div class="formField__day">
    <input type="datetime-local" name="event[end_time]" id="event_end_time">
    </div>`
    return form;
  };
    // 日にちのみ入力できるinputタグを作成
    function buildDayForm () {
      let form =
      ` <div class="formField__day">
          <input type="date" name="event[start_time]" id="event_start_time">
        </div>
        <div class="form__connect"> ∼ </div>
        <div class="formField__day">
          <input type="date" name="event[end_time]" id="event_end_time">
        </div>`
      return form;
    }
  
  // イベントクリック時のアクション
  const eventClick = function ( event, jsEvent ) {
    jsEvent.preventDefault();    
    // selectタグに追加するoptionタグ生成
    function buildOption(event) {
      let option =
      `<option value="${event}">現在選択している色</option>`
      return option;
    }
    // editビューの表示
    $('#event__edit').removeClass('hidden');
    $('#mask__edit').removeClass('hidden'); 

    // editビューのvalueや属性の変更
    // formをupdateアクションに変更
    $('#event__form--edit').prop('action', event.url);
    // updateアクションになるようにhidden_fieldを子要素の先頭に追加
    $('#event__form--edit').prepend('<input type="hidden" name="_method" value="patch">');
    // タイトルのvalue変更
    $('#event__form--edit input[type="text"]').val(event.title);
    
    // 終日判定の処理
    $('#event__form--edit input[type="checkbox"]').val(event.allDay);
    // allDay:trueの場合は終日にチェックを入れてinput[type="date"]をセット
    if (event.allDay) {
      // 終日チェックを入れる
      $('#event__form--edit input[type="checkbox"]').prop('checked', true);
      // デフォルトのビューを削除してinput[type="date"]をセット
      $('#event__form--edit #dayAndTime__edit').empty();
      $('#event__form--edit #dayAndTime__edit').append(buildDayForm());
      // <input>タグのvalueを変更できるように開始時間と終了時間の文字列を整形
      const formatStartDay = (event.start._i).slice(0, 10);
      $('#event__form--edit input[name="event[start_time]"]').val(formatStartDay);
      // 終了時間は必須では無いのでif文で囲む
      if (event.end) {
        const formatEndDay = (event.end._i).slice(0, 10);
        // 終了時間のvalue変更
        $('#event__form--edit input[name="event[end_time]"]').val(formatEndDay);
        }
        // allDay:falseの場合、input[type="datetime-local"]をセット
      } else {
        $('#event__form--edit #dayAndTime__edit').empty();
        $('#event__form--edit #dayAndTime__edit').append(buildDayTimeForm());
        // <input>タグのvalueを変更できるように開始時間と終了時間の文字列を整形
        const formatStartTime = (event.start._i).split('.');
        // 開始時間のvalue変更
        $('#event__form--edit input[name="event[start_time]"]').val(formatStartTime[0]);
        // 終了時間は必須では無いのでif文で囲む
        if (event.end) {
          const formatEndTime = (event.end._i).split('.');
          // 終了時間のvalue変更
          $('#event__form--edit input[name="event[end_time]"]').val(formatEndTime[0]);
        }
      }
    
    // 選択しているラベルカラーにstyle変更
    $('#event__form--edit select[name="event[color]"]').css(['background-color', event.color],['opacity, 0.1']);
    // 選択しているラベルカラーの情報を持った<option>タグをappend
    $('#event__form--edit select[name="event[color]"]').append(buildOption(event.color));

  }

  // const dayClick = function (start, end, jsEvent, view) {
  //     //クリックした日付情報を取得
  //     const year = moment(start).year();
  //     const month = moment(start).month()+1; //1月が0のため+1する
  //     const day = moment(start).date();
  //     const dayClickUrl = url + "/events/new"
  //     //イベント登録のためnewアクションを発火
  //     $.ajax({
  //       type: 'GET',
  //       url: dayClickUrl,
  //     }).done(function (res) {
  //       //イベント登録用のhtmlを作成
  //       $('body').html(res);
  //       //イベント登録フォームの日付をクリックした日付とする
  //       // $('#event_start_time_1i').val(year);
  //       // $('#event_start_time_2i').val(month);
  //       // $('#event_start_time_3i').val(day);
  //       //イベント登録フォームのモーダル表示
  //       // $('#modal').modal();
  //       // 成功処理
  //     }).fail(function (result) {
  //       // console.log(dayClickUrl);
  //       // 失敗処理
  //       alert('エラーが発生しました。運営に問い合わせてください。')
  //     });
  //   };

});