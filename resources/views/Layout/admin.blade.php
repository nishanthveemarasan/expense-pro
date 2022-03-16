<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="Description" content="best expense manager , best expense app,best debt manager,best debt managing app " />
    <meta name="Keywords" content="expense,task manager,to-do list,debt,saving,php,laravel,react" />
    <meta name="author" content="Nishanth" />
    <title>@yield('title')</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/assets/css/bootstrap.css">

    <link rel="stylesheet" href="public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css">
    <link rel="stylesheet" href="public/assets/vendors/bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="public/assets/css/app.css">
    <link rel="stylesheet" href="public/css/app.css">
    <link rel="shortcut icon" href="public/assets/images/favicon.svg" type="image/x-icon">
    <style>
        .iconStyle {
            color: blue;
            transform: scale(3, 3);
        }
    </style>
</head>

<body>
    <div id="app">
        @include('Layout.sidebar')
        <div id="main" class='layout-navbar'>
            @include('Layout.navbar')
            <div>
                @yield('content')


                @include('Layout.footer')
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/react@16.12/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@16.12/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-apexcharts@1.3.6/dist/react-apexcharts.iife.min.js"></script>
    <script src="public/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="public/assets/js/bootstrap.bundle.min.js"></script>
    <script src="public/js/app.js"></script>
    <script src="public/assets/js/mazer.js"></script>


    <script>
        // Replace Math.random() with a pseudo-random number generator to get reproducible results in e2e tests
        // Based on https://gist.github.com/blixt/f17b47c62508be59987b
        var _seed = 42;
        Math.random = function() {
            _seed = _seed * 16807 % 2147483647;
            return (_seed - 1) / 2147483646;
        };
    </script>

    <script>
        var colors = [
            '#008FFB',
            '#00E396',
            '#FEB019',
            '#FF4560',
            '#775DD0',
            '#546E7A',
            '#26a69a',
            '#D10CE8'
        ]
    </script>

</body>

</html>