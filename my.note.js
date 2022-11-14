let title = document.getElementsByClassName('title')[0];
let text = document.getElementsByClassName('text')[0];
let type = document.getElementsByTagName('select')[0];
let add = document.getElementsByClassName('add')[0];
let cancel = document.getElementsByClassName('cancel')[0];
let notes = document.getElementsByClassName('notes')[0];
let head = document.getElementsByClassName('head')[0];
let body = document.getElementsByClassName('body')[0];
let head2 = document.getElementsByClassName('head2')[0];
let body2 = document.getElementsByClassName('body2')[0];
let open = document.getElementsByClassName('open');
let close = document.getElementsByClassName('close');
let dark = document.getElementsByClassName('dark')[0];
let light = document.getElementsByClassName('light')[0];
let mod = document.getElementsByClassName('mod')[0];
let newn = document.getElementsByClassName('new')[0];
let register = document.getElementsByClassName('regist')[0];
let list;
let regist;
function detect(){
    let device = navigator.userAgent.toLowerCase().match(/mobile/i);
    return device;
}
window.addEventListener("load", detect());
if(detect() == 'mobile'){
    document.getElementsByTagName('link')[0].href = 'mobile.css';
}
if(localStorage.mod == 'dark'){
    dark_mod();
}
if(localStorage.mod == 'light'){
    light_mod();
}
(function(){
    let mynote = 'my.note';
    let i = 0;
    let time = setInterval(write,150);
    function write(){
        if(i < mynote.length){
            document.getElementsByTagName('h1')[0].innerHTML += mynote[i];
            i++;
        }
        else{
            clearInterval(time);
            setTimeout(function(){
                time = setInterval(opacity, 2);
                i = 100;
                function opacity(){
                    if(i>0){
                        i--;
                        document.getElementsByTagName('h1')[0].style.filter = `opacity(${i}%)`;
                    }
                    else{
                        clearInterval(time);
                        document.getElementsByTagName('h1')[0].style.display = 'none';
                        document.getElementsByClassName('continer')[0].style.display = 'grid';
                        document.getElementsByTagName('a')[0].style.display = 'inline-block';
                    }
                }},500);
        }
    }
})();
if(localStorage.list == null){
    list = [];
}
else{
    list = JSON.parse(localStorage.list);
}
if(localStorage.regist == null){
    regist = [];
}
else{
    regist = JSON.parse(localStorage.regist);
}
add.onclick = function(){
    click(add);
    let date = new Date();
    let d = date.toLocaleDateString();
    let h = date.getHours();
    let m = date.getMinutes();
    if(title.value != '' && text.value != ''){
        let information = {
            title: title.value,
            text: text.value,
            type: type.value,
            date: d + ' ' + h + ':' + m ,
        }
        list.push(information);
        let information2 = {
            title: information.title,
            date: information.date,
            opiration: 'إضافة',
        }
        regist.push(information2);
        localStorage['list'] = JSON.stringify(list);
        localStorage.regist = JSON.stringify(regist);
        title.value = '';
        text.value = '';
        type.value = 'عادية';
        view();
        readregist();
    }
}
cancel.onclick = function(){
    title.value = '';
    text.value = '';
    type.value = 'عادية';
    click(this);
}
function view(){
    body.innerHTML = '';
    let div = document.createElement('div');
    div.className = 'note';
    for(let i = 0; i < list.length; i++){
        div.innerHTML = `<h3 onclick="read(${i})" class="open">فتح</h3><h3 onclick="exit(${i})" style="display:none" class="close">إغلاق</h3><h3>${list[i].title}</h3><h3>${list[i].type}</h3><h3 style="direction:ltr">${list[i].date}</h3><h3 class="delete" onclick="del(${i})">حذف</h3>`;
        if(list[i].type=='مهمة'){
            div.style.background = 'orange';
        }
        else if(list[i].type=='شديدة الأهمية'){
            div.style.background = 'red';
            div.getElementsByClassName('open')[0].style.color = 'white';
            div.getElementsByClassName('close')[0].style.color = 'white';
            div.getElementsByClassName('delete')[0].style.color = 'white';
        }
        else{
            div.style.background = 'rgb(255, 230, 0)';
        }
        body.innerHTML += div.outerHTML;
    }
}
view();
function del(i){
    let date = new Date();
    let d = date.toLocaleDateString();
    let h = date.getHours();
    let m = date.getMinutes();
    let information2 = {}
    information2.title = list[i].title;
    information2.date =  d + ' ' + h + ':' + m;
    information2.opiration = 'حذف';
    regist.push(information2);
    list.splice(i,1);
    localStorage.list = JSON.stringify(list);
    localStorage.regist = JSON.stringify(regist);
    view();
    readregist();
}
function read(i){
    if(detect() == 'mobile'){
        document.getElementsByClassName('note')[i].style.gridTemplateRows = '75px 1fr';
    }
    else{
        document.getElementsByClassName('note')[i].style.gridTemplateRows = '30px 1fr';       
    }
    document.getElementsByClassName('note')[i].innerHTML += `<textarea class="data" id='data${i}' disabled>${list[i].text}</textarea>`;
    open[i].style.display = 'none';
    close[i].style.display = 'inline-block';
}
function exit(i){
    document.getElementsByClassName('note')[i].style.gridTemplateRows = 'none';
    document.getElementById('data'+i).outerHTML = '';
    close[i].style.display = 'none';
    open[i].style.display = 'inline-block';
}
function click(element){
    let i = 100;
    let time = setInterval(size, 5);
    function size(){
        element.style.filter = 'brightness(70%)';
        if(i>85){
            i--;
            element.style.transform = `scale(${i}%)`;
        }
        else{
            clearInterval(time);
            element.style.transform = `scale(100%)`;
            element.style.filter = 'brightness(100%)';
        }
    }
}
function readregist(){
    body2.innerHTML = '';
    let div = document.createElement('div');
    div.className = 'rnote';
    document.getElementsByClassName('body')[1] = '';
    for(let i = 0; i < regist.length; i++){
        div.innerHTML = `<h3>${regist[i].title}</h3><h3>${regist[i].opiration}</h3><h3 style="direction:ltr">${regist[i].date}</h3>`;
        body2.innerHTML += div.outerHTML;
    }
}
readregist();
function openregist(element){
    head2.style.display = 'grid';
    body2.style.display = 'block';
    element.style.display = 'none';
    document.getElementsByClassName('closer')[0].style.display = 'inline-block';
    document.getElementsByClassName('deleteall')[0].style.display = 'inline-block';
}
function closeregist(element){
    head2.style.display = 'none';
    body2.style.display = 'none';
    element.style.display = 'none';
    document.getElementsByClassName('openr')[0].style.display = 'inline-block';
    document.getElementsByClassName('deleteall')[0].style.display = 'none';
}
function deleteall(){
    localStorage.removeItem('regist');
    regist = [];
    body2.innerHTML = '';
}
function dark_mod(){
    dark.style.visibility = 'hidden';
    light.style.visibility = 'visible';
    mod.style.borderColor = 'white';
    document.body.style.background = 'rgb(51, 54, 58)';
    head.style.borderColor = 'white';
    for(let i = 0; i < head.getElementsByTagName('h3').length; i++){
        head.getElementsByTagName('h3')[i].style.background = 'none';
        head.getElementsByTagName('h3')[i].style.borderRadius = '0';
        head.getElementsByTagName('h3')[i].style.padding = '0px';
        head.getElementsByTagName('h3')[i].style.color = 'rgb(255, 230, 0)';
    }
    document.getElementsByTagName('a')[0].style.background = 'none';
    document.getElementsByTagName('a')[0].style.borderRadius = '0px';
    document.getElementsByTagName('a')[0].style.color = 'rgb(255, 230, 0)';
    document.getElementsByTagName('a')[0].style.padding = '0px';
    document.getElementsByTagName('h1')[0].style.background = 'none';
    document.getElementsByTagName('h1')[0].style.borderRadius = '0px';
    document.getElementsByTagName('h1')[0].style.color = 'rgb(255, 230, 0)';
    document.getElementsByTagName('h1')[0].style.padding = '0px';
    localStorage.mod = 'dark';
}
function light_mod(){
    light.style.visibility = 'hidden';
    dark.style.visibility = 'visible';
    mod.style.borderColor = 'black';
    document.body.style.background = 'white';
    head.style.borderColor = 'black';
    for(let i = 0; i < head.getElementsByTagName('h3').length; i++){
        head.getElementsByTagName('h3')[i].style.background = 'rgb(255, 230, 0)';
        head.getElementsByTagName('h3')[i].style.color = 'rgb(50,50,50)';
        if(detect() == 'mobile'){
            head.getElementsByTagName('h3')[i].style.padding = '12.5px';
            head.getElementsByTagName('h3')[i].style.borderRadius = '125px';
        }
        else{
            head.getElementsByTagName('h3')[i].style.borderRadius = '50px';
            head.getElementsByTagName('h3')[i].style.padding = '5px';
        }
    }
    document.getElementsByTagName('a')[0].style.background = 'rgb(255, 230, 0)';
    document.getElementsByTagName('a')[0].style.color = 'rgb(50,50,50)';
    document.getElementsByTagName('h1')[0].style.background = 'rgb(255, 230, 0)';
    document.getElementsByTagName('h1')[0].style.color = 'rgb(50,50,50)';
    if(detect() == 'mobile'){
        document.getElementsByTagName('a')[0].style.padding = '12.5px 25px 12.5px 25px';
        document.getElementsByTagName('a')[0].style.borderRadius = '125px';
        document.getElementsByTagName('h1')[0].style.borderRadius = '125px';
        document.getElementsByTagName('h1')[0].style.padding = '12.5px 50px 12.5px 50px';
    }
    else{
        document.getElementsByTagName('a')[0].style.padding = '5px 10px 5px 10px';
        document.getElementsByTagName('a')[0].style.borderRadius = '50px';
        document.getElementsByTagName('h1')[0].style.borderRadius = '50px';
        document.getElementsByTagName('h1')[0].style.padding = '5px 20px 5px 20px';
    }
    localStorage.mod = 'light';
}
