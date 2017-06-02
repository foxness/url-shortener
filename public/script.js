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
                var link = `http://${location.hostname}/${data}`
                $('.genUrl').text(link).attr('href', link).show()
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