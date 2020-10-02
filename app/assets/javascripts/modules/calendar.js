'use strict';

window.addEventListener("load", function() {
  console.clear();
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
  }
  // 予定編集操作
  {
    const editEvent = document.getElementById('event__edit')
    const editEventClose = document.getElementById('event__close--edit')
    const editMask = document.getElementById('mask__edit');
    const eventDiv = document.getElementsByClassName('event')
    
    // 予定変更イベント（カレンダークリック時）
    function eventClick(){
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

  // コメント作成アイコン
  {
    const comBtn = document.getElementById('comment__btn');
    const comForm = document.getElementById('comment__form');
    const comClose = document.getElementById('comment__close--btn')
    const sideSecond = document.getElementById('side__bar--second')
    const mainCalendar = document.getElementById('main__calendar')

    comBtn.addEventListener('click', function() {
      comForm.classList.toggle('open'); 
      sideSecond.classList.toggle('open');
      mainCalendar.classList.toggle('open');
    });
    comClose.addEventListener('click', function() {
      comForm.classList.remove('open');
      sideSecond.classList.remove('open');
      mainCalendar.classList.remove('open');
    }); 
  }

  // カレンダーの作成
  // {
  //   const today = new Date();
  //   let year = today.getFullYear();
  //   let month = today.getMonth();

  //   // 前月の日付を取得
  //   function getCalendarHead() {
  //     const dates = [];
  //     const d = new Date(year, month, 0).getDate(); //先月末日
  //     const n = new Date(year, month, 1).getDay(); //今月初日が何曜日か

  //     for (let i = 0; i < n; i++) {
  //       dates.unshift({
  //         date: d - i,
  //         isToday: false,
  //         isDisabledBack: true,
  //       });
  //     }

  //     return dates;
  //   }

  //   // 今月の日付を取得
  //   function getCalendarBody() {
  //     const dates = []; //date:日付, day:曜日
  //     const lastDate = new Date(year, month + 1, 0).getDate(); //翌月の0日目で今月末日

  //     for (let i = 1; i <= lastDate; i++) {
  //       dates.push({
  //         date: i,   //日付
  //         isToday: false,
  //         isDisabled: false,
  //       });
  //     }

  //     // todayクラスを付与するオブジェクトを決める
  //     if (year === today.getFullYear() && month === today.getMonth()) {
  //       dates[today.getDate() - 1].isToday = true;

  //     };

  //     return dates;
  //   }

  //   //翌月始めの日付を取得
  //   function getCalendarTail() {
  //     const dates = [];
  //     const lastDay = new Date(year, month + 1, 0).getDay();

  //     for (let i = 1; i < 7 - lastDay; i++) {
  //       dates.push({
  //         date: i,
  //         isToday: false,
  //         isDisabledPrev: true,
  //       });
  //     }
  //     return dates;
  //   }


  //   // 古いカレンダーの削除
  //   function clearCalendar() {
  //     const getIdWeeks = document.getElementById('weeks');

  //     while (getIdWeeks.firstChild) {
  //       getIdWeeks.removeChild(getIdWeeks.firstChild);
  //     }
  //   }

  //   // 西暦の表示
  //   function renderTitle() {
  //     const title = `${year + "年"}${month + 1 + "月"}`;
  //     document.getElementById('yearMonth__btn').textContent = title;
  //   }

  //   // 一週間ごとに要素を作成
  //   function renderWeeks() {

  //     //  ...(スプレッド構文)を使用して配列を展開させる
  //     const dates = [
  //       ...getCalendarHead(),
  //       ...getCalendarBody(),
  //       ...getCalendarTail(),
  //     ];

  //     const weeks = [];
  //     const weeksCount = dates.length / 7;

  //     for (let i = 0; i < weeksCount; i++) {
  //       weeks.push(dates.splice(0, 7));
  //     }
      
  //     weeks.forEach(week => {
  //       const weekDiv = document.createElement('div');
  //         weekDiv.classList.add('week');


  //       week.forEach(date => {
  //         // 日付とイベント用のdiv作成
  //         const dayCell = document.createElement('div');
  //         dayCell.classList.add('dayCell');
  //         dayCell.id = `${year}-${(("00") + (month+1)).slice(-2)}-${(("00") + (date.date)).slice(-2)}`
  //         // dayCell.dataset.day = `${year}-${(("00") + (month+1)).slice(-2)}-${(("00") + (date.date)).slice(-2)}`;

  //         // 日付入りのdiv作成
  //         const dayDiv = document.createElement('div');
  //         dayDiv.classList.add('day');
  //         dayDiv.textContent = date.date;


  //         // todayクラスを付与
  //         if (date.isToday) {
  //           dayDiv.classList.add('today');
  //         }

  //         // disabledクラスとデータタイプを付与
  //         if (date.isDisabledBack) {
  //           dayDiv.classList.add('disabledBack');
  //           dayCell.id = `${year}-${(("00") + (month)).slice(-2)}-${(("00") + (date.date)).slice(-2)}`;
  //         }

  //         if (date.isDisabledPrev) {
  //           dayDiv.classList.add('disabledPrev')
  //           dayCell.id = `${year}-${(("00") + (month+2)).slice(-2)}-${(("00") + (date.date)).slice(-2)}`;
          
  //         }
  //         // weekクラスの子要素としてdayCellクラスを配置
  //         weekDiv.appendChild(dayCell);
  //         // さらに子要素としてdayクラスを配置
  //         dayCell.appendChild(dayDiv);

  //       });
  //       document.getElementById('weeks').appendChild(weekDiv);
  //     });
  //   }

  //   //カレンダーの要素を作成
  //   function createCalendar() {
  //     clearCalendar();
  //     renderTitle();
  //     renderWeeks();

  //   }

  //   //前月を表示する
  //   document.getElementById('previous').addEventListener('click', () => {
  //     month--;
  //     if (month < 0) {
  //       year--;
  //       month = 11;
  //     }
  //     createCalendar();
  //   });

  //   //翌月を表示する
  //   document.getElementById('next').addEventListener('click', () => {
  //     month++;
  //     if (month > 11) {
  //       year++;
  //       month = 0;
  //     }
  //     createCalendar();
  //   });

  //   // 今日の日付を取得
  //   document.getElementById('today').addEventListener('click', () => {
  //     year = today.getFullYear();
  //     month = today.getMonth();
      
  //     createCalendar();
  //   });

  //   createCalendar();
  // }

});