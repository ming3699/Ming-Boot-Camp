
window.onload = function () {

    var bigimgIndex = 0;

    navPathDataBind();
    function navPathDataBind() {

        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');

        var path = goodData.path;

        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                //create a without href
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {

                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                var iNode = document.createElement('i');
                iNode.innerText = '/';

                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }


        }
    }

    //magnify
    bigClassBind();
    function bigClassBind() {
    
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
   
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');

        var imagessrc = goodData.imagessrc;

        smallPic.onmouseenter = function () {

            var maskDiv = document.createElement('div');
			
            maskDiv.className = "mask";

            var BigPic = document.createElement('div');
			
            BigPic.id = "bigPic";

            var BigImg = document.createElement('img');
			
            BigImg.src = imagessrc[bigimgIndex].b;

            BigPic.appendChild(BigImg);


            smallPic.appendChild(maskDiv);


            leftTop.appendChild(BigPic);


            smallPic.onmousemove = function (event) {
   
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

    
                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

            
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)

                BigImg.style.left = -left / scale + 'px';
                BigImg.style.top = -top / scale + 'px';
            }


  
            smallPic.onmouseleave = function () {

       
                smallPic.removeChild(maskDiv);

 
                leftTop.removeChild(BigPic);
            }
        }
    }


    thumbnailData();
    function thumbnailData() {
 
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');

        var imagessrc = goodData.imagessrc;

        for (var i = 0; i < imagessrc.length; i++) {

            var newLi = document.createElement('li');

            var newImg = document.createElement('img');
			
            newImg.src = imagessrc[i].s;

            newLi.appendChild(newImg);

            ul.appendChild(newLi);
        }
    }

 
    thumbnailClick();
    function thumbnailClick() {
  

        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');

        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');

        var imagessrc = goodData.imagessrc;

     
        smallPic_img.src = imagessrc[0].s;

    
        for (var i = 0; i < liNodes.length; i++) {
          
            liNodes[i].index = i; 
            liNodes[i].onclick = function () {
                var idx = this.index; 
                bigimgIndex = idx;

                smallPic_img.src = imagessrc[idx].s;
            }
        }
    }

  
    rightTopData();
    function rightTopData() {
   

        var rightTop = document.querySelector('#wrapper #content .contentMain #center #right .rightTop');

        var goodsDetail = goodData.goodsDetail;

      
        var s = `<h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div class="price">
                            <span>£</span>
                            <p>${goodsDetail.price}</p>
                            <i> &nbsp; new arrive</i>
                        </div>
                        <p>
                            <span>Review</span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="priceBottom">
                        <span>Trade In&nbsp;</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>Warranty&nbsp;&nbsp;&nbsp;</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>Delivery to </span>
                    <p>${goodsDetail.address}</p>
                </div>`;

        rightTop.innerHTML = s;
    }

    rightBottomData();
    function rightBottomData() {

       
        var chooseWrap = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap');

       
        var crumbData = goodData.goodsDetail.crumbData;

        for (var i = 0; i < crumbData.length; i++) {

           
            var dlNode = document.createElement('dl');

         
            var dtNode = document.createElement('dt');
            dtNode.innerText = crumbData[i].title;

          
            dlNode.appendChild(dtNode);

        
            for (var j = 0; j < crumbData[i].data.length; j++) {

               
                var ddNode = document.createElement('dd');
                ddNode.innerText = crumbData[i].data[j].type;
                ddNode.setAttribute('price',crumbData[i].data[j].changePrice);
               
                dlNode.appendChild(ddNode);
            }

       
            chooseWrap.appendChild(dlNode);
        }
    }

    //change text color after click
    clickddBind();
    function clickddBind() {
   
        var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl');

        var arr = new Array(dlNodes.length);

        var choose = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .choose');
        
        arr.fill(0);

        for (var i = 0; i < dlNodes.length; i++) {

            (function (i) {

                var ddNodes = dlNodes[i].querySelectorAll('dd');


                for (var j = 0; j < ddNodes.length; j++) {

                    ddNodes[j].onclick = function () {

                        choose.innerHTML = "";

                        for (var k = 0; k < ddNodes.length; k++) {
                            ddNodes[k].style.color = "#666";
                        }


                        this.style.color = "red";

                        arr[i] = this;

                        changePriceBind(arr); 

                        arr.forEach(function(value,index){
                         
                               if(value){
                                  
                                    var markDiv = document.createElement('div');
                                   
                                    markDiv.className = 'mark';
                                  
                                    markDiv.innerText = value.innerText;
                                 
                                    var aNode = document.createElement('a');
                                  
                                    aNode.innerText = 'X';
                                   
                                    aNode.setAttribute('index',index);
                                   
                                    markDiv.appendChild(aNode);

                                    choose.appendChild(markDiv);

                               }
                        })

                        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .choose .mark a');
                        
                        for(var n = 0;n<aNodes.length;n++){
                            aNodes[n].onclick = function(){
                            
                                  var idx1 = this.getAttribute('index');
                                 
                              
                                  arr[idx1] = 0;

                             
                                  var ddlist = dlNodes[idx1].querySelectorAll('dd');
                                  
                               
                                  for(var m = 0; m < ddlist.length;m++){
                                 
                                        ddlist[m].style.color = "#666";
                                  }

                                  ddlist[0].style.color = 'red';


                                  choose.removeChild(this.parentNode);

                                  changePriceBind(arr);
                            }
                        }

                    }
                }
            })(i)


        }

    }

    //change Price function

    function changePriceBind(arr){

        var oldPrice = document.querySelector('#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p');


        var price = goodData.goodsDetail.price;


        for(var i = 0 ; i < arr.length;i++){
             if(arr[i]){
            
                var changeprice = Number(arr[i].getAttribute('price'));
               
                price += changeprice;
             }
             
        }

        oldPrice.innerText = price;

   
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');

        leftprice.innerText = '£' + price;

        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');

        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        
        for(var j = 0;j < ipts.length;j++){
            if(ipts[j].checked){
                price+=Number(ipts[j].value);
            }
        }

        newprice.innerText = '£' + price;

    }


    chooseprice();
    function chooseprice(){

        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');

        for(var i = 0 ; i < ipts.length;i++){
            ipts[i].onclick = function(){
                var oldprice = Number(leftprice.innerText.slice(1));
                for(var j = 0 ; j < ipts.length;j++){
                    if(ipts[j].checked){

                          oldprice = oldprice + Number(ipts[j].value);

                    }
                }

                newprice.innerText = '£' + oldprice;
            }
        }
    }


    function Tab(tabBtns,tabConts){
        for(var i = 0;i<tabBtns.length;i++){
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for(var j = 0;j<tabBtns.length;j++){
                    tabBtns[j].className = '';
                    tabConts[j].className = ''
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }
        }
    }


    leftTab();
    function leftTab(){
     
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
    
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent>div');
    
        Tab(h4s,divs);
    }


    rightTab();
    function rightTab(){
      
        var lis =document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
    
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
     
        Tab(lis,divs);
    }


    rightAsideBind();
    function rightAsideBind(){

        var btns = document.querySelector('#wrapper .rightAside .btns');

       
        var flag = true; 

    
        var rightAside = document.querySelector('#wrapper .rightAside');

    
        btns.onclick = function(){

         
             if(flag){

                btns.className = "btns btnsOpen";

                rightAside.className = "rightAside asideOpen";

             }else{
             
                btns.className = "btns btnsClose"

                rightAside.className = "rightAside asideClose";
             }

             flag = !flag;
        }
    }
}