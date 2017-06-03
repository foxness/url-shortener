function isURL(str)
{
    return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(str)
}

$(() =>
{
    jQuery.submit = () =>
    {
        var value = $('#text').val().trim()
        if (value.length == 0 || !isURL(value))
        {
            // todo
            return
        }
        
        $.ajax(
        {
            method: 'POST',
            url: '/add',
            data: { inputUrl: value },
            success: (data) =>
            {
                if (data == 'url not valid')
                {
                    //todo
                    return
                }

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