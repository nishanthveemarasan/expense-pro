@extends('Layout.admin')

@section('title', 'Dashboard')

@section('content')

<div id="saving" data="{{ $data['data']}}" token="{{$data['token']}}"></div>
@endsection