$(function(){

    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];


    // Form
    $('.contact-form').submit( function (e) {
        e.preventDefault();
        const salutation = $('#salutation').val();
        const name = $('#name').val();
        const contact = $('#contact').val();
        const email = $('#email').val();
        const enquiry = $('#enquiry').val();
        const message = $('#message').val();

        console.log("Values are:" + name + " and Email is " + email);

        $(".form-control").on("input", function(){
            var $this = $(this);
            if($this.val().length < 1) {
                $(this).addClass('border-danger');
            }
            else {
            $(this).removeClass('border-danger');
        }
        });

        $(".form-select").on("change", function(){
            var $this = $(this);
            if($this.val().length < 1) {
                $(this).next().addClass('border-danger');
            }
            else {
            $(this).next().removeClass('border-danger');
        }
        });

        $('.form-control').removeClass('border-danger');
        if (salutation.length < 1) {
            $('#salutation + .select2').addClass('border-danger');
        }
        if (name.length < 1) {
            $('#name').addClass('border-danger');
        }
        if (contact.length < 1) {
            $('#contact').addClass('border-danger');
        }
        if (email.length < 1) {
            $('#email').addClass('border-danger');
        }
        if (enquiry.length < 1) {
            $('#enquiry + .select2').addClass('border-danger');
        }
        if (message.length < 1) {
            $('#message').addClass('border-danger');
        }
        
        else {
                var data = {
                    action: 'save_form',
                    salutation: salutation,
                    name: name,
                    contact: contact,
                    email: email,
                    enquiry: enquiry,
                    message: message,
                };
                $.ajaxSetup({
                    headers:{
                        headers: {  'Access-Control-Allow-Origin': baseUrl+ '/' }
                    }
                 });
                $.post(
                    baseUrl+"/form/contact.php",
                        data
                    ).done(function (res) {
                        if (res == 'success') {
                            console.log("success", res);
                            $(".form-success").show();

                            setTimeout(function(){
                                $(".form-success").hide(); 
                            }, 2000);

                        } else {
                            alert('Error occured, pls check your form and try again')
                        }
                    })
                    .fail(function (res) {
                        console.log(res);
                    });
            }
        
      });
      
      
});