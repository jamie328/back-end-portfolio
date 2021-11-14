const remove_due = document.querySelector('.remove_due');
const today = new Date().getTime()
const sort_by_update = document.querySelector('.sort_by_update');
const jobs = document.querySelector('jobs');
const sort_by_due_date = document.querySelector('.sort_by_due_date');
// 1. 拿到每個職缺到期日tag物件
// 2. 把職缺到期日value 存取
// 3. 符合條件 加上addList
remove_due.addEventListener('click',
    function(){
        const due_date_arr = document.querySelectorAll('.job__due_date');
        for (index in due_date_arr){
            let row = due_date_arr[index]
            let job_due_date = row.dataset.due_date;
            job_due_date = job_due_date.split('-');
            job_due_date = new Date(job_due_date[0],job_due_date[1]-1,job_due_date[2]); //從0開始
            if (job_due_date.getTime() < today){
                // 增加一個css讓其消失
                // 找row父節點去增加
                console.log('xxx')
                if (row.parentElement.classList.contains('hidden')){
                    // 已經把...過期職缺不顯示了
                    row.parentElement.classList.toggle('hidden');
                    let btn_due_date = document.querySelector('.btn_due_date')
                    btn_due_date.value = '只顯示未過期職缺';
                }else{
                    // 不顯示過期職缺
                    row.parentElement.classList.toggle('hidden');
                    let btn_due_date = document.querySelector('.btn_due_date');
                    btn_due_date.value = '顯示全部職缺';
                }
            }
        }
})
var xhr = new XMLHttpRequest(); // 定義xml 新方法
var flag = 1; // flag 1 ->按照建立日期排序 新到舊  2 -> 按照更新日期新到舊 , 3 -> 按照更新日期舊到新 
// flag 4->duedate新到舊 flag 5->duedate舊到新
sort_by_update.addEventListener('click',
    function(){
        // 0. 先判斷是什麼狀態 =>剛開始進來為1 會有 2 或 3
        // $sql = "SELECT * FROM jobs ORDER BY update_date DESC"
        const btn_update_date = document.querySelector('.btn_update_date');
        if(flag!== 2){
            var str = "update_date DESC"; 
            btn_update_date.value = '以更新日期排序(舊到新)';
            flag = 2// 更改為狀態2
        }else{
            var str = "update_date ASC";
            btn_update_date.value = '以更新日期排序(新到舊)';
            flag = 3;
        }
        // 1. xhr.open 指定後端路由
        xhr.open("GET",`handle_sort.php?sortby=${str}`);
        // 2. 定義傳輸格式 
        xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
        // 3. send
        xhr.send();
        xhr.onload = function(){
            const res_data = JSON.parse(xhr.responseText);
            console.log(res_data)
            xhr_sort_display(res_data['data']);
        }
})
sort_by_due_date.addEventListener('click',
    function(){
        const btn_sort_by_due_date = document.querySelector('.btn_sort_by_due_date');
        if(flag !== 4){
            var str = "due_date DESC";
            btn_sort_by_due_date.value = '以職缺到期日排序(舊到新)';
            flag = 4 //更改狀態為4
        }else{
            var str = "due_date ASC";
            btn_sort_by_due_date.value = '以職缺到期日排序(新到舊)';
            flag = 5 // 更改到5
        }
        // 1. xhr.open 指定後端路由
        xhr.open("GET",`handle_sort.php?sortby=${str}`);
        // 2. 定義傳輸格式 
        xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
        // 3. send
        xhr.send();
        xhr.onload = function(){
            const res_data = JSON.parse(xhr.responseText);
            xhr_sort_display(res_data['data']);
        }
    }
)
function xhr_sort_display(data){
        // 將xhr拿到的資料用來 新增前端內容 
        jobs_container = document.querySelector('.jobs');
        let str = ''; //用來新增字串
        for (index in data){
            let row = data[index];
            str+=`
                    <div class='job'>
                        <div class='job__title'> 職稱: ${row['title']} </div>
                        <div class='job__descri'>工作內容: ${row['descri']} </div>
                        <div class='job__salary'> 薪水範圍: ${row['salary']} </div>
                        <div class='job__link'> <a href='${row['link']}' target=_blank>更多資訊</a></div>
                        <div class='job__due_date' data-due_date=${row['due_date']}> 職缺到期日: ${row['due_date']} </div>
                        <div class='job__update_date' data-update_date=${row['update_date']}> 更新於: ${row['update_date']} </div>
                    </div>  
                 `
        }        
        jobs_container.innerHTML = str;
}