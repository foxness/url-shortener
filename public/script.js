$(() =>
{
    jQuery.submit = () =>
    {
        var value = $('#text').val()
        if (value.length == 0)
            return
        
        $.ajax(
        {
            type: 'POST',
            url: '/add',
            data: { text: value }
        })
        
        location.reload(true)
    }

    $('#text').focus().select()

    $("#text").keypress((e) =>
    {
        if ((e.keyCode ? e.keyCode : e.which) == 13) // enter pressed
        {
            e.preventDefault();
            jQuery.submit()
        }
    })
})