export function createItemPastry(name, images, price, rating, amount, index) {

    const article = document.createElement('article')

    // _________h3
    const h3 = document.createElement('h3');
    const texth3 = document.createTextNode(`${name}`);
    h3.appendChild(texth3);
    article.appendChild(h3);

    // __________IMG  images:[{ src:'/img/bread.jpg', alt: 'Bread',},]
    const img = document.createElement('img');
    const imgSrcAttribut = document.createAttribute('src');   
    imgSrcAttribut.value = `${ images[0].src }` ; 
    img.setAttributeNode(imgSrcAttribut);
    
    const imgAlt = document.createAttribute('alt');    
     imgAlt.value = `${ images[0].alt }`  ; 
     img.setAttributeNode(imgAlt);   
    article.appendChild(img);
    
    //__________PRIS    Pris: 20 kr
    const divpris = document.createElement('div');
    const prisText = document.createTextNode(`Pris : ${price}  Kr`);
    divpris.appendChild(prisText);
    article.appendChild(divpris);
    // ______ <div>Omdöme: <span>${rating}</span></div>
    const divomdome = document.createElement('div');
    const omdomeText = document.createTextNode(`Omdöme : ${rating}`);
    divomdome.appendChild(omdomeText);
    article.appendChild(divomdome);
    // _________ANTAL Antal: 0
    const antalDiv = document.createElement('div');
    const antalText = document.createTextNode(`Antal: ${amount}`);
    antalDiv.appendChild(antalText);
    article.appendChild(antalDiv);

    //____________   Buttons  
    //   (-)
    const minusBtn = document.createElement('button');
    minusBtn.className = 'minus'; // + class to knappen
    const attrMinus = document.createAttribute('data-id'); //   button  data-id 
    minusBtn.setAttributeNode(attrMinus);
    attrMinus.value = `${index}`; //data-id' = 0;
    minusBtn.setAttributeNode(attrMinus);
    const buttonMinusText = document.createTextNode('-');
    minusBtn.appendChild(buttonMinusText);
    article.appendChild(minusBtn);

    // (+)
    const plusBtn = document.createElement('button');
    plusBtn.className = 'plus';
    const attrPlus = document.createAttribute('data-id');
    attrPlus.value = `${index}`;
    plusBtn.setAttributeNode(attrPlus);
    const buttonPlusText = document.createTextNode('+');
    plusBtn.appendChild(buttonPlusText);
    article.appendChild(plusBtn);
    //____________ add to list
    document.querySelector('#pastryContainer').appendChild(article);
};