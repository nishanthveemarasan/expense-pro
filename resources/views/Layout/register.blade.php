@extends('Layout.authen')

@section('title', 'Register')

@section('content')
<form action="{{url('register')}}" method="POST" class="auth-form">
    @error('email')
    <div style="color:red;">{{ $message }}</div>
    @enderror
    @if(session('error'))
    <div class="alert alert-warning alert-dismissible fade show w-100 text-center" role="alert">
        {{session('error')}}
    </div>
    @endif
    @csrf
    <div class="form-group position-relative has-icon-left mb-4">
        <input type="text" name="email" class="form-control form-control-xl" placeholder="auth code">
        <div class="form-control-icon">
            <i class="bi bi-shield-lock"></i>
        </div>
    </div>

    <div class="form-group position-relative has-icon-left mb-4">
        <input type="password" name="email_confirmation" class="form-control form-control-xl" placeholder="Confirm auth code">
        <div class="form-control-icon">
            <i class="bi bi-shield-lock"></i>
        </div>
    </div>
    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">Sign Up</button>
</form>
<div class="text-center mt-5 text-lg fs-4">
    <p class='text-gray-600'>Already have an account? <a href="{{url('auth')}}" class="font-bold">Log
            in</a>.</p>
</div>
@endsection