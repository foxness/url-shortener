$(() =>
{
    jQuery.submit = () =>
    {
        var value = $('#text').val()
        if (value.length == 0)
            return
        
        $.ajax(
        {
            method: 'POST',
            url: '/add',
            data: { text: value },
            success: (data) =>
            {
                $('.genUrl').text(location.hostname + '/' + data).show()
            }
        })
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