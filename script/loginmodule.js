define(['jquery', 'jquerycookie', 'sha1'], function ($) {
    return {
        init: function () {
            var $user = '';
            var $pass = '';

            $('.btn_submit input').on('click', function () {
                $user = $('.name').val();
                $pass = hex_sha1($('.pwd').val());
                console.log($user, $pass);
                // if ($('.rememberMe input').prop('checked')) {
                //     if ($('.name').val() && $('.pwd').val()) {
                //         $.cookie('username', $('.name').val(), {
                //             expires: 7,
                //             path: '/'
                //         });
                //         $.cookie('password', $('.pwd').val(), {
                //             expires: 7,
                //             path: '/'
                //         })
                //     }
                // } else {
                //     $.cookie('username', $('.name').val(), {
                //         expires: -1,
                //         path: '/'
                //     });
                //     $.cookie('password', $('.pwd').val(), {
                //         expires: -1,
                //         path: '/'
                //     })
                // }
                $.ajax({
                    url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/login.php',
                    data: `name=${$user}&pass=${$pass}`,
                    type: 'post'
                }).done((data) => {
                    console.log(data);
                    if (data) {
                        if ($('.name').val() && $('.pwd').val()) {
                            $.cookie('username', $('.name').val(), {
                                expires: 7,
                                path: '/'
                            });
                            $.cookie('password', $('.pwd').val(), {
                                expires: 7,
                                path: '/'
                            })
                        }
                        window.location.href = 'sk_index.html';
                    } else {
                        $('.tankuang').show();
                        setTimeout(function () {
                            $('.tankuang').hide();
                        }, 1500)
                    }
                })
            })
        }
    }
})