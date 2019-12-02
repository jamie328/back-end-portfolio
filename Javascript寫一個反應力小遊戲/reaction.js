let bg_change = false; // 剛開始未變色
let btn_show = false; // 結束遊戲即可為true
let game_stop = false; // 遊戲中止flag
let time_start = 0;
let bg_ori = '#2d5959';
let high_score = [];

function background_change(){
    if (bg_change === false){
        let color_arr = [] 
        for (let i=0; i<3;i++){
            let random = Math.random()*150;
            color_arr.push(random); 
        }
        // document.querySelector("body").classList.add("body_change");
        // 隨機顏色
        document.querySelector("body").style.backgroundColor = `rgb(${color_arr[0]},${color_arr[1]},${color_arr[2]})`;
        bg_change = true; //變色
        time_start = new Date(); // 計時開始
    }   
}
function background_remove() {
    if (bg_change === true){
        // document.querySelector("body").classList.remove("body_change");
        document.querySelector("body").style.backgroundColor = bg_ori;
        bg_change = false; // reset 
    }    
}
function show_btn() {
    if (btn_show === false){
        document.querySelector(".again").classList.remove("again_hide");
        btn_show = true;
        game_stop = true; // button出現即不能遊戲
    }
}
function hide_btn() {
    if (btn_show === true){
        document.querySelector(".again").classList.add("again_hide");
        btn_show = false;
        game_stop = false; // button 隱藏遊戲開始
    }
}
function start() {
    // 前置條件
    if (game_stop) return //如有任何開關為開啟即返回,不得開始
    else{ //兩個都是false
        // 當觸發即變色與計時
        document.querySelector("body").addEventListener("click",
            function() {
                // 先有個計時器 1~3秒 三秒後作換色
                window.setTimeout(background_change, (Math.floor(Math.random()*5+3))*1000);
                document.removeEventListener("click",start);  //避免再次觸發start
            }
        )
    }
}
// game& timer
function game() {
    document.querySelector("body").addEventListener("click",
        function(e) {
            if ((bg_change === true) && (btn_show === false) && (game_stop === false) ){ //符合條件才會去計算時間
                let time_end = new Date() ;
                let score = ((time_end - time_start)/1000);
                alert(`你的成績為：${score}`);
                react_score(score);
                show_btn(); // 此時button出現，再玩一次 遊戲中止
                show_score();
            }else if((bg_change === false) && (btn_show === false) && (game_stop === false) ){
                alert("心急煮不了熱稀飯啊！");
                background_change(); // 讓bg_change變成true
                show_btn(); // 遊戲中止 
            }
            document.querySelector(".text").innerText="點擊再玩一次，開始測驗你的反應力!!";
        } 
    )
}
function show_score() {
    const score_li = document.querySelectorAll("li");
    for(let i=0;i<high_score.length;i++){
        score_li[i].innerText = `第 ${i+1} 名: ${high_score[i]}`;
    }
    document.querySelector('.score_board').style.display = "inline-block"; // 顯示成績
}
function sort_score(high_score, score) {
    // 從最後一個開始比
    for(let i= high_score.length-1; i>=0;i--){
        if(score > high_score[i]){
            return i+1;
        }
    }
    return 0; // 最後都沒有代表最強
}
// 如果分數很高，就寫在high_score_arr
function react_score(score) {
    document.querySelector("h4").innerText = "反應力就是你的超能力";
    if(high_score.length < 1){ // array為空
        high_score.push(score);
    }else{
        if (score < high_score[high_score.length-1]){
            let insert_index = sort_score(high_score,score);
            high_score.splice(insert_index,0,score); //在Inserst_index插入score
            high_score.splice(3); //取前三個
        }else if(high_score.length < 3){
            // 小於個數仍可放進array
            high_score.push(score);
        }else{ //甚麼都沒有 沒名
            document.querySelector("h4").innerText = "失之毫釐，差之千里啊！";
        }
    }
}
// reset
function reset() {
    document.querySelector(".again").addEventListener("click",
        function(e) {
            //確認狀況為遊戲中止
            if (game_stop === true){
                //reset 
                document.querySelector(".text").innerText = "開始測驗你的反應力，畫面變色時請點擊螢幕";
                document.querySelector('.score_board').style.display = "none";
                hide_btn(); // game_top = false
                background_remove();
                e.stopImmediatePropagation(); // 讓其停止回報以免觸發body的click
                // reset完成
            }
        }
    )
}
// 主程式
start();
document.querySelector("body").addEventListener("click",
    function (e) {
        if (e.target.tagName === 'BODY' || e.target.tagName === 'DIV'){ //如果tagName =BODY才開始遊戲
            game();
        }else if (e.target.tagName === 'BUTTON'){
            reset();
        }
    }
)