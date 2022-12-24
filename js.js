'use strict'

let text = document.querySelector('#textaria');

let bntSave = document.querySelector('#save');

let ul = document.querySelector('#notes');

let stat = document.querySelector('.stat');

let spans = document.querySelectorAll('span');

let create = document.querySelector('#create')

let select;

let update;

let i = 1;

let texts = [
    'text1',
    'text2',
    'text3',
];

let mode;

let li;

for(let elem of spans){
    if(elem.classList.contains('num')){
        elem.textContent += i
        i++
    }
    if(spans.length === 0){
        i=1
        elem.textContent += i
        
    }
}

bntSave.setAttribute('data-mode','create')

bntSave.addEventListener('click',function(){

    mode = this.dataset.mode
    stat.textContent = mode
    console.log(mode)
    
    if(mode == 'create'){
       
        li = document.createElement('li')
        
        if(text.value !== ''){
            li.setAttribute('data-key', i )
            let spanOpen = document.createElement('span')
            spanOpen.classList.add('open')
            spanOpen.textContent = 'запись ' + i
            li.appendChild(spanOpen)

            let spanRemove = document.createElement('span')
            spanRemove.classList.add('remove')
            spanRemove.textContent = ' X'
            li.appendChild(spanRemove)

            texts.push(text.value)
            text.value = ''
            ul.appendChild(li)
            i++   
        }
        
    }

    if (mode == 'update') {
       
        bntSave.setAttribute('data-mode','create')
        select.classList.remove('active')
        let key = select.dataset.key;
        texts[key-1] = text.value
        
	}

   
    console.log(texts)
  
})


ul.addEventListener('click',function(ev){
  
    let target = ev.target;
    
    let tgClass = target.classList

    let parentLiText = target.closest('li').dataset.key-1
    

    let parentLi = target.closest('li')

    
  
    if(tgClass == 'open'){
        text.value = texts[parentLiText]
        highlight(parentLi)
    }
    if(tgClass == 'remove'){
        texts.splice(parentLiText,parentLiText)
       parentLi.remove()
       console.log(texts)
       stat.textContent = 'Запись успешно удалена'
        
    }
    
    //bntSave.setAttribute('data-mode','update')
    //stat.textContent = 'update'
    
    
    

})

function highlight(li){
    if(select){
        select.classList.remove('active')
    }
    select = li;
    select.classList.add('active')

    
}


create.addEventListener('click',function(){
    text.value = ''
})