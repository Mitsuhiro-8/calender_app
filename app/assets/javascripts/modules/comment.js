'use strict';

window.addEventListener("DOMContentLoaded", function() {

  // 変数
  const comBtn = document.getElementById('comment__btn');
  const comForm = document.getElementById('comment__form');
  const comClose = document.getElementById('comment__close--btn')
  const sideSecond = document.getElementById('side__bar--second')
  const mainCalendar = document.getElementById('main__calendar')

  // openクラス削除
  function comFormRemoveOpen () {
    comForm.classList.remove('open');
    sideSecond.classList.remove('open');
    mainCalendar.classList.remove('open');
  }

  // コメント作成アイコン
  {
    comBtn.addEventListener('click', function() {
      comForm.classList.toggle('open'); 
      sideSecond.classList.toggle('open');
      mainCalendar.classList.toggle('open');
    });
    
    comClose.addEventListener('click', function() {
      comFormRemoveOpen ();
    }); 
  }

  // コメントの非同期処理
  {
    function buildComment (result) {

      let html =
        `
        <div class="comment__container">
          <div class="comment__content">
            <div class="comment__top">
              <div class="user__name">${result.user_name} さん</div>
              <div class="comment__time">${result.created_at}</div>
            </div>
            <div class="comment__done">
              <a class="comment__trash--btn" rel="nofollow" data-method="delete" href="/calendars/${result.calendar_id}/comments/${result.id}">
                <i class="fas fa-trash-alt"></i>
              </a>
            </div>
          </div>
          <div class="comment__text">${result.text}</div>
        </div>`
      return html
    }

    const comFormNew = document.getElementById('comment__form--new');

    comFormNew.addEventListener("submit", function (e) {
      e.preventDefault();
      let formData = new FormData(this);
      let url = this.getAttribute('action');
      
      fetch(url, {
        method: 'POST',
        body:  formData,
      }).then((response) => {
        if (response.ok ) {
          return response.json();
        };
      })
      .then(result => {
        const buildCom = buildComment(result);
        const comList = document.getElementById('comment__list');
        const comText = document.getElementById('comment_text');

        comList.insertAdjacentHTML('beforeend', buildCom);
        comFormRemoveOpen ();
        comText.value = '';
      })

      .catch(error => {
        alert("コメントが送信できませんでした");
      })
    });

  }
});