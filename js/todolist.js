let todoArray = [];

async function fetchData() {

    // fetch fonksiyonu ile HTTP GET isteği yapma.

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  
    // Response'un JSON formatına çevrilmesi.

    const data = await response.json();

    todoArray = [...data];

    // List ve loading domlarının seçilmesi.
    
    const listDOM = document.querySelector("#list");
    const loadingDOM = document.querySelector("#loading");
    
    // gelen verilerin listeye eklenmesi.

    const htmlData = todoArray.map((item,index) => {
        
        return `
        <li id="list-item-${index}" class="list-item">

            <span class="list-checkboxandtitle">
              <input title-id="${index}" class="list-checkbox" type="checkbox" onchange="checkboxChanged(event)" ${item.completed ? 'checked' : ''}/>
              <span id="item-${index}" class="list-title ${item.completed ? 'completed' : ''}">${item.title}</span>
            </span>
          
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="18"  viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
              <path delete-id="${index}" onclick="deleteItem(event)" class="list-trash" fill="#b61b1b" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            
        </li> \n`;
    
      });
    
    listDOM.innerHTML = htmlData.join('');

    // loadingDom'un veriler geldikten sonra hide edilmesi.

    loadingDOM.style.display = 'none';     
    listDOM.style.display = 'block';

  }
  
  // checkbox üzerinde değişiklik olduğunda çalışan bir fonksiyon.

  checkboxChanged = (e) => {
      
    const target = e.target;
    
    // element üzerinde tanımlanmış index attribute alınması.

    const index = target.getAttribute('title-id');

    // ilgili title'in seçilmesi.

    const titleDOM = document.querySelector(`#item-${index}`);
    
    // eğer target checked ise array üzerinde belirtilen indexin true yapılması.

    if (target.checked) {
      
      todoArray[index].completed = true;
      titleDOM.classList.add('completed');
      
       
    }

    // eğer target checked değilse array üzerinde belirtilen indexin false yapılması.

    else {

      todoArray[index].completed = false;
      titleDOM.classList.remove('completed');
      

    }

  }
  
  // listeden bir item silindiğinde çalışan fonksiyon.

  deleteItem = (e) => {
     
    const target = e.target;

    // element üzerinde tanımlanmış index attribute alınması.

    const index = target.getAttribute('delete-id');

    // ilgili indexin arrayden silinmesi.

    todoArray.splice(index, 1);
    console.log(todoArray);
    const deleteDOM = document.querySelector(`#list-item-${index}`);

    // ilgili elementin DOM üzerinden silinmesi.

    deleteDOM.remove();
    const listDOM = document.querySelector("#list");

    // belirli indexe ait öğe silindikten sonra DOM üzerindeki öğelerin index değerlerinin güncellenmesi.

    const htmlData = todoArray.map((item,index) => {
        
      return `
      <li  id="list-item-${index}" class="list-item">

          <span class="list-checkboxandtitle">
          <input title-id="${index}" class="list-checkbox" type="checkbox" onchange="checkboxChanged(event)" ${item.completed ? 'checked' : ''}/>
          <span id="item-${index}" class="list-title ${item.completed ? 'completed' : ''}">${item.title}</span>
          </span>
        
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
          <path delete-id="${index}" onclick="deleteItem(event)" class="list-trash" fill="#b61b1b" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
          
      </li> \n`;
  
      });

    listDOM.innerHTML = htmlData.join('');  
    


  }
  

  
  // DOM yüklendikten sonra çalışır.

  document.addEventListener('DOMContentLoaded', function() {
    
    // asenkron fonksiyonun çağırılıması.

    fetchData();
    
    // formun submit edilip edilmediğinin dinlenmesi.

    document.querySelector('#form').addEventListener('submit', function(e) {

      // formun varsayılan sayfayı yenileme davranışının durdurulması.

      e.preventDefault();
      const title = document.querySelector('#title');
      const errorDOM = document.querySelector('#error');

      // eğer title değeri boş ise kullanıcıya bir error gönderir.

      if (!title.value){
        const htmlData = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#b80a0a" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
        </svg>
        <span>Title alanı boş bırakılamaz.</span>`;
        errorDOM.style.display = 'block';
        errorDOM.innerHTML = htmlData;
        title.style.borderColor = 'red';
        return false; // fonksiyonu terk eder.
      }

      // eğer title değeri boş değilse çalışır.

      errorDOM.style.display = 'none';   // eğer bir error mesajı varsa none yap.
      title.style.borderColor = '';      // borderColor temizle.
      const isCompleted = document.querySelector('#complete');

      // kullanıcıdan alınan verilere göre bir obje oluştur ve array içerisine push et.

      todoArray.push({title:`${title.value}`, completed: isCompleted.checked });  
      console.log(todoArray);
      title.value = '';
      isCompleted.checked = false;

      // yeni verimiz arrayin en sonuna eklendiği için (todoArray.length-1) ile index değerine erişiriz.

      const index = todoArray.length - 1;

      // ilgili indexe sahip verinin itemini alıyoruz.

      const item = todoArray[index];
      const listDOM = document.querySelector("#list");
      const listItem = document.createElement('li');
      listItem.id = `list-item-${index}`;
      listItem.className = 'list-item';
      listItem.innerHTML = `
      <span class="list-checkboxandtitle">
      <input title-id="${index}" class="list-checkbox" type="checkbox" onchange="checkboxChanged(event)" ${item.completed ? 'checked' : ''}/>
      <span id="item-${index}" class="list-title ${item.completed ? 'completed' : ''}">${item.title}</span>
      </span>
    
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
      <path delete-id="${index}" onclick="deleteItem(event)" class="list-trash" fill="#b61b1b" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
      </svg>`;

      // kullanıcıdan alınan verilerle doldurulan html yapımızı DOM üzerine ekliyoruz.

      listDOM.appendChild(listItem); 


    })


  });