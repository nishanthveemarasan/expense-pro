<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/assets/css/bootstrap.css">
    <link rel="stylesheet" href="public/assets/vendors/bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="public/assets/css/app.css">
    <link rel="stylesheet" href="public/assets/css/pages/auth.css">
    <link rel="stylesheet" href="public/css/app.css">
    <style>
        .auth-form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 0 4%;
            margin-top: 50%;
        }
    </style>
</head>

<body>
    <div id="auth">

        <div class="row h-100">
            <div class="col-lg-5 col-12">
                @yield('content')
            </div>

        </div>

    </div>
    <script src="public/js/app.js"></script>
</body>

</html>