function checkArrays( arrA, arrB ){
    //check if lengths are different
    if (arrA.length !== arrB.length) return false;
    for (var i=0;i<arrA.length;i++){
         if(arrA[i] !== arrB[i]) return false;
    }
    return true;
} 

function submit_stg(){}
function reset_stg(){}
