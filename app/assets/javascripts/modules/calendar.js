'use strict';

window.addEventListener("DOMContentLoaded", function() {
  // ヘッダーのカレンダーリスト
  {
    const calendarBtn = document.getElementById('calendar__btn');
    const calendarName = document.getElementById('calendar__name');
    if(calendarBtn) {
      calendarBtn.addEventListener("click", function() {
        calendarName.classList.toggle('open');
      });
    }
  }
  // ヘッダーのメンバーリスト
  {
    const memberBtn = document.getElementById('member__btn');
    const memberName = document.getElementById('member__name');
    if(memberBtn) {
      memberBtn.addEventListener("click", function() {
        memberName.classList.toggle('open');
      });
    }
  }
  // 予定作成アイコン
  {
    const eventBtn = document.getElementById('event__btn');
    const event = document.getElementById('event');
    const eventClose = document.getElementById('event__close--new')
    const mask = document.getElementById('mask');

    eventBtn.addEventListener("click", function() {
      event.classList.remove('hidden');
      mask.classList.remove('hidden'); 
    });
    eventClose.addEventListener("click", function() {
      event.classList.add('hidden');
      mask.classList.add('hidden'); 
    });
    mask.addEventListener("click", function() {
      eventClose.click();
    });
      // 予定追加イベント（カレンダークリック時）
      const dCell = document.getElementsByClassName('day');
      function dayCellDblclick(){
      event.classList.remove('hidden');
      mask.classList.remove('hidden');
    }
    for(let i = 0; i < dCell.length; i++) {
      dCell[i].addEventListener('dblclick', dayCellDblclick);
    }
    
    // 予定作成アクション(未完成)
    // const eventFormNew = document.getElementById('event__form--new');
    // eventFormNew.addEventListener("submit", function (e) {
    //   e.preventDefault();
    //   let formData = new FormData(this);
    //   let url = this.getAttribute('action');

    //   // console.log(this);
    //   console.log(...formData.entries());
    //   // console.log(url);

    //   fetch(url, {
    //     method: 'POST',
    //     body: formData,
    //   }).then(response => response.json())

    //   .then(result => {
    //     console.log(result);
    //   })

    //   .catch(error => {
    //     console.error(error);
    //   })

    // });
  }
  // 予定編集操作
  {
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