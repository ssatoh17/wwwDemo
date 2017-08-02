onmessage = function (event) {
  
  var ret = event.data;
  
  for(var i = 0; i < ret.val; i++){
        // UIスレッド側にメッセージを送付する
        postMessage("View has Changed " + i + " Times !!");
        // Sleep( 1 );//1秒待つ
    }
}

function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+1000*T ){    //T秒待つ 
       d2=new Date().getTime(); 
   } 
   return; 
} 