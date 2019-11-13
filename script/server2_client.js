



$( document ).ready(function() {
    
    $('#copy_to_clipboard').on("click", function(){ 
        
        var copyText = document.getElementById("urlhistory");      // $('#copy_to_clipboard').prev()
        
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        
        /* Copy the text inside the text field */
        document.execCommand("copy");
    })
    
});






