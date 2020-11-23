'use strict';

window.addEventListener("DOMContentLoaded", function() {

  if (!document.getElementById('calendar')) {
    return;
  }
  // 変数
  const comBtn = document.getElementById('comment__btn');
  const comForm = document.getElementById('comment__form');
  const sideBar = document.getElementById('side__bar')
  const mainCalendar = document.getElementById('main__calendar')

  // openクラス削除
  function comFormRemoveOpen () {
    comForm.classList.remove('open');
    sideBar.classList.remove('open');
    mainCalendar.classList.remove('open');
  }

  // コメント作成アイコン
  {
    comBtn.addEventListener('click', function() {
      comForm.classList.toggle('open'); 
      sideBar.classList.toggle('open');
      mainCalendar.classList.toggle('open');
    });
  }

  // コメントの非同期処理
  {
    // コメント要素作成
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

      // コメント送信後のpopを作成する関数
      function buildPop () {
        let pop = `<div id="event__afterPop">コメントを登録しました</div>`
        document.getElementById('main__calendar').insertAdjacentHTML("afterbegin", pop);

        const rePop = function removePop () {
          document.getElementById('event__afterPop').remove();
        }
        setTimeout(rePop, 2000);
      }

    const comFormNew = document.getElementById('comment__form--new');
    const noCom = document.getElementById('no__comment');

    comFormNew.addEventListener("submit", function (e) {
      e.preventDefault();
      let formData = new FormData(this);
      let url = this.getAttribute('action');
      
      fetch(url, {
        method: 'POST',
        body:  formData,
      }).then((response) => {
        if (!response.ok ) {
          throw new Error('コメントを登録できませんでした')
        };
        return response.json();
      })
      .then(result => {
        const buildCom = buildComment(result);
        const comList = document.getElementById('comment__list');
        const comText = document.getElementById('comment_text');
        comList.insertAdjacentHTML('beforeend', buildCom);
        // comFormRemoveOpen ();
        comText.value = '';
        buildPop();
        if (noCom) {
          noCom.remove();
        }
      })

      .catch(error => {
        alert(error);
      })
    });

  }
});