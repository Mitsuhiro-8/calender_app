'use strict';

window.addEventListener("DOMContentLoaded", function () {

  if (!document.getElementById('calendar')) {
    return;
  }
  // 予定作成アイコン
  {
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

    // newファイル関係
    const eventBtn = document.getElementById('event__btn');
    const event = document.getElementById('event');
    const eventClose = document.getElementById('event__close--new')
    const mask = document.getElementById('mask');
    const eventFormNew = document.getElementById('event__form--new');
    const dayTime = eventFormNew.querySelector('#dayAndTime');
    const colorSelect = document.getElementById('event_color');
    // editファイル関係
    const eventEdit = document.getElementById('event__edit');
    const eventCloseEdit = document.getElementById('event__close--edit')
    const maskEdit = document.getElementById('mask__edit');
    const eventFormEdit = document.getElementById('event__form--edit');
    const colorSelectEdit = document.getElementById('event_color_edit');

    // カラーラベル選択ビューとstyleを削除する関数
    function removeLabel(targetSelector) {
      const cs = document.getElementById('colorSelect');
      targetSelector.innerHTML = buildDefaultColor();
      targetSelector.removeAttribute('style');
      if (cs) {
        cs.remove();
      }
    }
    
    // hiddenクラスを付けてビューを非表示しフォームを空にする関数
    // confirmあり
    function addHidden (event, mask, targetForm, targetSelector) {
      if (window.confirm("入力した内容は失われます。よろしいですか？")) {
      event.classList.add('hidden');
      mask.classList.add('hidden'); 
      targetForm.reset();
      removeLabel(targetSelector);
      }
    }
    // confirmなし
    function addHiddenSubmitAfter (event, mask, targetForm) {
      event.classList.add('hidden');
      mask.classList.add('hidden');
      targetForm.reset(); 
    }
    // デフォルトの<option>タグを作成
    function buildDefaultColor () {
      let dCol = `<option value="#00BCD4">デフォルトカラー</option>`;
      return dCol;
    }
    // チェックボックスのvalueをfalseに戻す関数
    function checkBoxReset() {
      const getCheckBox = document.getElementById('event_all_day');
      getCheckBox.value = false;
    }
    
    // new関係
    // 予定作成アイコンをクリックした時に予定作成用のビューを表示する
    eventBtn.addEventListener("click", function() {
      event.classList.remove('hidden');
      mask.classList.remove('hidden'); 
      dayTime.innerHTML = buildDayTimeForm();
      checkBoxReset();
    });
    // クローズボタンをクリックした時に予定作成用のビューを非表示にする
    eventClose.addEventListener("click", function() {
      addHidden(event, mask, eventFormNew, colorSelect);
      checkBoxReset();
    });
    // マスク部分をクリックした時に予定作成用のビューを非表示にする
    mask.addEventListener("click", function() {
      addHidden(event, mask, eventFormNew, colorSelect);
      checkBoxReset();
    });

    // edit関係
    // クローズボタンをクリックした時に予定編集用のビューを非表示にする
    eventCloseEdit.addEventListener("click", function() {
      addHidden(eventEdit, maskEdit, eventFormEdit, colorSelectEdit);
      checkBoxReset();
    });
    // マスク部分をクリックした時に予定編集用のビューを非表示にする
    maskEdit.addEventListener("click", function() {
      addHidden(eventEdit, maskEdit, eventFormEdit, colorSelectEdit);
      checkBoxReset();
    });

    // 予定登録・編集後のpopを作成する関数
    function buildPop (text) {
      let pop = `<div id="event__afterPop">${text}</div>`
      document.getElementById('main__calendar').insertAdjacentHTML("afterbegin", pop);

      const rePop = function removePop () {
        document.getElementById('event__afterPop').remove();
      }
      setTimeout(rePop, 2000);
    }
      
    // 予定作成アクション
    eventFormNew.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const url = this.getAttribute('action');
      const submitBtn = eventFormNew.querySelector('input[type="submit"]');
      fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('予定を登録できませんでした')
        };
        return response.json();
      })
      .then(result => {
        addHiddenSubmitAfter(event, mask, eventFormNew);
        submitBtn.disabled = false;
        
        // ここだけjqueryで記述(fullCalendarのオプションだから)
        $('#calendar').fullCalendar('refetchEvents');
        buildPop("予定を登録しました");
        removeLabel(colorSelect);
      })
      
      .catch(error => {
        alert(error);
        submitBtn.disabled = false;
      })

    });
    // 予定編集アクション
    eventFormEdit.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const url = this.getAttribute('action');
      const submitBtn = eventFormEdit.querySelector('input[type="submit"]');
      fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('予定を編集できませんでした')
        };
        return response.json();
      }) 
      .then(result => {
        addHiddenSubmitAfter(eventEdit, maskEdit, eventFormEdit);
        submitBtn.disabled = false;
        // ここだけjqueryで記述(fullCalendarのオプションだから)
        $('#calendar').fullCalendar('refetchEvents');
        buildPop("予定を編集しました");
        removeLabel(colorSelectEdit);
      })
      .catch(error => {
        alert(error);
        submitBtn.disabled = false;
      })
    });
  }

  // 予定作成及び編集用のビューで終日を選択した場合のイベント
  {
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
    // 変数
    const eventAll = document.getElementById('event_all_day');
    const dayTime = document.getElementById('dayAndTime');
    const eventAllEdit = document.getElementById('event_all_day_edit');
    const dayTimeEdit = document.getElementById('dayAndTime__edit');

    // 予定作成用のビューで終日がチェックされたかどうかで表示するinputタグとvalueを変更する関数
    function allDay() {
      if (eventAll.checked) {
        const dayForm = buildDayForm();
        dayTime.innerHTML = dayForm;
        eventAll.value = true;
      } else {
        const dayTimeForm = buildDayTimeForm();
        dayTime.innerHTML = dayTimeForm;
        eventAll.value = false;
      }
    }
    // 予定編集用のビューでの終日チェックの関数
    function allDayEdit() {
      if (eventAllEdit.checked) {
        const dayForm = buildDayForm();
        dayTimeEdit.innerHTML = dayForm;
        eventAllEdit.value = true;
      } else {
        const dayTimeForm = buildDayTimeForm();
        dayTimeEdit.innerHTML = dayTimeForm;
        eventAllEdit.value = false;
      }
    }
    // 予定作成用でイベント設定
    eventAll.addEventListener('change',allDay);
    // 予定編集用でイベント設定
    eventAllEdit.addEventListener('change',allDayEdit);
  }

  // 予定のラベルカラー選択
  {
    // ラベルカラー選択用のhtml要素を作成する関数
    // ※追加したい場合は<li>タグを複製し、文字やvalueを編集すること
    function buildColor() {
      let html =
      `<div id="colorSelect">
        <div class="contents">
          <ul>
            <li style="background-color: rgba(0, 240, 248, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:#00BCD4; width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">デフォルトカラー</div>
                <input type="radio" value="#00BCD4">
              </label>
            </li>
            <li style="background-color: rgba(46, 204, 135, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:#2ECB87; width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">グリーン</div>
                <input type="radio" value="#2ECB87">
              </label>
            </li>
            <li style="background-color: rgba(71, 178, 247, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:#47b2f7; width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">ブルー</div>
                <input type="radio" value="#47b2f7">
              </label>
            </li>
            <li style="background-color: rgba(253, 192, 45, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:rgb(253, 192, 45); width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">イエロー</div>
                <input type="radio" value="rgb(253, 192, 45)">
              </label>
            </li>
            <li style="background-color: rgba(231, 59, 59, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:rgb(231, 59, 59); width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">レッド</div>
                <input type="radio" value="rgb(231, 59, 59)">
              </label>
            </li>
            <li style="background-color: rgba(243, 95, 140, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:#FF82B2; width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">ピンク</div>
                <input type="radio" value="#FF82B2">
              </label>
            </li>
            <li style="background-color: rgba(251, 127, 119, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:rgb(251, 127, 119); width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">コーラル</div>
                <input type="radio" value="rgb(251, 127, 119)">
              </label>
            </li>
            <li style="background-color: rgba(179, 139, 220, 0.1);">
              <label>
                <i class="fas fa-tag" style="color:rgb(179, 139, 220); width:16px; height: 16px; margin-right: 5px;"></i>
                <div style="width:85%; margin-right: 5px;">バイオレット</div>
                <input type="radio" value="rgb(179, 139, 220)">
              </label>
            </li>
          </ul>
        </div>
      </div>`
      return html;
    }
    // 選択したカラーラベルの情報を持った<option>タグを作成する関数
    function buildOption(div, inp) {
      let option =
      `<option value="${inp}">${div}</option>`
      return option;
    }
    // 変数
    const colorSelect = document.getElementById('event_color');
    const hiddenS = document.getElementById('hidden__select');
    const colorSelectEdit = document.getElementById('event_color_edit');
    const hiddenSEdit = document.getElementById('hidden__select--edit');

    // カラーラベルを選択する<select>タグがクリックされた時に選択用のビューを生成するイベントの関数
    function csOpen(target, hiddenTarget) {
      target.addEventListener("click", function(){
      const buildC = buildColor();
      hiddenTarget.innerHTML = buildC;
      const cs = document.getElementById('colorSelect');
      const csLi = cs.querySelectorAll('li');
        csLi.forEach(li => {
          const div = li.querySelector('div');
          const inp = li.querySelector('input[type="radio"]');
          const selectChild = target.firstElementChild;
          if ( selectChild && selectChild.textContent == div.textContent ) {
            inp.checked = true;
          };
          // カラーラベルがクリックされたときの関数
          li.onclick = function () {
            const option = buildOption(div.textContent, inp.value)
            target.innerHTML = option;
            const liStyle = li.getAttribute("style");
            target.style = liStyle;
            cs.remove();
          }
        })
      });
    };
    //  予定作成ビュー用のアクション
    if (colorSelect) {
      csOpen(colorSelect, hiddenS);
    }
    // 予定編集ビュー用のアクション
    if (colorSelectEdit) {
      csOpen(colorSelectEdit, hiddenSEdit);
    }
  }

});