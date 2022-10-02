const dates = []; //날짜 배열

let currentDate;
function whatIsCurrentDate(){ //currentDate 구하는 함수
  //함수로 쪼개기
  currentDate = new Date();
  if(sessionStorage.getItem("key") != null){
    currentDate = sessionStorage.getItem("key");
    let year = currentDate.substr(11,4);
    let month = currentDate.substr(4,3);

    if(month == "Jan"){
      month = 1;
    }
    else if(month == "Feb"){
      month = 2;
    }
    else if(month == "Mar"){
      month = 3;
    }
    else if(month == "Apr"){
      month = 4;
    }
    else if(month == "May"){
      month = 5;
    }
    else if(month == "Jun"){
      month = 6;
    }
    else if(month == "Jul"){
      month = 7;
    }
    else if(month == "Aug"){
      month = 8;
    }
    else if(month == "Sep"){
      month = 9;
    }
    else if(month == "Oct"){
      month = 10;
    }
    else if(month == "Nov"){
      month = 11;
    }
    else if(month == "Des"){
      month = 12;
    }
    let day = currentDate.substr(8,2);
    currentDate = new Date(year + "." + month + "." + day);
  }
}

let currentYear;
let currentMonth;
let currentDay;

function decideCurrentLastNextInformation(){
  currentYear = currentDate.getFullYear(); //현재 년도 //2022
  currentMonth = currentDate.getMonth(); //현재 월 -1
  currentDay = currentDate.getDate(); //현재 일

  document.querySelector(".year-month").textContent = `${currentYear}년 ${currentMonth + 1}월 ${currentDay}일`;

  const dayArr = new Map([['Mon', 0], ['Tue', 1], ['Wed',2], ['Thu',3], ['Fri',4], ['Sat',5], ['Sun', 6]]);

  //저번달
  const lastMonth = new Date(currentYear, currentMonth,0); //이걸로 만듦
  const lastMonthYear = lastMonth.getFullYear();
  const lastMonthMonth = lastMonth.getMonth();
  const lastMonthLastDay = lastMonth.getDate(); //31일
  const lastMonthLastDate = lastMonth.getDay(); //3(수요일)

  //이번달 마지막 날
  const thisMonth = new Date(currentYear, currentMonth+1, 0);
  const thisMonthYear = thisMonth.getFullYear();
  const thisMonthMonth = thisMonth.getMonth();
  const thisMonthLastDay = thisMonth.getDate(); //30일
  const thisMonthLastDate = thisMonth.getDay(); //5일

  //다음달
  const nextMonth = new Date(currentYear, currentMonth+2, 0);
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthMonth = nextMonth.getMonth();
  const nextMonthLastDay = nextMonth.getDate(); //30일
  const nextMonthLastDate = nextMonth.getDay(); //5일

  //31부터 앞으로 4개 더함 (1, 2, )
  for(let i = lastMonthLastDate;  i >=0; i--){ //3 2 1 0
    dates.push(String(lastMonthYear) + "." + String(lastMonthMonth + 1) + "." + String(lastMonthLastDay - i));
  }

  for(let i = 1; i <= thisMonthLastDay; i++){
    dates.push(String(thisMonthYear) + "." + String(thisMonthMonth + 1)+ "." + String(i));
  }

  for(let i = thisMonthLastDate + 1; i<=6 ; i++){
    dates.push(String(nextMonthYear) + "." + String(nextMonthMonth + 1)+ "." + String(7-i));
  }

}

function getAllLocalStorageData(){ //localStorage에 있는 모든 객체를 불러옴

  let keyObjects = Object.keys(localStorage); //객체 배열 ["2022-03-20", "2033-21-23"]

  if(keyObjects != null){
    for(let i =0; i<keyObjects.length; i++){
      let object =  JSON.parse(localStorage.getItem(keyObjects[i])); //{"2021-09-23"}
      for(let j = 0; j < object.length; j++){
        giveLitoUl(document.getElementById(keyObjects[i]), object[j], keyObjects[i]); //ul과 todo 할일이 나옴
        //li에 id 추가하려고 넣음(수정 가능함)
      }
    }
  }
  else{
    return;
  }

  //ul의 id(object)값이 "2020.08.30"이라는 날짜 문자열


}

function deleteAll(){

  console.log("모두 다 삭제하겠어!");

  let AllObjects = Object.keys(localStorage);

  if(AllObjects != null){
    for(let i=0; i<AllObjects.length; i++){
      localStorage.removeItem(AllObjects[i]);
    }
  }

  window.location.reload();

}

//데이터를 가져옴(2022.9.7)
function giveLi(){
  dates.forEach((date, i) =>{
    ///button을 클릭하면 button_click 함수가 실행된다
    dates[i] = `<div type = "button"  id = "add-button"  value = "클릭" class = "date"> ${date} <ul type = "button" class ="todoindate" id = "${date}" onclick = "mini_button_click()"></ul> </div>`;
  })
  document.querySelector('.dates').innerHTML = dates.join(''); //dates의 모든 배열 원소를 받아서 innerHTML에 넣는다.
}

function beforeinit(){
  const cols = document.querySelectorAll(".date");

  for(let i = 0; i < cols.length; i++){
    cols[i].addEventListener("click", click); //클릭하면 click 함수를 실행시켜라
  }

}

function saveTodo(data, datekey){ //dateKey 저장
  let arr = JSON.parse(localStorage.getItem(datekey)) || [];
  arr.push(data);
  localStorage.setItem(datekey, JSON.stringify(arr)); //{String, String} = {"2022.8.31", ["안녕"]}
}

let bool_mini_button_click = new Boolean(false);


function mini_button_click(){
  bool_mini_button_click = true;
}

function click(e){

  if(bool_mini_button_click){
    bool_mini_button_click = false;
    return;
  }
 //새로
  let todo = prompt("오늘의 할일");

  if(todo === null){
    return;
  }

  let datekey;
  if(e.target.innerHTML.substr(10,1) == " "){ //날짜가 한 자리라면
    datekey = e.target.innerHTML.substr(1,9);
  }
  else{ //날짜가 두 자리라면
    datekey = e.target.innerHTML.substr(1,10);
  }
  saveTodo(todo, datekey); //안녕, 날짜
  const ul = e.target.querySelector("ul");
  giveLitoUl(ul,todo, datekey); //li에 id 추가하려고 넣음(수정 가능함)
}


function giveLitoUl(ul, todo, datekey){ //하나의 문자열씩 넣어줌
  const li = document.createElement('li');
  li.id = datekey + todo;//li에 id 추가하려고 넣음(수정 가능함)
  li.type = "button";
  li.textContent = todo;
  li.addEventListener('click', () => { //일정을 클릭하면

    let result = confirm("해당 일정을 지우겠습니까?");
    if(result){
      alert('\"' + li.textContent + '\"' +  " 일정을 지우겠습니다");

      let object = JSON.parse(localStorage.getItem(datekey)); //해당 날짜에 해당하는 value 값들
      let selectOneObject = false;
      let arr2 = new Array(); //삭제할 하나의 일 빼놓고 다 저장할 배열

      for(let i = 0; i < object.length; i++){
          if(object[i] == li.textContent){
            if(!selectOneObject){
              selectOneObject = !selectOneObject;
              continue;
            }
            else{
              arr2.push(object[i]);
            }
          }
          else{
            arr2.push(object[i]);
          }
      }

      localStorage.removeItem(datekey); //해당 날짜 모든 일정 삭제
      localStorage.setItem(datekey, JSON.stringify(arr2)); //해당 날짜에 삭제할 하나의 일정 빼고 다시 저장
      window.location.reload(); //리로드

    }
    else{
      alert("해당 일정을 지우지 않습니다.");
    }
  })
  ul.appendChild(li); //ul 자식으로 li 추가하는 것
}

(function init() { //즉시실행함수
  whatIsCurrentDate();
  decideCurrentLastNextInformation();
  giveLi();
  beforeinit();
  getAllLocalStorageData();
})();




function doBeforeAction(){ //저번달 버튼 클릭
  let d1 = new Date(currentYear, currentMonth,0);
  sessionStorage.setItem("key", d1);
  window.location.reload();
}


function doAfterAction(){
  d1 = new Date(currentYear, currentMonth+2,0);
  sessionStorage.setItem("key", d1);
  window.location.reload();
}
