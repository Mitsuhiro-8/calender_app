'use strict';

window.addEventListener("load", function() {
  console.clear();
  // ヘッダーのドロップダウンリスト
  {
    const groupBtn = document.getElementById('group__btn');
    const groupName = document.getElementById('group__name');
    if(groupBtn) {
      groupBtn.addEventListener("click", function() {
        groupName.classList.toggle('open');
      });
    }
  }


  // カレンダーの日付取得
  {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    // 前月の日付を取得
    function getCalendarHead() {
      const dates = [];
      const d = new Date(year, month, 0).getDate(); //先月末日
      const n = new Date(year, month, 1).getDay(); //今月初日が何曜日か

      for (let i = 0; i < n; i++) {
        dates.unshift({
          date: d - i,
          isToday: false,
          isDisabled: true,
        });
      }

      return dates;
    }

    // 今月の日付を取得
    function getCalendarBody() {
      const dates = []; //date:日付, day:曜日
      const lastDate = new Date(year, month + 1, 0).getDate(); //翌月の0日目で今月末日

      for (let i = 1; i <= lastDate; i++) {
        dates.push({
          date: i,   //日付
          isToday: false,
          isDisabled: false,
        });
      }

      // todayクラスを付与するオブジェクトを決める
      if (year === today.getFullYear() && month === today.getMonth()) {
        dates[today.getDate() - 1].isToday = true;

      };

      return dates;
    }

    //翌月始めの日付を取得
    function getCalendarTail() {
      const dates = [];
      const lastDay = new Date(year, month + 1, 0).getDay();

      for (let i = 1; i < 7 - lastDay; i++) {
        dates.push({
          date: i,
          isToday: false,
          isDisabled: true,
        });
      }
      return dates;
    }


    // 古いカレンダーの削除
    function clearCalendar() {
      const getIdWeeks = document.getElementById('weeks');

      while (getIdWeeks.firstChild) {
        getIdWeeks.removeChild(getIdWeeks.firstChild);
      }
    }

    // 西暦の表示
    function renderTitle() {
      const title = `${year + "年"}${month + 1 + "月"}`;
      document.getElementById('year-month').textContent = title;
    }

    // 一週間ごとに要素を作成
    function renderWeeks() {

      //  ...(スプレッド構文)を使用して配列を展開させる
      const dates = [
        ...getCalendarHead(),
        ...getCalendarBody(),
        ...getCalendarTail(),
      ];

      const weeks = [];
      const weeksCount = dates.length / 7;

      for (let i = 0; i < weeksCount; i++) {
        weeks.push(dates.splice(0, 7));
      }
      
      weeks.forEach(week => {
        const weekDiv = document.createElement('div');
          weekDiv.classList.add('week');


        week.forEach(date => {
          const dayDiv = document.createElement('div');
          dayDiv.classList.add('day');
          dayDiv.textContent = date.date;


          // todayクラスを付与
          if (date.isToday) {
            dayDiv.classList.add('today');
          }

          // disabledクラスを付与
          if (date.isDisabled) {
            dayDiv.classList.add('disabled');
          }
          // weekクラスの子要素としてdayクラスを配置
          weekDiv.appendChild(dayDiv);
        });
        document.getElementById('weeks').appendChild(weekDiv);
      });
    }

    //カレンダーの要素を作成
    function createCalendar() {
      clearCalendar();
      renderTitle();
      renderWeeks();

    }

    //前月を表示する
    document.getElementById('previous').addEventListener('click', () => {
      month--;
      if (month < 0) {
        year--;
        month = 11;
      }
      createCalendar();
    });

    //翌月を表示する
    document.getElementById('next').addEventListener('click', () => {
      month++;
      if (month > 11) {
        year++;
        month = 0;
      }
      createCalendar();
    });

    document.getElementById('today').addEventListener('click', () => {
      year = today.getFullYear();
      month = today.getMonth();
      
      createCalendar();
    });

    createCalendar();
  }
});