'use strict';

window.addEventListener("DOMContentLoaded", function () {

    // 予定作成アイコン
    {
      const eventBtn = document.getElementById('event__btn');
      const event = document.getElementById('event');
      const eventClose = document.getElementById('event__close--new')
      const mask = document.getElementById('mask');
      
      // hiddenクラスを付けてビューを非表示にする
      function addHidden () {
          if (window.confirm("入力した内容は失われます。よろしいですか？")) {
          event.classList.add('hidden');
          mask.classList.add('hidden'); 
          }
      }

      eventBtn.addEventListener("click", function() {
        event.classList.remove('hidden');
        mask.classList.remove('hidden'); 
      });

      eventClose.addEventListener("click", function() {
        addHidden();
      });

      mask.addEventListener("click", function() {
        addHidden();
      });

        // 予定追加イベント（カレンダークリック時）
        const fcDay = document.getElementsByClassName('fc-day');
        function dayCellDblclick(){
        event.classList.remove('hidden');
        mask.classList.remove('hidden');
      }
      for(let i = 0; i < fcDay.length; i++) {
        fcDay[i].addEventListener('dblclick', dayCellDblclick);
      }
      
      // 予定作成アクション
      const eventFormNew = document.getElementById('event__form--new');
      eventFormNew.addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        let url = this.getAttribute('action');
    
        fetch(url, {
          method: 'POST',
          body: formData,
        }).then(response => response.json())
  
        .then(result => {
          addHidden();
          eventFormNew.reset();
          let submitBtn = document.querySelector('input[type="submit"]');
          submitBtn.disabled = false;

          // ここだけjqueryで記述(fullCalendarのオプションだから)
          $('#calendar').fullCalendar('refetchEvents');
          alert('予定を登録しました')
        })
  
        .catch(error => {
          alert("予定を登録できませんでした")
        })
  
      });
    }

    // 予定作成ビューの終日判定
    {

      function buildDayTimeForm () {
        let form =
        `<div class="formField" id="dayAndTime" style="display: flex;">
          <div class="formField__day">
           <input type="datetime-local" name="event[start_time]" id="event_start_time">
          </div>
          <div class="form__connect"> ∼ </div>
          <div class="formField__day">
            <input type="datetime-local" name="event[end_time]" id="event_end_time">
          </div>
         </div>`
        return form;
      };
      function buildDayForm () {
        let form =
        `<div class="formField" id="dayOnly" style="display: flex;">
          <div class="formField__day">
           <input type="date" name="event[start_time]" id="event_start_time">
          </div>
          <div class="form__connect"> ∼ </div>
          <div class="formField__day">
            <input type="date" name="event[end_time]" id="event_end_time">
          </div>
        </div>`
        return form;
      }
      const eventAll = document.getElementById('event_all_day');
      function allDay() {
        if (eventAll.checked) {
          const dayTime = document.getElementById('dayAndTime');
          dayTime.insertAdjacentHTML('beforebegin', buildDayForm());
          dayTime.remove();
          
        } else {
          const day = document.getElementById('dayOnly');
          day.insertAdjacentHTML('beforebegin', buildDayTimeForm());
          day.remove();
        }
      }
      eventAll.addEventListener('change',allDay);
    }

    // 予定の色選択
    {
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

      function buildOption(div, inp) {
        let option =
        `<option value="${inp}">${div}</option>`
        return option;
      }

        const colorSelect = document.getElementById('event_color');
        const hiddenS = document.getElementById('hidden__select');

        function csOpen() {
            colorSelect.addEventListener("click", function(){
            const buildC = buildColor();
            hiddenS.innerHTML = buildC;
            const cs = document.getElementById('colorSelect');
            const csLi = cs.querySelectorAll('li');
            csLi.forEach(li => {
              const div = li.querySelector('div');
              const inp = li.querySelector('input[type="radio"]');

              const selectChild = colorSelect.firstElementChild;
              if ( selectChild && selectChild.textContent == div.textContent ) {
                  inp.checked = true;
              };

              li.onclick = function () {
                const option = buildOption(div.textContent, inp.value)
                colorSelect.innerHTML = option;
                const liStyle = li.getAttribute("style");
                colorSelect.style = liStyle;
                cs.remove();
              }
            })
          });
        };

        csOpen();
    }
    // 予定編集操作
    {
      const aTags = document.querySelectorAll("div.fc-content");
      console.log(aTags);
      const editEvent = document.getElementById('event__edit')
      const editEventClose = document.getElementById('event__close--edit')
      const editMask = document.getElementById('mask__edit');
      const eventDiv = document.getElementsByClassName('event')
      
      // 予定変更イベント（カレンダークリック時）
      function eventClick(e){
      e.preventDefault();
      editEvent.classList.remove('hidden');
      editMask.classList.remove('hidden');
    }
    for(let i = 0; i < eventDiv.length; i++) {
      eventDiv[i].addEventListener('click', eventClick);
    }
      editEventClose.addEventListener("click", function() {
        editEvent.classList.add('hidden');
        editMask.classList.add('hidden'); 
      });
      editMask.addEventListener("click", function() {
        editEventClose.click();
      });
    }

});