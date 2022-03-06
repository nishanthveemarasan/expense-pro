@extends('Layout.authen')

@section('title', 'Login')

@section('content')
<form action="{{ url('login') }}" method="POST" class="auth-form">
    @csrf
    @error('code')
    <div style="color:red;">{{ $message }}</div>
    @enderror
    @if(session('error'))

    <div class="alert alert-warning alert-dismissible fade show w-100 text-center" role="alert">
        {{session('error')}}
    </div>
    @endif
    <div class="form-group position-relative has-icon-left mb-4">
        <input type="password" name="code" class="form-control form-control-xl" placeholder="auth code...">
        <div class="form-control-icon">
            <i class="bi bi-shield-lock"></i>
        </div>
    </div>
    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5" type="submit">Log in</button>
</form>
<div class="text-center mt-5 text-lg fs-4">
    <p class="text-gray-600">Don't have an account? <a href="{{ url('auth-register') }}" class="font-bold">Sign
            up</a>.</p>
    <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
</div>
@endsection