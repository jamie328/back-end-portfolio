let cacu_opr =""; //運算子
let cacu_num = []; //運算元
let cacu_sp =""; //特殊運算子
const keys = document.querySelectorAll("li");
function too_much_number(num){
    num = String(num);
    return num.substring(0,10);
}
function new_number(number){
    // 看是否要新增第二個數字 因為cacu_opr有運算子length不為0 剛存進去array 長度為1 
    if ((cacu_opr.length!=0) && (cacu_num.length ===1)){ // 因為cacu_num.push後length=2 也就是說只會進去1次
        cacu_num.push(""); //[數字,""]
        document.querySelector(".result").innerText =""; //變成空的
    }
    let result = document.querySelector(".result").innerText; //string
    if( result.indexOf('.') != -1 ){ // 不等於-1代表有找到. 是小數直接加上數字
        result += number;
        document.querySelector(".result").innerText = result;
    }else if ((result === '0') || (cacu_sp === '=')) { // cacu_sp = 是剛做完運算，因此按下數字要改變
        result = number;
        document.querySelector(".result").innerText = number;
        cacu_sp =""; //reset
        document.querySelector(".msg").style.display = "none"
    }else{ // 不是 0
        result += number;
        // 傳回去前如result 超過15個字即取前15個數字
        if(result.length > 10){
            result = too_much_number(result);
            document.querySelector(".msg").innerText = "Too Much Number!!";
            document.querySelector(".msg").style.display = "inline-block"
        }
        document.querySelector(".result").innerText = result;
    }
    return result;
}
function float_num(dot){
    //先判斷是否為小數
    let num = document.querySelector(".result").innerText;
    if ( Number(num)%1 ===0 ){ //代表整數，可以加.
        num = num + dot;
        console.log(num);
        document.querySelector(".result").innerText = num;
    }else{ //已經為小數啦!
        document.querySelector(".msg").innerText = "Already Float!";
        document.querySelector(".msg").style.display = "inline-block";
    }
}
function save_number(){
    let number = document.querySelector(".result").innerText
    cacu_num.push(number) // 放進array
}
function reset(){ // 歸零膏
    cacu_num = [] //數列重設
    cacu_opr = "" //運算子重設
    document.querySelector(".result").innerText = "0"; //變成"0"
    document.querySelector(".msg").style.display = "none"
}
function compute(){
    let number = document.querySelector(".result").innerText; // 把現在螢幕上的數字存起來
    cacu_num[1] = number; //儲存進array
    // cacu_num 兩數 & opr
    if (cacu_opr === '+'){
        add(cacu_num[0], cacu_num[1]); 
    }else if (cacu_opr === '─'){
        minus(cacu_num[0], cacu_num[1]);
    }else if (cacu_opr === 'X'){
        multiply(cacu_num[0], cacu_num[1]);
    }else if (cacu_opr === '/'){
        divide(cacu_num[0], cacu_num[1]);
    }else if (cacu_opr === 'MOD'){
        mod(cacu_num[0], cacu_num[1]);
    }
    console.log(cacu_num); //看是不是只剩一數
    cacu_opr="";  //reset opr
    cacu_num = [] //數列重設
}
function add (num1, num2){
    let ans = 0;
    ans = Number(num1) + Number(num2);
    if(String(ans).length > 10) ans = too_much_number(ans);
    // ans 轉成字串 
    document.querySelector(".result").innerText = ans.toString(); 
    document.querySelector(".msg").innerText = `${num1} + ${num2} = ${ans}`;
    document.querySelector(".msg").style.display = "inline-block";
    return ans.toString()
}
function minus (num1, num2){
    let ans = 0;
    ans = Number(num1) - Number(num2);
    if(String(ans).length > 10) ans = too_much_number(ans);
    document.querySelector(".result").innerText = ans.toString(); 
    document.querySelector(".msg").innerText = `${num1} ─ ${num2} = ${ans}`;
    document.querySelector(".msg").style.display = "inline-block";
    return ans.toString()
}
function multiply (num1, num2){
    let ans = 0;
    ans = Number(num1) * Number(num2);
    if(String(ans).length > 10) ans = too_much_number(ans);
    document.querySelector(".result").innerText = ans.toString(); 
    document.querySelector(".msg").innerText = `${num1} X ${num2} = ${ans}`;
    document.querySelector(".msg").style.display = "inline-block";
    return ans.toString()
}
function divide (num1, num2){
    let ans = 0;
    ans = Number(num1) / Number(num2);
    if(String(ans).length > 10) ans = too_much_number(ans);
    document.querySelector(".result").innerText = ans.toString(); 
    document.querySelector(".msg").innerText = `${num1} / ${num2} = ${ans}`;
    document.querySelector(".msg").style.display = "inline-block";
    return ans.toString()
}
function mod (num1, num2){
    let ans = 0;
    ans = Number(num1) % Number(num2);
    if(String(ans).length > 10) ans = too_much_number(ans);
    document.querySelector(".result").innerText = ans.toString(); 
    document.querySelector(".msg").innerText = `${num1} MOD ${num2} = ${ans}`;
    document.querySelector(".msg").style.display = "inline-block";
    return ans.toString()
}
function del_display(){
    let num = document.querySelector('.result').innerText;
    // string 取長度-1字串
    num = num.substring(0,num.length-1);
    document.querySelector(".result").innerText = num;
    document.querySelector(".msg").style.display = "none";
}
// 主程式
document.querySelector(".caculator").addEventListener("click",
    function(e){
        if (e.target.getAttribute("data-type") === 'num'){
            let number = e.target.innerText; // 拿到0~9
            number = new_number(number);
            if ((cacu_opr.length!=0)) { // msg顯示上一個數字與運算符號
                document.querySelector('.msg').innerText = `${cacu_num[0]} ${cacu_opr} `
                document.querySelector(".msg").style.display = "inline-block";
            }
            console.log(number);
        }else if (e.target.getAttribute("data-type") === 'opr') {
            // 做運算前先把前面的數字結清
            cacu_opr = e.target.innerText // 拿到運算子
            save_number();
            document.querySelector('.msg').innerText = cacu_opr; 
            document.querySelector('.msg').style.display = "inline-block"; // 顯示運算子
            // 判斷運算子功能
        }else if (e.target.getAttribute("data-type") === 'sp' ){
            cacu_sp = e.target.innerText // 拿到特殊運算子
            if (cacu_sp === 'AC'){
                reset();
            }else if(cacu_sp === '='){
                compute();
            }else if(cacu_sp === 'DEL'){
                del_display();
            }
        }else if (e.target.getAttribute("data-type") === 'sp-num'){
            let dot = e.target.innerText; // 拿到 .
            float_num(dot);
        }
    }
)