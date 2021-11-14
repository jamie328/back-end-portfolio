const input_income = document.querySelector('#income')
const input_save = document.querySelector('#save')
const input_expense = document.querySelector('#expense')
const result_btn = document.querySelector('.result_btn')
const calc_result = document.querySelector('.calc_result')
const calc_text = document.querySelector('.calc_text')
const record_list = document.querySelector('.record_list')
const redo_btn = document.querySelector('.calc_result>i')
const status = document.querySelector('.status')

// get所有花費資訊
function initial_getRecord(){
    const xhr = new XMLHttpRequest();
    xhr.open('get','/roll-money-record');
    xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
    xhr.send();
    xhr.onload = function(){
        const res_data = JSON.parse(xhr.responseText);
        display_record(res_data);
    }
}
function pick_text(percent){
    percent = Number(percent.replace('%',''))/100;
    console.log(percent)
    let str = '';
    let color_arr = ['#FF1200','#FF982D','#86D73F','#31BAF9']; let color = '';
    if (percent >= 1){
        str = '花太多了！'
        color = color_arr[0]
    }else if(percent>=0.8 && percent<1){
        str = '減少不必要支出！'
        color = color_arr[1]
    }else if (percent>=0.5 && percent<0.8){
        str = '控制得不錯！'
        color = color_arr[2]
    }else{
        str = '超級省！'
        color = color_arr[3]
    }
    return {
        'str':str,
        'color':color
    }
}

function post_data(){
    let income = Number(input_income.value);
    let save = Number(input_save.value);
    let expense = Number(input_expense.value);
    // 時間
    let date = new Date();
    // 補一個 %數 & 文字
    if (income === 0 && save ===0 && expense ===0 ){
        alert('你輸入的收入、月存入與今日花費不能為空值哦!')
    }else if (isNaN(income) || isNaN(save) || isNaN(expense)){
        console.log('err!')
        alert('你輸入的收入、月存入與今日花費須為數字哦!')
    }else if(income<=save){
        alert('入不敷出啊!! 月收入要大於存款才能存到錢...')
    }else{
        // 日花費 = (income-save)/30 *0.8
        const expec_expense = ((income-save)/30);
        const percent = Math.floor((expense/expec_expense)*100) + '%';
        let obj = pick_text(percent); const text = obj.str; const color = obj.color;
        console.log(text, color);
        let time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
        const xhr = new XMLHttpRequest();
        xhr.open('post','/roll-money-add');
        xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
        const data = JSON.stringify({
            'time':time,
            'income':income,
            'save':save,
            'expense':expense,
            'expec_expense':expec_expense,
            'percent':percent,
            'text':text,
            'color': color
        });
        xhr.send(data);
        xhr.onload = function(){
            const res_data = JSON.parse(xhr.responseText)
            // 去call 顯示 fun
            display_calc(res_data);
            display_record(res_data);
        }
    }
}
// 等待資料拿到後才做資料顯示
function display_record(res_data){
    const result = res_data.result
    let str = '';
    for (key in result){
        str+=` <li class="record_item" data-id="${key}">
                    <div class="status" style="background-color: ${result[key].color}"></div>
                    <span class="expense"> <strong>花費:</strong> ${result[key].expense} </span>
                    <span class="comment"> <strong>評語:</strong> ${result[key].text}</span>
                    <span class="time"> <strong>日期:</strong> ${result[key].time}</span>
                    <button class = "delete" data-id="${key}" >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </li>
             `
    }
    record_list.innerHTML = str;
}
// button 顯示文字 & % 數 & 顏色
function display_calc(res_data){
    result_btn.classList.toggle('hide_element');
    calc_result.classList.toggle('hide_element');
    calc_text.classList.toggle('hide_element'); 
    const calc_result_p = document.querySelector('.calc_result>p');
    const calc_text_p = document.querySelector('.calc_text>p');
    const the_last = res_data.result[Object.keys(res_data.result).pop()]
    calc_result_p.innerText = the_last.percent; // 變更 %數
    calc_text_p.innerText = the_last.text; // 變更文字
    calc_result.style.color = the_last.color; calc_result.style.borderColor = the_last.color // 變更顏色
    calc_text_p.style.color = the_last.color;
}
initial_getRecord(); // 拿取所有record資料
// 送出資料 -> 到後端資料庫儲存 -> 返回前端顯示
result_btn.addEventListener('click', 
    function(e){
        post_data(); // 藉由後端app.js 新增於資料庫
})

// redo按鈕 -> input 格清空 & btn 顯示 & calc 消失
redo_btn.addEventListener('click', 
    function(e){
        input_income.value = '';
        input_save.value = '';
        input_expense.value = '';
        result_btn.classList.toggle('hide_element');
        calc_result.classList.toggle('hide_element');
        calc_text.classList.toggle('hide_element'); 
})

// 刪除按鈕 -> 呼叫後端app.js delete fun -> 前端顯示消失
record_list.addEventListener('click',
    function(e){
        if (e.target.nodeName === 'BUTTON'){
            const del_id = e.target.dataset.id
            delete_data(del_id);
        }
    }
)
// call 刪除此筆資料 ajax
function delete_data(del_id){
    const xhr = new XMLHttpRequest();
    xhr.open('post','/roll-money-delete');
    xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
    let del_data = JSON.stringify({"id":del_id});
    xhr.send(del_data);
    xhr.onload = function(){
        const res_data = JSON.parse(xhr.responseText);
        display_record(res_data); // 呼叫fun 把record 資料call回
    }
}
// 點選list 上的 item 會把資訊放上欄位
record_list.addEventListener('click',
    function(e){
        if (e.target.nodeName === 'LI'){
            const id = e.target.dataset.id
            const xhr = new XMLHttpRequest();
            xhr.open('post','/roll-money-specific');
            xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
            let data = JSON.stringify({"choose_id":id});
            xhr.send(data);
            xhr.onload = function(){
                const res_item = JSON.parse(xhr.responseText).result
                // 將拿來的item 資訊放在input
                input_income.value = res_item.income;
                input_save.value = res_item.save;
                input_expense.value = res_item.expense;
            }
        }
})