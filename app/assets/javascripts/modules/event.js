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
        event.classList.add('hidden');
        mask.classList.add('hidden'); 
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
    // 予定編集操作
    {
      // const fc = document.getElementById('calendar');
      // const aTags = fc.querySelectorAll('a[href]');
      // console.log(aTags);
    //   const editEvent = document.getElementById('event__edit')
    //   const editEventClose = document.getElementById('event__close--edit')
    //   const editMask = document.getElementById('mask__edit');
    //   const eventDiv = document.getElementsByClassName('event')
      
    //   // 予定変更イベント（カレンダークリック時）
    //   function eventClick(e){
    //   e.preventDefault();
    //   editEvent.classList.remove('hidden');
    //   editMask.classList.remove('hidden');
    // }
    // for(let i = 0; i < eventDiv.length; i++) {
    //   eventDiv[i].addEventListener('click', eventClick);
    // }
    //   editEventClose.addEventListener("click", function() {
    //     editEvent.classList.add('hidden');
    //     editMask.classList.add('hidden'); 
    //   });
    //   editMask.addEventListener("click", function() {
    //     editEventClose.click();
    //   });
    }

});