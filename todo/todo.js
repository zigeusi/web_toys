// 할일을 추가할 수 있다.
// 할일이 추가되면 id 값을 생성하고 결과를 알려준다.
// 상태는 3가지로 관리된다. todo, doing, done.
// 각 일(task)는 상태값을 가지고 있고, 그 상태값을 변경할 수 있다.
// 각 상태에 있는 task는 show함수를 통해서 볼 수 있다.
// 명령어를 입력시 command함수를 사용해야하고, '$'를 구분자로 사용해서 넣는다.
// done의 경우 소요시간이 함께 표시된다 (소요시간은 doing에서 done까지의 시간이다)
// 구분자($) 사이에 공백이 있다면 공백을 제거하고 실행되도록 한다.
// 대/소문자입력은 프로그램에서는 소문자만 처리하도록 코드를 구현한다. (대문자는 소문자로 변경)
// 유효하지 않은 입력은 오류를 발생시킨다.
// code 형태는 function으로 개발하고, 함수형의 특징을 많이 살리도록 노력한다.
// command("add$자바스크립트 공부하기");
// > id: 5,  "자바스크립트 공부하기" 항목이 새로 추가됐습니다.  //추가된 결과 메시지를 출력
// > 현재상태 :  todo:1개, doing:2개, done:2개
// command("update$3$done");
// > 현재상태 :  todo:1개, doing:1개, done:3개  //변경된 모든 상태가 노출.

const todoList = [];
const command = (word) => {
    // const order = word.toLowerCase().replace(/\s/g, "");
    let [orderName, ...arr] = order.split('$');
    ordername = orderName.toLowerCase().trim();
    switch (ordername) {
        case 'add': 
            add(...arr);
            break;
        case 'show': 
            show(...arr);
            break;
        case 'update':
            update(...arr);
            break;
        default: console.log('error'); 
    }

    // if(/^add/.test(order)||/^update/.test(order)||/^show/.test(order)){
    //     const [orderName, ...arr] = order.split('$');

    //     // if(orderName =="add"){

    //     // }
    //     // else if(orderName =="show") {
    //     // }
    //     // else if(orderName =="update"){
    //     // }
    // }else{
    //     console.log("error")
    // }
}
const add = (...arr) => {
    const todo = {
        id : todoList.length + 1,
        name: arr[0],
        condition: "todo"
    }
    todoList.push(todo);
    console.log("id: " + todoList.length + ', "' + arr[0] +'" 항목이 추가되었습니다')
}
const getTime = (timeDiff) => {
    let secs = timeDiff / 1000;
    let minutes = secs / 60;
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    hours = Math.floor(hours % 24);
    return hours + "시" + minutes + "분";
}
const update = (...arr) => {
    let num = Number(arr[0]) - 1;
    let todoNum =0;
    let doingNum =0;
    let doneNum =0;
    let startTime, endTime;

    if(arr[1] == "doing"){
        startTime = new Date();
        todoList[num].time = startTime;
        todoList[num].condition = arr[1];
    }else if(arr[1] == "done"){
        endTime = new Date();
        const timeDiff = endTime - todoList[num].time;
        const caltime = getTime(timeDiff);
        todoList[num].time = caltime;
        todoList[num].condition = arr[1];
    }else{
        console.log(error);
    }

    todoList.forEach(todo => {
        todoNum += Object.values(todo).filter(v =>  v === "todo").length;
        doingNum += Object.values(todo).filter(v =>  v === "doing").length;
        doneNum += Object.values(todo).filter(v =>  v === "done").length;
    })
    console.log("현재상태 todo:" + todoNum +"개, doing:" +  doingNum + "개, done:" + doneNum + "개")
}

const show = (...arr) => {
    if (arr[0] === 'doing' || arr[0] === 'done') {
        todoList.forEach(todo => {
            let result = Object.values(todo).filter(v => v === arr[0]).length;
            if(result > 0){
                switch (arr[0]) {
                    case "doing":
                        console.log(todo.id,todo.name);
                        break;
                    case "done":
                        console.log(todo.id,todo.name,todo.time)
                        break;
                    default:
                        console.error('error');
                        break;
                }
            }
        })            
    }
}
    // if(arr[0] == "doing"){
        
    // }else if(arr[0] == "done"){
        
    // }else{
    //     console.log("error");
    // }
