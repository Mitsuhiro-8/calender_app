// このファイルはjqueryで記述

$(function () {
  // id:calendarの無いページでは実行しないようにする
  if(!$('#calendar')) {
    return;
  }
  function eventCalendar() {
    const url = "/calendars/:id"
    return $('#calendar').fullCalendar({
      locale: 'ja',
      events: url + ".json",
      height: "parent",
      // イベントセルクリック時の予定登録アクション
      eventClick: eventClick,
      // イベントを表示する個数
      eventLimit: true,
      views: {
        agenda: {
          eventLimit: 3
        }
      },
      eventLimitText: '',
      eventLimitClick: eventLimitClick,
      // 月曜日からの表示に変更
      weekMode: 'fixed',
      //カレンダー上部を年月で表示させる
      titleFormat: 'YYYY年 M月',
      
      //曜日を日本語表示
      dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
      //ボタンのレイアウト
      header: {
          left: 'today prev,next',
          center: 'title',
          right: 'month agendaWeek'
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
    $(document).on('turbolinks:load', appendIcon);
    $(document).on('turbolinks:before-cache', clearCalendar);
  }
  // 上記の関数を実行
  setCalendar();

    // selectタグに追加するoptionタグ生成
  function buildOption(color) {
    let option =`<option value="${color}">選択しているラベルカラー</option>`
    return option;
    }
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

    // ラベルカラーに応じたbackground-colorを定義
    function colorJudg(eColor){
      if (eColor == "#00BCD4") {
        const color = "rgba(0, 240, 248, 0.1)";
        return color;
      }
      if (eColor == "#2ECB87") {
        const color = "rgba(46, 204, 135, 0.1)";
        return color;
      }
      if (eColor  == "#47b2f7") {
        const color = "rgba(71, 178, 247, 0.1)";
        return color;
      }
      if (eColor  == "rgb(253, 192, 45)") {
        const color = "rgba(253, 192, 45, 0.1)";
        return color;
      }
      if (eColor  == "rgb(231, 59, 59)") {
        const color = "rgba(231, 59, 59, 0.1)";
        return color;
      }
      if (eColor  == "rgb(251, 127, 119)") {
        const color = "rgba(251, 127, 119, 0.1)";
        return color;
      }
      if (eColor  == "rgb(179, 139, 220)") {
        const color = "rgba(179, 139, 220, 0.1)";
        return color;
      }
    }
  
  // イベントクリック時のアクション
  const eventClick = function ( event, jsEvent ) {
    jsEvent.preventDefault();

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
    function allDayJudg (event) {
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
  }
    // 上記のイベントを実行
    allDayJudg(event);
    
    $('#event__form--edit select[name="event[color]"]').empty();
    // 選択しているラベルカラーの情報を持った<option>タグをappend
    $('#event__form--edit select[name="event[color]"]').append(buildOption(event.color));

    // 選択しているラベルカラーにstyle変更
    $('#event__form--edit select[name="event[color]"]').css("background-color", colorJudg(event.color));
    // テキストエリアのvalueを変更
    $('#event__form--edit textarea[name="event[content]"]').val(event.content);
  }

  // 非表示のイベントを表示する関数
  const eventLimitClick = function (cellInfo, jsEvent) {
    jsEvent.preventDefault();
    console.log(cellInfo);

    // クリックしたセルの情報を使いやすいように変数化
    const targetDayEl = cellInfo.dayEl[0];
    // クリックしたセル内のイベントの情報を変数化
    const eventArray = cellInfo.segs;
    // popの表示位置を曜日で判定
    const targetDayElClass = targetDayEl.className;
    function positionJudg(target) {
      if(target.includes('fc-sun')) {
        const left = "0%";
        return left;
      }
      if(target.includes('fc-mon')) {
        const left = "14%";
        return left;
      }
      if(target.includes('fc-tue')) {
        const left = "28%";
        return left;
      }
      if(target.includes('fc-wed')) {
        const left = "43%";
        return left;
      }
      if(target.includes('fc-thu')) {
        const left = "57%";
        return left;
      }
      if(target.includes('fc-fri')) {
        const left = "71%";
        return left;
      }
      if(target.includes('fc-sat')) {
        const left = "85%";
        return left;
      }
    };
    // 関数の判定結果を変数化
    const left = positionJudg(targetDayElClass);
    // popのdivを生成
    const popDiv = $('<div>', {
      id: "hiddenEvent__pop",
      css: {
        'position': 'absolute',
        'overflow':'auto',
        'min-height' : '80px',
        'height' : '90%',
        'width' : '140px',
        'background-color': '#fafafa',
        'border-radius' : '3px',
        'padding':'5px 10px',
        'z-index': 10,
        'top': 0,
        'left': left
      }
    });
    // popを閉じるボタンを生成し関数を設定
    const div = $('<div>', {
      id:"ePop__close",
      css: {
        "display" : "inline-block",
      },
      on: {
        click: function() {
          $('#hiddenEvent__pop').remove();
        }
      }
    }).append('<i class="fas fa-times"></i>');
    // イベント情報を入れる<ul>タグを生成
    const ul = $("<ul>", {
      css:{
        'margin' : '0 auto',
        'display' : 'flex',
        'flex-direction':'column',
        'align-items':'center'
      }
    });
    // クリックしたセルの親要素であるweekディブを変数化しposition指定
    const targetParentWeek = targetDayEl.closest('div.fc-week');
    $(targetParentWeek)
      .css({'position': 'relative',
    });

    // popの中のリストを生成する関数
    function buildHiddenEvent (index, event, eFoot) {
      if (eFoot.dateProfile.end != null) {
        let html =
        `<li class="fc-event-container" style="width:100%">
          <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end"
          id="event__pop-${index}"
          data-event="${eFoot.title},${event.footprint.componentFootprint.isAllDay},${eFoot.dateProfile.start._i},${eFoot.dateProfile.end._i},${eFoot.color},${eFoot.miscProps.content}"
          style="background-color:${eFoot.color};"
          href="${eFoot.url}"
          >
          <div class="fc-content">
            <span class="fc-title">${event.el.context.innerText}</span>
          </div>
        </a>
      </li>`
      return html;
      } else {
        let html =
        `<li class="fc-event-container" style="width:100%">
          <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end"
          id="event__pop-${index}"
          data-event="${eFoot.title},${event.footprint.componentFootprint.isAllDay},${eFoot.dateProfile.start._i},${eFoot.dateProfile.end},${eFoot.miscProps.content}"
          style="background-color:${eFoot.color};"
          href="${eFoot.url}"
          >
          <div class="fc-content">
            <span class="fc-title">${event.el.context.innerText}</span>
          </div>
        </a>
      </li>`
      return html;
      };
    }
    // 非表示のイベントを<ul>タグにappendする処理
    $.each(eventArray, function(index, event){
      // 長いので一部変数化
      const eFoot = event.footprint.eventDef;
      const li = buildHiddenEvent(index, event, eFoot);
      ul.append(li);
    });
    // 生成したid:hiddenEvent__popにクローズボタンをappend
    $(popDiv).append(div);
    // ulもappend
    $(popDiv).append(ul);
    // クリックしたセルの親要素であるweekディブへもappend
    // ※親要素のdayセルはz-indexの関係で隠れてしまうから。
    $(targetParentWeek).append(popDiv);

    // 生成した要素クリック時のイベント設定
    $('[id^=event__pop-]').click(function(e){
      e.preventDefault();
      // editビューの表示
      $('#event__edit').removeClass('hidden');
      $('#mask__edit').removeClass('hidden'); 

      // editビューのvalueや属性の変更
      // formをupdateアクションに変更
      const url = $(this).prop('href');
      $('#event__form--edit').prop('action', url);
      // updateアクションになるようにhidden_fieldを子要素の先頭に追加
      $('#event__form--edit').prepend('<input type="hidden" name="_method" value="patch">');
      // data属性の内容を変数化
      const t = $(this).data('event');
      const [title, allDay, start, end, color, content] = t.split(',');
      // タイトルのvalue変更
       $('#event__form--edit input[type="text"]').val(title);
      // 終日判定の処理
      $('#event__form--edit input[type="checkbox"]').val(allDay);
      // allDay:trueの場合は終日にチェックを入れてinput[type="date"]をセット
      function allDayJudgPop (allDay, start, end) {
      if (allDay == "true") {
        // 終日チェックを入れる
        $('#event__form--edit input[type="checkbox"]').prop('checked', true);
        // デフォルトのビューを削除してinput[type="date"]をセット
        $('#event__form--edit #dayAndTime__edit').empty();
        $('#event__form--edit #dayAndTime__edit').append(buildDayForm());
        // <input>タグのvalueを変更できるように開始時間と終了時間の文字列を整形
        const formatStartDay = start.slice(0, 10);
        $('#event__form--edit input[name="event[start_time]"]').val(formatStartDay);
        // 終了時間は必須では無いのでif文で囲む
      if (end) {
        const formatEndDay = end.slice(0, 10);
        // 終了時間のvalue変更
        $('#event__form--edit input[name="event[end_time]"]').val(formatEndDay);
      }
      // allDay:falseの場合、input[type="datetime-local"]をセット
      } else {
      $('#event__form--edit #dayAndTime__edit').empty();
      $('#event__form--edit #dayAndTime__edit').append(buildDayTimeForm());
      // <input>タグのvalueを変更できるように開始時間と終了時間の文字列を整形
      const formatStartTime = (start).split('.');
      // 開始時間のvalue変更
      $('#event__form--edit input[name="event[start_time]"]').val(formatStartTime[0]);
      // 終了時間は必須では無いのでif文で囲む
      if (end) {
        const formatEndTime = (end).split('.');
        // 終了時間のvalue変更
        $('#event__form--edit input[name="event[end_time]"]').val(formatEndTime[0]);
      }
    }
  }
    // 上記のイベントを実行
    allDayJudgPop(allDay, start, end);

    $('#event__form--edit select[name="event[color]"]').empty();
    // 選択しているラベルカラーの情報を持った<option>タグをappend
    $('#event__form--edit select[name="event[color]"]').append(buildOption(color));
    // 選択しているラベルカラーにstyle変更
    $('#event__form--edit select[name="event[color]"]').css("background-color", colorJudg(color));
    // テキストエリアのvalueを変更
    $('#event__form--edit textarea[name="event[content]"]').val(content);
    });
  };
});