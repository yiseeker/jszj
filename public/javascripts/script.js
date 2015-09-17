$(document).ready(function(){

});

function go(suffix)
{
    window.location.href=getRootPath(suffix);
}


function getRootPath(suffix)
{
    if(suffix){
        return 'http://'+window.location.host+suffix;
    }else
    {
        return 'http://'+window.location.host;
    }

}

function submitForm(id)
{
    $('#'+id).submit();
}